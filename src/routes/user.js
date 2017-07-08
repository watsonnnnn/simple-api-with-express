/**
 * Created by Administrator on 2017/7/8.
 */
import express from 'express';
const router = express.Router();

import User from '../controller/user';

router.post('/login', User.login())