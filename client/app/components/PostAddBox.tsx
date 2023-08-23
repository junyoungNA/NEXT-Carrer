import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const PostAdd : React.FC<{}> = () => {
    return (
        <div className='w-[750px] border-2 border-gray-500  flex mx-auto h-20 pl-10 items-center '>
            <Image src={'/images/noimage.png'} alt='유저 이미지' width={60} height={30} className='object-cover w-10 h-10 border-2 rounded-full border-blue-950 aspect-square '/>
            <Link href='/community/upload' className='flex items-center w-2/3 h-12 pl-4 ml-2 border-2 border-gray-500 rounded-xl' >나누고 싶은 생각이 있으신가요?</Link>
        </div>
    )
}

export default PostAdd
