import prisma from '@/util/prismadb';
import { NextResponse } from 'next/server';
import getCurrentUser from '@/app/actions/getCurrentUser';

export async function POST(request : Request) {

    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return NextResponse.error();
    }
    
    const body = await request.json();
    const {
        title,
        description,
        imageSrc,
        category,
    } = body;

    Object.keys(body).forEach((value) => {
        //받아온 body값의 하나라도 값이 없다면 에러
        if(!body[value]) {
            return NextResponse.error();
        }
    })

    const community = await prisma.community.create({
        data : {
            title,
            description,
            imageSrc,
            category,
            userId : currentUser.id,
        }
    })

    return NextResponse.json(community) ;
}