import bcrypt from 'bcryptjs';
import prisma from '@/util/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request : Request) {
    const body = await request.json();
    const {
        email,
        name,
        password,
    } = body;

    const hashedPassword = await bcrypt.hash(password, 12);
    //bcrypt 두번 째 인자는 숫자를 넣어주어서 비밀번호 암호화 진행 (salting)
    const user = await prisma.user.create({
        data : {
            email,
            name,
            hashedPassword
        }
    })

    return NextResponse.json(user) ;
}