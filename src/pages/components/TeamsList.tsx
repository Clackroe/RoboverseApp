/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { api } from "~/utils/api";
import Image from "next/image";
import Link from "next/link";

export default function TeamsList() {
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
      <div className="w-full">
        <table className="w-full text-2xl">
          <thead className="sticky top-0 bg-green-500 text-black">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Total Matches</th>
              <th className="px-4 py-2">Total Wins</th>
              <th className="px-4 py-2">Total Losses</th>
            </tr>
          </thead>
          <tbody>
            {teams.data.map((team) => {
              if (!team) {
                return null;
              }
              const totalWins = team.equationMatchesWithWin.length;
              const totalLosses = team.equationMatchesWithLoss.length;
              const totalMatches = totalWins + totalLosses;

              return (
                <tr key={team.id}>
                  <td className="px-4 py-2 text-center hover:underline">
                    <Link href={"/teams/" + team.name}>{team.name}</Link>
                  </td>
                  <td className="px-4 py-2 text-center">{totalMatches}</td>
                  <td className="px-4 py-2 text-center">{totalWins}</td>
                  <td className="px-4 py-2 text-center">{totalLosses}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
