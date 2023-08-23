'use client'
import { Community, User } from '@prisma/client'
import Image from 'next/image';
import React from 'react'
import { useRouter } from 'next/navigation';
import HeartBtn from './HeartBtn';


interface CommunityCard {
    currentUser : User | null;
    community : Community
}


const CommunityCard = ({currentUser, community} : CommunityCard) => {
    const router = useRouter();
    return (
        <div
            onClick={() => {router.push(`/community/${community.id}`)}}
            className='col-span-1 cursor-pointer group'>
            <div className='flex flex-col w-full gap-2'>
                <div className='relative w-full overflow-hidden aspect-square rounded-xl '>
                    <Image 
                        src={community.imageSrc}
                        fill
                        sizes='auto'
                        className='object-cover w-full h-full transition group-hover:scale-110'
                        alt='community'/>
                    <div className='absolute top-3 right-3'>
                        <HeartBtn
                            communityId={community.id}
                            currentUser = {currentUser}
                        />
                    </div>
                </div>
                <div className='text-lg font-semibold'>
                    {community.title}
                </div>
                <div className='font-light text-neutral-500'>
                    {community.category}
                </div>
                <div>
                    <div>
                        {/* {community.createdAt} */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommunityCard
