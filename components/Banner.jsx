import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

function Banner() {
  const router = useRouter();
  return (
    <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] mb-10 top-4">
      <Image src="/banner.jpg" fill className="object-cover object-center" />
      <div className="absolute flex flex-col w-full h-full justify-center items-center text-white">
        <p className="text-[1.2rem] sm:text-3xl pb-3 font-semibold">
          Not sure where to go? Perfect
        </p>
        <button className=" text-pink-500 bg-white px-4 md:px-10 py-2 md:py-4 rounded-full shadow-md font-bold my-3 hover:shadow-xl active:scale-90 transition duration-150 ">
          I'm flexible
        </button>
      </div>
    </div>
  );
}

export default Banner;
