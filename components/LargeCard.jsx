import React from "react";
import Image from "next/image";

function LargeCard({ title, description, buttonText }) {
  return (
    <div className="relative py-16 cursor-pointer">
      <div className="relative h-96 min-w-[300px] ">
        <Image
          src="/large.jpg"
          fill
          className="object-cover objet-top sm:object-center rounded-2xl"
        />
      </div>
      <div className="absolute top-32 left-12 text-black">
        <h3 className="text-4xl mb-3 w-64">{title}</h3>
        <p>{description}</p>
        <button className="text-sm text-black bg-white px-4 py-2 rounded-lg mt-5 hover:bg-slate-300 transition duration-500 ease-out">
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default LargeCard;
