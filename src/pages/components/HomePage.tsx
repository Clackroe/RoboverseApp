import { api } from "~/utils/api";

export default function HomePage() {
  const upload = api.bucket.uploadFile.useMutation();

  function handleUpload(name: string, path: string) {
    upload.mutate({
      name: name,
      access: "public-read",
      path: path,
      type: "image/png",
    });
  }
  return (
    <div className="flex h-auto w-auto items-center justify-center align-middle">
      <div className="flex flex-col items-center justify-center align-middle">
        {/* <button
          onClick={() =>
            handleUpload("DefaultPFP4.png", "./public/DefaultPFP4.png")
          }
        >
          Upload
        </button> */}
      </div>
    </div>
  );
}
8;
