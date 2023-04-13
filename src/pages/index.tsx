import CommonLayout from "@/layouts/CommonLayout";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { useUserAgent } from "next-useragent";
import Image from "next/image";
import BirthdayBrawlPic from "../../public/images/final_image_splash_screen.png";

//@ts-ignore
export function getServerSideProps(context) {
  return {
    props: {
      uaString: context.req.headers["user-agent"],
    },
  };
}
//@ts-ignore
const Index = (props) => {
  let ua;
  ua = useUserAgent(props.uaString);
  const [isVideoOver, setIsVideoOver] = useState(false);
  const router = useRouter();
  if (ua.isChrome) {
    return (
      <CommonLayout>
        <video
          onEnded={() => setIsVideoOver(true)}
          autoPlay
          playsInline
          className="min-w-full min-h-full max-h-full fixed right-0 bottom-0"
          muted
        >
          <source src={"./videos/splash_screen.webm"} />
        </video>

        <div
          className={`fixed bottom-8 w-full justify-center transition flex ease-in duration-300 ${
            isVideoOver ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            onClick={() => {
              if (router.query.id === "bb19e645-293e-4038-9283-c9ccdccfa6b7") {
                router.push(`/picker?id=${router.query.id}`);
              } else if (router.query.id) {
                router.push(`/players?id=${router.query.id}`);
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
  }
  return (
    <CommonLayout>
      <Image
        src={BirthdayBrawlPic}
        alt="Birthday Brawl Backdrop"
        className="min-w-full min-h-full max-h-full fixed right-0 bottom-0"
      />
      <div
        className={`fixed bottom-8 w-full justify-center transition flex ease-in duration-300 `}
      >
        <button
          onClick={() => {
            if (router.query.id === "bb19e645-293e-4038-9283-c9ccdccfa6b7") {
              router.push(`/picker?id=${router.query.id}`);
            } else if (router.query.id) {
              router.push(`/players?id=${router.query.id}`);
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
