import { IFilterRequest } from "./filters";
import { IMeta } from "./response.interface";

export interface ICollection {
  openseaId: string;
  image: string;
  bannerImage: string;
  name: string;
  size: number;
  floorPrice: string;
  dailyChange: string;
  discordMembersCount: number;
  twitterFollowersCount: number;
  isFavorite: boolean;
  createdAt: string;
  owners: number;
  volumeTraded: string;
  weeklyChange: string;
  monthlyChange: string;
  description: string;
  discordMessages?: IDiscordMessage[];
  twitter?: ITwitterMessages;
  link: string;
  discordInviteLink: string;
  twitterUsername: string;
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

interface ITwitterMessages {
  author: {
    name: string;
    image: string;
  };
  messages: ITweet[];
}

interface ITweet {
  message: string;
  createdAt: string;
  id: string;
}

export interface ICollectionData {
  collections: ICollection[];
  ranges: IMaxRanges;
}

export interface ICollectionRequest {
  filter: IFilterRequest;
  page?: number;
  perPage?: number;
}

export interface ICollectionResponse {
  items: ICollectionData;
  meta: IMeta;
}

export interface IMaxRanges {
  discordMembersCountMax: number;
  floorPriceMax: number;
  sizeMax: number;
  twitterFollowersCountMax: number;
}
