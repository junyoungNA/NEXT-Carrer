import React from 'react'
import Link from 'next/link'
import {useSession, signIn, signOut} from 'next-auth/react';

const NavItem:React.FC<{}> = () => {
    const {data: session, status} = useSession();
    return (
        <div className='grid grid-cols-[200px_1fr] gap-44 mx-auto place-items-end text-sm'>
            <ul className='flex'>
                <li> 
                    <Link 
                        href={'/companyList'} 
                        className="w-20 px-2 mr-2 text-center h-7">
                            기업
                    </Link>
                    <Link 
                        href={'/user'} 
                        className="w-20 px-2 mr-2 text-center h-7">
                            유저
                    </Link>
                    <Link 
                        href={'/admin'} 
                        className="w-20 px-2 mr-2 text-center h-7">
                            어드민
                    </Link>
                </li>
            </ul>
            <ul className='flex items-center gap-3'>
                
                {session?.user
                    ?
                    <li className='w-20 px-2 pt-1 text-center text-blue-500 border border-blue-500 ronded h-7'>
                    <button 
                        onClick={() => signOut()}>
                        로그아웃
                    </button>
                </li>
                :
                <li className="w-20 px-2 pt-1 text-center text-blue-500 border border-blue-500 ronded h-7"> 
                    <button
                        onClick={() => signIn()}
                    >
                        로그인
                    </button>
                </li> 
                }
                <li className="w-20 px-2 pt-1 text-center text-white bg-gray-400 rounded h-7">
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
