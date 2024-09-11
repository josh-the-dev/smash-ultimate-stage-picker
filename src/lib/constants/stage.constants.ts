import battlefieldImage from '$lib/assets/stages/Battlefield.png';
import fdImage from '$lib/assets/stages/Final Destination.png';
import hbImage from '$lib/assets/stages/Hollow Bastion.png';
import kalosImage from '$lib/assets/stages/Kalos League.png';
import ps2Image from '$lib/assets/stages/PS2.png';
import sbfImage from '$lib/assets/stages/Small Battlefield.png';
import svImage from '$lib/assets/stages/Smashville.png';
import tacImage from '$lib/assets/stages/Town and City.png';
import ysImage from '$lib/assets/stages/Yoshis Story.png';
import type { Stage } from '$lib/types/stage.types';

export const stages: Stage[] = [
	{ id: 1, name: 'Battlefield', src: battlefieldImage, isBanned: false, bannedBy: 0 },
	{ id: 2, name: 'Small Battlefield', src: sbfImage, isBanned: false, bannedBy: 0 },
	{ id: 3, name: 'Final Destination', src: fdImage, isBanned: false, bannedBy: 0 },
	{ id: 4, name: 'Yoshis Story', src: ysImage, isBanned: false, bannedBy: 0 },
	{ id: 5, name: 'Pokemon Stadium 2', src: ps2Image, isBanned: false, bannedBy: 0 },
	{ id: 6, name: 'Smashville', src: svImage, isBanned: false, bannedBy: 0 },
	{ id: 7, name: 'Town & City', src: tacImage, isBanned: false, bannedBy: 0 },
	{ id: 8, name: 'Kalos', src: kalosImage, isBanned: false, bannedBy: 0 },
	{ id: 9, name: 'Hollow Bastion', src: hbImage, isBanned: false, bannedBy: 0 }
];
