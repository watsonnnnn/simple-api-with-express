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
                const docs = await articleModel.find().populate('author','username password');
                res.send(docs);
            }
        }catch (e){
            next(clientError(req, e.message));
        }
    }
    async getArticleById(req, res, next){
        let _id = req.params.id;
        try{
            let doc = await articleModel.findById(_id)
            res.send(doc);
        }catch (e){
            next(clientError(req, e.message))
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
                next(clientError(req, err.message))
            }else{
                res.send(docs);
            }
        });

    }
    readArticle(){

    }
    editArticle(){

    }
}
export default new Article();