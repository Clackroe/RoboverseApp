import { api } from "~/utils/api";
import Image from "next/image";
import Link from "next/link";

export default function TopTeams(props: { distID: string }) {
  const teams = api.teams.getTop3Teams.useQuery({ districtId: props.distID });

  return (
    <>
      <div className="flex items-center  justify-center border-b-2">
        {teams.data?.map((team, idx) => {
          if (!team) {
            return null;
          }
          let container = "";
          let placementColor = "";
          let placement = "";
          switch (idx) {
            case 0:
              container =
                "order-2 border-yellow-500 mx-28 border-4 rounded-md mt-3";
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
              className={`mb-3  ${container} flex h-80 w-64 flex-col`}
              key={team.id}
            >
              <div className="flex items-center justify-center">
                <div
                  className={` ${placementColor} top-0 -mt-4  bg-black  px-2 text-2xl `}
                >
                  {placement}
                </div>
              </div>
              <div className="flex items-center justify-center align-middle">
                <Image
                  className="max-h-48 min-h-[192px] object-contain"
                  alt={team.name + "'s Profile Picture"}
                  src={team.logo || "/spinner.svg"}
                  objectFit="contain"
                  // sizes={"max-height: 20px"}
                  width={200}
                  height={100}
                  quality={100}
                ></Image>
              </div>
              <div className="flex items-center justify-center">
                <div className="flex flex-col font-poppins text-3xl text-slate-200">
                  <div className="break-before-auto hover:underline">
                    <Link href={`/teams/${team.name}`}>{team.name}</Link>
                  </div>
                  <div className="text-lg italic text-slate-400">
                    Rating:{" "}
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
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

// import { Card, CardFooter, Image, Button } from "@nextui-org/react";
// import { Team } from "@prisma/client";

// export function TeamCard(props: { placement: number; team: Team }) {
//   return (
//     <Card
//       isFooterBlurred
//       radius="lg"
//       className="h-44 border-none bg-purple-200"
//     >
//       <Image
//         alt="Woman listing to music"
//         className="object-cover"
//         height={200}
//         src={props.team.logo || "/spinner.svg"}
//         width={200}
//       />
//       <CardFooter className="border-1 rounded-large shadow-small absolute bottom-1 z-10 ml-1 w-[calc(100%_-_8px)] justify-between overflow-hidden border-white/20 py-1 before:rounded-xl before:bg-white/10">
//         <p className="text-tiny text-white/80">Available soon.</p>
//         <Button
//           className="text-tiny bg-black/20 text-white"
//           variant="flat"
//           color="default"
//           radius="lg"
//           size="sm"
//         >
//           Notify me
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// }
