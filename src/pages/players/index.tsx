import CommonLayout from "@/layouts/CommonLayout";
import { useRouter } from "next/router";
import React, { useState } from "react";

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
      <form onSubmit={handleSubmit} className=" flex flex-col gap-4">
        <label htmlFor="PlayerOne">Player One</label>
        <input
          className="text-black"
          id="PlayerOne"
          value={playerOne}
          onChange={(e) => setPlayerOne(e.currentTarget.value)}
        />
        <label htmlFor="PlayerTwo">Player Two</label>
        <input
          className="text-black"
          id="PlayerTwo"
          value={playerTwo}
          onChange={(e) => setPlayerTwo(e.currentTarget.value)}
        />
        <button className="bg-black p-4 rounder-md" type="submit">
          Continue
        </button>
      </form>
    </CommonLayout>
  );
};

export default Players;
