import CommonLayout from "@/layouts/CommonLayout";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";

const Index = () => {
  const [isVideoOver, setIsVideoOver] = useState(false);
  const router = useRouter();
  return (
    <CommonLayout>
      <video
        onEnded={() => setIsVideoOver(true)}
        autoPlay
        className="min-w-full min-h-full max-h-full fixed right-0 bottom-0"
        muted
        src={"./videos/splash_screen.webm"}
      />

      <div
        className={`absolute bottom-8 w-full justify-center transition flex ease-in duration-300 ${
          isVideoOver ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          onClick={() => {
            if (router.query.id === "bb19e645-293e-4038-9283-c9ccdccfa6b7") {
              router.push(`/picker?id=bb19e645-293e-4038-9283-c9ccdccfa6b7`);
            } else {
              router.push(`/picker`);
            }
          }}
          className="bg-black p-6 rounded-lg px-20"
        >
          Go
        </button>
      </div>
    </CommonLayout>
  );
};

export default Index;
