<script lang="ts">
	import { onMount } from 'svelte';
	// @ts-ignore
	import * as cookie from 'cookie';
	import IpadSelection from './IpadSelection.svelte';
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
	{(window.location.href = '/rps')}
{/if}
{#if !playerNumberCookie}
	<IpadSelection />
{/if}
