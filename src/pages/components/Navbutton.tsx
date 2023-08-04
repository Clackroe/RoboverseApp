import Link from "next/link";

export default function Navbutton(props: { selected: boolean; page: string }) {
  return (
    <>
      <Link
        className={` ${
          props.selected
            ? "border-b-2 border-green-500 text-slate-300"
            : "bg-transparent text-slate-300"
        } px-5 py-1 font-poppins text-4xl text-black`}
        href={"/" + props.page.toLowerCase()}
      >
        {props.page.toUpperCase()}
      </Link>
    </>
  );
}
