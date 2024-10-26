<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { Stage } from '../types';

	// @ts-ignore
	import * as cookie from 'cookie';

	export let pickedStage: Stage | undefined;
	export let setWinner: (player: number) => void;

	const handleWinner = (isWinner: boolean) => {
		const cookies = cookie.parse(document.cookie);
		const playerNumberCookie = cookies['playerNumber'];
		const parsedPlayerNumber = parseInt(playerNumberCookie, 10);

		if (isWinner) {
			// Declare the current player as the winner
			setWinner(parsedPlayerNumber);
		} else {
			// Declare the other player as the winner
			const otherPlayer = parsedPlayerNumber === 1 ? 2 : 1;
			console.log('here');
			setWinner(otherPlayer);
		}
	};
</script>

<div class="flex flex-col items-center justify-center h-screen" transition:fade>
	<img src={pickedStage?.logo} class="mb-8" alt={pickedStage?.name} />
	<h2 class="text-3xl text-white mb-8">Did you win the game?</h2>
	<div class="flex gap-4">
		<button class="font-pixelify text-2xl bg-[#378169] text-white px-6 uppercase h-12" on:click={() => handleWinner(true)}> Yes </button>
		<button class="font-pixelify text-2xl bg-[#378169] text-white px-6 uppercase h-12" on:click={() => handleWinner(false)}> No </button>
	</div>
</div>
