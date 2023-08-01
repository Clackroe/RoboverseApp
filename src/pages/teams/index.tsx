import TeamsList from "../components/TeamsList";

export default function TeamsPage() {
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="mx-20 mt-4 flex-grow self-center pb-4 text-center  text-3xl text-slate-300">
          <TeamsList />
        </div>
      </div>
    </>
  );
}
