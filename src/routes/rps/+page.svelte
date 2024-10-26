<script lang="ts">
	import { onMount } from 'svelte';
	import lunacityBanner from '$lib/assets/lunacity-banner.png';
	import { io, Socket } from 'socket.io-client';
	// @ts-ignore
	import * as cookie from 'cookie';
	let socket: Socket;

	const handleRockPaperScissorsWinner = (isWinner: boolean) => {
		const cookies = cookie.parse(document.cookie);
		const playerNumberCookie = cookies['playerNumber'];

		// Determine the winner based on the isWinner flag
		const winnerNumber = isWinner
			? parseInt(playerNumberCookie, 10) // If the player is the winner, pass their number
			: playerNumberCookie === '1' // Otherwise, pass the other player's number
				? 2
				: 1;

		socket.emit('rockPaperScissors', winnerNumber);
	};

	interface GameState {
		currentBanningPlayer: number | null;
		currentGame: number;
		currentBanCount: number;
		player1Wins: number;
		player2Wins: number;
	}

	onMount(() => {
		// Connect to the Socket.IO server
		socket = io('https://socket.lunacity.be');

		socket.on('gameState', (data: GameState) => {
			console.log(data);
			if (data.currentBanningPlayer) {
				document.cookie = `rpsWinner=${data.currentBanningPlayer}`;
				window.location.href = '/stage-selection';
			}
		});
		return () => {
			socket.disconnect(); // Clean up on component unmount
		};
	});
</script>

<div class="flex flex-col items-center">
	<img src={lunacityBanner} alt="lunacity banner" height={200} width={400} />
	<div class="flex flex-col justify-between items-center gap-32">
		<div class="flex flex-col items-center gap-4">
			<h3 class="font-sans text-white text-2xl font-bold">Welcome!</h3>
			<h4 class="font-sans text-white text-xl font-bold max-w-lg">
				Please let your opponent know which character you're playing and play RPS to see who can ban stages first.
			</h4>
		</div>
		<div>
			<div class="flex flex-col gap-4">
				<h4 class="font-sans text-white text-3xl font-bold">Did you win Rock Paper Scissors</h4>
				<div class="flex gap-20 justify-center">
					<button
						class="font-pixelify text-2xl bg-[#378169] text-white px-6 uppercase h-12"
						on:click={() => handleRockPaperScissorsWinner(true)}>Yes</button
					>
					<button
						class="font-pixelify text-2xl bg-[#378169] text-white px-6 uppercase h-12"
						on:click={() => handleRockPaperScissorsWinner(false)}>No</button
					>
				</div>
			</div>
		</div>
	</div>
</div>
