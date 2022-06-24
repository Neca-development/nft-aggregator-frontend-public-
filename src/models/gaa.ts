export interface IGiveawaysAndAnn {
  collections: IGaaItem[];
  ranges: {
    sizeMax: number;
    membersCountMax: number;
  };
}

export interface IGaaItem {
  bannerImage: string;
  image: string;
  name: string;
  size: number;
  floorPrice: number;
  discordMessage: IGaaMessage;
}

export interface IGaaMessage {
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
