import CommonLayout from "@/layouts/CommonLayout";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import EnterTagImage from "../../../public/images/logos/enter-tag.png";

const Players = () => {
  const [playerOne, setPlayerOne] = useState("");
  const [playerTwo, setPlayerTwo] = useState("");
  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await fetch(`/api/stream-bans?id=${router.query.id}`, {
      method: "post",
      body: JSON.stringify({
        players: [playerOne, playerTwo],
      }),
    });
    router.push(`/picker?id=${router.query.id}`);
  };

  return (
    <CommonLayout>
      <Image src={EnterTagImage} alt="Enter tag logo" />
      <p className="text-black text-2xl font-eras font-bold mx-8 mb-8">
        This updates your name on the quad stream and automates the VOD process,
        so please enter your correct tag! :)
      </p>
      <form onSubmit={handleSubmit} className=" flex flex-col gap-4">
        <label htmlFor="PlayerOne" className="font-eras font-bold text-2xl">
          Player 1
        </label>
        <input
          className="text-black rounded-sm border-2 border-black"
          id="PlayerOne"
          value={playerOne}
          onChange={(e) => setPlayerOne(e.currentTarget.value)}
        />
        <label htmlFor="PlayerTwo" className="font-eras font-bold text-2xl">
          Player 2
        </label>
        <input
          className="text-black rounded-sm border-2 border-black"
          id="PlayerTwo"
          value={playerTwo}
          onChange={(e) => setPlayerTwo(e.currentTarget.value)}
        />
        <button className="bg-black p-4 rounder-md mt-4" type="submit">
          Go
        </button>
      </form>
    </CommonLayout>
  );
};

export default Players;
