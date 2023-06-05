import React from "react";
import { addToFav } from "@/features/favSlice";
import { auth, googleProvider } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Favorite from "@/components/Favorite";
import Header from "@/components/Header";

function dashboard() {
  const favs = useSelector((state) => state.fav.favItems);
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  if (loading) return <h1>Loading</h1>;
  if (!user) router.push("/");
  if (user)
    return (
      <div>
        <Header />
        <div className="md:pt-[90px] pt-[82px]">
          <h2 className="text-3xl text-center text-red-400 py-10 font-bold">
            Welcome to your dashboard{" "}
          </h2>

          <Favorite />
        </div>
      </div>
    );
}

export default dashboard;
