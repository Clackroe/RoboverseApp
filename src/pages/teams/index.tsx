import { api } from "~/utils/api";
import TeamsList from "../components/TeamsList";
import TopTeams from "../components/TopTeams";
import { useState } from "react";
import RoboDropdown from "../components/Dropdown";

export default function TeamsPage() {
  const districts = api.districts.getAllDistricts.useQuery();

  const [selectedValue, setSelectedValue] = useState("Global");

  return (
    <>
      <TopTeams distID={selectedValue} />
      <div className="flex  items-center justify-center">
        <RoboDropdown
          items={
            districts.data
              ?.map((district, i) => {
                return { key: district.id, label: district.name };
              })
              .concat({ key: "Global", label: "Global" }) || []
          }
          stateFunction={(input: string) => {
            setSelectedValue(input);
            console.log(input);
          }}
        ></RoboDropdown>
      </div>

      <div className="flex items-center justify-center">
        <div className="mx-20 mt-4 flex-grow self-center pb-4 text-center  text-3xl text-slate-300">
          <TeamsList distID={selectedValue} />
        </div>
      </div>
    </>
  );
}
