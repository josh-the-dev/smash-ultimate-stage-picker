<script lang="ts">
	import { onMount } from 'svelte';
	import StageSelection from './StageSelection.svelte';
	// @ts-ignore
	import * as cookie from 'cookie';
	import PlayerSelection from './PlayerSelection.svelte';
	let playerNumberCookie: number | null = null;

	onMount(() => {
		// This code runs only in the browser
		const cookies = cookie.parse(document.cookie);
		playerNumberCookie = cookies['playerNumber'];
	});
</script>

{#if playerNumberCookie}
	<StageSelection />
{/if}
{#if !playerNumberCookie}
	<PlayerSelection />
{/if}
