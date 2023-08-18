import { PrismaClient } from "@prisma/client";


//데이터베이스에서 데이터를 읽거나 쓸 때
//prisma 클라이언트 객체를 생성해주는 파일
declare global {
    var prisma : PrismaClient | undefined;
}


const client = globalThis.prisma || new PrismaClient()
//prisma 클라이언트 객체가 없다면 new PrismaClient() 로 새로만듬
if(process.env.NODE_ENV !=='production') globalThis.prisma = client;

export default client;