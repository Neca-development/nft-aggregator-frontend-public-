import tempImg from "../assets/images/temp-item.jpg";
import { ICollection, ICollectionData } from "../models/collection";
import tempIcon from "../assets/images/arcade-land-logo.png";
import tempBg from "../assets/images/arcade-land-bg.jpg";

export const collectionItemMock: ICollection = {
  id: 1,
  openseaId: "string",
  image: tempImg,
  banner: tempBg,
  name: "Moonbirds",
  size: 10000,
  floorPrice: 28.89,
  dailyChange: 40,
  discordMembersCount: 39900,
  twitterFollowersCount: 19900,
  isFavorite: false,
  createdAt: "2021-06-15T15:27:05.208Z",
  ownersCount: 999,
  volumeTraded: 3.0,
  weeklyChange: -12,
  monthlyChange: 0,
  description:
    "FLOOR MIGHT NOT BE ACCURATE! Lowest listings could be locked in staking and not purchasable. The Impostors Genesis Aliens represent the foundational NFT collection of the Impostors ecosystem, and serve as passes the Impostors Genesis Season which will play host to seven unique events. Only 10,420 of these intergalactic creatures will ever exist! Each Genesis Character has a combination of over 200 traits and will provide stat-based advantages in various metaverse game modes. Impostors is a social gaming metaverse that bridges the gap between today's Twitch culture and the future of immersive metaverses. The game is built in Unreal Engine and the team consists of over 30 world-class engineers and builders with experience working at AAA studios including Epic Games, Roblox, Pixar, and more. Impostors brings a breath of fresh air into the gaming and crypto world by creating a social gaming metaverse that is truly player-owned and powered.",
  discordMessages: [
    {
      id: 0,
      text: "Because maybe You're gonna be the one that saves me And after all You're my wonderwall",
      createdAt: "2022-06-21T15:27:05.208Z",
      discordId: "string",
      author: {
        name: "John Doe",
        image: tempIcon,
      },
      channelType: "giveaway",
    },
    {
      id: 0,
      text: "Because maybe You're gonna be the one that saves me And after all You're my wonderwall",
      createdAt: "2022-06-21T15:27:05.208Z",
      discordId: "string",
      author: {
        name: "John Doe",
        image: tempIcon,
      },
      channelType: "giveaway",
    },
    {
      id: 0,
      text: "Because maybe You're gonna be the one that saves me And after all You're my wonderwall",
      createdAt: "2022-06-21T15:27:05.208Z",
      discordId: "string",
      author: {
        name: "John Doe",
        image: tempIcon,
      },
      channelType: "giveaway",
    },
    {
      id: 0,
      text: "Because maybe You're gonna be the one that saves me And after all You're my wonderwall",
      createdAt: "2022-06-21T15:27:05.208Z",
      discordId: "string",
      author: {
        name: "John Doe",
        image: tempIcon,
      },
      channelType: "giveaway",
    },
    {
      id: 0,
      text: "Because maybe You're gonna be the one that saves me And after all You're my wonderwall",
      createdAt: "2022-06-21T15:27:05.208Z",
      discordId: "string",
      author: {
        name: "John Doe",
        image: tempIcon,
      },
      channelType: "giveaway",
    },
    {
      id: 0,
      text: "Because maybe You're gonna be the one that saves me And after all You're my wonderwall",
      createdAt: "2022-06-21T15:27:05.208Z",
      discordId: "string",
      author: {
        name: "John Doe",
        image: tempIcon,
      },
      channelType: "giveaway",
    },
  ],
  twitter: {
    author: {
      name: "string",
      image: tempIcon,
    },
    messages: ["Message from twitter"],
  },
};

const collectionItemMock2: ICollection = {
  id: 2,
  openseaId: "string",
  image: tempImg,
  banner: tempBg,
  name: "Murakami.Flowers Seed",
  size: 11,
  floorPrice: 6.405,
  dailyChange: -30,
  discordMembersCount: 9850,
  twitterFollowersCount: 16100,
  isFavorite: true,
  createdAt: "2022-06-21T15:27:05.208Z",
  ownersCount: 0,
  volumeTraded: 0,
  weeklyChange: 0,
  monthlyChange: 0,
  description: "string",
  discordMessages: [
    {
      id: 0,
      text: "string",
      createdAt: "2022-06-21T15:27:05.208Z",
      discordId: "string",
      author: {
        name: "string",
        image: tempIcon,
      },
      channelType: "giveaway",
    },
  ],
  twitter: {
    author: {
      name: "string",
      image: tempIcon,
    },
    messages: ["string"],
  },
};

export const collectionsDataMock: ICollectionData = {
  collections: [collectionItemMock, collectionItemMock2],
  ranges: {
    sizeMax: 10000,
    floorPriceMax: 100,
    twitterFollowersCountMax: 10000,
    discordMembersCountMax: 50000,
  },
};
