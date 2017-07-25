/**
 * Created by Administrator on 2017/7/8.
 */
import mongoose from 'mongoose';
import path from 'path';
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {type: String, default: '/images/default.jpg'}
    // _userId: Schema.Types.ObjectId
    // _userId: {type: Schema.Types.ObjectId, default: new mongoose.Types.ObjectId}
})
const userModel = mongoose.model('blogusers', userSchema);

export default userModel;