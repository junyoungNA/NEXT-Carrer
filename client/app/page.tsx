import Carousel from "./components/Carousel";

const CaroulselIMG = [
  '/images/wanted.webp',
  // '/images/wanted2.webp',
  // '/images/wanted3.webp',
]

const Home = () =>  {
  return (
    <main className="mt-20">
      <section>
        <Carousel images={CaroulselIMG}></Carousel>
      </section>
    </main>
  )
}


export default Home;