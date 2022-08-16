import { ICollection } from "@models/collection";
import { IFavorite } from "@models/favorite";
import dayjs from "dayjs";

export function kFormatter(num: number) {
  return Math.abs(num) > 999
    ? Math.sign(num) * +(Math.abs(num) / 1000).toFixed(1) + "K"
    : Math.sign(num) * Math.abs(num);
}

export function hundredFormatter(num: number) {
  return num > 100 ? "99+" : num;
}

export function formatDate(date: string) {
  const newDate = new Date(date);
  if (newDate.getFullYear() === new Date().getFullYear()) {
    return dayjs(newDate).format("DD MMM");
  } else {
    return dayjs(newDate).format("DD MMM YYYY");
  }
}

export const convertToFavItem = (item: ICollection) => {
  const converted: IFavorite = {
    collectionId: item.openseaId,
    name: item.name,
    bannerImage: item.banner,
    dailyChange: item.dailyChange,
    image: item.image,
    floorPrice: item.floorPrice,
    discordNewMessages: 0,
    twitterNewMessages: 0,
  };
  return converted;
};
