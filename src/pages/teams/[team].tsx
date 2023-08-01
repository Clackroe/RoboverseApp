import { useRouter } from "next/router";

import { api } from "~/utils/api";

import UserListTeam from "../components/UserListTeam";
import EqMatchListTeam from "../components/EqMatchListTeam";

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
        <div className="flex items-center justify-center">
          <div className="mx-20 mt-4 flex-grow self-center  pb-4 text-center  text-3xl text-slate-300">
            <UserListTeam teamID={team.data.id} />
            <EqMatchListTeam teamId={team.data.id} />
          </div>
        </div>
      </>
    );
  }
}
