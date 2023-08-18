import NextAuth, {NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials"
const prisma = new PrismaClient();

export const authOption :NextAuthOptions =  {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
        // The name to display on the sign in form (e.g. 'Sign in with...')
        name: 'Credentials',
        // The credentials is used to generate a suitable form on the sign in page.
        // You can specify whatever fields you are expecting to be submitted.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
            username: { label: "Username", type: "text", placeholder: "jsmith" },
            password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
            const user = {id : '1', name:'test' ,email:'test@naver.com', role:'user'}
            // If no error and we have user data, return it
            if ( user) {
                return user
            }
            // Return null if user data could not be retrieved
            return null
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
    callbacks: {
        async jwt({token, user} ){
            return {...token, ...user}
        },
        //만든 jwt함수에서 token, user가 session함수에서 받게됨!
        async session({session, token}) {
            session.user = token;
            return session;
        }
    }
};


export default NextAuth(authOption);