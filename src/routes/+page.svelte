<script lang="ts">
	import battlefieldImage from '$lib/assets/battlefield.webp';
	let stageList = [
		{ id: 1, name: 'Battlefield', isBanned: false, bannedBy: 0 },
		{ id: 2, name: 'Final Destination', isBanned: false, bannedBy: 0 }
	];

	$: banCount = stageList.filter((s) => s.isBanned === true).length;
	let gameCount = 0;

	const gameBanMap = new Map([
		[1, 8],
		[2, 3],
		[3, 3]
	]);

	$: currentMaxBans = gameBanMap.get(gameCount);
	if (currentMaxBans && banCount >= currentMaxBans) {
		// This is where we have our selected stage I guess.
	}
	const handleStageBan = (stageId: number) => {
		const stageIndexToUpdate = stageList.findIndex((s) => s.id === stageId);
		if (stageIndexToUpdate === -1) {
			return;
		}

		stageList[stageIndexToUpdate].isBanned = true;
	};
</script>

<h1>Welcome to smash stage selector</h1>

<div class="flex gap-2">
	{#each stageList as stage}
		<p>{banCount}</p>
		<button
			class={`hover:opacity-40 ${stage.isBanned ? 'opacity-10' : null}`}
			on:click={() => handleStageBan(stage.id)}
		>
			<img height="75" width="100" alt="Battlefield" src={battlefieldImage} />
		</button>
	{/each}
</div>
