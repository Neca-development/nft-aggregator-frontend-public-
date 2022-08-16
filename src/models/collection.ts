import { IFilterRequest } from "./filters";

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

interface IMeta {
  currentPage: number;
  perPage: number;
  totalPages: number;
}

export interface IMaxRanges {
  discordMembersCountMax: number;
  floorPriceMax: number;
  sizeMax: number;
  twitterFollowersCountMax: number;
}
