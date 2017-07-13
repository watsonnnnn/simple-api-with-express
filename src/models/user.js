/**
 * Created by Administrator on 2017/7/8.
 */
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})
const userModel = mongoose.model('blogusers', userSchema);

export default userModel;