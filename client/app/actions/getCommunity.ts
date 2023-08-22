import prisma from '@/util/prismadb';

export interface CommunityParams {
    category ? : string;
}

export default async function getCommunities (params : CommunityParams) {
    try {

        let query : any = {};
        const {category} = params; //쿼리 스트링에 있는 categroy 정보

        if(category) {
            query.category = category;
        }
        
        const communities = await prisma.community.findMany({
            where:query,
            orderBy: {
                createdAt: 'desc'
            }
        })
        return  {
            data : communities
        }

    } catch (error : any) {
        throw new Error(error);
    }
}