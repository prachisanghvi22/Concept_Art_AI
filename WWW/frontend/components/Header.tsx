import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import useSupabaseUser from "../utils/store/useSupabaseUser";
import Logo from "./ui/Logo";

const Header = () => {
  const { userDetails, isSupabaseUserReady } = useSupabaseUser();

  return (
    <div className="bg-base-200">
      <div className="mx-auto w-full">
        <div className="flex w-full items-center justify-between p-2">
          <div className="flex">
            <Logo />
          </div>
          {/* <div className="">
            <SignedIn>
              <div className="flex items-center justify-center ">
                {isSupabaseUserReady ? (
                  <Link href={`/${userDetails.username}`}>
                    <button className=" border-r-2 border-l-2 border-black p-4 px-8 text-black">
                      Profile
                    </button>
                  </Link>
                ) : null}
                <div className="border-r-2 border-black p-3 px-8">
                  <UserButton />
                </div>
              </div>
            </SignedIn>
            <SignedOut>
              <Link href="/sign-up">
                <Link href="/sign-in">
                  <button className=" border-r-2 border-l-2 border-black p-4 px-8 text-black">
                    Sign In
                  </button>
                </Link>
                <button className="border-r-2 border-black bg-black  p-4 px-8 text-white">
                  Sign Up
                </button>
              </Link>
            </SignedOut>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
