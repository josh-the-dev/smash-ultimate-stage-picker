import BfLogo from '../lib/assets/stages/Icon_BF.png';
import SbfLogo from '../lib/assets/stages/Icon_SBF.png';
import FdLogo from '../lib/assets/stages/Icon_FD.png';
import Ps2Logo from '../lib/assets/stages/Icon_PS2.png';
import HBastion from '../lib/assets/stages/Icon_HBastion.png';
import Svile from '../lib/assets/stages/Icon_SVille.png';
import TnC from '../lib/assets/stages/Icon_TnC.png';
import Kalos from '../lib/assets/stages/Icon_Kalos.png';
import YStory from '../lib/assets/stages/Icon_YStory.png';

import type { STAGE } from '../types';

export const stageList: STAGE[] = [
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
