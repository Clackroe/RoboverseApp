/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Profile() {
  const { data: sessionData } = useSession();

  const router = useRouter();
  let userName = router.query.user;
  if (!userName || Array.isArray(userName)) {
    userName = "GhostUser";
  }

  const user = api.users.getUserByName.useQuery({ name: userName });

  if (!user.data) {
    return (
      <>
        <div className="flex items-center justify-center">
          <Image
            alt="Loading"
            src={"/spinner.svg"}
            width={200}
            height={200}
          ></Image>
        </div>
      </>
    );
  }

  if (!user) {
    return <div>Error: User not found.</div>;
  }

  return (
    <>
      <div className="mt-10 flex flex-row justify-center">
        <div className="flex flex-col items-center">
          <div className="mb-4">
            <Image
              className="rounded-full border-2 border-gray-300"
              alt={user.data.name + "'s Profile Picture"}
              width={300}
              height={300}
              quality={100}
              src={
                user
                  ? user.data.image
                    ? user.data.image
                    : "/GhostUser.png"
                  : "/Spinner.svg"
              }
            />
          </div>
          <h1 className="text-3xl font-bold">
            {user.data.name} ·{" "}
            <Link
              className="hover:underline"
              href={"/teams/" + user.data.Team?.name}
            >
              {user.data.Team ? user.data.Team.name : "No Team Found"}
            </Link>
          </h1>

          {sessionData?.user.id === user.data.id ? (
            <button
              className="rounded-md px-1 text-slate-500 hover:text-red-800 hover:underline"
              onClick={() => void signOut()}
            >
              Log Out
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
}
