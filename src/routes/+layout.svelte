<script lang="ts">
	import '../app.css';
	import LunacityLogo from '../lib/assets/Lunacity_Text.png';
	import GentlemanButton from '$lib/assets/GentlemanButton.png';
</script>

<div class="bg-[#1a1c1c] min-h-screen w-full">
	<div class="p-20 py-8 max-h-screen">
		<div class="flex justify-between items-center">
			<img class="w-80 h-20" src={LunacityLogo} alt="lunacity logo" />
			<img class="h-14 mr-8" src={GentlemanButton} alt="Gentleman to stage" />
		</div>
		<slot />
	</div>
</div>
