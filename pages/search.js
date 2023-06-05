import Footer from "@/components/Footer";
import Header from "@/components/Header";
import InfoCard from "@/components/InfoCard";
import { addToFav } from "@/features/favSlice";
import { format } from "date-fns";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function Search({ searchResults }) {
  const favs = useSelector((state) => state.fav.favItems);
  const dispatch = useDispatch();
  // const handleAddToFav = (product) => {
  //   dispatch(addToFav(product));
  // };

  const router = useRouter();
  router.query; //object
  // Es6 destructuring
  const { location, startDate, endDate, noOfGuests } = router.query;
  const formattedStartDate = format(new Date(startDate), "dd MMMM yyy");
  const formattedEndDate = format(new Date(endDate), "dd MMMM yyy");
  const range = `${formattedStartDate} - ${formattedEndDate}`;
  return (
    <div>
      <Header placeholder={`${location} | ${range} | ${noOfGuests} guests`} />
      <main className="flex flex-col  md:pt-[90px] pt-[80px]">
        <section className="flex-grow pt-14 px-6">
          <p className="text-sm">
            3000+ stays {range} for {noOfGuests} guests
          </p>

          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stays in {location}
          </h1>
          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            <p className="button">Cancellation flexibility</p>
            <p className="button">Type of Place</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More Filters</p>
          </div>
          <div className="flex flex-col">
            {searchResults.map((res) => (
              <InfoCard
                key={res.img}
                img={res.img}
                location={res.location}
                title={res.title}
                description={res.description}
                star={res.star}
                price={res.price}
                total={res.total}
                reducer={(res) => dispatch(addToFav(res))}
                product={res}
              />
            ))}
          </div>
        </section>
        {/* card for favorites */}
      </main>
      <Footer />
    </div>
  );
}

export default Search;

export async function getServerSideProps() {
  const searchResults = await fetch("https://www.jsonkeeper.com/b/5NPS").then(
    (res) => res.json()
  );
  return {
    props: {
      searchResults,
    },
  };
}
