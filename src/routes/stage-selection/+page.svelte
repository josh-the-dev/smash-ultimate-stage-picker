<script lang="ts">
	import { onMount } from 'svelte';
	import { io, Socket } from 'socket.io-client';
	import StageGrid from '../../components/StageGrid.svelte';
	import GameStatus from '../../components/GameStatus.svelte';
	import WinnerSelection from '../../components/WinnerSelection.svelte';
	import type { STAGE } from '../../types';
	import { stageList as initialStageList } from '../../data/stages';

	type Player = 1 | 2;
	type GamePhase = 'banning' | 'picking' | 'post-pick' | 'set-end';

	interface GameState {
		currentStageList: STAGE[];
		bannedStages: STAGE[];
		rpsWinner: Player | null;
		currentGame: number;
		currentBanCount: number;
		gamePhase: GamePhase;
		player1Wins: number;
		player2Wins: number;
	}

	let socket: Socket;
	let gameState: GameState;

	// $: banningPlayer = calculateBanningPlayer(gameState);
	// $: pickingPlayer = calculatePickingPlayer(gameState);

	function calculateBanningPlayer(state: GameState): Player {
		if (state.currentGame === 1) {
			return state.currentBanCount < 3 ? state.rpsWinner! : state.rpsWinner === 1 ? 2 : 1;
		}
		return state.rpsWinner!;
	}

	function calculatePickingPlayer(state: GameState): Player {
		return state.currentGame === 1 ? 1 : state.rpsWinner === 1 ? 2 : 1;
	}

	// function banStage(stageId: number) {
	// 	if (gameState.gamePhase === 'banning') {
	// 		socket.emit('banStage', { stageId, player: banningPlayer });
	// 	}
	// }

	function pickStage(stageId: number) {
		if (gameState.gamePhase === 'picking') {
			socket.emit('pickStage', stageId);
		}
	}

	function setWinner(player: Player) {
		if (gameState.gamePhase === 'post-pick') {
			socket.emit('setWinner', player);
		}
	}

	function resetSet() {
		socket.emit('reset');
	}

	onMount(() => {
		socket = io('https://socket.lunacity.be');

		socket.on('gameState', (newState: GameState) => {
			console.log(newState);
			gameState = newState;
		});

		socket.on('error', (errorMessage: string) => {
			console.error('Server error:', errorMessage);
			// Handle error (e.g., display to user)
		});

		return () => {
			socket.disconnect();
		};
	});
</script>

<!-- {#if gameState.gamePhase === 'set-end'}
	<div class="text-center mt-8">
		<h2 class="text-3xl text-white mb-4">Set Ended!</h2>
		<p class="text-2xl text-white mb-4">
			Player 1: {gameState.player1Wins} - Player 2: {gameState.player2Wins}
		</p>
		<p class="text-2xl text-white mb-8">
			{gameState.player1Wins > gameState.player2Wins ? 'Player 1' : 'Player 2'} wins the set!
		</p>
		<button class="py-2 bg-white px-4 rounded-md" on:click={resetSet}>Start New Set</button>
	</div>
{:else if gameState.gamePhase !== 'post-pick'}
	<div class="flex flex-col gap-4">
		<div class="bg-[#378169] mt-4 pb-4 pt-1 px-3 rounded-lg">
			<div class="flex justify-between items-center">
				<h3 class="font-pixelify text-2xl uppercase">Stage selection</h3>
			</div>
			<StageGrid
				stageList={initialStageList}
				availableStages={gameState.currentStageList}
				gamePhase={gameState.gamePhase}
				{banStage}
				{pickStage}
				{banningPlayer}
				currentGame={gameState.currentGame}
			/>
		</div>
		<GameStatus
			gamePhase={gameState.gamePhase}
			{banningPlayer}
			{pickingPlayer}
			currentGame={gameState.currentGame}
			player1Wins={gameState.player1Wins}
			player2Wins={gameState.player2Wins}
		/>
	</div>
{:else} -->
<WinnerSelection pickedStage={initialStageList[0]} {setWinner} />
<!-- {/if} -->
