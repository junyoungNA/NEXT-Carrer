import NextAuth, {NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import KakaoProvider from "next-auth/providers/kakao";
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from '../../../util/prismadb';
import bcrypt from 'bcryptjs';

// prismadb.ts 에서 공통으로 생성해서 가져오기
// const prisma = new PrismaClient();

export const authOptions :NextAuthOptions =  {
    adapter: PrismaAdapter(prisma),
    providers: [
        KakaoProvider({
            clientId: process.env.KAKAO_CLIENT_ID!,
            clientSecret: process.env.KAKAO_CLIENT_SECRET!,
        }),
        CredentialsProvider({
        // The name to display on the sign in form (e.g. 'Sign in with...')
        name: 'Credentials',
        // The credentials is used to generate a suitable form on the sign in page.
        // You can specify whatever fields you are expecting to be submitted.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
            email: { label: "Email", type: "text"},
            password: { label: "Password", type: "password" }
        },
        
        async authorize(credentials, req) {    
                if(!credentials?.email || !credentials?.password ) {
                    throw new Error('Invaild credentials')
                }
            
                const user = await prisma.user.findUnique({
                    where : {
                        email: credentials.email
                    }
                })
                if (!user || !user?.hashedPassword) {
                    //hashedpassword가 없으면 oauth로그인한 유저
                    throw new Error('Invalid credentials');
                }
        
            //user의 hasedPassword와 지금 입력한 password와 비교
                    const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                )

                if(!isCorrectPassword) {
                    throw new Error('Invalid credentials');
                }
                return user;
            }
        })
    ],
    session: {
        strategy : 'jwt',
    },
    jwt : {
        secret : process.env.JWT_SECRET,
        maxAge : 30 * 24 * 60 * 60 //30일
    },
    pages: {
        signIn:'/auth/login'
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            // console.log(account, 'signaccount');
            // console.log(profile, 'signprofile');
            if(account?.type === 'oauth') {
                delete account.refresh_token_expires_in;
                user.hashedPassword = await bcrypt.hash(user.id, 12);
                console.log('바뀜 account', account);
            }
            return true
        },
        async jwt({token, user, session} ){
            return {...token, ...user}
        },
        //만든 jwt함수에서 token, user가 session함수에서 받게됨!
        async session({session, user, token}) {
            // console.log('sessionsession',session)
            // console.log('sessiontoken',token)
            // session.user = token;
             // Send properties to the client, like an access_token and user id from a provider.
            return session;
        }
    }
};


export default NextAuth(authOptions);