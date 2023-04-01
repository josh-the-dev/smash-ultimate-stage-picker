import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";

import type { NextApiRequest, NextApiResponse } from "next";

// THIS IS GONNA BE HACKY AND USE A FIXED ID. THIS IS NOT FUTUREPROOF AND JUST FOR THE ONE EVENT UPCOMING

const id = "64232a0b0aaf54d049e5c1c2";
const objectId = new ObjectId(id);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await clientPromise;
  try {
    const bannedStagesCollection = await client
      .db("SmashStageDB")
      .collection("BannedStages");
    const stageBans = await bannedStagesCollection.findOne<{
      _id: ObjectId;
      bannedStages: string[];
    }>({ _id: objectId });
    const bannedStages = stageBans?.bannedStages;
    if (req.method === "POST") {
      const requestJson = JSON.parse(req.body);
      const updatedBannedStages = [requestJson.bannedStage, ...bannedStages!];
      await bannedStagesCollection.updateOne(
        { _id: objectId },
        { $set: { bannedStages: updatedBannedStages } },
        { upsert: true }
      );
      return res.status(204).end();
    }
    if (req.method === "DELETE") {
      await bannedStagesCollection.updateOne(
        { _id: objectId },
        { $set: { bannedStages: [] } },
        { upsert: true }
      );
      return res.status(204).end();
    } else {
      return res.status(200).json({ bannedStages: bannedStages });
    }
  } catch (e) {
    console.error(e);
  }
};
