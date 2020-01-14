const request = require('superagent');
const articleModel = require('../../model').getModel('article');
const dao = require('../dao');
const result = require('../dao/result');

exports.getCnblog = function () {
    // 获取 首页的 推荐文章链接
    request.get('https://www.cnblogs.com')
        .then(data => {
            const reg = new RegExp('<a href=\"(.+?)\" id=\"editor\_pick\_lnk\".+>.+<\/a>');
            const matchedA = reg.exec(data.text); // 匹配到的a标签
            const url = matchedA ? matchedA[1] : ''; // 文章链接
            console.log('文章链接：', href);
            if (href) {
                request.get(href).then(async article => {
                    const reg = new RegExp('<a.+id=\"cb\_post\_title\_url\".+>(.+)<\/a>');
                    const matchedA = reg.exec(article.text); // 匹配到的a标签
                    const title = matchedA ? matchedA[1] : ''; // 文章标题
                    try {
                        await dao.save(articleModel, {title, url});
                    } catch (e) {
                        console.error('保存文章时报错：', e);
                    }
                }).catch(e => {
                    console.error('获取文章时报错：', e);
                })
            }
        })
        .catch(e => {
            console.error('cnblogs 报错了：', e);
        });
}

exports.articleList = async function (req, res) {
    const currentPage = req.query.page || 1;
    const pageSize = req.query.pageSize || 10;
    let count;
    let list;
    try {
        count = await dao.count(articleModel);
        list = await dao.list(articleModel, {}, pageSize, currentPage);
        result.success({
            list,
            count
        }, res);
    } catch (e) {
        console.error(e);
        result.failed(e, result.SYSTEM_ERROR, res);
    }
}
