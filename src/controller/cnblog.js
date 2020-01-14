const request = require('superagent');

exports.getCnblog = function () {
    // 获取 首页的 推荐文章链接
    request.get('https://www.cnblogs.com')
        .then(data => {
            const reg = new RegExp('<a href=\"(.+?)\" id=\"editor\_pick\_lnk\".+>.+<\/a>');
            const matchedA = reg.exec(data.text); // 匹配到的a标签
            const href = matchedA ? matchedA[1] : ''; // 文章链接
            console.log('文章链接：', href);
            if (href) {
                request.get(href).then(article => {
                    const reg = new RegExp('<a.+id=\"cb\_post\_title\_url\".+>(.+)<\/a>');
                    const matchedA = reg.exec(article.text); // 匹配到的a标签
                    const href = matchedA ? matchedA[1] : ''; // 文章标题
                    console.log('文章标题：', href);
                }).catch(e => {
                    console.error('获取文章时报错：', e);
                })
            }
        })
        .catch(e => {
            console.error('cnblogs 报错了：', e);
        });
}