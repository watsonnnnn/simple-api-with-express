/**
 * Created by Administrator on 2017/7/8.
 */
import userRouter from './user';

export default (app) => {
    app.use('/user', userRouter)
}