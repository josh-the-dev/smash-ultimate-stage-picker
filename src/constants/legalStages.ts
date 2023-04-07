import Battlefield from "../../public/images/stages/battlefield.webp";
import FinalDestination from "../../public/images/stages/final-destination.jpg";
import SmallBattlefield from "../../public/images/stages/small-battlefield.jpg";
import Yoshis from "../../public/images/stages/yoshis-story.webp";
import PokemonStadium from "../../public/images/stages/pokemon-stadium-2.webp";
import SmashVille from "../../public/images/stages/smashville.webp";
import Kalos from "../../public/images/stages/kalos.webp";
import TownAndCity from "../../public/images/stages/town-and-city.webp";
import HollowBastion from "../../public/images/stages/hollow-bastion.jpg";

import StreamBattlefield from "../../public/images/stages/stream/battlefield.png";
import StreamFinalDestination from "../../public/images/stages/stream/FD.png";
import StreamSmallBattlefield from "../../public/images/stages/stream/SBF.png";
import StreamYoshis from "../../public/images/stages/stream/yoshis.png";
import StreamPokemonStadium from "../../public/images/stages/stream/PS2.png";
import StreamSmashVille from "../../public/images/stages/stream/smashville.png";
import StreamKalos from "../../public/images/stages/stream/kalos.png";
import StreamTownAndCity from "../../public/images/stages/stream/town.png";
import StreamHollowBastion from "../../public/images/stages/stream/HB.png";

import StreamBannedBattlefield from "../../public/images/stages/stream/battlefield-dark.png";
import StreamBannedFinalDestination from "../../public/images/stages/stream/FD-dark.png";
import StreamBannedSmallBattlefield from "../../public/images/stages/stream/SBF-dark.png";
import StreamBannedYoshis from "../../public/images/stages/stream/yoshis-dark.png";
import StreamBannedPokemonStadium from "../../public/images/stages/stream/PS2-dark.png";
import StreamBannedSmashVille from "../../public/images/stages/stream/smashville-dark.png";
import StreamBannedKalos from "../../public/images/stages/stream/kalos-dark.png";
import StreamBannedTownAndCity from "../../public/images/stages/stream/town-dark.png";
import StreamBannedHollowBastion from "../../public/images/stages/stream/HB-dark.png";

import StreamBattlefieldCross from "../../public/images/stages/stream/battlefield-cross.png";
import StreamFDCross from "../../public/images/stages/stream/FD-cross.png";
import StreamSBFCross from "../../public/images/stages/stream/SBF-cross.png";
import StreamYoshisCross from "../../public/images/stages/stream/yoshis-cross.png";
import StreamPS2Crossfrom from "../../public/images/stages/stream/PS2-cross.png";
import StreamSVCross from "../../public/images/stages/stream/smashville-cross.png";
import StreamKalosCross from "../../public/images/stages/stream/kalos-cross.png";
import StreamTownCross from "../../public/images/stages/stream/town-cross.png";
import StreamHBCross from "../../public/images/stages/stream/HB-cross.png";

export const LEGAL_STAGES = [
  {
    id: 1,
    stageName: "Battlefield",
    img: Battlefield,
  },
  {
    id: 2,
    stageName: "Final Destination",
    img: FinalDestination,
  },
  {
    id: 3,
    stageName: "Small Battlefield",
    img: SmallBattlefield,
  },
  {
    id: 4,
    stageName: "Yoshis Story",
    img: Yoshis,
  },
  {
    id: 5,
    stageName: "Pokemon Stadium 2",
    img: PokemonStadium,
  },
  {
    id: 6,
    stageName: "Smashville",
    img: SmashVille,
  },
  {
    id: 7,
    stageName: "Kalos",
    img: Kalos,
  },
  {
    id: 8,
    stageName: "Town & City",
    img: TownAndCity,
  },

  {
    id: 9,
    stageName: "Hollow Bastion",
    img: HollowBastion,
  },
];

export const LEGAL_STREAM_STAGES = [
  {
    id: 1,
    stageName: "Battlefield",
    img: StreamBattlefield,
    bannedImg: StreamBannedBattlefield,
    crossImg: StreamBattlefieldCross,
    index: 10,
  },
  {
    id: 2,
    stageName: "Final Destination",
    img: StreamFinalDestination,
    bannedImg: StreamBannedFinalDestination,
    crossImg: StreamFDCross,
    index: 0,
  },
  {
    id: 3,
    stageName: "Small Battlefield",
    img: StreamSmallBattlefield,
    bannedImg: StreamBannedSmallBattlefield,
    crossImg: StreamSBFCross,
    index: 10,
  },
  {
    id: 4,
    stageName: "Yoshis Story",
    img: StreamYoshis,
    bannedImg: StreamBannedYoshis,
    crossImg: StreamYoshisCross,
    index: 10,
  },
  {
    id: 5,
    stageName: "Pokemon Stadium 2",
    img: StreamPokemonStadium,
    bannedImg: StreamBannedPokemonStadium,
    crossImg: StreamPS2Crossfrom,
    index: 20,
  },
  {
    id: 6,
    stageName: "Smashville",
    img: StreamSmashVille,
    bannedImg: StreamBannedSmashVille,
    crossImg: StreamSVCross,
  },
  {
    id: 7,
    stageName: "Kalos",
    img: StreamKalos,
    bannedImg: StreamBannedKalos,
    crossImg: StreamKalosCross,
  },
  {
    id: 8,
    stageName: "Town & City",
    img: StreamTownAndCity,
    bannedImg: StreamBannedTownAndCity,
    crossImg: StreamTownCross,
  },

  {
    id: 9,
    stageName: "Hollow Bastion",
    img: StreamHollowBastion,
    bannedImg: StreamBannedHollowBastion,
    crossImg: StreamHBCross,
  },
];
