import Carousel from "./components/Carousel";
import { SWRConfig } from 'swr';
import axios from './util/api/axios';

const CaroulselIMG = [
  {img :'/images/wanted.webp',title : '라이프스타일 커머스의 새로운 기준', text : '뷰티셀렉션에서 전 직군 채용 중!'},
  {img :'/images/wanted2.webp',title : '요즘 뜨는 로봇 산업 추천 공고', text : '로봇과 함께 하는 조화로운 미래 세상'},
  {img :'/images/wanted4.webp',title : '이번주 신규 포지션', text : '눈여겨볼 이번 주 채용공고를 소개합니다.'},
]


const fetcher = async (url: string) => {
  try {
      const res = await axios.get(url);
      return res.data
  } catch(error: any) {
      throw error.response.data;
  }
}

const Home = () =>  {
  return (
    // <SWRConfig value={{fetcher}}>
      <main className="mt-10 hide-scrollbar">
        <section>
          <Carousel images={CaroulselIMG}></Carousel>
        </section>
      </main>
    // </SWRConfig>
    
  )
}


export default Home;