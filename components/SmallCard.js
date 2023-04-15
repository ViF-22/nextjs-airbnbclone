import React, { useState } from "react";
import { useRouter } from "next/router";


function SmallCard({ img, location, distance }) {
  // const [loc, setLoc] = useState("");
  const router = useRouter()

  const search = () => {
    router.push({
      pathname: "/searchCity",
      query: {
        location: location,
      },
    });
  };
  return (
    <div className="flex items-center m-2 mt-5 space-x-4 rounded-xl cursor-pointer hover:bg-gray-100 hover:scale-105 transition transform duration-200 ease-out" onClick={search}>
      <div className="relative h-16 w-16 ">
        <img src={img} className="object-contain rounded-lg" />
      </div>

      <div>
        <div>{location}</div>
        <div>{distance}</div>
      </div>
    </div>
  );
}

export default SmallCard;
