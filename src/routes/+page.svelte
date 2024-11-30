<script lang="ts">
	import { onMount } from 'svelte';
	// @ts-ignore
	import * as cookie from 'cookie';
	import IpadSelection from './IpadSelection.svelte';
	let playerNumberCookie: number | null = null;
	let isRockPaperScissorsWinner: boolean | null = null;
	let isStreamSetup: boolean = false;

	onMount(() => {
		// This code runs only in the browser
		const cookies = cookie.parse(document.cookie);
		isStreamSetup = cookies["setup"] != null
		playerNumberCookie = cookies['playerNumber'];
		isRockPaperScissorsWinner = cookies['rockPaperScissorsWinner'];
	});
</script>

{#if isStreamSetup} 
	{(window.location.href = "/stage-selection")}
{/if}
{#if playerNumberCookie}
	{(window.location.href = '/rps')}
{/if}
{#if !playerNumberCookie}
	<IpadSelection />
{/if}
