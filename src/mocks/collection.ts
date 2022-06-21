import tempImg from "../assets/images/temp-item.jpg";

export const collectionItemMock = {
  id: 1,
  openseaId: "string",
  image: tempImg,
  name: "Moonbirds",
  size: 10000,
  floorPrice: 28.89,
  dailyChange: 40,
  discordMembersCount: 39900,
  twitterFollowersCount: 19900,
  isFavorite: false,
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
        image: "string",
      },
      channelType: "giveaway",
    },
  ],
  twitter: {
    author: {
      name: "string",
      image: "string",
    },
    messages: ["string"],
  },
};

const collectionItemMock2 = {
  id: 2,
  openseaId: "string",
  image: tempImg,
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
        image: "string",
      },
      channelType: "giveaway",
    },
  ],
  twitter: {
    author: {
      name: "string",
      image: "string",
    },
    messages: ["string"],
  },
};

export const collectionsDataMock = [
  {
    collections: [collectionItemMock, collectionItemMock2],
    ranges: {
      sizeMax: 0,
      floorPriceMax: 0,
      twitterFollowersCountMax: 0,
      discordMembersCountMax: 0,
    },
  },
];
