import Link from "next/link";

export default function Navbutton(props: {
  selected: boolean;
  page: string;
  comingSoon: boolean;
}) {
  return (
    <>
      <Link
        className={` ${
          props.selected
            ? "border-b-2 border-green-500 text-slate-300"
            : "bg-transparent text-slate-300"
        } px-5 py-1 ${
          props.comingSoon ? "text-slate-600" : ""
        } font-poppins text-4xl text-black`}
        href={`${
          props.comingSoon ? "/comingsoon" : "/" + props.page.toLowerCase()
        }`}
      >
        {props.page.toUpperCase()}
      </Link>
    </>
  );
}
