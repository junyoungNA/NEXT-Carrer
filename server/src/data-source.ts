//tpyeorm을 사용하기 위한 설정파일 npx typeorm init

import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "postgres",  //postgres를 사용하므로
    host: "localhost", //개발 환경 
    port: 5432,  //포트번호
    username: "postgres",
    password: "password",
    database: "postgres", //데이터 베이스 이름
    synchronize: true,  //서버를 실행할때마다 컬럼이나 테이블의 변경을 맞춰주는 설정
    // 개발환경에서는 true로 해주지만, 운영환경(product)에서는 false로 해줘야함
    logging: false, //실행,변경,명령 기록을 남김
    entities: ["src/entities/**/*.ts"], //폴더안에 어떤 entity파일을 참고할지에 대한 경로
    migrations: [],
    subscribers: [],
})
