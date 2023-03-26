import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";

const LEGAL_STAGES = [
  {
    id: 1,
    stageName: "Battlefield",
    img: "/images/stages/battlefield.webp",
  },
  {
    id: 2,
    stageName: "Final Destination",
    img: "/images/stages/final-destination.jpg",
  },
  {
    id: 3,
    stageName: "Small Battlefield",
    img: "/images/stages/small-battlefield.jpg",
  },
  {
    id: 4,
    stageName: "Town And City",
    img: "/images/stages/town-and-city.webp",
  },
  {
    id: 5,
    stageName: "Kalos",
    img: "/images/stages/kalos.webp",
  },
  {
    id: 6,
    stageName: "Hollow Bastion",
    img: "/images/stages/hollow-bastion.jpg",
  },
  {
    id: 7,
    stageName: "Pokemon Stadium Two",
    img: "/images/stages/pokemon-stadium-2.webp",
  },
  {
    id: 8,
    stageName: "Smashville",
    img: "/images/stages/smashville.webp",
  },
  {
    id: 9,
    stageName: "Yoshis Story",
    img: "/images/stages/yoshis-story.webp",
  },
];

interface StageProps {
  stageName: string;
  img: string;
  onClick: (stageName: string) => void;
  isBanned?: boolean;
}

const Stage: React.FC<StageProps> = ({
  stageName,
  img,
  onClick,
  isBanned = false,
}) => {
  const handleClick = (stageName: string) => {
    onClick(stageName);
  };

  return (
    <div
      className={`hover:cursor-pointer hover:opacity-10 w-fit ${
        isBanned ? "opacity-10" : null
      }`}
      onClick={() => handleClick(stageName)}
    >
      <Image alt={stageName} src={img} width={150} height={150} />
    </div>
  );
};

export default function Home() {
  const [bannedStages, setBannedStages] = useState<string[]>([]);
  const [numberOfSetGames, setNumberOfSetGames] = useState<3 | 5 | null>();
  const [selectedStage, setSelectedStage] = useState<{
    img: string;
    name: string;
  } | null>();
  const [setCount, setSetCount] = useState(0);
  const [banTurn, setBanTurn] = useState<1 | 2 | 3>(1);
  const [stageBansAllowed, setStageBansAllowed] = useState<3 | 4>(3);

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
    console.log(setCount);
    console.log(numberOfSetGames);
    if (numberOfSetGames && setCount === numberOfSetGames) {
      // we've gone to the set count so lets reset stuff
      setNumberOfSetGames(null);
      setSetCount(0);
    }
  }, [setCount, bannedStages, numberOfSetGames]);

  if (selectedStage) {
    return (
      <>
        <div>THE STAGE IS:</div>
        <Image
          src={selectedStage.img}
          alt="selected stage"
          height={300}
          width={300}
        />
        <p>{selectedStage.name}</p>

        <button className="bg-white text-black" onClick={handleNextGame}>
          Next game
        </button>
      </>
    );
  }

  if ((setCount === 0 && banTurn === 3) || (setCount > 0 && banTurn === 2)) {
    const remainingStages = LEGAL_STAGES.filter(
      (l) => !bannedStages.includes(l.stageName)
    );
    return (
      <>
        <h3>Pick the stage to play on</h3>
        <div className="grid grid-cols-3 gap-2">
          {remainingStages.map((stage) => (
            <Stage
              key={stage.id}
              onClick={handleStagePick}
              stageName={stage.stageName}
              img={stage.img}
            />
          ))}
        </div>
      </>
    );
  }

  // We can assume we're going into stage bans.
  if (numberOfSetGames) {
    return (
      <>
        <h3>
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
            />
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h2 className="text-2xl mb-4 md:text-7xl">
          Smash Ultimate Stage Selector
        </h2>
        <h3>Is it best of 3 or 5?</h3>
        <div className="flex gap-4">
          <button
            onClick={() => setNumberOfSetGames(3)}
            className="bg-white text-black"
          >
            Best of 3
          </button>
          <button
            onClick={() => setNumberOfSetGames(3)}
            className="bg-white text-black"
          >
            Best of 5
          </button>
        </div>
      </main>
    </>
  );
}
