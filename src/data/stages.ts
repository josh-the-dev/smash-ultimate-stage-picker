import battlefieldImage from '$lib/assets/stages/Battlefield.png';
import fdImage from '$lib/assets/stages/Final Destination.png';
import hbImage from '$lib/assets/stages/Hollow Bastion.png';
import kalosImage from '$lib/assets/stages/Kalos League.png';
import ps2Image from '$lib/assets/stages/PS2.png';
import sbfImage from '$lib/assets/stages/Small Battlefield.png';
import svImage from '$lib/assets/stages/Smashville.png';
import tacImage from '$lib/assets/stages/Town and City.png';
import ysImage from '$lib/assets/stages/Yoshis Story.png';
import type { Stage } from '../types';

export const stageList: Stage[] = [
	{ id: 1, name: 'Battlefield', logo: battlefieldImage },
	{ id: 2, name: 'Small Battlefield', logo: sbfImage },
	{ id: 3, name: 'Final Destination', logo: fdImage },
	{ id: 4, name: 'Pokemon Stadium 2', logo: ps2Image },
	{ id: 5, name: 'Hollow Bastion', logo: hbImage },
	{ id: 6, name: 'Smashville', logo: svImage },
	{ id: 7, name: 'Town & City', logo: tacImage },
	{ id: 8, name: 'Kalos Pokemon League', logo: kalosImage },
	{ id: 9, name: "Yoshi's Story", logo: ysImage }
];
