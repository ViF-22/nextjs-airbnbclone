import React from "react";
import { auth, googleProvider } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";

function dashboard() {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  if (loading) return <h1>Loading</h1>;
  if (!user) router.push("/");
  if (user)
    return (
      <div className="text-center my-16">
        <h1>Welcome to your dashboard </h1>
        <button
          onClick={() => auth.signOut()}
          className="px-5 py-2 bg-red-300 hover:bg-red-400 rounded-lg shadow-lg"
        >
          Log out
        </button>
      </div>
    );
}

export default dashboard;
