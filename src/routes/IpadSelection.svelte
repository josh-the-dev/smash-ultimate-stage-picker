<script lang="ts">
	const selectPlayer = (playerNumber: number | string) => {
		if(playerNumber === "stream"){
			document.cookie = `setup=stream`;	
		} else {
		document.cookie = `playerNumber=${playerNumber}`;
		}
		window.location.reload();
	};
</script>

<div>
	<h3>Hey are you</h3>
	<div class="flex gap-40">
		<button class="bg-white p-12 rounded-lg text-2xl" on:click={() => selectPlayer(1)}>iPad 1</button>
		<button class="bg-white p-12 rounded-lg text-2xl" on:click={() => selectPlayer(2)}>iPad 2</button>
		<button class="bg-white p-12 rounded-lg text-2xl" on:click={() => selectPlayer("stream")}>Stream</button>
	</div>
</div>
