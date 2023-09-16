import { api } from "~/utils/api";
import Image from "next/image";
import Link from "next/link";
import { Team } from "@prisma/client";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";

export default function TeamsList(props: { distID: string }) {
  const user = api.users.getLoggedInUser.useQuery();

  const teams = api.teams.getAllTeamsWithRank.useQuery({
    districtId: props.distID,
  });

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
        <Table className=" w-full rounded-md bg-green-500 text-2xl">
          <TableHeader className="sticky top-0 bg-green-500 text-black">
            <TableColumn className="px-4 py-2 text-black">Name</TableColumn>
            <TableColumn className="px-4 py-2 text-black">
              Total Matches
            </TableColumn>
            <TableColumn className="px-4 py-2  text-black">
              Total Wins
            </TableColumn>
            <TableColumn className="px-4  py-2 text-black">
              Total Losses
            </TableColumn>
            <TableColumn className="px-4  py-2 text-black">
              {props.distID == "Global" ? "Global" : "District"} Ranting
            </TableColumn>
          </TableHeader>
          <TableBody
            className=" rounded-md bg-gray-900"
            emptyContent={"No rows to display."}
          >
            {teams.data.map((team: Team, i) => {
              const isUserTeam = user.data?.Team?.id === team.id;
              const totalWins = team.totalEqMatchesWon;
              const totalLosses = team.totalEqMatchesLost;
              const totalMatches = team.totalEqMatches;

              if (
                props.distID !== "Global" &&
                team.districtId !== props.distID
              ) {
                return <> </>;
              }

              return (
                <TableRow
                  className={`${
                    i % 2 == 0 ? "bg-neutral-950" : "bg-zinc-950"
                  }  rounded-md`}
                  key={i}
                >
                  <TableCell className=" rounded-md ">{team.name}</TableCell>
                  <TableCell>{totalMatches}</TableCell>
                  <TableCell>{totalWins}</TableCell>
                  <TableCell>{totalLosses}</TableCell>
                  <TableCell>
                    {typeof parseFloat(
                      String(
                        props.distID == "Global"
                          ? team.global_ranking
                          : team.district_ranking
                      )
                    ) === "number"
                      ? (
                          parseFloat(
                            String(
                              props.distID == "Global"
                                ? team.global_ranking
                                : team.district_ranking
                            )
                          ) * 1000
                        ).toFixed(0)
                      : "Unranked"}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
}
