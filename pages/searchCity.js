import React from 'react'
import { useRouter } from "next/router";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
function searchCity() {
    const router = useRouter();
    router.query; //object
    // Es6 destructuring
    const { location} = router.query;
    
  return (
    <div>
    <Header placeholder={`${location}`} />
    <main className="flex">
      <section className="flex-grow pt-14 px-6">
        <p className="text-sm">
          3000+ stays in {location}
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
        <div className='h-[40vh] w-full text-center text-xl flex items-center justify-center text-red-400'>
            <h1 className='font-bold'>We're still working here. But try our search - it works perfectly😄</h1> </div>
      </section>
      

    </main>
    <Footer />
  </div>
  )
}

export default searchCity