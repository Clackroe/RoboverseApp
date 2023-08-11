import { api } from "~/utils/api";
import Image from "next/image";
import Link from "next/link";

export default function TeamsList() {
  const user = api.users.getLoggedInUser.useQuery();

  const teams = api.teams.getAllTeams.useQuery();

  if (!teams.data) {
    return (
      <div className=" flex items-center justify-center text-5xl italic">
        <div className="fles flex-col items-center justify-center ">
          <Image
            className="mt-[50%]"
            width={200}
            height={200}
            alt={"Loading"}
            src={"/spinner.svg"}
          ></Image>
        </div>
      </div>
    );
  } else {
    return (
      <div className={`w-full `}>
        <table className="w-full text-2xl">
          <thead className="sticky top-0 bg-green-500 text-black">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Total Matches</th>
              <th className="px-4 py-2">Total Wins</th>
              <th className="px-4 py-2">Total Losses</th>
              <th className="px-4 py-2">Rating</th>
            </tr>
          </thead>
          <tbody>
            {teams.data.map((team) => {
              if (!team) {
                return null;
              }
              const isUserTeam = user.data?.Team?.id === team.id;
              const totalWins = team.totalEqMatchesWon;
              const totalLosses = team.totalEqMatchesLost;
              const totalMatches = team.totalEqMatches;

              return (
                <tr
                  className={`${
                    isUserTeam
                      ? " rounded-md border-2 border-green-500 bg-green-500 bg-opacity-30"
                      : ""
                  }`}
                  key={team.id}
                >
                  <td className="px-4 py-2 text-center hover:underline">
                    {isUserTeam ? (
                      <div className="absolute left-28 flex flex-col items-center justify-center  align-middle">
                        <Image
                          className="mb-2"
                          alt="Home"
                          width={35}
                          height={35}
                          src={"/home.svg"}
                        ></Image>
                      </div>
                    ) : null}

                    <Link href={"/teams/" + team.name}>{team.name}</Link>
                  </td>
                  <td className="px-4 py-2 text-center">
                    {totalMatches ? totalMatches.toString() : "0"}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {totalWins ? totalWins.toString() : "0"}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {totalLosses ? totalLosses.toString() : "0"}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {typeof parseFloat(String(team.ranking)) === "number"
                      ? (parseFloat(String(team.ranking)) * 1000).toFixed(0)
                      : "Unranked"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
