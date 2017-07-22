/**
 * Created by Administrator on 2017/7/18.
 */
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const articleSchema = new Schema({
    createTime: {type: Date, default: Date.now()},
    updateTime: {type: Date, default: Date.now()},
    title: String,
    content: String,
    summary: String,
    readTimes: {type: Number, default: 0},
    author: {type: Schema.Types.ObjectId, ref: 'blogusers'},//ref会用这个值去关联blogusers的_id
    // comments: [{type: Schema.Types.ObjectId, ref: 'comment'}]
    comments: [{content: String, author: {type: Schema.ObjectId, ref: 'blogusers'}, createTime: {type: Date, default: Date.now()}}]
});
const articleModel = mongoose.model('article', articleSchema);

export default articleModel;