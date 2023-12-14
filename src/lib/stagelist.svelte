<script lang="ts">
	import { stageList as stages } from './stages';
	export let maxGameCount: 3 | 5;
	let stageList = stages;
	$: banCount = 0;
	$: gameCount = 1;

	const gameBanMap = new Map([
		[1, 7],
		[2, 3],
		[3, 3],
		[4, 3],
		[5, 3]
	]);

	$: currentMaxBans = gameBanMap.get(gameCount);

	$: if (currentMaxBans && banCount >= currentMaxBans) {
		stageList = stageList.filter((s) => !s.isBanned);
	}

	const handleStageBan = (stageId: number) => {
		const stageIndexToUpdate = stageList.findIndex((s) => s.id === stageId);
		if (stageIndexToUpdate === -1) {
			return;
		}

		stageList[stageIndexToUpdate].isBanned = true;
		banCount += 1;
	};
</script>

{#each stageList as stage}
	<div class="text-center">
		<button
			class={`hover:opacity-40 ${stage.isBanned ? 'opacity-10' : null}`}
			on:click={() => handleStageBan(stage.id)}
		>
			<img height="75" width="100" alt={stage.name} src={stage.src} />
		</button>
		<p>{stage.name}</p>
	</div>
{/each}
