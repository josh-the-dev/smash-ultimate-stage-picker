<script lang="ts">
	import type { STAGE } from '../types';

	export let stageList: STAGE[];
	export let availableStages: STAGE[];
	export let gameState: string;
	export let banStage: (stageId: number) => void;
	export let pickStage: (stageId: number) => void;

	$: isStageBanned = (stageId: number) => !availableStages.some((stage) => stage.id === stageId);
</script>

<div class="bg-[#142c26] py-6 px-12 min-h-[calc(3/5*100vh)] flex flex-col gap-20 pt-48 relative">
	<div class="flex justify-between items-end">
		{#each stageList.slice(0, 5) as stage (stage.id)}
			<button
				on:click={() => (gameState === 'picking' ? pickStage(stage.id) : banStage(stage.id))}
				disabled={isStageBanned(stage.id)}
				class="transition-opacity duration-300 ease-in-out"
				style="opacity: {isStageBanned(stage.id) ? '0.5' : '1'}"
			>
				<img src={stage.logo} alt={stage.name} />
				<p class="text-xl text-white font-helvetica">{stage.name.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())}</p>
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
				<img src={stage.logo} alt={stage.name} />
				<p class="text-xl text-white font-helvetica">{stage.name.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())}</p>
			</button>
		{/each}
	</div>
	<div class="bg-[#378169] px-12 absolute bottom-4 left-1/3 ml-28">
		<h3 class="font-pixelify text-6xl">BAN 3 STAGES</h3>
	</div>
</div>
