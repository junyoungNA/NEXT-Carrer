import Carousel from "../components/Carousel";
import PostAddBox from "../components/PostAddBox";
import getCommunities, { CommunityParams } from "../actions/getCommunity";
import getCurrentUser from "../actions/getCurrentUser";
import Container from "../components/Container";
import CommunityCard from "../components/CommunityCard";
import EmptyState from "../components/EmptyState";
import FloatingBtn from "../components/FloatingBtn";

const CaroulselIMG = [
  {img :'/images/wanted.webp',title : '라이프스타일 커머스의 새로운 기준', text : '뷰티셀렉션에서 전 직군 채용 중!'},
  {img :'/images/wanted2.webp',title : '요즘 뜨는 로봇 산업 추천 공고', text : '로봇과 함께 하는 조화로운 미래 세상'},
  {img :'/images/wanted4.webp',title : '이번주 신규 포지션', text : '눈여겨볼 이번 주 채용공고를 소개합니다.'},
]

interface HomeProps  {
    searchParams : CommunityParams
}

const Home = async ({searchParams} : HomeProps) =>  {
  const communities = await getCommunities(searchParams);
  const currentUser = await getCurrentUser();
  return (
    // <SWRConfig value={{fetcher}}>
      <main className="mt-10 hide-scrollbar">
        {/* 캐러셀 */}
        <section>
          <Carousel images={CaroulselIMG}></Carousel>
        </section>
        <Container>
          {/* upload박스 */}
          <section className='w-[1024px] mx-auto my-10'>
            <PostAddBox />
          </section>
          {/* 커뮤니티 */}
          <section>
            {
              communities?.data.length === 0
                ?
                <EmptyState 
                  title='작성된 커뮤니티가 없습니다.'
                  subTitle="지금 커뮤니티를 작성해보세요"/>
                :
                  <div className="grid grid-cols-1 pt-12 gap-14 sm:grid-cols-2 md:grid-cols-4 lg:-grid-col-5 2xl-grid-cols-6">
                    {communities.data.map((community) => 
                      <CommunityCard 
                        currentUser={currentUser}
                        key ={community.id}
                        community={community}
                      />
                    )}
                  </div>
            }
            <FloatingBtn href='/'> + </FloatingBtn>
          </section>
        </Container>
        
      </main>
    // </SWRConfig>
    
  )
}


export default Home;