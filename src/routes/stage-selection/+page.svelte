<script lang="ts">
	import { onMount } from 'svelte';
	import { io, Socket } from 'socket.io-client';
	import StageGrid from '../../components/StageGrid.svelte';
	import GameStatus from '../../components/GameStatus.svelte';
	import WinnerSelection from '../../components/WinnerSelection.svelte';
	import type { STAGE } from '../../types';
	import { stageList as initialStageList } from '../../data/stages';
	import Arrow from '$lib/assets/Arrow.png';
	import LineMark from '$lib/assets/LineMark.png';
	import SelectedBF from '$lib/assets/selected-stages/Selected_BF.png';
	import SelectedHb from '$lib/assets/selected-stages/Selected_HBastion.png';
	import SelectedKalos from '$lib/assets/selected-stages/Selected_Kalos.png';
	import MinusAndClose from '$lib/assets/minus_and_x.png';

	// @ts-ignore
	import * as cookie from 'cookie';

	type Player = 1 | 2;

	let socket: Socket;
	let availableStages: STAGE[] = [...initialStageList]; // Initialize with all stages
	let bannedStages: STAGE[] = [];
	let currentGame = 1;
	let currentBanCount = 0;
	let gameState: 'banning' | 'picking' | 'post-pick' | 'series-end' = 'banning';
	let pickedStage: STAGE | null = null;
	let lastWinner: Player | null = null;
	let player1Wins = 0;
	let player2Wins = 0;

	$: banningPlayer = calculateBanningPlayer(currentGame, currentBanCount, lastWinner);
	$: pickingPlayer = calculatePickingPlayer(currentGame, lastWinner);

	function calculateBanningPlayer(game: number, banCount: number, winner: Player | null): Player {
		if (game === 1) {
			return banCount < 3 ? winner! : winner === 1 ? 2 : 1;
		}
		return winner!;
	}

	function calculatePickingPlayer(game: number, winner: Player | null): Player {
		if (game === 1) return 1;
		return winner === 1 ? 2 : 1;
	}

	function banStage(stageId: number) {
		if (gameState === 'banning' && !isStageBanned(stageId)) {
			socket.emit('banStage', { stageId, player: banningPlayer });
			// Immediately update local state
			availableStages = availableStages.filter((stage) => stage.id !== stageId);
			bannedStages = [...bannedStages, initialStageList.find((stage) => stage.id === stageId)!];
			currentBanCount++;
			if ((currentGame === 1 && currentBanCount === 7) || (currentGame > 1 && currentBanCount === 3)) {
				gameState = 'picking';
			}
		}
	}

	function pickStage(stageId: number) {
		if (gameState === 'picking' && !isStageBanned(stageId)) {
			pickedStage = initialStageList.find((stage) => stage.id === stageId) || null;
			socket.emit('pickStage', stageId);
			gameState = 'post-pick';
		}
	}

	function setWinner(player: Player) {
		lastWinner = player;
		if (player === 1) {
			player1Wins++;
		} else {
			player2Wins++;
		}

		if (player1Wins === 3 || player2Wins === 3) {
			gameState = 'series-end';
		} else {
			currentGame++;
			resetGameState();
		}
	}

	function resetGameState() {
		currentBanCount = 0;
		gameState = 'banning';
		availableStages = [...initialStageList]; // Reset available stages
		bannedStages = []; // Reset banned stages
		socket.emit('reset');
	}

	function resetAll() {
		currentGame = 1;
		lastWinner = null;
		player1Wins = 0;
		player2Wins = 0;
		gameState = 'banning';
		resetGameState();
	}

	function isStageBanned(stageId: number) {
		return !availableStages.some((stage) => stage.id === stageId);
	}

	onMount(() => {
		// Connect to the Socket.IO server
		socket = io('https://socket.lunacity.be');

		// Handle updates from the server
		socket.on('stageList', (data) => {
			availableStages = data.stageList.map((stage: STAGE) => {
				const fullStage = initialStageList.find((s) => s.id === stage.id);
				return { ...stage, logo: fullStage ? fullStage.logo : '' };
			});
			bannedStages = data.bannedStages;
		});

		socket.on('stagePicked', (pickedStage) => {
			// Handle final stage selection (e.g., start the game)
		});

		const cookies = cookie.parse(document.cookie);
		lastWinner = cookies['rpsWinner'];
		return () => {
			socket.disconnect(); // Clean up on component unmount
		};
	});

	const images = [SelectedBF, SelectedHb, SelectedKalos, SelectedBF, SelectedBF];
</script>

{#if gameState === 'series-end'}
	<div class="text-center mt-8">
		<h2 class="text-3xl text-white mb-4">Series Ended!</h2>
		<p class="text-2xl text-white mb-4">
			Player 1: {player1Wins} - Player 2: {player2Wins}
		</p>
		<p class="text-2xl text-white mb-8">
			{player1Wins > player2Wins ? 'Player 1' : 'Player 2'} wins the series!
		</p>
		<button class="py-2 bg-white px-4 rounded-md" on:click={resetAll}>Start New Series</button>
	</div>
{:else if gameState !== 'post-pick'}
	<div class="flex flex-col gap-4">
		<div class="bg-[#378169] mt-4 pb-4 pt-1 px-3 rounded-lg">
			<div class="flex justify-between items-center">
				<h3 class="font-pixelify text-2xl uppercase">Stage selection</h3>
				<img src={MinusAndClose} class="h-4 mr-2" alt="minue and close" />
			</div>
			<StageGrid stageList={initialStageList} {availableStages} {gameState} {banStage} {pickStage} {banningPlayer} />
		</div>
		<div class="flex gap-8 items-center justify-center relative w-full">
			<div class="flex flex-col gap-6">
				<div class=" border border-[#378169] px-4 py-2 text-center">
					<h3 class="font-pixelify uppercase text-xl text-[#378169]">Best of 3</h3>
				</div>
				<div class="bg-[#378169] px-4 py-2 text-center">
					<h3 class="font-pixelify uppercase text-xl">Best of 5</h3>
				</div>
			</div>
			<div class="px-4 border-4 rounded-md py-10 border-[#378169] flex gap-8">
				{#each images as image, i}
					<div class="flex items-center gap-8">
						<!-- <img src={LineMark} alt="line" class="h-3 w-24" /> -->
						<img src={image} alt="stage" class="h-10 w-14" />
						{#if i < images.length - 1}
							<img src={Arrow} alt="arrow" class="h-8" />
						{/if}
					</div>
				{/each}
			</div>
			<!-- Button with absolute positioning on the right -->
			<button class="font-pixelify text-2xl bg-[#378169] px-6 uppercase h-12 absolute right-8" on:click={resetAll}> Reset </button>
		</div>
	</div>

	<!-- <GameStatus {gameState} {banningPlayer} {pickingPlayer} {currentGame} {player1Wins} {player2Wins} /> -->
{:else}
	<WinnerSelection {pickedStage} {setWinner} />
{/if}
