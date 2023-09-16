import React, { useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { api } from "~/utils/api";

export default function UnityPlayer() {
  const { data: sessionData } = useSession();

  const userID = sessionData ? sessionData.user.id : "0";
  const user = api.users.getUserById.useQuery({ id: userID });

  const { unityProvider, isLoaded, requestFullscreen, sendMessage } =
    useUnityContext({
      loaderUrl: "/Builds/Build/Build 26.loader.js",
      dataUrl: "/Builds/Build/Build 26.data.unityweb",
      frameworkUrl: "/Builds/Build/Build 26.framework.js.unityweb",
      codeUrl: "/Builds/Build/Build 26.wasm.unityweb",
    });

  function handleClickEnterFullscreen() {
    requestFullscreen(true);
  }

  const [height, setHeight] = React.useState(window.innerHeight);
  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    function handleResize() {
      setHeight(window.innerHeight);
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  const [devicePixelRatio, setDevicePixelRatio] = useState(
    window.devicePixelRatio
  );

  React.useEffect(
    function () {
      // update the device pixel ratio of the Unity Application to match the device pixel ratio of the browser.
      const updateDevicePixelRatio = function () {
        setDevicePixelRatio(window.devicePixelRatio);
      };
      const mediaMatcher = window.matchMedia(
        `screen and (resolution: ${devicePixelRatio}dppx)`
      );
      mediaMatcher.addEventListener("change", updateDevicePixelRatio);
      return function () {
        mediaMatcher.removeEventListener("change", updateDevicePixelRatio);
      };
    },
    [devicePixelRatio]
  );

  React.useEffect(() => {
    if (isLoaded) {
      handleSendId();
    }
  });
  function handleSendId() {
    sendMessage(
      "UMRefrenceHolder",
      "getUserIdFromReact",
      `${user.data ? user.data.id : "NoData"}`
    );
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="flex items-center justify-center self-center">
          {!isLoaded && (
            <div className="absolute flex items-center justify-center">
              <Image
                // className="align-middle"
                alt={"Loading..."}
                width={200}
                height={200}
                src={"/spinner.svg"}
              ></Image>
            </div>
          )}
          <div className="flex flex-col">
            <Unity
              className="border-5 mt-5 border-slate-600"
              unityProvider={unityProvider}
              style={{
                width: width - 400,
                height: height - 200,
                visibility: isLoaded ? "visible" : "hidden",
              }}
            />
            <div className="flex items-center justify-center">
              <button
                className="mt-2 max-w-md rounded-full bg-green-500 px-7 text-2xl text-black"
                onClick={handleClickEnterFullscreen}
              >
                Full Screen
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
