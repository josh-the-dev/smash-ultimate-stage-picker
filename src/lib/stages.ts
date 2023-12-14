import battlefieldImage from '$lib/assets/stages/battlefield.webp';
import fdImage from '$lib/assets/stages/final-destination.jpg';
import hbImage from '$lib/assets/stages/hollow-bastion.jpg';
import kalosImage from '$lib/assets/stages/kalos.webp';
import ps2Image from '$lib/assets/stages/pokemon-stadium-2.webp';
import sbfImage from '$lib/assets/stages/small-battlefield.jpg';
import svImage from '$lib/assets/stages/smashville.webp';
import tacImage from '$lib/assets/stages/town-and-city.webp';
import ysImage from '$lib/assets/stages/yoshis-story.webp';

export const stageList = [
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