import Navbutton from "./Navbutton";
import { usePathname } from "next/navigation";
import ProfilePicture from "./ProfilePicture";
import Image from "next/image";
import Link from "next/link";

const navPages = ["Teams", "Play", "Matches"];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <>
      <div className="absolute top-1 mt-8 px-4">
        <Link href="/">
          <Image
            className="hover:cursor-pointer"
            width={350}
            // layout="responsive"
            unoptimized={true}
            height={350}
            src={"/Roboverse_Animation.gif"}
            alt="VESL Logo"
          ></Image>
        </Link>
      </div>
      <div className="border-b-2 border-slate-700 pb-4">
        <div className="mt-5 flex flex-row items-center justify-between">
          <ul className=" flex grow snap-center flex-row items-center justify-center ">
            {navPages.map((page) => {
              return (
                <li key={null}>
                  <Navbutton
                    selected={pathname == "/" + page.toLowerCase()}
                    page={page}
                  ></Navbutton>
                </li>
              );
            })}
          </ul>

          <div className="px-4">
            <ProfilePicture width={80} height={80}></ProfilePicture>
          </div>
        </div>
      </div>
    </>
  );
}
