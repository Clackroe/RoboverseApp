import { api } from "~/utils/api";
import Image from "next/image";
import Link from "next/link";
import ProfileNamePic from "./ProfileNamePic";

export default function EqMatchListTeam(props: { teamId: string }) {
  const team = api.teams.getTeamById.useQuery({ id: props.teamId });

  if (!team?.data) {
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
              <th className="px-4 py-2">Name / Created By</th>
              <th className="px-4 py-2">Contributed Elo</th>
              <th className="px-4 py-2">Total Matches</th>
            </tr>
          </thead>
          <tbody>
            {team.data.Equation.map((eq) => {
              if (!eq) {
                return null;
              }
              const totalMatches = eq.TeamInEquationMatch.length;
              const user = eq.User;

              return (
                <tr key={eq.id}>
                  <td className="flex items-center justify-center px-4 py-2 text-center ">
                    <Link
                      className="hover:underline"
                      href={"/equations/" + eq.id}
                    >
                      {eq.name}
                    </Link>
                    {user ? (
                      <ProfileNamePic
                        image={user.image ? user.image : null}
                        name={user.name}
                        showName={false}
                      />
                    ) : (
                      ""
                    )}
                  </td>
                  <td className="px-4 py-2 text-center">{eq.elo_contribute}</td>
                  <td className="px-4 py-2 text-center">{totalMatches}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
