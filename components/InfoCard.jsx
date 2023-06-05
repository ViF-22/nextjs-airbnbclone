import React, { useState } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";

function InfoCard({
  key,
  img,
  location,
  title,
  description,
  star,
  price,
  total,
  reducer,
  product,
}) {
  const [isClick, setClick] = useState(false);

  return (
    <div className="flex py-7 px-2 pr-4 border-b cursor-pointer hover:shadow-lg hover:opacity-80 transition duration-200 ease-out first:border-t">
      <div className="relative h-52 w-40 md:h-52 md:w-80 flex-shrink-0 ">
        <img src={img} className="object-cover h-full w-full rounded-2xl" />
      </div>
      <div className="flex flex-col flex-grow pl-5 ">
        <div className="flex justify-between items-start">
          <p className="text-[14px] md:text-[18px]">{location}</p>

          <HeartIcon
            className={
              isClick
                ? "h-5 mx-2 cursor-pointer hover:text-red-400 fill-red-400 text-transparent"
                : "h-5 mx-2 cursor-pointer hover:text-red-400 "
            }
            onClick={() => {
              reducer(product);
              setClick(!isClick);
            }}
          />
        </div>
        <h4 className="text-[16px] md:text-xl">{title}</h4>

        <div className="border-b w-10 pt-2" />

        <p className="pt-2 text-sm text-gray-500 flex-grow">{description}</p>

        <div className="flex justify-between pt-5">
          <p className="flex items-center ">
            <StarIcon className="h-5 text-red-400" />
            {star}
          </p>

          <div>
            <p className="text-lg lg:text-2xl font-semibold pb-2">{price}</p>
            <p className="text-right font-extralight ">{total}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoCard;
