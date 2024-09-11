<script lang="ts">
	const selectPlayer = (playerNumber: number) => {
		document.cookie = `playerNumber=${playerNumber}`;
		window.location.reload();
	};
</script>

<div>
	<h3>Hey are you</h3>
	<div class="flex gap-40">
		<button class="bg-white p-12 rounded-lg text-2xl" on:click={() => selectPlayer(1)}>Player 1</button>
		<button class="bg-white p-12 rounded-lg text-2xl" on:click={() => selectPlayer(2)}>Player 2</button>
	</div>
</div>
