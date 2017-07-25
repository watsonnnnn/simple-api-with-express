/**
 * Created by Administrator on 2017/7/8.
 */

import {userModel, articleModel} from '../../models';
import {cryptMD5} from '../../uitl/util';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import fs from 'fs';

const Upload = multer({storage: multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/images/');
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/').pop());
    }
})});

class User {
    // constructor(){
    //     // this.login = this.login.bind(this)
    // }
    login(req, res, next) {
        let {username, password} = req.body;

        if(!username || !password){
            res.send(clientMsg(false, '缺少参数'));
            return false;
        }
        userModel.findOne({username, password}, (err, users) => {
            if(err){
                next(clientError(req, err.message));
            }else{
                if(!users){
                    res.send(clientMsg(false, '用户名或密码有误'));
                }else {
                    let token = jwt.sign({exp: Math.floor(Date.now()/1000)+(60 * 60), data: users._id}, 'secret');
                    res.send(clientMsg(true, {user: {token, username: users.username}}))
                }
            }
        });
    }

    async register(req, res, next){
        let {username, password} = req.body;
        if(!username || !password){
            res.send(clientMsg(false, '缺少参数'));
            return false;
        }
        userModel.find({username},async (err, user) => {
            if(err){
                next(clientError(req, err.message));
                return false;
            }else{
                if(user[0]){
                    res.send(clientMsg(false, '用户名已存在'));
                }else{
                    password = cryptMD5(password);
                    const result = await userModel.create({username, password});
                    if(result){
                        res.send(clientMsg(true, '创建成功'));
                    }else{
                        next(clientError(req, '创建失败'));
                    }
                }
            }
        })
    }

    async getUserArticles(req, res, next){
        let _user = jwt.verify(req.header('token'), 'secret').data;
        try {
            const result = await articleModel.find({author: _user});
            res.send(result);
        }catch (e){
            next(clientError(req, '查看失败'));
        }
    }

    upload(){
       return Upload.single('avatar');
    }
    async uploadLater(req, res, next){
        if('image' !== req.file.mimetype.split('/').shift()){
            fs.unlink('uploads/' + req.file.filename, (err) => {
                if(err){
                    next(clientError(req, err.message));
                }else{
                    next(clientError(req, '文件格式有误'))
                }
            });
        }else {
            const result = await userModel.findByIdAndUpdate(req._uid, {avatar: '/images/' + req.file.filename});
            res.send(clientMsg(true, '上传成功'));
        }
    }

    async getUserInfo(req, res, next){

    }
}
export default new User();