import battlefieldImage from '$lib/assets/stages/Battlefield.png';
import fdImage from '$lib/assets/stages/Final Destination.png';
import hbImage from '$lib/assets/stages/Hollow Bastion.png';
import kalosImage from '$lib/assets/stages/Kalos League.png';
import ps2Image from '$lib/assets/stages/PS2.png';
import sbfImage from '$lib/assets/stages/Small Battlefield.png';
import svImage from '$lib/assets/stages/Smashville.png';
import tacImage from '$lib/assets/stages/Town and City.png';
import ysImage from "$lib/assets/stages/Yoshi's Story.png";
import type { STAGE } from '../types';

export const stageList: STAGE[] = [
	{ id: 1, name: 'battlefield', logo: battlefieldImage },
	{ id: 2, name: 'small battlefield', logo: sbfImage },
	{ id: 3, name: 'final destination', logo: fdImage },
	{ id: 4, name: 'pokemon stadium 2', logo: ps2Image },
	{ id: 5, name: 'hollow bastion', logo: hbImage },
	{ id: 6, name: 'smashville', logo: svImage },
	{ id: 7, name: 'town and city', logo: tacImage },
	{ id: 8, name: 'kalos pokemon league', logo: kalosImage },
	{ id: 9, name: "yoshi's story", logo: ysImage }
];
