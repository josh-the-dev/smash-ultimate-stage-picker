import { useRouter } from "next/router";
import React, { useRef, useState } from "react";

const Test = () => {
  const [isVideoOver, setIsVideoOver] = useState(false);
  const router = useRouter();
  return (
    <>
      <video
        onEnded={() => setIsVideoOver(true)}
        autoPlay
        className="min-w-full min-h-full max-h-full fixed right-0 bottom-0"
        muted
        src={"./videos/splash_screen.webm"}
      ></video>

      <div
        className={`absolute bottom-8 w-full justify-center transition flex ease-in duration-300 ${
          isVideoOver ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          onClick={() => {
            router.push("/");
          }}
          className="bg-black p-6 rounded-lg px-20"
        >
          Go
        </button>
      </div>
    </>
  );
};

export default Test;
