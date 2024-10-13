<script lang="ts">
	import { onMount } from 'svelte';
	import StageSelection from './StageSelection.svelte';
	// @ts-ignore
	import * as cookie from 'cookie';
	import PlayerSelection from './PlayerSelection.svelte';
	import RockPaperScissors from './RockPaperScissors.svelte';
	let playerNumberCookie: number | null = null;
	let isRockPaperScissorsWinner: boolean | null = null;

	onMount(() => {
		// This code runs only in the browser
		const cookies = cookie.parse(document.cookie);
		playerNumberCookie = cookies['playerNumber'];
		isRockPaperScissorsWinner = cookies['rockPaperScissorsWinner'];
	});
</script>

{#if playerNumberCookie}
	<StageSelection />
{/if}
{#if !playerNumberCookie}
	<PlayerSelection />
{/if}
