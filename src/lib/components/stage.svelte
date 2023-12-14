<script lang="ts">
	import type { Stage } from '../types/stage.types';

	export let stage: Stage;
	export let handleStageBan = (stageId: number) => {};
</script>

<div class="text-center">
	<button
		class={`hover:opacity-40 ${stage.isBanned ? 'opacity-10' : null}`}
		on:click={() => handleStageBan(stage.id)}
	>
		<img height="75" width="100" alt={stage.name} src={stage.src} />
	</button>
	<p>{stage.name}</p>
</div>
