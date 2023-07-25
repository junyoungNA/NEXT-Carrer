import {Request, Response,Router ,NextFunction} from 'express';
import dotenv from 'dotenv';
import { User } from '../entities/User';
import userMiddleware from '../middlewares/user';
import authMiddleware from '../middlewares/auth';
import { isEmpty } from 'class-validator';
// import { AppDataSource } from '../data-source';
import Post from '../entities/Post';
import Enterprise from '../entities/Enterprise';

import multer, { FileFilterCallback } from 'multer';
import { makeId } from '../utilis/helpers';
import path from 'path';
// import { unlinkSync } from 'fs';

dotenv.config();

const createEnterprize = async(req: Request , res : Response, next : NextFunction) => {
    const {enterprise, imageUrn, title, carrer, salary, service,  mainwork, qualificate, etc, welfare,  place, endDate, preferential, description} = req.body;
    console.log(req.body);
    try {
        let errors : any = {};
        // if(isEmpty(enterprise)) errors.name = '기업이름은 비워둘 수 없습니다.';
        // if(isEmpty(title)) errors.title = '공고제목은 비워둘 수 없습니다.';
        // if(isEmpty(carrer)) errors.title = '권고 경력사항은 비워둘 수 없습니다.';
        // if(isEmpty(salary)) errors.title = '급여사항은 비워둘 수 없습니다.';
        // if(isEmpty(service)) errors.title = '서비스 소개 비워둘 수 없습니다.';
        // if(isEmpty(mainwork)) errors.title = '주요 업무 비워둘 수 없습니다.';
        // if(isEmpty(qualificate)) errors.title = '자격 요건 비워둘 수 없습니다.';
        // if(isEmpty(etc)) errors.title = '기타사항 비워둘 수 없습니다.';
        // if(isEmpty(welfare)) errors.title = '복지는 비워둘 수 없습니다.';
        // if(isEmpty(place)) errors.title = '근무장소는 비워둘 수 없습니다.';
        // if(isEmpty(endDate)) errors.title = '공고마감일 비워둘 수 없습니다.';
        // if(isEmpty(preferential)) errors.title = '우대사항은 비워둘 수 없습니다.';

        // Enterprise 엔티티에 대한 리포지토리(Repository)를 얻는 부분.
        // const isFind = await AppDataSource.getRepository(Enterprise)
        // .createQueryBuilder('enterprise') //쿼리 빌더 생성
        // .where('lower(enterprise.title)= :title', {title:title.toLowerCase()})
        // .getOne();
        // if(isFind) errors.name = '해당 공고제목이 이미 존재합니다.';
        if(Object.keys(errors).length > 0) {
            throw errors;
        }
        
    } catch(error) {
        console.log(error);
        return res.status(500).json({error});
    }

    try {
        const user : User = res.locals.user;
        // const sub = new Sub();
        // sub.name = name;
        // sub.description = description;
        // sub.title = title;
        // sub.user = user;

        // await sub.save();
        return res.json();
    }catch(error) {
        console.log(error);
        return res.status(500).json({error});
    }
}

//해당파일이 이미지가 맞는지 맞다면 public/image폴더에 저장
// 이미지 파일 업로드 설정
const imageFileUpload = multer({
  storage: multer.diskStorage({
    destination: 'public/images',
    filename: (_, file, callback) => {
      const name = makeId(10);
      callback(null, name + path.extname(file.originalname));
    },
  }),
  fileFilter: (_, file, callback) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      callback(null, true);
    } else {
      callback(new Error('이미지가 아닙니다.'));
    }
  },
}).single('file'); 

const router = Router();
// router.get('/:name', userMiddleware, authMiddleware, getSub);
router.post('',userMiddleware, authMiddleware, imageFileUpload ,createEnterprize);
export default router;