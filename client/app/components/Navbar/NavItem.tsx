import React from 'react'
import Link from 'next/link'
import {useSession, signIn, signOut} from 'next-auth/react';
import { useRouter } from 'next/navigation';

const NavItem:React.FC<{}> = () => {
    const router = useRouter();
    const {data: session, status} = useSession();
    return (
        <div className='grid grid-cols-[500px_1fr] place-items-end mx-auto text-sm'>
            <ul className='flex items-center pl-8 mx-auto'>
                <li> 
                    <Link 
                        href={'/companyList'} 
                        className="w-20 px-2 text-center h-7">
                            기업
                    </Link>
                    <Link 
                        href={'/user'} 
                        className="w-20 px-2 text-center h-7">
                            유저
                    </Link>
                    <Link 
                        href={'/admin'} 
                        className="w-20 px-2 text-center h-7">
                            어드민
                    </Link>
                </li>
            </ul>
            <ul className='flex items-center justify-end gap-5'>
                
                {session?.user
                    ?
                    <li className='w-20 px-2 pt-1 text-center text-blue-500 border border-blue-500 rounded-lg'>
                    <button 
                        onClick={() => signOut()}>
                        로그아웃
                    </button>
                </li>
                :
                <li className="w-20 px-2 pt-1 text-center text-blue-500 border border-blue-500 rounded-sm "> 
                    <button
                        onClick={() => router.push('/login') }
                    >
                        로그인
                    </button>
                </li> 
                }
                <li className="w-20 px-2 pt-1 text-center text-white bg-gray-400 rounded">
                    <Link
                    href="/register"
                    >
                        회원가입
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default NavItem
