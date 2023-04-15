import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import SmallCard from "@/components/SmallCard";
import MediumCard from "@/components/MediumCard";
import LargeCard from "@/components/LargeCard";
import Footer from "@/components/Footer";
import { Splide, SplideSlide } from "@splidejs/react-splide";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ exploreData, cardData }) {
  return (
    <div>
      <Header />
      <Banner />

      <main className="max-w-7xl mx-auto px-8 sm:px-16">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5">Explore Nearby</h2>

          {/* Pull some data from server - API enpoints*/}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {exploreData?.map((item) => (
              <SmallCard
                key={item.img}
                img={item.img}
                distance={item.distance}
                location={item.location}
              />
            ))}
          </div>
        </section>

        <section className="overflow-hidden">
          <h2 className="text-4xl font-semibold py-8">Live anywhere</h2>

          <Splide
            options={{
              arrows: false,
              pagination: true,
              darg: true,
            }}
          >
            <div className="flex space-x-6 scrollbar-hide p-3 -ml-3">
              {cardData?.map((item) => (
                <SplideSlide>
                  <MediumCard
                    key={item.img}
                    img={item.img}
                    title={item.title}
                  />
                </SplideSlide>
              ))}
            </div>
          </Splide>
        </section>
        <LargeCard
          img="/largeCard.jpg"
          title="The greatest Outdoors"
          description="Wishlists curated by Airbnb"
          buttonText="Get inspired"
        />
      </main>
      <Footer />
    </div>
  );
}

//static-side rendering
export async function getStaticProps() {
  const exploreData = await fetch("https://www.jsonkeeper.com/b/4G1G").then(
    (res) => res.json()
  );

  const cardData = await fetch("https://www.jsonkeeper.com/b/VHHT").then(
    (res) => res.json()
  );
  return {
    props: { exploreData, cardData },
  };
}
