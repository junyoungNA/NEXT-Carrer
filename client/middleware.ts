import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export {default} from 'next-auth/middleware';

export async function  middleware(req: NextRequest) {
    const session = await getToken({req, secret : process.env.JWT_SECRET});
    // NEXTAUTH_SECRET을 설정하지 않은 경우 
    //  getToken에 비밀을 `secret`으로 전달해야 합니다.
    //JSON 웹 토큰을 사용하는 경우 getToken() 사용하여 JWT 암호 해독
    //검증을 직접 처리하지 않고도 JWT 콘텐츠에 액세스할 수 있습니다. 
    //서버 측에서만 사용할 수 있습니다.
    //getToken을통해 req, secret을 전달하면 session 정보를 받을 수 있다.
    const pathname =req.nextUrl.pathname;//req.nextUrl.pathname 현재 경로를알 수 있음
    //로그인된 유저만 접근 가능
    if(pathname.startsWith('/user') && !session) {
        return NextResponse.redirect(new URL('/login',req.url));
        //현재 경로가 /user로 시작하고 session이 없다면
        //로그인 /auth/login 로그인 페이지로 강제 리다이렉트
        //const url = new URL(url [, base]); new URL 사용법
    }


    //어드민 유저만 접근 가능
    //어드민 권한이 없다면 메인페이지로
    if(pathname.startsWith('/admin') && (session?.role !== 'Admin')) {
        return NextResponse.redirect(new URL('/', req.url));
    }
    
    //로그인된 유저는 로그인, 회원가입 페이지에 접근 불가
    if(pathname.startsWith('/register') && session) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    if(pathname.startsWith('/login') && session) {
        return NextResponse.redirect(new URL('/', req.url));
    }
    
    return NextResponse.next();
    //NextResponse미들웨어 체인을 계속 진행하는 NextResponse를 반환합니다.
}

// export const config = {matcher : ['/admin/:path*', '/user/:path*']} 
// matcher를 통해서 session 있는 경우에만 user와 admin경로애 접근가능
//matcher 정의된 경로에만 접근가능하도록
//env에  NEXTAUTH_SECRET 과  NEXTAUTH_URL 설정으로
// session 없을시 로그인페이지로 이동하게끔 구현
