import { useSession, signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function ProfilePicture(props: {
  width?: number;
  height?: number;
}) {
  const sessionData = useSession();

  return (
    <>
      {sessionData.data ? (
        <div className="flex items-center justify-center  ">
          <div className="flex-shrink-0">
            <Link
              href={
                sessionData.data.user.name &&
                typeof sessionData.data.user.name == "string"
                  ? "/profile/" + sessionData.data.user.name
                  : "/profile"
              }
            >
              <Image
                alt={"Profile Picture"}
                className="rounded-full"
                src={
                  sessionData.data.user.image &&
                  typeof sessionData.data.user.image == "string"
                    ? sessionData.data.user.image
                    : "/GhostUser.png"
                }
                width={props.width ? props.width : 64}
                height={props.height ? props.height : 64}
              ></Image>
            </Link>
          </div>
        </div>
      ) : (
        <button onClick={() => void signIn()}>Sign In</button>
      )}
    </>
  );
}
