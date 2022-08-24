import dayjs from "dayjs";

import { RANGE_INPUT_STEP_PERCENT } from "@constants/constant";
import { ICollection } from "@models/collection";
import { IFavorite } from "@models/favorite";

export function kFormatter(num: number) {
  if (Math.abs(num) > 999999) {
    return Math.sign(num) * +(Math.abs(num) / 1000000).toFixed(1) + "M";
  }
  if (Math.abs(num) > 999) {
    return Math.sign(num) * +(Math.abs(num) / 1000).toFixed(1) + "k";
  }
  return Math.sign(num) * +Math.abs(num).toFixed(2);
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
    openseaId: item.openseaId,
    name: item.name,
    bannerImage: item.bannerImage,
    dailyChange: item.dailyChange,
    image: item.image,
    floorPrice: item.floorPrice,
    discordNewMessages: 0,
    twitterNewMessages: 0,
  };
  return converted;
};

export const userHasSignature = () => {
  const userSignature = localStorage.getItem("agAuth");
  if (!userSignature) {
    return false;
  } else {
    return true;
  }
};

export const roundNumber = (value: string | number) => {
  return Number(value).toFixed(2);
};

export const createTwitterLink = (twitterAccountId: string) => {
  return `https://twitter.com/${twitterAccountId}`;
};

export const calculateInputStep = (maxValue: number) => {
  const calculatedPercent = (RANGE_INPUT_STEP_PERCENT / 100) * maxValue;

  if (maxValue > 1) {
    return Math.floor(calculatedPercent);
  } else {
    return +calculatedPercent.toFixed(4);
  }
};

export const calculateMaxRange = (maxValue: number) => {
  const oneStepValue = calculateInputStep(maxValue);
  return +(oneStepValue * (100 / RANGE_INPUT_STEP_PERCENT) + oneStepValue).toFixed(4);
};

export const roundFloorPrice = (floorPrice: string | number) => {
  return parseFloat(Number(floorPrice).toFixed(4));
};
