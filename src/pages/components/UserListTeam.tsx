/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from "react";
import { api } from "~/utils/api";
import Image from "next/image";
import ProfileNamePic from "./ProfileNamePic";

export default function UserListTeam(props: { teamID: string }) {
  const users = api.users.getUsersByTeamID.useQuery({ teamId: props.teamID });

  if (!users?.data) {
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
              <th className="px-4 py-2">Created Equations</th>
            </tr>
          </thead>
          <tbody>
            {users.data?.map((user) => {
              if (!user) {
                return null;
              }

              return (
                <tr className="" key={user.id}>
                  <td className="flex items-center justify-center px-4 py-2 text-center hover:underline">
                    <ProfileNamePic
                      name={user.name}
                      image={user.image ? user.image : ""}
                    />
                  </td>
                  <td className="px-4 py-2 text-center">
                    {user.Equation ? user.Equation.length : "0"}
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
