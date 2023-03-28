import Image from "next/image";
import clientPromise from "../lib/mongodb";
import { useEffect, useState } from "react";
import { LEGAL_STAGES } from "@/constants/legalStages";
import CommonLayout from "@/layouts/CommonLayout";
import { InferGetServerSidePropsType } from "next";

export interface StageProps {
  stageName: string;
  img: string;
  onClick?: (stageName: string) => void;
  isBanned?: boolean;
  width: number;
  height: number;
  showLabel?: boolean;
  readonly?: boolean;
}

export async function getServerSideProps() {
  try {
    await clientPromise;
    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
}

const Stage: React.FC<StageProps> = ({
  stageName,
  img,
  onClick,
  showLabel = true,
  isBanned = false,
  readonly = false,
  width,
  height,
}) => {
  const handleClick = (stageName: string) => {
    if (onClick) {
      onClick(stageName);
    }
  };
  return (
    <div
      className={`${
        readonly ? null : "hover:cursor-pointer hover:opacity-10 w-full h-full"
      }  w-fit ${isBanned ? "opacity-10" : null}`}
      onClick={() => handleClick(stageName)}
    >
      <div className="w-full h-full relative">
        <div className="bg-black h-full w-full -rotate-2 absolute z-0 -translate-y-4 -translate-x-0.5" />
        {showLabel && (
          <p className="text-white  font-eras  text-xs absolute -translate-y-4 z-20">
            {stageName}
          </p>
        )}
        <Image
          alt={stageName}
          src={img}
          width={width}
          height={height}
          className="z-10 relative"
        />
        <div className="bg-white h-full w-full -rotate-2 absolute z-0 -translate-y-16 translate-x-2 " />
      </div>
    </div>
  );
};

export default function Home({
  isConnected,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [bannedStages, setBannedStages] = useState<string[]>([]);
  const [numberOfSetGames] = useState(5);
  const [selectedStage, setSelectedStage] = useState<{
    img: string;
    name: string;
  } | null>();
  const [setCount, setSetCount] = useState(0);
  const [banTurn, setBanTurn] = useState<1 | 2 | 3>(1);
  const [stageBansAllowed, setStageBansAllowed] = useState<3 | 4>(3);

  const resetState = async () => {
    if (confirm("Are you sure you wish to reset the stage bans?")) {
      window.location.reload();
      await fetch(`/api/stream-bans`, {
        method: "delete",
      });
    }
  };

  const handleNextGame = () => {
    setSetCount((c) => c + 1);
    setSelectedStage(null);
    setBannedStages([]);
    setBanTurn(1);
    setStageBansAllowed(3);
  };

  const handleStageBan = async (stageName: string) => {
    if (!bannedStages.includes(stageName)) {
      setBannedStages((stages) => [stageName, ...stages]);
      await fetch(`/api/stream-bans`, {
        method: "post",
        body: JSON.stringify({
          bannedStage: stageName,
        }),
      });
    }
    // remove as it's already there
    else {
      setBannedStages((stages) => stages.filter((s) => s !== stageName));
    }
  };

  const handleStagePick = async (stageName: string) => {
    const legalStage = LEGAL_STAGES.find((l) => l.stageName === stageName);
    setSelectedStage({ img: legalStage!.img, name: legalStage!.stageName });
    await fetch(`/api/stream-bans`, {
      method: "delete",
    });
  };

  // TODO: Evaluate removing use effects, temporary measure cause it "works"
  useEffect(() => {
    if (setCount === 0) {
      if (bannedStages.length === 3) {
        setBanTurn(2);
        setStageBansAllowed(4);
      }
      if (bannedStages.length === 7) {
        setBanTurn(3);
      }
    }
    if (setCount > 0) {
      if (bannedStages.length === 3) {
        setBanTurn(2);
      }
    }
    if (numberOfSetGames && setCount === numberOfSetGames) {
      // we've gone to the set count so lets reset stuff
      resetState();
    }
  }, [setCount, bannedStages, numberOfSetGames]);

  if (selectedStage) {
    return (
      <CommonLayout>
        <h2 className="text-2xl md:text-7xl mb-4">Game {setCount + 1}</h2>
        <h3 className="text-2xl md:text-7xl mb-14">The selected stage is: </h3>
        <p className=" text-center text-2xl font-bold mb-6">
          {selectedStage.name}
        </p>
        <Image
          src={selectedStage.img}
          alt="selected stage"
          height={300}
          width={300}
        />

        <button
          className="bg-white text-black p-6 rounded-xl mt-6"
          onClick={handleNextGame}
        >
          Next game
        </button>
      </CommonLayout>
    );
  }

  if ((setCount === 0 && banTurn === 3) || (setCount > 0 && banTurn === 2)) {
    const remainingStages = LEGAL_STAGES.filter(
      (l) => !bannedStages.includes(l.stageName)
    );
    return (
      <CommonLayout>
        <h2 className="text-2xl md:text-7xl mb-4">Game {setCount + 1}</h2>
        <h3 className="text-2xl md:text-7xl mb-14">
          Pick the stage to play on
        </h3>
        <div
          className={`grid ${
            setCount > 0 ? "grid-cols-3" : "grid-cols-2"
          } gap-4 `}
        >
          {remainingStages.map((stage) => (
            <Stage
              key={stage.id}
              onClick={handleStagePick}
              stageName={stage.stageName}
              img={stage.img}
              width={150}
              height={150}
            />
          ))}
        </div>
      </CommonLayout>
    );
  }

  return (
    <CommonLayout>
      <div className="relative">
        <Image
          src="/images/black_box.png"
          alt="title box"
          width={400}
          height={300}
        />

        <h2 className="text-5xl uppercase mb-4 font-eras absolute top-12 text-black right-20 skew-y-6">
          Game {setCount + 1}
        </h2>
        <h2 className="text-3xl font-eras absolute top-28 text-white right-6  ">
          phase {banTurn}
        </h2>
      </div>

      <h3 className="text-3xl md:text-7xl mb-8 -mt-6 text-black font-extrabold">
        Ban {stageBansAllowed} stages
      </h3>
      <div className="grid grid-cols-4 gap-2 gap-y-8 w-full">
        {LEGAL_STAGES.map((legalStage, index) => {
          if (index + 1 === LEGAL_STAGES.length) {
            return (
              <div className=" col-span-2 col-start-2 justify-self-center">
                <Stage
                  key={legalStage.id}
                  onClick={handleStageBan}
                  stageName={legalStage.stageName}
                  img={legalStage.img}
                  isBanned={bannedStages.includes(legalStage.stageName)}
                  width={125}
                  height={125}
                />
              </div>
            );
          }
          return (
            <div className=" col-span-2 justify-self-center">
              <Stage
                key={legalStage.id}
                onClick={handleStageBan}
                stageName={legalStage.stageName}
                img={legalStage.img}
                isBanned={bannedStages.includes(legalStage.stageName)}
                width={125}
                height={125}
              />
            </div>
          );
        })}
      </div>
      <button
        className="bg-white text-black p-6 rounded-xl mt-6"
        onClick={() => {
          resetState();
        }}
      >
        Reset
      </button>
    </CommonLayout>
  );
}
