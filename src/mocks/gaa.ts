import { IGiveawaysAndAnn } from "../models/gaa";
import mockLogo from "../assets/images/arcade-land-logo.png";
import mockBg from "../assets/images/arcade-land-bg.jpg";

export const GiveawaysAndAnnMock: IGiveawaysAndAnn = {
  collections: [
    {
      bannerImage: mockBg,
      image: mockLogo,
      name: "Arcade Land",
      size: 10000,
      floorPrice: 28.89,
      discordMessage: {
        id: 0,
        text: "FLOOR MIGHT NOT BE ACCURATE! Lowest listings could be locked in staking and not purchasable. The Impostors Genesis Aliens Lowest listings could be locked in street. FLOOR MIGHT NOT BE ACCURATE! Lowest listings could be locked in staking and not purchasable. The Impostors Genesis Aliens Lowest listings could be locked in street. FLOOR MIGHT NOT BE ACCURATE! Lowest listings could be locked in staking and not purchasable. The Impostors Genesis Aliens Lowest listings could be locked in street. FLOOR MIGHT NOT BE ACCURATE! Lowest listings could be locked in staking and not purchasable. The Impostors Genesis Aliens Lowest listings could be locked in street. FLOOR MIGHT NOT BE ACCURATE! Lowest listings could be locked in staking and not purchasable. The Impostors Genesis Aliens Lowest listings could be locked in street. FLOOR MIGHT NOT BE ACCURATE! Lowest listings could be locked in staking and not purchasable. The Impostors Genesis Aliens Lowest listings could be locked in street.",
        createdAt: "2022-06-23T09:01:47.608Z",
        discordId: "string",
        author: {
          name: "Scott Chegg",
          image: mockLogo,
        },
        channelType: "giveaway",
      },
    },
    {
      bannerImage: mockBg,
      image: mockLogo,
      name: "IO: Imaginary Ones",
      size: 8900,
      floorPrice: 0.8,
      discordMessage: {
        id: 0,
        text: "Imaginary Ones is a delightful 3D animated art with a collection of 8888 unique NFTs.",
        createdAt: "2022-06-23T09:01:47.608Z",
        discordId: "string",
        author: {
          name: "string",
          image: mockLogo,
        },
        channelType: "announcement",
      },
    },
  ],
  ranges: {
    sizeMax: 6000,
    membersCountMax: 4000,
  },
};
