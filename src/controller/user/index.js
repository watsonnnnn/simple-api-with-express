/**
 * Created by Administrator on 2017/7/8.
 */

import {userModel} from '../../models';

class User {
    // constructor(){
    //     // this.login = this.login.bind(this)
    // }
    login(req, res, next) {
        let {username, password} = req.body;

        if(!username || !password){
            next(clientError(req, '缺少参数'))
        }
        userModel.find({username, password}, (err, users) => {
            if(err){
                next(clientError(req, err.message));
            }else{
                res.send(users)
            }
        });
    }

    async register(req, res, next){
        let {username, password} = req.body;
        userModel.find({username},async (err, user) => {
            if(err){
                next(clientError(req, err.message))
            }else{
                if(user[0]){
                    next(clientError(req, '用户已存在'))
                }else{
                    const result = await userModel.create({username, password});
                    if(result){
                        res.send(result);
                    }else{
                        next(clientError(req, '创建失败'));
                    }
                }
            }
        })
    }
}
export default new User();