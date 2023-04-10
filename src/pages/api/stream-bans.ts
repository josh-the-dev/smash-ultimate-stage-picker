import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";

import type { NextApiRequest, NextApiResponse } from "next";

// Given I use GUIDs on the client and object IDs in the backend, need to map.
export const GUID_TO_ID_MAPPER = {
  // Main stream
  "bb19e645-293e-4038-9283-c9ccdccfa6b7": new ObjectId(
    "64345dec083892c50ade95aa"
  ),
  // Setup One
  "17b65c47-0569-4737-b462-00b447a8d541": new ObjectId(
    "64345e22083892c50ade95ac"
  ),
  // Setup two
  "194a72d2-877a-4996-b49f-dc0ed53e27d1": new ObjectId(
    "64345e26083892c50ade95ad"
  ),
  // Setup three
  "82cff7e4-ef12-48d5-b3a1-be998154ef2c": new ObjectId(
    "64345e2a083892c50ade95ae"
  ),
  // Setup four
  "e699d052-41a1-473c-84e9-1f79c0ca786f": new ObjectId(
    "64345e2e083892c50ade95af"
  ),
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await clientPromise;
  try {
    const id = req.query.id as keyof typeof GUID_TO_ID_MAPPER;
    const objectId = GUID_TO_ID_MAPPER[id];
    const setDetailsCollection = await client
      .db("SmashStageDB")
      .collection("SetDetails");

    const setDetails = await setDetailsCollection.findOne<{
      _id: string;
      bannedStages: string[];
      players: string[];
    }>({ _id: objectId });

    const { bannedStages, players } = setDetails!;
    switch (req.method) {
      case "POST":
        const requestJson = JSON.parse(req.body);
        if (requestJson.players) {
          await setDetailsCollection.updateOne(
            { _id: objectId },
            { $set: { players: requestJson.players } },
            { upsert: true }
          );
          return res.status(204).end();
        } else {
          const updatedBannedStages = [
            requestJson.bannedStage,
            ...bannedStages,
          ];
          await setDetailsCollection.updateOne(
            { _id: objectId },
            { $set: { bannedStages: updatedBannedStages } },
            { upsert: true }
          );
        }
        return res.status(204).end();
      case "DELETE":
        await setDetailsCollection.updateOne(
          { _id: objectId },
          { $set: { bannedStages: [] } },
          { upsert: true }
        );
        return res.status(204).end();
      default:
        return res.status(200).json({ bannedStages: bannedStages });
    }
  } catch (e) {
    console.error(e);
  }
};
