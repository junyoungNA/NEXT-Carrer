import prisma from '@/util/prismadb';
import { NextResponse } from 'next/server';
import getCurrentUser from '@/app/actions/getCurrentUser';

interface IParams {
    communityId ? : string;
}

export async function POST(request : Request, {params} : {params : IParams} ) {
    const currentUser = await getCurrentUser();
    console.log(params,currentUser);
    if(!currentUser) {
        return NextResponse.error();
    }
    
    const {communityId} = params; 
    
    if(!communityId || typeof communityId !== 'string') {
            throw new Error('Invalid ID');
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])];
    //좋아요를 눌렀다면 기존에 있던 배열을 아니라면 새배열을 넣어줘야한다
    favoriteIds.push(communityId);

    const user = await prisma?.user.update({
        where : {
            id : currentUser.id
        }, 
        data : {
            favoriteIds : favoriteIds,
        }
    })
    return NextResponse.json(user);
}


export async function DELETE(request : Request, {params} : {params : IParams} ) {

    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return NextResponse.error();
    }
    
    const {communityId} = params; 
    
    if(!communityId || typeof communityId !== 'string') {
            throw new Error('Invalid ID');
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])];
    favoriteIds = favoriteIds.filter((id) => id !== communityId);
    //좋아요를 취소했으므로 해당 게시물을 제외한 좋아요들 가져오기

    const user = await prisma?.user.update({
        where : {
            id : currentUser.id
        }, 
        data : {
            favoriteIds : favoriteIds,
        }
    })
    return NextResponse.json(user);
}