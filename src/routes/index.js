/**
 * Created by Administrator on 2017/7/8.
 */
import userRouter from './user';
import articleRouter from './article';

export default (app) => {
    app.use('/user', userRouter)
    app.use('/article', articleRouter)
}