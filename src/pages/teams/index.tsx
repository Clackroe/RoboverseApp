import { api } from "~/utils/api";
import TeamsList from "../components/TeamsList";
import Image from "next/image";

export default function TeamsPage() {
  const teams = api.teams.getTop3Teams.useQuery();
  return (
    <>
      <div className="flex items-center justify-center border-b-2">
        {teams.data?.map((team, idx) => {
          if (!team) {
            return null;
          }
          let container = "";
          let placementColor = "";
          let placement = "";
          switch (idx) {
            case 0:
              container = "order-2 border-yellow-500 border-4 rounded-md mt-3";
              placementColor = "text-yellow-500";
              placement = "1st";
              break;
            case 1:
              placementColor = "text-zinc-400";
              container = "order-1 border-zinc-400 border-4 rounded-md mt-10";
              placement = "2nd";
              break;
            case 2:
              container = "order-3 border-yellow-900 border-4 rounded-md mt-10";
              placementColor = "text-yellow-900";
              placement = "3rd";
              break;
          }
          return (
            <div
              className={`mb-3 ml-28 px-2 ${container} flex flex-col`}
              key={team.id}
            >
              <div className="flex items-center justify-center">
                <div
                  className={` ${placementColor} top-0 -mt-4  bg-black  px-2 text-2xl `}
                >
                  {placement}
                </div>
              </div>
              <Image
                alt={team.name + "'s Profile Picture"}
                src={"/RockyRiver.png"}
                width={250}
                height={250}
                quality={100}
              ></Image>
              <div className="flex items-center justify-center">
                <div className="flex flex-col font-poppins text-3xl text-slate-200">
                  <div>{team.name}</div>
                  <div className="text-lg italic text-slate-400">
                    Elo: {team.eq_elo}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-center">
        <div className="mx-20 mt-4 flex-grow self-center pb-4 text-center  text-3xl text-slate-300">
          <TeamsList />
        </div>
      </div>
    </>
  );
}
