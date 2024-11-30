<script lang="ts">
	import { onMount } from 'svelte';
	import { io, Socket } from 'socket.io-client';
	import StageGrid from '../../components/StageGrid.svelte';
	import GameStatus from '../../components/GameStatus.svelte';
	import WinnerSelection from '../../components/WinnerSelection.svelte';
	import type { GameState } from '../../types';
	import { stageList } from '../../data/stages';
	import skipBanningButton from '$lib/assets/SkipBanningButton.png';
	import returnButton from '$lib/assets/Return_button.png';
	import minusAndXImage from '$lib/assets/minus_and_x.png';

	let socket: Socket;
	let isConnecting = true;

	let showGentlemanButton = true;

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

	$: isGentleman = false;
	$: banningPlayer = calculateBanningPlayer(gameState);

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


	onMount(() => {
		socket = io('https://socket.lunacity.be');

		socket.on('connect', () => {
			isConnecting = false;
			socket.emit('requestState');
		});

		socket.once('resetState', () => {
			window.location.href = '/';
			document.cookie = 'rpsWinner=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
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
			
			if(gameState.gamePhase === "picking" && !isGentleman) {
				showGentlemanButton = false
				return
			}
			showGentlemanButton = true
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
		isGentleman = false;
		if (gameState.gamePhase === 'picking') {
			socket.emit('pickStage', stageId);
		}
	}

	function skipBanning () {
		if(gameState.gamePhase === "picking" ){
			isGentleman = false;
			socket.emit("returnToBan")
			return
		} 
		socket.emit('skipBan')
		isGentleman = true;
	}


	// @ts-ignore
	import * as cookie from 'cookie';



	// Parse cookies on component initialization
	if (typeof document !== 'undefined') {
		const cookies = cookie.parse(document.cookie);
		const setupCookie = cookies['setup'];
		
		// Hide logo if setup cookie is set
		if (setupCookie) {
			showGentlemanButton = false;
		}

	}
</script>

{#if isConnecting}
	<div class="text-center mt-8">
		<h2 class="text-3xl text-white mb-4 ">Connecting to server...</h2>
	</div>
{:else if gameState.gamePhase === 'banning' || gameState.gamePhase === 'picking'}
	{#if showGentlemanButton}	
		<button class="absolute top-14 right-24" type="button" on:click={skipBanning}>
			<img src={gameState.gamePhase === "picking" ? returnButton: skipBanningButton} alt="skipBanning"  class="h-12" width={200} />
		</button>
	{/if}
	<div class={`flex flex-col  ${isGentleman ? "bg-[#6A3781]" : "bg-[#378169]"} py-2 pb-4 px-4 rounded-md`}>
		<div class="flex justify-between items-center">
			<p class="font-pixelify my-0 text-2xl">{isGentleman ? "GENTLEMEN TO THIS STAGE:":  "STAGE SELECTION"}</p>
			<img src={minusAndXImage} alt="cross and minus" class="h-4" />
		</div>
		<StageGrid
			{stageList}
			availableStages={gameState.currentStageList}
			gamePhase={gameState.gamePhase}
			{banStage}
			{pickStage}
			{banningPlayer}
			currentGame={gameState.currentGame}
			isGentleman={isGentleman}
		/>
	</div>
{:else if gameState.gamePhase === 'post-pick' && gameState.selectedStage}
	<WinnerSelection
		pickedStage={stageList.find((s) => s.id === gameState.selectedStage?.id)}
		setWinner={(player) => socket.emit('setWinner', player)}
	/>
{/if}
