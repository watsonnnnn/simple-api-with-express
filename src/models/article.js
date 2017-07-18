/**
 * Created by Administrator on 2017/7/18.
 */
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const articleSchema = new Schema({
    createTime: {type: Date, default: Date.now()},
    title: String,
    content: String,
    summary: String,
    readTimes: {type: Number, default: 0},
    author: {type: Schema.Types.ObjectId, ref: 'blogusers'},
    comments: [{type: Schema.Types.ObjectId, ref: 'comment'}]
});
const articleModel = mongoose.model('article', articleSchema);

export default articleModel;