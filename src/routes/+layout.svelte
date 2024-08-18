<script lang="ts">
	import '../app.css';
	import LunacityLogo from '../lib/assets/Lunacity_Text.png';
	import BfLogo from '../lib/assets/stages/Icon_BF.png';
	import SbfLogo from '../lib/assets/stages/Icon_SBF.png';
	import FdLogo from '../lib/assets/stages/Icon_FD.png';
	import Ps2Logo from '../lib/assets/stages/Icon_PS2.png';
	import HBastion from '../lib/assets/stages/Icon_HBastion.png';
	import Svile from '../lib/assets/stages/Icon_SVille.png';
	import TnC from '../lib/assets/stages/Icon_TnC.png';
	import Kalos from '../lib/assets/stages/Icon_Kalos.png';
	import YStory from '../lib/assets/stages/Icon_YStory.png';

	import { onMount } from 'svelte';
	import { io, Socket } from 'socket.io-client';

	type STAGE = {
		id: number;
		name: string;
		logo: string;
	};

	let socket: Socket;
	let stageList = [
		{ id: 1, name: 'battlefield', logo: BfLogo },
		{ id: 2, name: 'small battlefield', logo: SbfLogo },
		{ id: 3, name: 'final destination', logo: FdLogo },
		{ id: 4, name: 'pokemon stadium 2', logo: Ps2Logo },
		{ id: 5, name: 'hollow bastion', logo: HBastion },
		{ id: 6, name: 'smashville', logo: Svile },
		{ id: 7, name: 'town and city', logo: TnC },
		{ id: 8, name: 'kalos pokemon league', logo: Kalos },
		{ id: 9, name: "yoshi's story", logo: YStory }
	];
	let bannedStages: STAGE[] = [];

	onMount(() => {
		// Connect to the Socket.IO server
		socket = io('https://socket.lunacity.be');

		// Handle updates from the server
		socket.on('stageList', (data) => {
			stageList = stageList.map((stage) => {
				const updatedStage = data.stageList.find((s: STAGE) => s.id === stage.id);
				return updatedStage ? { ...stage, ...updatedStage } : stage;
			});
			bannedStages = data.bannedStages;
		});

		socket.on('stagePicked', (pickedStage) => {
			console.log(`Stage picked: ${pickedStage.name}`);
			// Handle final stage selection (e.g., start the game)
		});

		return () => {
			socket.disconnect(); // Clean up on component unmount
		};
	});

	const banStage = (stageId: number) => {
		// Emit 'banStage' event with the selected stage ID and player information
		socket.emit('banStage', { stageId, player: 1 }); // Replace `player: 1` with the actual player identifier
	};

	const pickStage = (stageId: number) => {
		// Emit 'pickStage' event with the selected stage ID
		socket.emit('pickStage', stageId);
	};

	const isStageBanned = (stageId: number) => {
		return bannedStages.some((bannedStage) => bannedStage.id === stageId);
	};
</script>

<div class="bg-[#1a1c1c] h-screen w-full">
	<div class="mx-8 py-8">
		<img width="400" src={LunacityLogo} alt="lunacity logo" />
		<div class="bg-[#378169] mt-4 pb-4 pt-1 px-3 rounded-lg">
			<div class="flex items-center justify-between my-2 px-1">
				<h3 class="font-pixelify text-3xl">STAGE SELECTION</h3>
				<div class="flex gap-4">
					<p class="font-pixelify text-3xl font-extrabold">-</p>
					<p class="font-pixelify text-3xl font-extrabold">X</p>
				</div>
			</div>
			<div class="bg-[#142c26] py-20 px-12 flex flex-col gap-20">
				<div class="flex justify-between items-end">
					{#each stageList.slice(0, 5) as stage}
						<button
							class="h-20 w-24"
							on:click={() => (isStageBanned(stage.id) ? null : banStage(stage.id))}
						>
							<img
								src={stage.logo}
								class="h-20 w-24 {isStageBanned(stage.id) ? 'opacity-50' : ''}"
								alt={stage.name}
							/>
						</button>
					{/each}
				</div>
				<div class="flex justify-between px-28">
					{#each stageList.slice(5) as stage}
						<button on:click={() => (isStageBanned(stage.id) ? null : banStage(stage.id))}>
							<img
								src={stage.logo}
								class="h-20 w-24 {isStageBanned(stage.id) ? 'opacity-50' : ''}"
								alt={stage.name}
							/>
						</button>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>
