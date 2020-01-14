const Result = {};
const code_msg = {};

Result.success = function (data, res) {
    res.json({
        code: 200,
        data,
        msg: '操作成功'
    });
}
Result.failed = function (data, code, res) {
    res.json({
        code: code || 5000,
        data,
        msg: code_msg.code || '系统错误'
    });
}
Result.SYSTEM_ERROR = 5000;
code_msg[Result.SYSTEM_ERROR] = '系统错误';

module.exports = Result;