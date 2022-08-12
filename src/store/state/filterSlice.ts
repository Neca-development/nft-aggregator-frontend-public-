import {
  CollectionsFilterBy,
  FilterType,
  ICollectionOrder,
  IFilterRequest,
  INftCollectionsFilter,
} from "@models/filters";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@store/store";

const initialState: IFilterRequest = {
  filter: {
    name: "",
    size: {
      from: 0,
    },
    floorPrice: {
      from: 0,
    },
    discordMembersCount: {
      from: 0,
    },
    twitterFollowersCount: {
      from: 0,
    },
  },
  order: {
    orderBy: CollectionsFilterBy.name,
    orderType: FilterType.asc,
  },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState: initialState,
  reducers: {
    updateFilter: (state, action: PayloadAction<INftCollectionsFilter>) => {
      state.filter = action.payload;
    },
    updateOrder: (state, action: PayloadAction<ICollectionOrder>) => {
      state.order = action.payload;
    },
    resetFilter: state => {
      state.filter = initialState.filter;
    },
  },
});

export const { updateFilter, resetFilter, updateOrder } = filterSlice.actions;

export const selectFilterRequest = (state: RootState) => state.filterRequest;

export default filterSlice.reducer;
