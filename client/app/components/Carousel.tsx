'use client'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
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

  const [current, setCurrent] = useState(0);

  const moveStyle: { [key: number]: string } = {
    0: 'translate-x-0',
    1: 'translate-x-[-55vw]',
    2: 'translate-x-[-110vw]',
    3: 'translate-x-[-3000vw]',
    4: 'translate-x-[-4000vw]',
    5: 'translate-x-[-5000vw]',
    6: 'translate-x-[-600vw]',
    7: 'translate-x-[-700vw]',
    8: 'translate-x-[-800vw]',
    9: 'translate-x-[-900vw]',
    10: 'translate-x-[-1000vw]',
  };

//다음 버튼을 누르면 current를 1 증가시킴, 만약 현재 마지막 사진이면 첫번째 사진으로 가도록 0 return
  const nextHandler = () => {
    setCurrent(() => {
      if (current === images.length - 1) {
        return 0;
      } else {
        return current + 1;
      }
    });
  };

  //이전 버튼을 누르면 current를 1 감소시킴, 만약 현재 첫번째 사진이면 마지막 사진으로 가도록 마지막사진 인덱스 return
  const prevHandler = () => {
    setCurrent(() => {
      if (current === 0) {
        return images.length - 1;
      } else {
        return current - 1;
      }
    });
  };

  //자동으로 캐러셀 움직이게 2초마다 nextHandler를 호출
  // useEffect(() => {
  //   const timeId = setTimeout(() => nextHandler(),5000);
  //   return () => {
  //     //클린업으로 setTimeout 이벤트 삭제
  //     clearTimeout(timeId);
  //   }
  // }, [current])

    return (
      <div className="relative h-5/6">
        {/*사진 넘기는 버튼*/}
        <SvgIcon onClick={prevHandler} component={ArrowLeftIcon} inheritViewBox  style={{fontSize:'55px'}} className='absolute transform -translate-y-1/2 cursor-pointer top-1/2 '/>
        <SvgIcon onClick={nextHandler} component={ArrowRightIcon} inheritViewBox  style={{fontSize:'55px'}}  className='absolute right-0 transform -translate-y-1/2 cursor-pointer top-1/2'/>
        <div className='absolute transform -translate-x-1/2 left-1/2'>
          <div
            className={`flex ${moveStyle[current]} transition duration-300 ease-in-out `}>
            {images.map((image , id) => (
              <div key={id} className="flex justify-center m-auto w-[1000px] mx-4 border-2 border-black h-96  rounded">
                <img src={image.img} className="border-2 object-conain"/>
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
                idx === current ? 'opacity-100' : 'opacity-50'
              }`}
              onClick={() => setCurrent(idx)}
            />
          ))}
        </ul>
      </div>
    )
}

export default Carousel;