export enum CollectionsFilterBy {
  name = 0,
  size = 1,
  floorPrice = 2,
  change = 3,
  twitterFollowersCount = 4,
  discordMembersCount = 5,
}

export enum GiveawaysFilterBy {
  date = 0,
  size = 1,
  floorPrice = 2,
  name = 3,
}

export enum FilterType {
  asc = 0,
  desc = 1,
}

export interface IFilterRequest {
  filter: INftCollectionsFilter;
  order: ICollectionOrder;
}

export interface ICollectionOrder {
  orderBy: CollectionsFilterBy | GiveawaysFilterBy;
  orderType: FilterType;
}

export interface INftCollectionsFilter {
  name: string;
  size: IRange;
  floorPrice?: IRange;
  twitterFollowersCount?: IRange;
  discordMembersCount?: IRange;
  membersCount?: IRange;
}

interface IRange {
  from: number;
  to?: number;
}
