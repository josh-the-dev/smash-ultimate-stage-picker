<script lang="ts">
	import { onMount } from "svelte";
	import { io, Socket } from 'socket.io-client';
	import type { GameState } from '../../types';
	import { stageList } from '../../data/stages';

    	let socket: Socket;

    	onMount(() => {
            socket = io('https://socket.lunacity.be');

		return () => {
			if (socket) socket.disconnect();
		};
	});

    function resetGame() {
		socket.emit('reset');
	}
    

</script>


<div class="text-center pt-20">
    <button class="bg-white p-12 rounded-lg text-2xl" on:click={resetGame} >Reset</button>
</div>