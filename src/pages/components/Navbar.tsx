import Navbutton from "./Navbutton";
import { usePathname } from "next/navigation";
import ProfilePicture from "./ProfilePicture";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";

const navPages = [
  { page: "Teams", comingSoon: false },
  { page: "Play", comingSoon: false },
  { page: "Matches", comingSoon: true },
];
import { api } from "~/utils/api";

export default function Navbar() {
  const user = api.users.getLoggedInUser.useQuery();

  const pathname = usePathname();
  return (
    <>
      <div className="h-24 border-b-2">
        <div className="absolute top-11 px-4">
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

        <div className="relative mt-5 flex flex-row items-center justify-between">
          <ul className=" absolute inset-0 top-11 flex  flex-row items-center justify-center ">
            {navPages.map((page) => {
              return (
                <li key={null}>
                  <Navbutton
                    selected={pathname == "/" + page.page.toLowerCase()}
                    page={page.page}
                    comingSoon={page.comingSoon}
                  ></Navbutton>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="transit absolute -right-44 top-5 flex px-4 transition-transform duration-75 hover:-translate-x-32 ">
          <ProfilePicture width={80} height={80}></ProfilePicture>
          <div className=" ml-4 flex flex-col items-center justify-center pr-16">
            <Link
              className="bg-green-500 px-5 text-slate-900 decoration-black hover:underline"
              href={"/teams/" + user.data?.Team?.name}
            >
              TEAM
            </Link>
            <button
              className=" px-4 decoration-green-500 hover:underline"
              onClick={() => void signOut()}
            >
              LOGOUT
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
