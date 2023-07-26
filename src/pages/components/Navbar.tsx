import Navbutton from "./Navbutton";
import { usePathname } from "next/navigation";
import ProfilePicture from "./ProfilePicture";

const navPages = ["Teams", "Team", "Matches"];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <>
      <div className="border-b-2 border-slate-700 pb-4">
        <div className="mt-5 flex flex-row items-center justify-between">
          <div className="px-4">sett</div>
          <ul className="100 flex grow flex-row items-center justify-center ">
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
            <ProfilePicture></ProfilePicture>
          </div>
        </div>
      </div>
    </>
  );
}
