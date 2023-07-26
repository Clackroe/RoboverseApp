import Link from "next/link";

export default function Navbutton(props: { selected: boolean; page: string }) {
  return (
    <>
      <Link
        className={`rounded-full ${
          props.selected
            ? "bg-green-500 text-black"
            : "bg-transparent text-slate-300"
        } px-5 py-1 font-poppins text-4xl text-black`}
        href={"/" + props.page.toLowerCase()}
      >
        {props.page.toUpperCase()}
      </Link>
    </>
  );
}
