import React from 'react'
import Link from 'next/link'

const NavItem:React.FC<{}> = () => {
    return (
        <div className='grid grid-cols-[350px_1fr] gap-28 mx-auto place-items-end text-sm'>
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
                <li className='w-20 px-2 pt-1 text-center text-blue-500 border border-blue-500 ronded h-7'>
                    <button>
                        로그아웃
                    </button>
                </li>
                <li className="w-20 px-2 pt-1 text-center text-blue-500 border border-blue-500 ronded h-7"> 
                    <Link
                        href="/login"
                        
                    >
                        로그인
                    </Link>
                </li>
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
