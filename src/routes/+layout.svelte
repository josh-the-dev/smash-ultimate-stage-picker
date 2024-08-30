<script lang="ts">
	import '../app.css';
	import LunacityLogo from '../lib/assets/Lunacity_Text.png';
</script>

<div class="bg-[#1a1c1c] min-h-screen w-full">
	<div class="mx-8 py-8">
		<img width="400" src={LunacityLogo} alt="lunacity logo" />
		<slot />
	</div>
</div>
