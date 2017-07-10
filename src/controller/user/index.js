/**
 * Created by Administrator on 2017/7/8.
 */

import {userModel} from '../../models';

class User {
    login(req, res, next) {
        console.log('login')
        userModel.find((err, users) => {
            console.log(users)
        })
    }
}
export default new User();