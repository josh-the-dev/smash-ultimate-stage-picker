<script lang="ts">
	import type { GamePhase } from '../types';

	export let gamePhase: GamePhase;
	export let banningPlayer: number | null;
	export let pickingPlayer: number | null;
	export let currentGame: number;
	export let player1Wins: number;
	export let player2Wins: number;
</script>

<div class="text-white">
	<h2 class="text-2xl mb-2">
		Game {currentGame} of 5: Player 1 {player1Wins} - {player2Wins} Player 2
	</h2>
	<p class="text-xl">
		{#if gamePhase === 'banning'}
			Player {banningPlayer} bans
		{:else if gamePhase === 'picking'}
			Player {pickingPlayer} picks
		{:else if gamePhase === 'post-pick'}
			Waiting for game result
		{/if}
	</p>
</div>
