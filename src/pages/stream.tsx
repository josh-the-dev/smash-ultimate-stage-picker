import { LEGAL_STAGES } from "@/constants/legalStages";
import React from "react";
import { useQuery } from "react-query";
import StreamLayout from "@/layouts/StreamLayout";
import Stage from "@/components/Stage";

const Stream = () => {
  const { data } = useQuery<{ bannedStages: string[] }>(
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
