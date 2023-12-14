<script lang="ts">
	import Stage from './stage.svelte';
	import { stages } from '../constants/stage.constants';
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
	<Stage {stage} handleStageBan={(stageId) => handleStageBan(stageId)} />
{/each}
