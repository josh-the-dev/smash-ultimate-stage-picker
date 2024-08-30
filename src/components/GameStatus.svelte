<script lang="ts">
	export let gameState: string;
	export let banningPlayer: number;
	export let pickingPlayer: number;
	export let currentGame: number;
	export let player1Wins: number;
	export let player2Wins: number;
</script>

<div class="text-white">
	<h2 class="text-2xl mb-2">
		Game {currentGame} of 5: Player 1 {player1Wins} - {player2Wins} Player 2
	</h2>
	<p class="text-xl">
		{#if gameState === 'banning'}
			Player {banningPlayer} bans
		{:else}
			Player {pickingPlayer} picks
		{/if}
	</p>
</div>
