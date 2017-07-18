/**
 * Created by Administrator on 2017/7/18.
 */
import crypto from 'crypto';

export const cryptMD5 = (param) => {
    return crypto.createHash('md5').update(param).digest('hex');
}