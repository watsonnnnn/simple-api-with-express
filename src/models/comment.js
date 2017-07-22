/**
 * Created by Administrator on 2017/7/18.
 */
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const commentModel = new Schema({
    createTime: {type: Date, default: Date.now()},
    author: {type: Schema.Types.ObjectId, ref: 'blogusers'},
    content: String,
    updateTime: {type: Date, default: Date.now()},
    _article: {type: Schema.Types.ObjectId, ref: 'article'}
});

export default commentModel;