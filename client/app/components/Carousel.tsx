'use client'
import Image from 'next/image';
import React from 'react'

type Props = {
  images : string[];
} 

const Carousel: React.FC<Props> = ({images}) => {
  console.log(images, 'images');
  // useEffect(() => {
  //   if (carouselRef.current !== null) {
  //     carouselRef.current.style.transform = `translateX(-${currIndex}00%)`
  //   }
  // }, [currIndex])
    return (
      <div className='w-full border-2 border-black' >
        <div className='relative'>
          <button>left</button>
          <button>right</button>
          <ul className='flex mx-20 transition-all duration-1000 ease-in-out transform translate-x-0 border-2 border-blue-900 h-80'> 
            {images?.map((img , id) => {
              return <li key={id} className='w-full'>
                <Image src={img} alt='캐러셀 이미지' width={1000} height={1000} className='object-cover w-full h-full'/>
              </li>
            })}
          </ul>
        </div>
      </div>
    )
}

export default Carousel;