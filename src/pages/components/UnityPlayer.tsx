/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import Image from "next/image";

export default function UnityPlayer() {
  const { unityProvider, isLoaded, requestFullscreen } = useUnityContext({
    loaderUrl: "/Builds/Build/Builds.loader.js",
    dataUrl: "/Builds/Build/Builds.data.unityweb",
    frameworkUrl: "/Builds/Build/Builds.framework.js.unityweb",
    codeUrl: "/Builds/Build/Builds.wasm.unityweb",
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
      // A function which will update the device pixel ratio of the Unity
      // Application to match the device pixel ratio of the browser.
      const updateDevicePixelRatio = function () {
        setDevicePixelRatio(window.devicePixelRatio);
      };
      // A media matcher which watches for changes in the device pixel ratio.
      const mediaMatcher = window.matchMedia(
        `screen and (resolution: ${devicePixelRatio}dppx)`
      );
      // Adding an event listener to the media matcher which will update the
      // device pixel ratio of the Unity Application when the device pixel
      // ratio changes.
      mediaMatcher.addEventListener("change", updateDevicePixelRatio);
      return function () {
        // Removing the event listener when the component unmounts.
        mediaMatcher.removeEventListener("change", updateDevicePixelRatio);
      };
    },
    [devicePixelRatio]
  );

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
