/**
 * Created by Administrator on 2017/7/8.
 */

import {userModel} from '../../models';

class User {
    constructor(){
        this.login = this.login.bind(this)
    }
    login(req, res, next) {
        console.log(req.body)
        let {username, password} = req.body;
        userModel.find({username, password}, (err, users) => {
            if(err){
                next(err);
            }else {
                res.status(200).send(users);
            }
        })
    }
}
export default new User();