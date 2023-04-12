import Image from "next/image";
import { useState } from "react";
import { LEGAL_STAGES } from "@/constants/legalStages";
import CommonLayout from "@/layouts/CommonLayout";
import { useRouter } from "next/router";
import Stage from "@/components/Stage";
import PickerHeader from "@/components/PickerHeader";

export default function Home() {
  const [bannedStages, setBannedStages] = useState<string[]>([]);
  const [selectedStage, setSelectedStage] = useState<{
    img: string;
    name: string;
  } | null>();
  const [setCount, setSetCount] = useState(0);

  const router = useRouter();

  const resetState = async () => {
    if (router.query.id) {
      await fetch(`/api/set-details?id=${router.query.id}`, {
        method: "delete",
      });
    }
    router.push("/");
  };

  const numberOfSetGames = 5;
  let banTurn = 1;
  let stageBansAllowed = 3;
  let isPickPhase = false;

  if (setCount > 0 && bannedStages.length >= 3) {
    banTurn = 2;
  } else if (setCount === 0 && bannedStages.length >= 7) {
    banTurn = 3;
  } else if (setCount === 0 && bannedStages.length >= 3) {
    stageBansAllowed = 4;
    banTurn = 2;
  }

  if ((setCount === 0 && banTurn === 3) || (setCount >= 1 && banTurn === 2)) {
    isPickPhase = true;
  }

  let subtitle = "";

  if (selectedStage) {
    subtitle = "The selected stage is:";
  } else if (isPickPhase) {
    subtitle = "Pick the stage to play on";
  } else {
    subtitle = `Ban ${stageBansAllowed} stages`;
  }

  if (setCount >= numberOfSetGames) {
    resetState();
  }

  const handleNextGame = async () => {
    if (router.query.id) {
      await fetch(`/api/stream-bans?id=${router.query.id}`, {
        method: "delete",
      });
    }
    setSetCount((c) => c + 1);
    setSelectedStage(null);
    setBannedStages([]);
    banTurn = 1;
    stageBansAllowed = 3;
  };

  const handleStageBan = async (stageName: string) => {
    if (!bannedStages.includes(stageName)) {
      setBannedStages((stages) => [stageName, ...stages]);
      if (router.query.id) {
        await fetch(`/api/stream-bans?id=${router.query.id}`, {
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
    if (router.query.id) {
      await fetch(`/api/stream-bans?id=${router.query.id}`, {
        method: "post",
        body: JSON.stringify({
          pickedStage: stageName,
        }),
      });
    }
    const legalStage = LEGAL_STAGES.find((l) => l.stageName === stageName);

    setSelectedStage({ img: legalStage!.img.src, name: legalStage!.stageName });
  };

  const handleStageClick = async (stageName: string) => {
    if (isPickPhase) {
      await handleStagePick(stageName);
    } else {
      await handleStageBan(stageName);
    }
  };
  let setupTitle = "Stream";

  switch (router.query.id) {
    case "17b65c47-0569-4737-b462-00b447a8d541":
      setupTitle = "Quad 1";
      break;
    case "194a72d2-877a-4996-b49f-dc0ed53e27d1":
      setupTitle = "Quad 2";
      break;
    case "82cff7e4-ef12-48d5-b3a1-be998154ef2c":
      setupTitle = "Quad 3";
      break;
    case "e699d052-41a1-473c-84e9-1f79c0ca786f":
      setupTitle = "Quad 4";
      break;
    default:
      break;
  }
  return (
    <CommonLayout>
      {router.query.id && (
        <div className="fixed top-0 right-0">
          <Image
            src="/images/top_box.png"
            alt="title box"
            width={150}
            height={150}
          />

          <h2 className="text-base  mb-4 font-eras absolute top-2 right-12 text-black -skew-y-6">
            {setupTitle}
          </h2>
        </div>
      )}
      <div className="mt-2">
        <PickerHeader
          mainHeader={`Game ${setCount + 1}`}
          subHeader={`Phase ${banTurn}`}
        />
      </div>
      <h3 className="text-3xl md:text-7xl mb-8 -mt-2 text-black font-extrabold font-eras">
        {subtitle}
      </h3>
      {selectedStage && (
        <>
          <p className=" text-center text-2xl font-bold mb-6 font-eras">
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
        </>
      )}
      {!selectedStage && (
        <>
          <div className="grid grid-cols-4 gap-2 gap-y-8 w-full">
            {LEGAL_STAGES.map((legalStage, index) => {
              return (
                <div
                  key={legalStage.id}
                  className={`col-span-2 justify-self-center ${
                    index + 1 === LEGAL_STAGES.length ? "col-start-2" : null
                  }`}
                >
                  <Stage
                    onClick={handleStageClick}
                    stageName={legalStage.stageName}
                    img={legalStage.img.src}
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
        </>
      )}
    </CommonLayout>
  );
}
