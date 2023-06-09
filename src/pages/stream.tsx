import { LEGAL_STREAM_STAGES } from "@/constants/legalStages";
import React from "react";
import { useQuery } from "react-query";
import StreamLayout from "@/layouts/StreamLayout";
import { StreamStage } from "@/components/Stage";

const Stream = () => {
  const { data } = useQuery<{ bannedStages: string[]; pickedStage: string }>(
    "bannedStages",

    () =>
      fetch(`/api/stream-bans?id=bb19e645-293e-4038-9283-c9ccdccfa6b7`).then(
        (res) => res.json()
      ),
    { refetchInterval: 500 }
  );
  console.log(data);
  const legalStagesBottom: typeof LEGAL_STREAM_STAGES = [];
  const legalStagesTop: typeof LEGAL_STREAM_STAGES = [];
  LEGAL_STREAM_STAGES.forEach((legalStage, i) => {
    if (i % 2 === 0) {
      legalStagesBottom.push(legalStage);
    } else {
      legalStagesTop.push(legalStage);
    }
  });
  return (
    <StreamLayout>
      <div className="bg-no-repeat bg-auto bg-center bg-fixed  w-full h-full bg-[url('../../public/images/stages/stream/cardboard.png')]">
        <div className="flex  ml-60 pt-8">
          {legalStagesTop.map((legalStage) => (
            <StreamStage
              key={legalStage.id}
              stageName={legalStage.stageName}
              img={
                data?.bannedStages.includes(legalStage.stageName)
                  ? legalStage.bannedImg
                  : legalStage.img
              }
              isPicked={legalStage.stageName === data?.pickedStage}
              className={`z-${legalStage.index}`}
              width={150}
              bannedCross={legalStage.crossImg}
              isBanned={data?.bannedStages.includes(legalStage.stageName)}
            />
          ))}
        </div>
        <div className="flex ml-8 -mt-24 mb-0">
          {legalStagesBottom.map((legalStage) => (
            <StreamStage
              key={legalStage.id}
              stageName={legalStage.stageName}
              isPicked={legalStage.stageName === data?.pickedStage}
              img={
                data?.bannedStages.includes(legalStage.stageName)
                  ? legalStage.bannedImg
                  : legalStage.img
              }
              bannedCross={legalStage.crossImg}
              isBanned={data?.bannedStages.includes(legalStage.stageName)}
            />
          ))}
        </div>
      </div>
    </StreamLayout>
  );
};

export default Stream;
