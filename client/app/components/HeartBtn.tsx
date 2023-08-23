import { User } from '@prisma/client';
import React from 'react'
import {AiOutlineHeart, AiFillHeart} from 'react-icons/ai'
import useFavorite from '../hooks/useFavorite';

interface HaertButtonProps {
    communityId : string;
    currentUser ? : User | null;
}

const HeartBtn = ({
    communityId ,
    currentUser
}: HaertButtonProps) => {
    const {hasFavorite, toggleFavorite} = useFavorite({
        communityId,
        currentUser,
    })
    console.log(hasFavorite, 'favorites');
    return (
        <div
            onClick={toggleFavorite}
            className='relative transition cursor-pointer hover:opacity-80'>
            <AiOutlineHeart
                size={24}
                className='absolute fill-gray-300' 
            />
            <AiFillHeart
                size={24}
                className={hasFavorite ? 'fill-rose-500' : 'fill-neutral-500'}
            />
        </div>
    )
}

export default HeartBtn
