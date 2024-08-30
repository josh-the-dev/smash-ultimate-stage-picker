<script lang="ts">
	import type { STAGE } from '../types';

	export let stageList: STAGE[];
	export let availableStages: STAGE[];
	export let gameState: string;
	export let banStage: (stageId: number) => void;
	export let pickStage: (stageId: number) => void;

	$: isStageBanned = (stageId: number) => !availableStages.some((stage) => stage.id === stageId);
</script>

<div class="bg-[#142c26] py-20 px-12 flex flex-col gap-20">
	<div class="flex justify-between items-end">
		{#each stageList.slice(0, 5) as stage (stage.id)}
			<button
				on:click={() => (gameState === 'picking' ? pickStage(stage.id) : banStage(stage.id))}
				disabled={isStageBanned(stage.id)}
				class="transition-opacity duration-300 ease-in-out"
				style="opacity: {isStageBanned(stage.id) ? '0.5' : '1'}"
			>
				<img src={stage.logo} class="h-20 w-24" alt={stage.name} />
			</button>
		{/each}
	</div>
	<div class="flex justify-between px-28">
		{#each stageList.slice(5) as stage (stage.id)}
			<button
				on:click={() => (gameState === 'picking' ? pickStage(stage.id) : banStage(stage.id))}
				disabled={isStageBanned(stage.id)}
				class="transition-opacity duration-300 ease-in-out"
				style="opacity: {isStageBanned(stage.id) ? '0.5' : '1'}"
			>
				<img src={stage.logo} class="h-20 w-24" alt={stage.name} />
			</button>
		{/each}
	</div>
</div>
