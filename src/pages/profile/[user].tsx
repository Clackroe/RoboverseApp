/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import Image from "next/image";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Profile() {
  const { data: sessionData } = useSession();

  const router = useRouter();
  let userName = router.query.user;
  if (!userName || Array.isArray(userName)) {
    userName = "GhostUser";
  }
  const { data, isLoading, isError } = api.users.getUserByName.useQuery({
    name: userName,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>Error: User not found.</div>;
  }

  return (
    <>
      <div className="mt-10 flex flex-row justify-center">
        <div className="flex flex-col items-center">
          <div className="mb-4">
            <Image
              className="rounded-full border-2 border-gray-300"
              alt={data.name + "'s Profile Picture"}
              width={300}
              height={300}
              quality={100}
              src={data.image ? data.image : "/spinner.svg"}
            />
          </div>
          <h1 className="text-3xl font-bold">
            {data.name} ·{" "}
            <Link
              className="hover:underline"
              href={"/teams/" + data.team?.name}
            >
              {data.team ? data.team.name : "No Team Found"}
            </Link>
          </h1>

          {sessionData?.user.id === data.id ? (
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
