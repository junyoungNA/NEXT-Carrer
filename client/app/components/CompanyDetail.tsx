import { Company } from '../util/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { useAuthState } from '../context/auth';
import { useRouter } from 'next/router';
import axios from 'axios';

interface ComapanyDetailProps {
    company : Company
}

const ComapanyCard = ({
    company : {
        id,
        carrer,
        enterprise ,
        etc ,
        service ,
        identifier,
        title,
        slug,
        place,
        username,
        createdAt,
        endDAte,
        updatedAt,
        imageUrl,
        imageUrn,
        mainwork,
        preferential,
        qualificate, 
        welfare, 
    },
} : ComapanyDetailProps) => {
    return (
        <div className='flex mb-4 bg-white rounded'
        id={identifier}
        >
            {/* 포스트 데이터 부분 */}
            <div className='w-full p-2'>
                <div className='flex items-center'>
                    <div className='flex items-center'>
                        <Link href={`/r/`}>
                            <Image src={imageUrl} alt='sub' className='rounded-full cursor-pointer' width={12} height={12}/>
                        </Link>
                        <Link href={`/r/`} className='ml-2 text-xs font-bold cursor-pointer hover:underline'>/r/</Link>
                        <span className='mx-1 test-xs text-gray-400'>*</span>
                    </div>
                
                    <p className='text-xs text-gray-400'>
                        Posted by 
                        <Link href={`/u/${username}`} className='mx-1 hover:underline'>/u/{username}</Link>
                        <Link href={''} className='mx-1 hover:underline'></Link>
                    </p>
                </div>
                <Link href={''} className='mx-1 text-lg font-medium'> {title}</Link>
                    <p className='my-1 text-sm'> {enterprise}</p>
                <div className='flex'>  
                    <Link href={''}> 
                        <i className='mr-1 fas fa-comment-alt fa-xs'></i>
                        <span>{etc}</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ComapanyCard;