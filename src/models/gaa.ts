import { IFilterRequest } from "./filters";
import { IMeta } from "./response.interface";

export enum GaaChannelTypes {
  giveaways = 0,
  announcement = 1,
  all = 2,
}

export interface IGaaItem {
  bannerImage: string;
  image: string;
  name: string;
  size: number;
  floorPrice?: number;
  discordMessage: IGaaMessage;
  discordMembersCount: number;
  discordInviteLink: string;
}

export interface IGaaMessage {
  id: number;
  message: string;
  createdAt: string;
  author: {
    name: string;
    image: string;
  };
  channelType: GaaChannelTypes;
}

export interface IGaaData {
  collections: IGaaItem[];
  ranges: IMaxRangesGaa;
}

export interface IMaxRangesGaa {
  sizeMax: number;
  membersCountMax: number;
}

export interface IGaaRequest {
  filter: IFilterRequest;
  type: GaaChannelTypes;
  page: number;
  perPage?: number;
}

export interface IGaaResponse {
  items: IGaaData;
  meta: IMeta;
}
