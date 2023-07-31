import {Request, Response,Router ,NextFunction} from 'express';
import dotenv from 'dotenv';
import jwt  from 'jsonwebtoken';
import { User } from '../entities/User';

dotenv.config();

export default async(req: Request , res : Response, next : NextFunction) => {
    try {      
        console.log(req,'req');
        const token = req.cookies.token; //클라이언트에서 받은 토큰 req에 들어서옴!
        if(!token) return next();
        // unsername 을 가져옴
        const {username} : any = jwt.verify(token, process.env.JWT_SECRET);
        //데이터베이스에 user가 있는지 확인
        const user = await User.findOneBy({username})
        //유저가 없다면 에러 처리
        if(!user) throw new Error ('Unauthenticated');

        //유저 정보를 res.local.user에 넣어주기
        res.locals.user = user;
        return next();
    } catch(error) {
        console.log(error);
        return res.status(400).json({error:'Something went wrong'})
    }
}