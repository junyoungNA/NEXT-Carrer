import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export  async function getSession () {
    // getServerSession에 authOptions을 인자로 주는 함수 호출
    return await getServerSession(authOptions);
}

export default async function getCurrentUser () {
    try {
        const session = await getSession();
        //위에 생성한 함수를 호출 prisma에서 user정보 session을 가져옴
        //유저의 이메일 정보 없으면 return null
        if(!session?.user?.email){
            return null;
        }
        const currentUser =  await prisma?.user.findUnique({
            where : {
                email : session.user.email
            }
        });

        if(!currentUser) {
            return null;
        }
        return currentUser;

    } catch (error) {
        return null;
    }
}