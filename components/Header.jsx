import React, { useState } from "react";
import Image from "next/image";
import {
  MagnifyingGlassIcon,
  UserIcon,
  GlobeAltIcon,
  Bars2Icon,
} from "@heroicons/react/24/solid";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { useRouter } from "next/router";

function Header({ placeholder }) {
  const [searchInput, setSearchInput] = useState("");
  const [startDate, setStartDay] = useState(new Date());
  const [endDate, setEndDay] = useState(new Date());
  const [noOfGuests, setNoOfGuests] = useState(1);
  const router = useRouter();

  const selectionRange = {
    startDate: startDate,
    endDate,
    key: "selection",
  };

  const handleSelect = (ranges) => {
    console.log(ranges);
    setStartDay(ranges.selection.startDate);
    setEndDay(ranges.selection.endDate);
  };

  const resetInput = () => {
    setSearchInput("");
  };

  const search = () => {
    router.push({
      pathname: "/search",
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        noOfGuests,
      },
    });
    setSearchInput("");
  };
  return (
    <header className="sticky t-0 z-50 grid grid-cols-3 bg-white shadow-md px-5 md:px-10 py-5">
      {/* left */}
      <div
        className="relative flex justify-center md:h-10 h-8 cursor-pointer my-auto"
        onClick={() => router.push("/")}
      >
        <Image
          fill
          src="/logo.png"
          className="object-contain object-left flex "
        />
        {/* <Image
          fill
          src="/logo-sm.png"
          className="object-contain object-left sm:hidden flex"
        /> */}
      </div>
      {/* middle - SEARCH */}
      <div className="flex flex-row items-center md:border-2 rounded-full py-2 shadow-sm">
        <input
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
          type="text"
          placeholder={placeholder || "Search everywhere"}
          className=" outline-none pl-5 bg-transparent flex-grow text-gray-600"
        />

        <MagnifyingGlassIcon className="h-8  hidden md:inline-flex bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2" />
      </div>

      {/* right */}
      <div className="flex items-center space-x-6 justify-end text-gray-500">
        <p className="hidden md:inline cursor-pointer">Become a host</p>
        <GlobeAltIcon className="h-6 cursor-pointer hover:bg-slate-400 rounded-full" />
        <div className="flex space-x-3 items-center border-2 p-2 rounded-full hover:shadow-md">
          <Bars2Icon className="h-6" />
          <UserIcon className="h-6" />
        </div>
      </div>
      {searchInput && (
        <div className="flex flex-col col-span-3 mx-auto">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={["#FD5B61"]}
            onChange={handleSelect}
          />
          <div className="flex items-center border-b">
            <h2 className="text-2xl flex-grow font-semibold">
              Number of guests
            </h2>
            <UserIcon className="h-5" />
            <input
              type="number"
              value={noOfGuests}
              onChange={(e) => setNoOfGuests(e.target.value)}
              min={1}
              className="w-12 pl-2 text-lg outline-none text-red-400"
            />
          </div>
          <div className="flex">
            <button className="flex-grow text-gray-500" onClick={resetInput}>
              Cancel
            </button>
            <button className="flex-grow text-red-400" onClick={search}>
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
