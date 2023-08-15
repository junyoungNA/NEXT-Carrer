import React from 'react'
import Link from 'next/link'

const NavItem:React.FC<{}> = () => {
    return (
        <div className='grid grid-cols-[350px_1fr] gap-28 mx-auto place-items-end'>
            <ul className='flex'>
                <li> 
                    <Link 
                        href={'/companyList'} 
                        className="w-20 px-2 pt-1 mr-2 text-lg text-center h-7">
                            기업
                    </Link>
                    <Link 
                        href={'/companyList'} 
                        className="w-20 px-2 pt-1 mr-2 text-lg text-center h-7">
                            커뮤니티
                    </Link>
                    <Link 
                        href={'/companyList'} 
                        className="w-20 px-2 pt-1 mr-2 text-lg text-center h-7">
                            이벤트
                    </Link>
                </li>
            </ul>
            <ul className='flex'>
                <li>
                    <button 
                        className="w-20 px-2 mr-2 text-sm text-center text-white bg-gray-400 rounded h-7"
                    >
                        로그아웃
                    </button>
                </li>
                <li> 
                    <Link
                        href="/login"
                        className="w-20 px-2 pt-0.5 mr-2 text-center text-blue-500 border border-blue-500 ronded h-7"
                    >
                        로그인
                    </Link>
                </li>
                <li>
                    <Link
                    href="/register"
                    className="w-20 px-2 pt-0.5 text-center text-white bg-gray-400 rounded h-7"
                    >
                        회원가입
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default NavItem
