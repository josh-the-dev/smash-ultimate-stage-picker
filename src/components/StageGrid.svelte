<script lang="ts">
	import type { STAGE } from '../types';

	export let stageList: STAGE[];
	export let availableStages: STAGE[];
	export let gameState: string;
	export let banStage: (stageId: number) => void;
	export let pickStage: (stageId: number) => void;

	$: isStageBanned = (stageId: number) => !availableStages.some((stage) => stage.id === stageId);
</script>

<div class="bg-[#142c26] py-6 px-8 flex flex-col pt-20 gap-8 relative">
	<div class="flex justify-between items-end">
		{#each stageList.slice(0, 5) as stage (stage.id)}
			<button
				on:click={() => (gameState === 'picking' ? pickStage(stage.id) : banStage(stage.id))}
				disabled={isStageBanned(stage.id)}
				class="transition-opacity duration-300 ease-in-out flex flex-col items-center"
				style="opacity: {isStageBanned(stage.id) ? '0.5' : '1'}"
			>
				<img height="30" width="100" src={stage.logo} alt={stage.name} />
				<p class=" text-white font-helvetica">{stage.name.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())}</p>
			</button>
		{/each}
	</div>
	<div class="flex justify-between px-28">
		{#each stageList.slice(5) as stage (stage.id)}
			<button
				on:click={() => (gameState === 'picking' ? pickStage(stage.id) : banStage(stage.id))}
				disabled={isStageBanned(stage.id)}
				class="transition-opacity duration-300 ease-in-out flex flex-col items-center"
				style="opacity: {isStageBanned(stage.id) ? '0.5' : '1'}"
			>
				<img height="30" width="100" src={stage.logo} alt={stage.name} />
				<p class=" text-white font-helvetica">{stage.name.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())}</p>
			</button>
		{/each}
	</div>
	<div class="bg-[#378169] px-8 mx-auto">
		<h3 class="font-pixelify text-4xl">BAN 3 STAGES</h3>
	</div>
</div>
