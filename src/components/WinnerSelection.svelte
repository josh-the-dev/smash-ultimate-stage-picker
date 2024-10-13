<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { STAGE } from '../types';

	type Player = 1 | 2;

	export let pickedStage: STAGE;
	export let setWinner: (player: Player) => void;

	const handleWinner = (isWinner: boolean) => {};
</script>

<div class="flex flex-col items-center justify-center h-screen" transition:fade>
	<img src={pickedStage.logo} class="mb-8" alt={pickedStage.name} />
	<h2 class="text-3xl text-white mb-8">Did you win the game?</h2>
	<div class="flex gap-4">
		<button class="font-pixelify text-2xl bg-[#378169] text-white px-6 uppercase h-12" on:click={() => handleWinner(true)}> Yes </button>
		<button class="font-pixelify text-2xl bg-[#378169] text-white px-6 uppercase h-12" on:click={() => handleWinner(false)}> No </button>
	</div>
</div>
