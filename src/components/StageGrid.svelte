<script lang="ts">
	import type { Stage, GamePhase } from '../types';

	// @ts-ignore
	import * as cookie from 'cookie';

	export let stageList: Stage[];
	export let availableStages: Stage[];
	export let gamePhase: GamePhase;
	export let banStage: (stageId: number) => void;
	export let pickStage: (stageId: number) => void;
	export let banningPlayer: number | null;
	export let currentGame: number;

	const handleSelection = (stageId: number) => {
		const cookies = cookie.parse(document.cookie);
		const deviceNumber = parseInt(cookies['playerNumber']);
		if (banningPlayer === deviceNumber) {
			if (gamePhase === 'picking') {
				pickStage(stageId);
			} else if (gamePhase === 'banning') {
				banStage(stageId);
			}
		}
	};

	$: isStageBanned = (stageId: number) => !availableStages.some((stage) => stage.id === stageId);

	$: isPlayerTurn = () => {
		const cookies = cookie.parse(document.cookie);
		const deviceNumber = parseInt(cookies['playerNumber']);
		return banningPlayer === deviceNumber;
	};

	$: banCount = () => {
		if (currentGame === 1) {
			return availableStages.length <= 6 ? '4' : '3';
		} else {
			return '3';
		}
	};
</script>

<div class="bg-[#142c26] py-6 pb-2 px-8 flex flex-col gap-8 relative">
	<div class="flex justify-between items-end">
		{#each gamePhase === 'picking' ? availableStages.slice(0, 5) : stageList.slice(0, 5) as stage (stage.id)}
			<button
				on:click={() => handleSelection(stage.id)}
				disabled={isStageBanned(stage.id)}
				class="transition-opacity duration-300 ease-in-out flex flex-col items-center"
				style="opacity: {isStageBanned(stage.id) ? '0.5' : '1'}"
			>
				<img height="30" width="100" src={stage.logo} alt={stage.name} />
				<p class="text-sm text-white font-helvetica">
					{stage.name.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())}
				</p>
			</button>
		{/each}
	</div>
	<div class="flex justify-between px-28">
		{#each gamePhase === 'picking' ? availableStages.slice(5) : stageList.slice(5) as stage (stage.id)}
			<button
				on:click={() => handleSelection(stage.id)}
				disabled={isStageBanned(stage.id)}
				class="transition-opacity duration-300 ease-in-out flex flex-col items-center"
				style="opacity: {isStageBanned(stage.id) ? '0.5' : '1'}"
			>
				<img height="30" width="100" src={stage.logo} alt={stage.name} />
				<p class="text-sm text-white font-helvetica">
					{stage.name.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())}
				</p>
			</button>
		{/each}
	</div>
	<div class="bg-[#378169] px-8 mx-auto">
		<h3 class="font-pixelify text-3xl">
			{#if gamePhase === 'banning'}
				{#if isPlayerTurn()}
					BAN {banCount()} STAGES
				{:else}
					OPPONENT IS BANNING
				{/if}
			{:else if gamePhase === 'picking'}
				{#if isPlayerTurn()}
					PICK A STAGE
				{:else}
					OPPONENT IS PICKING
				{/if}
			{/if}
		</h3>
	</div>
</div>
