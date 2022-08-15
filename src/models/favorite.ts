import { IMeta } from "./response.interface";

export interface IFavorite {
  openseaId: string;
  bannerImage: string;
  image: string;
  name: string;
  floorPrice: string;
  dailyChange: string;
  discordNewMessages: number;
  twitterNewMessages: number;
}

export interface IFavoritesResponse {
  items: IFavorite[];
  meta: IMeta;
}
