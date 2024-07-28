<script>
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
					<img src={BfLogo} class="h-20 w-24" alt="battlefield" />
					<img src={SbfLogo} class="h-16 w-24" alt="small battlefield" />
					<img src={FdLogo} class="h-20 w-24" alt="final destination" />
					<img src={Ps2Logo} class="h-16 w-24" alt="pokemon stadium 2" />
					<img src={HBastion} class="h-16 w-24" alt="hollow bastion" />
				</div>
				<div class="flex justify-between px-28">
					<img src={Svile} class="h-20 w-24" alt="smashville" />
					<img src={TnC} class="h-20 w-24" alt="town and city" />
					<img src={Kalos} class="h-20 w-24" alt="kalos" />
					<img src={YStory} class="h-20 w-24" alt="yoshis story" />
				</div>
			</div>
		</div>
		<div class="my-12 mx-4 flex">
			<div>
				<div>
					<p>Best of 3</p>
				</div>
				<div>
					<p>Best of 5</p>
				</div>
			</div>
		</div>
		<slot />
	</div>
</div>
