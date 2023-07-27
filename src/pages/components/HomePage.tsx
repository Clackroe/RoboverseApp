import React, { Fragment } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import Image from "next/image";

export default function HomePage() {
  const { unityProvider, isLoaded } = useUnityContext({
    loaderUrl: "/Builds/Build/Builds.loader.js",
    dataUrl: "/Builds/Build/Builds.data.unityweb",
    frameworkUrl: "/Builds/Build/Builds.framework.js.unityweb",
    codeUrl: "/Builds/Build/Builds.wasm.unityweb",
  });

  return (
    <div className="flex h-auto w-auto items-center justify-center align-middle">
      <div className="flex flex-col items-center justify-center align-middle">
        <div className="items-center self-center">
          {!isLoaded && (
            <Image
              alt={"Loading..."}
              width={200}
              height={200}
              src={"/spinner.svg"}
            ></Image>
          )}
          <Unity
            className="pt-5"
            unityProvider={unityProvider}
            style={{
              width: 1200,
              height: 800,
              visibility: isLoaded ? "visible" : "hidden",
            }}
          />
        </div>
      </div>
    </div>
  );
}
8;
