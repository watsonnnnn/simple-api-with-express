import express from 'express';
import config from './src/config';
import bodyParser from 'body-parser';
import './src/mongo';

const PORT = process.env.PORT || config.PORT;
const app = express();
app.use(bodyParser.json());//根据req的content-type来进行解析,如果contenttype是application/json 那么这里就可以解析到
app.use(bodyParser.urlencoded({extended:false}))//解析原始的form表单格式 ,也就是application/x-www-form-urlencoded


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

app.use('/a',(req,res,next)=>{
    console.log(req.body)
    res.send({some: 'json'})
})
app.use((req, res, next) => {
    res.status(404).send('未找到当前路由');
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send(err.message);
});

app.listen(PORT,()=>{
    console.log('server is running on',PORT)
});
