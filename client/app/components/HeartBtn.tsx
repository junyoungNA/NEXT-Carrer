import { User } from '@prisma/client';
import React from 'react'
import {AiOutlineHeart, AiFillHeart} from 'react-icons/ai'

interface HaertButtonProps {
    communityId : string;
    currentUser ? : User | null;
}

const HeartBtn = ({
    communityId ,
    currentUser
}: HaertButtonProps) => {
    return (
        <div className='relative transition cursor-pointer hover:opacity-80'>
            <AiOutlineHeart
                size={24}
                className='fill-white absolute too-[2px] right-[2px]' 
            />
            <AiFillHeart
                size={24}
                className={'fill-rose-500  absolute too-[2px] right-[2px]'}
            />
        </div>
    )
}

export default HeartBtn
