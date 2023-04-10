import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";

import type { NextApiRequest, NextApiResponse } from "next";
import { GUID_TO_ID_MAPPER } from "./stream-bans";

const MAIN_STREAM_ID = "64345dec083892c50ade95aa";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await clientPromise;
  const id = req.query.id as keyof typeof GUID_TO_ID_MAPPER;
  const objectId = GUID_TO_ID_MAPPER[id];
  const setDetailsCollection = client
    .db("SmashStageDB")
    .collection("SetDetails");
  try {
    if (req.method === "DELETE") {
      await setDetailsCollection.updateOne(
        { _id: objectId },
        { $set: { bannedStages: [], players: [] } },
        { upsert: true }
      );
      return res.status(204).end();
    } else {
      const setDetailsInfo = await setDetailsCollection.find({}).toArray();
      const filteredSetDetails = setDetailsInfo.filter(
        (detail) => detail._id.toString() !== MAIN_STREAM_ID
      );
      const filteredSetDetailsDisplay = filteredSetDetails.map((set) => ({
        id: set._id,
        bannedStages: set.bannedStages,
        playerOne: set.players[0] || "",
        playerTwo: set.players[1] || "",
      }));
      return res.status(200).json(filteredSetDetailsDisplay);
    }
  } catch (e) {
    console.error(e);
  }
};
