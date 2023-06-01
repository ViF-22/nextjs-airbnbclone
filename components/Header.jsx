import React, { useState } from "react";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/utils/firebase";
import Link from "next/link";
import {
  MagnifyingGlassIcon,
  UserIcon,
  GlobeAltIcon,
  Bars2Icon,
} from "@heroicons/react/24/solid";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { useRouter } from "next/router";

import Log from "./Log";

function Header({ placeholder }) {
  const [searchInput, setSearchInput] = useState("");
  const [startDate, setStartDay] = useState(new Date());
  const [endDate, setEndDay] = useState(new Date());
  const [noOfGuests, setNoOfGuests] = useState(1);
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  const [toggleMenu, setToggleMenu] = useState(false);

  //modal window
  const [modalActive, setModalActive] = useState(false);

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
    <header className="absolute w-full t-0 z-50 grid grid-cols-3  shadow-md px-3 md:px-10 py-5 bg-white ">
      {/* left */}
      <div
        className="relative flex justify-center md:h-10 h-8 cursor-pointer my-auto "
        onClick={() => router.push("/")}
      >
        <Image fill src="/logo.png" className="object-contain object-left  " />
      </div>
      {/* middle - SEARCH */}
      <div className="flex flex-row items-center md:border-2 rounded-full py-2 shadow-sm">
        <input
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
          type="text"
          placeholder={placeholder || "Search everywhere"}
          className="truncate outline-none pl-5 bg-transparent flex-grow text-gray-600 overflow-hidden text-[14px] md:text-[16px]"
        />

        <MagnifyingGlassIcon className="h-8  hidden md:inline-flex bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2" />
      </div>

      {/* right */}
      <div className="flex  items-center space-x-4 justify-end text-gray-500">
        <p className="hidden md:inline cursor-pointer hover:bg-slate-100 rounded-full py-[10px] px-[12px]">
          Become a host
        </p>
        <div className="hidden md:flex py-[10px] px-[10px] rounded-full  hover:bg-slate-100">
          <GlobeAltIcon className="h-6 cursor-pointer rounded-full" />
        </div>
        {/* menu */}

        {!user && (
          <div className="relative">
            <div
              className="flex space-x-3 items-center border-2 p-2 rounded-full hover:shadow-md relative"
              onClick={() => setToggleMenu(!toggleMenu)}
            >
              <Bars2Icon className="h-6" />
              <UserIcon className="h-6" />
            </div>
            {toggleMenu && (
              <div
                className="absolute top-14 right-0 bg-white w-[150px] md:w-[200px]  py-2 border rounded-lg shadow-lg"
                onClick={() => {
                  setModalActive(true);
                }}
              >
                <p className="w-full block hover:bg-gray-100 px-4 py-2 rounded-lg font-semibold">
                  Sign up
                </p>
                <p className="w-full block hover:bg-gray-100 px-4 py-2 rounded-lg">
                  Log in
                </p>
              </div>
            )}
          </div>
        )}
        {user && (
          <div className="rounded-full h-12 w-12 shadow-md bg-gradient-to-r from-transparent to-pink-100">
            <Link href={"/dashboard"}>
              <img
                src={user.photoURL ? user.photoURL : "avatar.png"}
                alt="avatar"
                className="w-full h-full object-fill rounded-full bg-contain"
              />
              <p></p>
            </Link>
          </div>
        )}
      </div>
      {searchInput && (
        <div className="flex flex-col  mx-auto col-span-3  md:bg-gray-300/10 rounded-lg md:px-14 shadow-lg ">
          <DateRange
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={["#FD5B61"]}
            onChange={handleSelect}
            className="my-4"
          />
          <div className="pt-4">
            <div className="flex items-center border-b px-3">
              <h2 className="text-lg flex-grow font-semibold ">
                Number of guests
              </h2>
              <UserIcon className="h-5" />
              <input
                type="number"
                value={noOfGuests}
                onChange={(e) => setNoOfGuests(e.target.value)}
                min={1}
                className="w-12 pl-2 text-lg outline-none text-red-400 bg-transparent"
              />
            </div>
            <div className="flex py-4">
              <button className="flex-grow text-gray-500" onClick={resetInput}>
                Cancel
              </button>
              <button className="flex-grow text-red-400" onClick={search}>
                Search
              </button>
            </div>
          </div>
        </div>
      )}
      <Log
        active={modalActive}
        setActive={setModalActive}
        setToggleMenu={setToggleMenu}
      />
    </header>
  );
}

export default Header;
