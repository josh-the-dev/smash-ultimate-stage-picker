<script lang="ts">
	import '../../app.css';
	import LunacityLogo from '$lib/assets/Lunacity_Text.png';
	// @ts-ignore
	import * as cookie from 'cookie';

	let showLogo = true;

	// Parse cookies on component initialization
	if (typeof document !== 'undefined') {
		const cookies = cookie.parse(document.cookie);
		const setupCookie = cookies['setup'];
		
		// Hide logo if setup cookie is set
		if (setupCookie) {
			showLogo = false;
		}
	}
</script>

<div class="p-20 py-8 max-h-screen">
	<header class="flex justify-between items-center mb-8">
		{#if showLogo}
			<img 
				class="w-80 h-20" 
				src={LunacityLogo} 
				alt="lunacity logo" 
			/>
		{/if}
	</header>
	<slot />
</div>