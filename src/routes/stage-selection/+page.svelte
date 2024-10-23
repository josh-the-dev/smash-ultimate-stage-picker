<script lang="ts">
	import { onMount } from 'svelte';
	import { io, Socket } from 'socket.io-client';
	import StageGrid from '../../components/StageGrid.svelte';
	import GameStatus from '../../components/GameStatus.svelte';
	import WinnerSelection from '../../components/WinnerSelection.svelte';
	import type { GamePhase, GameState, Player, Stage } from '../../types';
	import { stageList } from '../../data/stages';

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
		player2Wins: 0
	};

	$: banningPlayer = calculateBanningPlayer(gameState);
	$: pickingPlayer = calculatePickingPlayer(gameState);

	function calculateBanningPlayer(state: GameState): number | null {
		if (!state.currentBanningPlayer) return null;

		if (state.currentGame === 1) {
			return state.currentBanCount < 3 ? state.currentBanningPlayer : state.currentBanningPlayer === 1 ? 2 : 1;
		}
		return state.currentBanningPlayer;
	}

	function calculatePickingPlayer(state: GameState): number | null {
		if (!state.currentBanningPlayer) return null;

		return state.currentGame === 1 ? 1 : state.currentBanningPlayer === 1 ? 2 : 1;
	}

	onMount(() => {
		socket = io('http://localhost:3000', {
			transports: ['websocket'],
			reconnection: true
		});

		socket.on('connect', () => {
			console.log('Connected to server');
			isConnecting = false;
			socket.emit('requestState');
		});

		socket.on('gameState', (newState: GameState) => {
			console.log('Received game state:', newState);
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
		console.log('I am here');
		console.log(stageId);
		if (gameState.gamePhase === 'banning') {
			socket.emit('banStage', { stageId, player: banningPlayer });
		}
	}

	function pickStage(stageId: number) {
		if (gameState.gamePhase === 'picking') {
			socket.emit('pickStage', stageId);
		}
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
		<GameStatus
			gamePhase={gameState.gamePhase}
			{banningPlayer}
			{pickingPlayer}
			currentGame={gameState.currentGame}
			player1Wins={gameState.player1Wins}
			player2Wins={gameState.player2Wins}
		/>
	</div>
{:else if gameState.gamePhase === 'post-pick'}
	<WinnerSelection pickedStage={gameState.currentStageList[0]} setWinner={(player) => socket.emit('setWinner', player)} />
{/if}
