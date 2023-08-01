import {Request, Response,Router ,NextFunction} from 'express';
import dotenv from 'dotenv';
import { User } from '../entities/User';
import userMiddleware from '../middlewares/user';
import authMiddleware from '../middlewares/auth';
import { isEmpty } from 'class-validator';
import { AppDataSource } from '../data-source';
import Enterprise from '../entities/Enterprise';

import multer from 'multer';
import { makeId } from '../utilis/helpers';
import path from 'path';
import { unlinkSync } from 'fs';

dotenv.config();

const getPosts =  async(req: Request, res:Response) => {
  const currentPage : number = (req.query.page || 0) as number;
  const perPage : number = (req.query.count || 3) as number;

  try {
      const posts = await Enterprise.find();
      return res.json(posts);
  }catch (error) {
      console.log(error);
      return res.status(500).json({error:'문제가 발생했습니다.'})
  }
}

const createEnterprize = async(req: Request , res : Response, next : NextFunction) => {
    const {enterprise, title, carrer, service,  mainwork, qualificate, etc, welfare,  place, endDate, preferential} = req.body;
    try {
        let errors : any = {};
        if(isEmpty(req.file)) errors.image = '공고이미지를 넣어주세요';
        if(isEmpty(enterprise)) errors.enterprise = '기업이름은 비워둘 수 없습니다.';
        if(isEmpty(title)) errors.title = '공고제목은 비워둘 수 없습니다.';
        if(isEmpty(carrer)) errors.carrer = '권고 경력사항은 비워둘 수 없습니다.';
    
        if(isEmpty(service)) errors.service = '서비스 소개 비워둘 수 없습니다.';
        if(isEmpty(mainwork)) errors.mainwork = '주요 업무 비워둘 수 없습니다.';
        if(isEmpty(qualificate)) errors.qualificate = '자격 요건 비워둘 수 없습니다.';
        if(isEmpty(etc)) errors.etc = '기타사항 비워둘 수 없습니다.';
        if(isEmpty(welfare)) errors.welfare = '복지는 비워둘 수 없습니다.';
        if(isEmpty(place)) errors.place = '근무장소는 비워둘 수 없습니다.';
        if(isEmpty(endDate)) errors.endDate = '공고마감일 비워둘 수 없습니다.';
        if(isEmpty(preferential)) errors.preferential = '우대사항은 비워둘 수 없습니다.';

        // Enterprise 엔티티에 대한 리포지토리(Repository)를 얻는 부분.
        const isFind = await AppDataSource.getRepository(Enterprise)
        .createQueryBuilder('enterprise') //쿼리 빌더 생성
        .where('lower(enterprise.title)= :title', {title:title.toLowerCase()})
        .getOne();
        console.log(isFind);
        if(isFind) errors.title = '해당 공고제목이 이미 존재합니다.';
        if(Object.keys(errors).length > 0) {
          if(req.file)unlinkSync(`public/images/${req.file.filename}`);
            throw errors;
        }
        
    } catch(error) {
        console.log(error);
        return res.status(500).json(error);
    }

    try {
        const user : User = res.locals.user;
        const enterpriseData = new Enterprise();
        enterpriseData.enterprise = enterprise;
        enterpriseData.title = title;
        enterpriseData.carrer = carrer;
        enterpriseData.service = service;
        enterpriseData.mainwork = mainwork;
        enterpriseData.qualificate = qualificate;
        enterpriseData.preferential = preferential;
        enterpriseData.endDate = endDate;
        enterpriseData.place = place;
        enterpriseData.welfare = welfare;
        enterpriseData.etc = etc;
        enterpriseData.user = user;
        enterpriseData.imageUrn = req.file.filename;
        await enterpriseData.save();
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
    //imge파일 이름의 임의의 문자열넣어 생성
    filename: (_, file, callback) => {
      const name = makeId(10); //임의의 문자열 만드는 함수
      callback(null, name + path.extname(file.originalname));
    },
  }),
  //이미지 파일 확인
  fileFilter: (_, file, callback) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      callback(null, true);
    } else {
      callback(new Error('이미지가 아닙니다.'));
    }
  },
}).single('file'); 

const router = Router();
router.get("/list" , getPosts);
router.post('/create',userMiddleware, authMiddleware, imageFileUpload ,createEnterprize);
export default router;