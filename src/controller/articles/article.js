/**
 * Created by Administrator on 2017/7/18.
 */
import articleModel from '../../models/article';
import jwt from 'jsonwebtoken';
class Article{
    async getArticles(req, res, next){
        let _user = jwt.verify(req.header('token'), 'secret').data;
        try {
            if (!_user) {
                next(req, '尚未登录');
            } else {
                const docs = await articleModel.find().populate('author comments.author','username password -_id').exec();
                res.send(docs);
            }
        }catch (e){
            next(clientError(req, e.message));
        }
    }
    async getArticleById(req, res, next){
        let _id = req.params.id;
        try{
            let doc = await articleModel.findByIdAndUpdate(_id, {$inc: {readTimes: 1}});
            res.send(doc);
        }catch (e){
            console.log(e.message)
            next(clientError(req, '查看失败'))
        }
    }
    writeArticle(req, res, next){
        let {title, content, summary} = req.body;
        if(!title){
            next(clientError(req, '标题必填'));
            return false;
        }
        if(!summary){
            next(clientError(req, '简介必填'));
            return false;
        }
        if(!content){
            next(clientError(req, '内容必填'));
            return false;
        }
        let _user = jwt.verify(req.header('token'), 'secret').data;
        let article = {title, summary, content, author: _user};
        articleModel.create(article, (err, docs) => {
            if(err){
                next(clientError(req, err.message));
            }else{
                res.send(clientMsg(true, '添加成功'));
            }
        });

    }
    async updateArticle(req, res, next){
        let {id, title, summary, content} = req.body;
        if(!id){
            next(clientError(req, '缺少id'));
            return false;
        }
        let p = {};
        title && (p.title = title);
        summary && (p.summary = summary);
        content && (p.content = content);
        try {
            const result = await articleModel.findOneAndUpdate({_id: id}, {...p, updateTime: Date.now()});
            if(!result){
                throw new Error('文章不存在');
            }
            res.send(clientMsg(true, '更新成功'));
        }catch (e){
            next(clientError(req, e.message));
        }
    }
    async deleteArticleById(req, res, next){
        let {id} = req.body;
        try {
            const result = await articleModel.findOneAndRemove ({_id: id});
            if(!result){
                throw new Error('文章不存在');
            }
            res.send(clientMsg(true, '删除成功'));
        }catch (e){
            next(clientError(req, e.message));
        }
    }

    //新增文章评论并插入
    async updateArticleComment(req, res, next){
        let articleId = req.params.id;
        let _user = jwt.verify(req.header('token'), 'secret').data;
        try {
            if(!req.body.content){
                throw new Error('评论内容不能为空');
            }
            // result是find的结果
            const result = await articleModel.findOneAndUpdate ({_id: articleId}, {$push: {comments: {content: req.body.content, author: _user}}, $set: {title: 'test title'}});
            // console.log(result)
            if(!result){
                throw new Error('文章不存在')
            }
            res.send(clientMsg(true, "评论成功！"));
        }catch (e){
            console.log(e.message)
            next(clientError(req, e.message));
        }
    }
}
export default new Article();