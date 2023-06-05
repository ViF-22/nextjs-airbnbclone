import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { StarIcon } from "@heroicons/react/24/solid";

function Favorite() {
  const favs = useSelector((state) => state.fav.favItems);
  return (
    <div>
      {favs && (
        <div>
          <h2 className="text-3xl font-semibold px-6">Your favorite:</h2>{" "}
          <div className="grid xs:grid-cols-2 md:grid-cols-4 w-full px-4 gap-x-2 ">
            {favs.map((fav) => (
              <div className=" w-full  flex flex-col py-7 px-2  cursor-pointer hover:shadow-lg hover:opacity-80 transition duration-200 ease-out  shadow-md rounded-md">
                <div className="relative h-40 w-full md:h-52 md:w-full flex-shrink-0 object-cover">
                  <img
                    src={fav.img}
                    className="object-cover h-full w-full rounded-2xl"
                  />
                </div>
                <div className="flex flex-col flex-grow md:pl-5 pt-2">
                  <h4 className="text-[16px] md:text-xl">{fav.title}</h4>

                  <div className="border-b w-10 pt-2" />

                  <div className="flex justify-between pt-5">
                    <p className="flex items-center ">
                      <StarIcon className="h-5 text-red-400" />
                      {fav.star}
                    </p>

                    <div>
                      <p className="text-lg lg:text-2xl font-semibold pb-2">
                        {fav.price}
                      </p>
                      <p className="text-right font-extralight ">{fav.total}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Favorite;
