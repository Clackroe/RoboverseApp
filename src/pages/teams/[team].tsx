import { useRouter } from "next/router";

import { api } from "~/utils/api";

import Image from "next/image";

import UserListTeam from "../components/UserListTeam";
import EqMatchListTeam from "../components/EqMatchListTeam";
import TeamHistory from "../components/TeamHistory";

export default function TeamPage() {
  const router = useRouter();
  const slug = router.query.team;
  let teamName = slug;

  if (!teamName || Array.isArray(teamName)) {
    teamName = "GhostTeam";
  }

  const team = api.teams.getTeamByName.useQuery({ name: teamName });

  if (team.data == null) {
    return (
      <div className=" flex items-center justify-center text-5xl italic">
        <div className="fles flex-col items-center justify-center ">
          <div className="mt-[50%] font-poppins text-slate-400">
            Team, {slug}, not found
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div className="mt-5 flex border-b-2">
          <div className="ml-28 flex">
            <Image
              className="object-contain"
              alt={team.data.name + "'s Profile Picture"}
              src={team.data?.logo ?? "/spinner.svg"}
              width={300}
              height={300}
              quality={100}
            ></Image>
            <div className="ml-8 mt-16 flex flex-col font-poppins text-3xl text-slate-200">
              <div>{team.data.name}</div>
              <div className="text-lg italic text-slate-400">
                Rating:{" "}
                {typeof parseFloat(String(team.data?.ranking)) === "number"
                  ? (parseFloat(String(team.data?.ranking)) * 1000).toFixed(0)
                  : "Unranked"}
              </div>
              <div className="text-lg italic text-slate-400">
                W/L: {team.data?.totalEqMatches} /{" "}
                {team.data?.totalEqMatchesLost}
              </div>
            </div>
          </div>
          <div className="flex grow items-center justify-center pb-20 pr-96 ">
            <TeamHistory id={team.data.id} />
          </div>
          <div className="mr-36">
            <UserListTeam teamID={team.data.id} />
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="mx-20 mt-4 flex-grow self-center  pb-4 text-center  text-3xl text-slate-300">
            <EqMatchListTeam teamId={team.data.id} />
          </div>
        </div>
      </>
    );
  }
}
