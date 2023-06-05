import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineClose } from "react-icons/ai";
import { auth } from "../utils/firebase";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

import {
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useRouter } from "next/router";

function Log({ active, setActive, setToggleMenu }) {
  const router = useRouter();

  //phone number state
  const [phoneNumber, setPhoneNumber] = useState("");
  //otp code
  const [otp, setOtp] = useState("");
  //confirmation of otp
  const [confirmObj, setConfirmObj] = useState("");

  //verification of correct input
  const [expandForm, setExpandForm] = useState(false);

  //const generate recatcha
  const generateRecaptcha = () => {
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      { size: "invisible" },
      auth
    );
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
  };

  //--otp
  const getOtp = async (e) => {
    e.preventDefault();
    if (
      phoneNumber === "" ||
      phoneNumber === undefined ||
      phoneNumber.length < 12
    )
      return alert("empty field");
    try {
      const response = await generateRecaptcha(phoneNumber);
      setConfirmObj(response);
      setExpandForm(true);

      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  //verify otp
  const verifyOtp = async (e) => {
    // e.preventDefault();
    console.log(otp, "verified!");
    if (otp === "" || otp === null) return alert("please enter your otp code");
    try {
      await confirmObj.confirm(otp);
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  //google auth
  const googleProvider = new GoogleAuthProvider();
  const googleLogIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);

      router.push("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className={
        active
          ? `absolute top-0 w-full h-screen backdrop-blur-sm m-0  overflow-hidden`
          : `hidden overflow-hidden`
      }
    >
      <div className="bg-white shadow-xl w-full md:w-[600px] px-4 pb-14 border-2 rounded-xl relative top-[120px] mx-auto ">
        <div className="flex justify-center items-center pb-4 pt-3">
          <div className="  py-2 px-2 hover:bg-slate-100 rounded-full">
            <AiOutlineClose
              className="text-lg"
              onClick={() => {
                setActive(false);
                setToggleMenu(false);
                setPhoneNumber("");
                setExpandForm(false);
              }}
            />
          </div>
          <h2 className="text-md font-bold text-center  flex-grow">Log in</h2>
        </div>
        <div className="border-t-2 border-gray-100">
          <h2 className="text-2xl pt-4 font-semibold">Welcome to Airbnb</h2>
        </div>
        <div className="w-full my-4">
          {/* form with phone number */}
          <form onSubmit={getOtp} className="w-full relative">
            <div className=" w-full">
              {/* <input
                type="tel"
                value={phoneNumber}
                placeholder="Phone number"
                className="w-full border-[1px] border-gray-300 outline-gray-600 rounded-lg py-3 px-5"
                onChange={(e) => {
                  setPhoneNumber(e.target.value.toString());
                }}
              /> */}
              <PhoneInput
                className="w-full border-[1px]  border-gray-600 rounded-lg py-3 px-5 outline-none"
                placeholder="Enter your phone number "
                value={phoneNumber}
                onChange={setPhoneNumber}
                country="RU"
              />
              <p className="text-xs py-2">
                We’ll call or text you to confirm your number. Standard message
                and data rates apply
              </p>

              <div id="recaptcha-container" className="invisible "></div>
            </div>
            {expandForm && (
              <div className="my-4 border-t-[1.5px] flex flex-col">
                <p className="py-2">Your Confirmation Code</p>
                <input
                  type="text"
                  placeholder="Enter your code"
                  className="w-[50%] border-[1px] border-gray-300 outline-[1px] outline-gray-600 rounded-lg py-3 px-5 mb-3"
                  onChange={(e) => {
                    setOtp(e.target.value);
                  }}
                />

                <button
                  onClick={() => {
                    verifyOtp(otp);
                  }}
                  className="border-2 border-red-500 bg-red-500 text-white rounded-lg px-2 py-[9px] flex self-start"
                >
                  Confirm code
                </button>
              </div>
            )}
            {expandForm ? (
              <button
                type="submit"
                className="bg-red-500 w-full text-white text-semibold py-[11px] rounded-lg my-3 hidden"
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                className="bg-red-500 w-full text-white text-semibold py-[11px] rounded-lg my-3 inline-block"
              >
                Continue
              </button>
            )}
          </form>
        </div>
        <p className="text-sm flex gap-x-3 justify-center items-center w-full text-center before:content-[''] before:block before:w-full before:h-[1.5px] before:bg-gray-200 after:content-[''] after:block after:w-full after:h-[1.5px] after:bg-gray-200">
          or
        </p>
        <div className="flex flex-col gap-y-3 pt-3">
          <button
            onClick={async () => {
              await signInWithPopup(auth, googleProvider);
              router.push("/dashboard");
            }}
            className="border-[1px] border-gray-600 rounded-lg flex items-center  justify-center py-3 px-5 hover:bg-slate-100"
          >
            <FcGoogle className="text-2xl text-blue-500" />
            <p className="flex-grow font-semibold">Continue with Google</p>
          </button>
        </div>
        <div className="text-xs border-t-[1.5px] pt-6 text-right ">
          This site is protected by reCAPTCHA and the Google
          <br />
          <a
            href="https://policies.google.com/privacy"
            className="text-red-500"
          >
            Privacy Policy
          </a>{" "}
          and
          <a
            href="https://policies.google.com/terms"
            className="text-red-500 pl-1"
          >
            Terms of Service
          </a>{" "}
          apply.
        </div>
      </div>
    </div>
  );
}

export default Log;
