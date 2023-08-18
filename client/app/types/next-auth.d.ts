import { DefaultSession } from "next-auth";

//next-auth에서 사용할 타입을 오토컴플릿으로 찾을 수 있게 설정하기!
declare module "next-auth" {
    interface Session {
        user?: {
            //Session안에 user 객체에 id, role프로퍼티를 추가,
            id? : string;
            role? : string;
        } & DefaultSession['user']
        // next-auth에서 제공해주는 defaultSession 
    }
}