import { LEGAL_STAGES } from "@/constants/legalStages";
import CommonLayout from "@/layouts/CommonLayout";
import React, { useState } from "react";
import { Stage } from ".";

const Stream = () => {
  const [bannedStages, setBannedStages] = useState<string[]>([]);
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
            isBanned={bannedStages.includes(legalStage.stageName)}
            width={150}
            height={150}
          />
        ))}
      </div>
    </CommonLayout>
  );
};

export default Stream;
