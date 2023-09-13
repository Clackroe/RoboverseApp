import React, { type ReactNode } from "react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Navbar from "./Navbar";
// import ReactDOM from "react-dom";

const Layout = ({ children }: { children: ReactNode }) => {
  const { data: sessionData } = useSession();

  return (
    <>
      <a href="https://app.vesl.gg/catalog">
        <div className="vi hover:border-b-full mx-96 rounded-b-full bg-gradient-to-br from-green-200 via-green-500 to-green-800 py-2  text-black transition-all hover:mx-[750px] ">
          <div className="flex items-center justify-center ">
            <p className=" ">MORE IN THE VESLVERSE</p>
          </div>
        </div>
      </a>

      <div className="overflow-x-hidden overscroll-x-none">
        {sessionData ? <Navbar /> : <Authenticate />}
        {sessionData ? children : null}
      </div>
    </>
  );
};

export default Layout;

function Authenticate() {
  return (
    <>
      <div className="no-scrollbar mt-[10%] flex flex-col items-center justify-center gap-2 overflow-clip  overscroll-y-none overscroll-x-none">
        <Image
          className=""
          width={500}
          // layout="responsive"
          unoptimized={true}
          height={500}
          src={"/Roboverse_Animation.gif"}
          alt="VESL Logo"
        ></Image>

        <button
          className="rounded-full bg-green-500 px-4 py-1 font-poppins text-4xl text-black"
          onClick={() => void signIn()}
        >
          Sign In
        </button>
      </div>
    </>
  );
}
