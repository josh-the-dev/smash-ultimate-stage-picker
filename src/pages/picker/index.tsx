import Image from "next/image";
import { useEffect, useState } from "react";
import { LEGAL_STAGES } from "@/constants/legalStages";
import CommonLayout from "@/layouts/CommonLayout";
import { useRouter } from "next/router";
import Stage from "@/components/Stage";

export default function Home() {
  const [bannedStages, setBannedStages] = useState<string[]>([]);
  const [numberOfSetGames] = useState(5);
  const [selectedStage, setSelectedStage] = useState<{
    img: string;
    name: string;
  } | null>();
  const [setCount, setSetCount] = useState(0);
  const [banTurn, setBanTurn] = useState<1 | 2 | 3>(1);
  const [stageBansAllowed, setStageBansAllowed] = useState<3 | 4>(3);

  const router = useRouter();
  const resetState = async () => {
    if (confirm("Are you sure you wish to reset the stage bans?")) {
      if (router.query.id === "bb19e645-293e-4038-9283-c9ccdccfa6b7") {
        await fetch(`/api/stream-bans`, {
          method: "delete",
        });
      }
      router.push("/");
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
      if (router.query.id === "bb19e645-293e-4038-9283-c9ccdccfa6b7") {
        await fetch(`/api/stream-bans`, {
          method: "post",
          body: JSON.stringify({
            bannedStage: stageName,
          }),
        });
      }
    }
    // remove as it's already there
    else {
      setBannedStages((stages) => stages.filter((s) => s !== stageName));
    }
  };

  const handleStagePick = async (stageName: string) => {
    const legalStage = LEGAL_STAGES.find((l) => l.stageName === stageName);
    setSelectedStage({ img: legalStage!.img, name: legalStage!.stageName });
    if (router.query.id === "bb19e645-293e-4038-9283-c9ccdccfa6b7") {
      await fetch(`/api/stream-bans`, {
        method: "delete",
      });
    }
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
              <div
                key={legalStage.id}
                className=" col-span-2 col-start-2 justify-self-center"
              >
                <Stage
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
            <div
              key={legalStage.id}
              className=" col-span-2 justify-self-center"
            >
              <Stage
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
        onClick={resetState}
      >
        Reset
      </button>
    </CommonLayout>
  );
}
