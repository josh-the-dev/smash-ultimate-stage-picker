<script lang="ts">
	import Stagelist from '$lib/components/stagelist.svelte';
</script>

<h1>Welcome to smash stage selector</h1>

<div class="flex gap-2">
	<Stagelist maxGameCount={3} />
</div>
