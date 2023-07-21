'use client'
import React, { MutableRefObject, RefObject, useEffect, useLayoutEffect, useRef, useState } from 'react'
import SvgIcon from "@mui/material/SvgIcon";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

interface CarouselItem {
  img: string;
  title: string;
  text: string;
}

type Props = {
  images : CarouselItem[]
} 

const Carousel: React.FC<Props> = ({images}) => {
  const [currIndex, setCurrIndex] = useState(0);
  const carouselRef: any = useRef<HTMLDivElement>();
  const [currList, setCurrList] = useState<CarouselItem[]>([]);

  useEffect(() => {
    if (images.length !== 0) {
      const startData = [images[0], images[1]];
      const endData = [images[images.length - 1], images[images.length - 2]];
      const newList = [...endData, ...images, ...startData];
      setCurrList(newList)
    }
  }, [images]);
  
  const moveToNthSlide = (index: number) => {
    setTimeout(() => {
      setCurrIndex(index)
      if (carouselRef.current !== null) {
        carouselRef.current.style.transition = ''
        console.log( carouselRef.current.style.transition, '초기화');
      }
    }, 200)
  }

  const handleSwipe = (direction: number) => {
    const newIndex = currIndex + direction
    console.log(newIndex,'확인');
    if (newIndex === currList.length - 3) {
      moveToNthSlide(0);
    }  
    else if (newIndex === -3) {
      console.log(newIndex,'0으로들어옴');
      moveToNthSlide(0);
    }

    setCurrIndex((prev) => prev + direction);
    
    if (carouselRef.current !== null) {
      carouselRef.current.style.transition = 'all 0.5s ease-in-out';
    }
  }

  //자동으로 캐러셀 움직이게 2초마다 nextHandler를 호출
  // useEffect(() => {
  //   const timeId = setTimeout(() => nextHandler(),5000);
  //   return () => {
  //     //클린업으로 setTimeout 이벤트 삭제
  //     clearTimeout(timeId);
  //   }
  // }, [current])

  useEffect(() => {
    if (carouselRef.current !== null) {
      carouselRef.current.style.transform = `translateX(${currIndex * -1035}px)`;
      console.log(carouselRef.current.style.transform , '현재');
    }
  }, [currIndex])

    return (
      <div className="relative h-[400px] m-auto">
        <SvgIcon  onClick={() => handleSwipe(-1)} component={ArrowLeftIcon} inheritViewBox  style={{fontSize:'55px'}} className='absolute z-10 transform -translate-y-1/2 left-[5vw] cursor-pointer top-1/2'/>
        <SvgIcon onClick={() => handleSwipe(1)}  component={ArrowRightIcon} inheritViewBox  style={{fontSize:'55px'}}  className='absolute right-[0vw] z-10 transform -translate-y-1/2 cursor-pointer top-1/2'/>
        {/*사진 넘기는 버튼*/}
        <div className='absolute -translate-x-1/2 left-1/2'>
          <div
            className={`relative flex  m-auto transition duration-300 ease-in-out `} ref={carouselRef}>
            {currList?.map((image , id) => (
              <div key={id} className="flex w-[1024px] mx-4 border-2 h-96 ">
                
                <img src={image.img} className="rounded object-conain"/>
                {/* <div className=''> 
                  <h1>{image.title}</h1>
                  <span>{image.text}</span>
                </div> */}
              </div>
            ))}
          </div>
        </div>
        {/* 하단 점, 점과 current가 같다면 투명도를 변경시켜 표시함. 클릭하면 current를 클릭한 index로 변경시킴 */}
        <ul className="absolute flex justify-center w-full gap-4 bottom-5">
          {images.map((_, idx) => (
            <li
              key={idx}
              className={`h-[1.2rem] w-[1.2rem] rounded-full bg-white ${
                idx === currIndex ? 'opacity-100' : 'opacity-50'
              }`}
              onClick={() => setCurrIndex(idx)}
            />
          ))}
        </ul>
      </div>
    )
}

export default Carousel;