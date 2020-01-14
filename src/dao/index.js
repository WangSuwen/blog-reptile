exports.save = function (model, params) {
    const instance = new model(params);
    return instance.save();
}

exports.count = function (model, params = {}) {
    return model.count(params);
}
exports.list = function (model, params = {}, pageSize = 10, currentPage = 1) {
    return model.find(params).skip((currentPage - 1) * pageSize).limit(pageSize);
}