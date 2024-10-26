<script lang="ts">
	import { onMount } from 'svelte';
	import { io, Socket } from 'socket.io-client';
	import StageGrid from '../../components/StageGrid.svelte';
	import GameStatus from '../../components/GameStatus.svelte';
	import WinnerSelection from '../../components/WinnerSelection.svelte';
	import type { GameState } from '../../types';
	import { stageList } from '../../data/stages';
	import { redirect } from '@sveltejs/kit';

	let socket: Socket;
	let isConnecting = true;

	// Initialize with complete stage list
	let gameState: GameState = {
		currentStageList: [...stageList],
		bannedStages: [],
		currentBanningPlayer: null,
		currentGame: 1,
		currentBanCount: 0,
		gamePhase: 'banning',
		player1Wins: 0,
		player2Wins: 0,
		selectedStage: null
	};

	$: banningPlayer = calculateBanningPlayer(gameState);
	$: pickingPlayer = calculatePickingPlayer(gameState);

	function calculateBanningPlayer(state: GameState): number | null {
		if (!state.currentBanningPlayer) return null;
		if (state.currentGame === 1) {
			if (state.gamePhase === 'picking') {
				return state.currentBanningPlayer;
			}
			return state.currentBanCount < 3 ? state.currentBanningPlayer : state.currentBanningPlayer === 1 ? 2 : 1;
		}

		return state.currentBanningPlayer;
	}

	function calculatePickingPlayer(state: GameState): number | null {
		if (!state.currentBanningPlayer) return null;
		console.log(state.currentBanningPlayer);
		return state.currentGame === 1 ? 1 : state.currentBanningPlayer === 1 ? 2 : 1;
	}

	onMount(() => {
		socket = io('https://socket.lunacity.be');

		socket.on('connect', () => {
			isConnecting = false;
			socket.emit('requestState');
		});

		socket.once('gameOver', () => {
			window.location.href = '/';
			document.cookie = 'rpsWinner=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
		});

		socket.on('gameState', (newState: GameState) => {
			gameState = {
				...newState,
				currentStageList: newState.currentStageList.map((stage) => ({
					...stage,
					logo: stageList.find((s) => s.id === stage.id)?.logo || ''
				}))
			};
		});

		return () => {
			if (socket) socket.disconnect();
		};
	});

	function banStage(stageId: number) {
		if (gameState.gamePhase === 'banning') {
			socket.emit('banStage', { stageId, player: banningPlayer });
		}
	}

	function pickStage(stageId: number) {
		console.log('Im picking');
		if (gameState.gamePhase === 'picking') {
			socket.emit('pickStage', stageId);
		}
	}

	function resetGame() {
		socket.emit('reset');
	}
</script>

{#if isConnecting}
	<div class="text-center mt-8">
		<h2 class="text-3xl text-white mb-4">Connecting to server...</h2>
	</div>
{:else if gameState.gamePhase === 'banning' || gameState.gamePhase === 'picking'}
	<div class="flex flex-col gap-4">
		<StageGrid
			{stageList}
			availableStages={gameState.currentStageList}
			gamePhase={gameState.gamePhase}
			{banStage}
			{pickStage}
			{banningPlayer}
			currentGame={gameState.currentGame}
		/>
		<!-- <GameStatus
				gamePhase={gameState.gamePhase}
				{banningPlayer}
				{pickingPlayer}
				currentGame={gameState.currentGame}
				player1Wins={gameState.player1Wins}
				player2Wins={gameState.player2Wins}
			/> -->
	</div>
{:else if gameState.gamePhase === 'post-pick' && gameState.selectedStage}
	<WinnerSelection
		pickedStage={stageList.find((s) => s.id === gameState.selectedStage?.id)}
		setWinner={(player) => socket.emit('setWinner', player)}
	/>
{/if}
