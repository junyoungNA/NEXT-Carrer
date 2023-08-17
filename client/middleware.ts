export {default} from 'next-auth/middleware';

export const config = {matcher : ['/admin/:path*', '/user/:path*']} 
//matcher 정의된 경로에만 접근가능하도록
//env에  NEXTAUTH_SECRET 과  NEXTAUTH_URL 설정으로
// session 없을시 로그인페이지로 이동하게끔 구현
