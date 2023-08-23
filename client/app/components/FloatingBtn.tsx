import Link from 'next/link'
import React from 'react'

interface FloatingBtnProps  {
    children : React.ReactNode;
    href : string;
}

const FloatingBtn = ({children, href} : FloatingBtnProps) => {
    return (
        <Link href={href} className='fixed flex items-center justify-center text-white transition-colors bg-blue-400 border-transparent border-white rounded-full shadow-xl cursor-pointer bottom-5 right-5 w-14 aspect-square hover:bg-blue-500'>
            {children}
        </Link>
    )
}

export default FloatingBtn
