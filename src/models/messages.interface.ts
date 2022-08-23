import { IMeta } from "./response.interface";

export interface IMessagesRequest {
  collectionId: string;
  page: number;
  perPage?: number;
}

export interface IDiscordMessagesResponse {
  items: IDiscordMessage[];
  meta: IMeta;
}

export interface ITwitterMessagesResponse {
  items: ITweet[];
  meta: IMeta;
}

export interface IDiscordMessage {
  id: string;
  text: string;
  channelType: number;
  createdAt: string;
  author: {
    name: string;
    image: string;
  };
}

export interface ITwitterMessages {
  author: {
    name: string;
    image: string;
  };
  messages: ITweet[];
}

export interface ITweet {
  message: string;
  createdAt: string;
  id: string;
}
