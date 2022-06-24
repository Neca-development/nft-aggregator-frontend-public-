export interface ICollection {
  id: number;
  openseaId: string;
  image: any;
  name: string;
  size: number;
  floorPrice: number;
  dailyChange: number;
  discordMembersCount: number;
  twitterFollowersCount: number;
  isFavorite: boolean;
  createdAt: string;
  ownersCount: number;
  volumeTraded: number;
  weeklyChange: number;
  monthlyChange: number;
  description: string;
  discordMessages: IDiscordMessage[];
  twitter: ITwitterMessage;
  banner: string;
}

interface IDiscordMessage {
  id: number;
  text: string;
  createdAt: string;
  discordId: string;
  author: {
    name: string;
    image: string;
  };
  channelType: string;
}

interface ITwitterMessage {
  author: {
    name: string;
    image: string;
  };
  messages: string[];
}

export interface ICollectionData {
  collections: ICollection[];
  ranges: {
    sizeMax: number;
    floorPriceMax: number;
    twitterFollowersCountMax: number;
    discordMembersCountMax: number;
  };
}
