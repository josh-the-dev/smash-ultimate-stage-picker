<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { STAGE } from '../types';

	type Player = 1 | 2;

	export let pickedStage: STAGE | null;
	export let setWinner: (player: Player) => void;
</script>

<div class="flex flex-col items-center justify-center h-screen" transition:fade>
	{#if pickedStage}
		<img src={pickedStage.logo} class="h-64 w-64 mb-8" alt={pickedStage.name} />
		<h2 class="text-3xl text-white mb-8">Who won the game?</h2>
		<div class="flex gap-4">
			<button class="py-2 bg-red-500 text-white px-4 rounded-md" on:click={() => setWinner(1)}>
				Player 1
			</button>
			<button class="py-2 bg-blue-500 text-white px-4 rounded-md" on:click={() => setWinner(2)}>
				Player 2
			</button>
		</div>
	{:else}
		<h2 class="text-3xl text-white mb-8">No stage selected.</h2>
	{/if}
</div>
