/**
 * Created by Administrator on 2017/7/8.
 */
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: String,
    password: String
})
const userModel = mongoose.model('blogusers', userSchema);

export default userModel;