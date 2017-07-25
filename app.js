import express from 'express';
import config from './src/config';
import bodyParser from 'body-parser';
import utils from 'util';
import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import './src/mongo';


const PORT = process.env.PORT || config.PORT;
const app = express();
app.use(bodyParser.json());//根据req的content-type来进行解析,如果contenttype是application/json 那么这里就可以解析到
app.use(bodyParser.urlencoded({extended:false}))//解析原始的form表单格式 ,也就是application/x-www-form-urlencoded
app.use(express.static('uploads'));

app.all('*',(req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');//允许请求中携带头部字段名
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Credentials', true);
    res.header('X-Powerd-By', '3.2.1');
    if(req.method === "OPTIONS"){
        res.send(200);
    }else{
        next();
    }
})

app.use((req, res, next) => {
    // console.log(req.ip);
    next();
})
app.use(['/article', '/user/upload'], (req, res, next) => {
    // console.log();
    let token = req.header('token');
    let origin;
    try {
        origin = jwt.verify(token, 'secret');
        req._uid = origin.data;
        next();
    }catch (e){
        console.log(e.message);
        next(clientError(req, '尚未登录'));
        return false;
    }
})

import router from './src/routes';
router(app);


global.clientError = (req, errorMsg) => {
    console.log(utils.inspect({time: new Date(), 'url===>': req.originalUrl, 'error===>': errorMsg}, {colors: true}));

    fs.writeFile(path.resolve(__dirname, './log/app.log'),'\r\n' + new Date() + '  url===>:' + req.originalUrl + ',error===>: ' + errorMsg, {flag: 'a'}, (err) => {
        if(err){
            console.log('log error ..............>>>'+ err.message)
        }else{
        }
    })
    return new Error(errorMsg)
}
global.clientMsg = (boolValue, msg) => {
    return {success: boolValue, msg}
}


app.use((req, res, next) => {
    res.status(404).send('未找到当前路由');
});

app.use(function(err, req, res, next) {
    res.status(500).send({success: false, msg: err.message});
});

app.listen(PORT,()=>{
    console.log('server is running on',PORT)
});
