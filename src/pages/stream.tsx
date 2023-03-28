import { LEGAL_STAGES } from "@/constants/legalStages";
import CommonLayout from "@/layouts/CommonLayout";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { Stage } from ".";

const Stream = () => {
  const clientUrl = process.env.CLIENT_URL;
  const { data, error, isLoading } = useQuery<{ bannedStages: string[] }>(
    "bannedStages",

    () => fetch(`${clientUrl}/api/stream-bans`).then((res) => res.json()),
    { refetchInterval: 500 }
  );
  return (
    <CommonLayout>
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
    </CommonLayout>
  );
};

export default Stream;
