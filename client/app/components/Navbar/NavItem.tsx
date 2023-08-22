import React from 'react'
import Link from 'next/link'
import { signIn, signOut} from 'next-auth/react';
import { User } from '@prisma/client';
import {GrUserManager} from 'react-icons/gr'


interface NavItemProps {
    currentUser ? : User | null;
}


const NavItem:React.FC<NavItemProps> = ({currentUser}) => {
    console.log(currentUser, 'currentUser');
    return (
        <div className='grid grid-cols-[500px_1fr] place-items-end mx-auto text-sm'>
            <ul className='flex items-center mx-auto font-bold'>
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
                
                {currentUser
                    ?
                    <>
                        <li className='w-20 px-2 pt-1 text-center text-blue-500 '>
                            <button 
                                onClick={() => signOut()}>
                                로그아웃
                            </button>
                        </li>
                        <li>
                            <GrUserManager  className='border border-black rounded-full cursor-pointer h-7 w-7'/>
                        </li>
                    </>
                    
                :
                    <li className="px-2 pt-1 font-bold text-center text-blue-500"> 
                        <button
                            onClick={() => signIn() }
                        >
                            로그인 / 회원가입
                        </button>
                    </li> 
                }
            </ul>
        </div>
    )
}

export default NavItem
