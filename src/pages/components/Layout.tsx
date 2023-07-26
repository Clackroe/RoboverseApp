import React, { type ReactNode } from "react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Navbar from "./Navbar";

const Layout = ({ children }: { children: ReactNode }) => {
  const { data: sessionData } = useSession();

  return (
    <>
      {sessionData ? <Navbar /> : <Authenticate />}
      {sessionData ? children : null}
    </>
  );
};

export default Layout;

function Authenticate() {
  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <Image
          alt="VESL Logo"
          src={"/logos/VESLLogoGreen.png"}
          width={700}
          height={700}
        ></Image>

        <button
          className="rounded-full bg-green-500 px-4 py-2 font-poppins text-4xl text-black"
          onClick={() => void signIn()}
        >
          Sign In
        </button>
      </div>
    </>
  );
}
