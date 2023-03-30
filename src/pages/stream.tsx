import { LEGAL_STAGES } from "@/constants/legalStages";
import CommonLayout from "@/layouts/CommonLayout";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { StageProps } from "./picker";
import Image from "next/image";
import StreamLayout from "@/layouts/StreamLayout";

export const Stage: React.FC<StageProps> = ({
  stageName,
  img,
  isBanned = false,
  width,
  height,
}) => {
  return (
    <div className={`${isBanned ? "opacity-10" : null}`}>
      <div className="w-full h-full">
        <Image
          alt={stageName}
          src={img}
          width={width}
          height={height}
          className="z-10 relative"
        />
      </div>
    </div>
  );
};

const Stream = () => {
  const { data, error, isLoading } = useQuery<{ bannedStages: string[] }>(
    "bannedStages",

    () => fetch(`/api/stream-bans`).then((res) => res.json()),
    { refetchInterval: 500 }
  );
  return (
    <StreamLayout>
      <div className="flex ">
        {LEGAL_STAGES.map((legalStage) => (
          <Stage
            readonly
            key={legalStage.id}
            //   onClick={handleStageBan}
            stageName={legalStage.stageName}
            showLabel={false}
            img={legalStage.img}
            isBanned={data?.bannedStages.includes(legalStage.stageName)}
            width={150}
            height={150}
          />
        ))}
      </div>
    </StreamLayout>
  );
};

export default Stream;
