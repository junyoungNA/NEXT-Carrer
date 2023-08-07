import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const PostAdd : React.FC<{}> = () => {
    return (
        <div className='w-[650px] flex mx-8 h-14 justify-center items-center '>
            <Image src={'/images/noimage.png'} alt='유저 이미지' width={60} height={30} className='border-2 border-blue-950 aspect-square object-cover rounded-full w-10 h-10 '/>
            <Link href='/post' className='border-2 rounded-xl flex items-center pl-4 border-gray-500 w-full h-12' >나누고 싶은 생각이 있으신가요?</Link>
        </div>
    )
}

export default PostAdd
