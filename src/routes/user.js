/**
 * Created by Administrator on 2017/7/8.
 */
import express from 'express';
const router = express.Router();

import User from '../controller/user';

router.post('/login', User.login);
router.post('/register', User.register);
router.get('/articles', User.getUserArticles);
router.post('/upload', User.upload(), User.uploadLater);

export default router;