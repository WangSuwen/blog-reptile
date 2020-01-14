const express = require('express');
const app = express();


const articleCtr = require('./src/controller/cnblog');

app.get('/articleList', articleCtr.articleList);


app.use(function (req , res, next) {
    return res.status(404).json({code: 404 , data: '' , msg: '请求地址错误或者请求方式错误'});
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    console.error(err);
    res.json({ msg: err.message, stack: err.stack });
});

app.listen(3002, () => {
    console.log('express starting');
});