import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import { LEGAL_STAGES } from "@/constants/legalStages";
import CommonLayout from "@/layouts/CommonLayout";

interface StageProps {
  stageName: string;
  img: string;
  onClick?: (stageName: string) => void;
  isBanned?: boolean;
  width: number;
  height: number;
  showLabel?: boolean;
  readonly?: boolean;
}

export const Stage: React.FC<StageProps> = ({
  stageName,
  img,
  onClick,
  showLabel = true,
  isBanned = false,
  readonly = false,
}) => {
  const handleClick = (stageName: string) => {
    if (onClick) {
      onClick(stageName);
    }
  };
  return (
    <div
      className={`${
        readonly ? null : "hover:cursor-pointer hover:opacity-10"
      }  w-fit ${isBanned ? "opacity-10" : null}`}
      onClick={() => handleClick(stageName)}
    >
      <Image alt={stageName} src={img} width={150} height={150} />
      {showLabel && (
        <p className="text-center font-bold text-sm">{stageName}</p>
      )}
    </div>
  );
};

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

  const resetState = () => {
    if (confirm("Are you sure you wish to reset the stage bans?")) {
      window.location.reload();
    }
  };

  const handleNextGame = () => {
    setSetCount((c) => c + 1);
    setSelectedStage(null);
    setBannedStages([]);
    setBanTurn(1);
    setStageBansAllowed(3);
  };

  const handleStageBan = (stageName: string) => {
    if (!bannedStages.includes(stageName)) {
      setBannedStages((stages) => [stageName, ...stages]);
    }
    // remove as it's already there
    else {
      setBannedStages((stages) => stages.filter((s) => s !== stageName));
    }
  };

  const handleStagePick = (stageName: string) => {
    const legalStage = LEGAL_STAGES.find((l) => l.stageName === stageName);
    setSelectedStage({ img: legalStage!.img, name: legalStage!.stageName });
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
      setSetCount(0);
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
          } gap-2 `}
        >
          {remainingStages.map((stage) => (
            <Stage
              key={stage.id}
              onClick={handleStagePick}
              stageName={stage.stageName}
              img={stage.img}
              width={200}
              height={200}
            />
          ))}
        </div>
      </CommonLayout>
    );
  }

  return (
    <CommonLayout>
      <h2 className="text-2xl md:text-7xl mb-4">Game {setCount + 1}</h2>
      <h3 className="text-2xl md:text-7xl mb-12">
        Ban phase {banTurn}: Ban {stageBansAllowed} stages
      </h3>
      <div className="grid grid-cols-3 gap-2">
        {LEGAL_STAGES.map((legalStage) => (
          <Stage
            key={legalStage.id}
            onClick={handleStageBan}
            stageName={legalStage.stageName}
            img={legalStage.img}
            isBanned={bannedStages.includes(legalStage.stageName)}
            width={150}
            height={150}
          />
        ))}
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
