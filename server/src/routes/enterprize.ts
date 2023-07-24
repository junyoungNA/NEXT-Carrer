import {Request, Response,Router ,NextFunction} from 'express';
import dotenv from 'dotenv';
import { User } from '../entities/User';
import userMiddleware from '../middlewares/user';
import authMiddleware from '../middlewares/auth';
import { isEmpty } from 'class-validator';
import { AppDataSource } from '../data-source';
import Sub from '../entities/Sub';
import Post from '../entities/Post';
import Enterprise from '../entities/Enterprise';

import multer, { FileFilterCallback } from 'multer';
import { makeId } from '../utilis/helpers';
import path from 'path';
import { unlinkSync } from 'fs';

dotenv.config();

const createEnterprize = async(req: Request , res : Response, next : NextFunction) => {
    const {name, imageUrn, title, enterprise, carrer, salary, service,  mainwork, qualificate, etc, welfare,  place, endDate, preferential, description} = req.body;
    try {
        let errors : any = {};
        if(isEmpty(name)) errors.name = '이름은 비워둘 수 없습니다.';
        if(isEmpty(title)) errors.title = '제목은 비워둘 수 없습니다.';

        // Enterprise 엔티티에 대한 리포지토리(Repository)를 얻는 부분.
        const sub = await AppDataSource.getRepository(Enterprise)
        .createQueryBuilder('enterprise') //쿼리 빌더 생성
        .where('lower(enterprise.enterprise)= :enterprise', {enterprise:enterprise.toLowerCase()})
        .getOne();
        if(sub) errors.name = '기업공고가 이미 존재합니다.';
        if(Object.keys(errors).length > 0) {
            throw errors;
        }
        
    } catch(error) {
        console.log(error);
        return res.status(500).json({error});
    }

    try {
        const user : User = res.locals.user;
        const sub = new Sub();
        sub.name = name;
        sub.description = description;
        sub.title = title;
        sub.user = user;

        await sub.save();
        return res.json(sub);
    }catch(error) {
        console.log(error);
        return res.status(500).json({error});
    }
}

const getSub = async (req : Request, res : Response)  => {
    const name = req.params.name;
    try {
        const sub = await Sub.findOneByOrFail({ name });
        //포스트를 생성한 후에 해당 sub에 속하는 포스트 정보들을 넣어주기
        const posts = await Post.find({
            where:{subName : sub.name},
            order:{createdAt: 'DESC'},
            relations:['comments', 'votes']
        });
        sub.posts = posts;
        if(res.locals.user) {
            sub.posts.forEach((p) => p.setUserVote(res.locals.user));
        }
        console.log('sub', sub);
        return res.json(sub);
    } catch(error) {
        return res.status(404).json({error:'커뮤니티를 찾을 수 없습니다.'});
    }
}   

//해당파일이 이미지가 맞는지 맞다면 public/image폴더에 저장
const upload = multer({
    storage : multer.diskStorage({
        destination:"public/images",
        filename:(_,file,callback) => {
            const name = makeId(10);
            callback(null, name + path.extname(file.originalname))
        }   
    }),
    fileFilter : (_, file: any, callback:FileFilterCallback) => {
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            callback(null, true);
        } else {
            callback(new Error('이미지가 아닙니다.'))
        }
    }
});

//또는 파일유형이 잘못되었다면 public폴더에 저장한 이미지 삭제  
//새로운 이미지 데이터베이스 저장
const uploadEnterprizeIMG = async (req : Request, res : Response) => {
    const enterprise:Enterprise = res.locals.enterprise;
    try {
        
        let oldImageUrn:string = '';
        if(type === 'image') {
            //사용중인 Urn을 저장 (이전 파일을 아래에서 삭제)
            oldImageUrn = sub.imageUrn || '',
            //새로운 파일 이름을 urn으로 넣어줍니다.

            sub.imageUrn = req.file?.filename || '';
        } else if(type === 'banner'){
            oldImageUrn = sub.bannerUrn || '';
            sub.bannerUrn = req.file?.filename || '';
        }
        // await enterprise.save();

    } catch(error) {
        console.log(error);
        return res.status(500).json({error:'문제가 발생했습니다.'})
    }
}

const router = Router();
router.get('/:name', userMiddleware, authMiddleware, getSub);
router.post('/', createEnterprize);
export default router;