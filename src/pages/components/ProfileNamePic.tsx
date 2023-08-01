import Link from "next/link";
import Image from "next/image";

export default function ProfileNamePic(props: {
  name: string;
  image: string | null;
  showName: boolean;
}) {
  return (
    <Link
      href={"/profile/" + props.name}
      className="flex  items-center text-center align-middle"
    >
      <div className="flex  items-center text-center align-middle">
        <Image
          className="rounded-full px-2 text-center align-middle"
          alt={"pic"}
          src={props.image ? props.image : "/GhostUser.png"}
          width={50}
          height={50}
        ></Image>
        {props.showName ? props.name : ""}
      </div>
    </Link>
  );
}
