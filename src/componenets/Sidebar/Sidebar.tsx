import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";

import Button from "@UI/Button/Button";
import RangeInput from "@UI/RangeInput/RangeInput";
import TextInput from "@UI/TextInput/TextInput";
import "./sidebar.scss";
import { useAppDispatch, useAppSelector } from "@store/store.hook";
import { selectFilterRequest, updateFilter, resetFilter } from "@store/state/filterSlice";

interface ISidebarProps {
  page: "collections" | "giveaways";
  searchPlaceholder: string;
  sizeMax: number;
  floorPriceMax?: number;
  twitterFollowersCountMax?: number;
  discordMembersCountMax: number;
}

const PERCENT = 1;

const Sidebar = forwardRef((props: ISidebarProps, ref) => {
  const {
    page,
    searchPlaceholder,
    sizeMax,
    floorPriceMax,
    discordMembersCountMax,
    twitterFollowersCountMax,
  } = props;

  const filterRequest = useAppSelector(selectFilterRequest);
  const dispatch = useAppDispatch();

  const calculateInputStep = (maxValue: number) => {
    const calculatedPercent = (PERCENT / 100) * maxValue;

    if (maxValue > 1) {
      return Math.floor(calculatedPercent);
    } else {
      return +calculatedPercent.toFixed(4);
    }
  };

  const calculateMaxRange = (maxValue: number) => {
    return +(calculateInputStep(maxValue) * 101).toFixed(2);
  };

  const [collectionSizeFilter, setCollectionSizeFilter] = useState([
    filterRequest.filter.size.from,
    sizeMax,
  ]);
  const [priceFilter, setPriceFilter] = useState([
    filterRequest.filter.floorPrice.from!,
    calculateMaxRange(rangeData.floorPriceMax),
  ]);
  const [twitterFolFilter, setTwitterFolFilter] = useState([
    filterRequest.filter.twitterFollowersCount.from,
    calculateMaxRange(rangeData.twitterFollowersCountMax),
  ]);
  const [discordFolFilter, setDiscordFolFilter] = useState([
    filterRequest.filter.discordMembersCount.from,
    calculateMaxRange(rangeData.discordMembersCountMax),
  ]);
  const [searchValue, setSearchValue] = useState(filterRequest.filter.name);

  const convertToRange = (name: string, arr: number[]) => {
    const obj = {};
    return (obj[name] = {
      from: arr[0],
      to: arr[1],
    });
  };

  const updateFilterRequest = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const newFilter = { ...filterRequest.filter };
    newFilter.name = searchValue;

    newFilter.size = convertToRange("size", collectionSizeFilter);
    if (page === "collections") {
      newFilter.floorPrice = convertToRange("floorPrice", priceFilter);
      newFilter.discordMembersCount = convertToRange("discordMembersCount", discordFolFilter);
      newFilter.twitterFollowersCount = convertToRange("twitterFollowersCount", twitterFolFilter);
    } else {
      newFilter.membersCount = convertToRange("membersCount", discordFolFilter);
    }
    dispatch(updateFilter(newFilter));
  };

  const resetBtn = () => {
    dispatch(resetFilter());
    setSearchValue("");
    setCollectionSizeFilter([0, calculateMaxRange(rangeData.sizeMax)]);
    setPriceFilter([0, calculateMaxRange(rangeData.floorPriceMax)]);
    setTwitterFolFilter([0, calculateMaxRange(rangeData.twitterFollowersCountMax)]);
    setDiscordFolFilter([0, calculateMaxRange(rangeData.discordMembersCountMax)]);
  };

  useImperativeHandle(ref, () => ({
    resetFunction() {
      resetBtn();
    },
  }));

  // Clear filter params on unload
  useEffect(() => {
    return () => {
      dispatch(resetFilter());
    };
  }, [dispatch]);

  return (
    <aside className="sidebar">
      <form onSubmit={updateFilterRequest}>
        <TextInput placeholder={searchPlaceholder} value={searchValue} setValue={setSearchValue} />

        <div className="sidebar__ranges">
          <RangeInput
            name="Collection size"
            min={0}
            max={calculateMaxRange(rangeData.sizeMax)}
            value={collectionSizeFilter}
            setValue={setCollectionSizeFilter}
            showEtherIcon={false}
            step={calculateInputStep(rangeData.sizeMax)}
          />

          {page === "collections" && (
            <>
              <RangeInput
                name="Floor Price"
                min={0}
                max={calculateMaxRange(rangeData.floorPriceMax)}
                value={priceFilter}
                setValue={setPriceFilter}
                showEtherIcon={true}
                step={calculateInputStep(rangeData.floorPriceMax)}
              />
              <RangeInput
                name="Twitter Followers"
                min={0}
                max={calculateMaxRange(rangeData.twitterFollowersCountMax)}
                value={twitterFolFilter}
                setValue={setTwitterFolFilter}
                showEtherIcon={false}
                step={calculateInputStep(rangeData.twitterFollowersCountMax)}
              />
            </>
          )}

          <RangeInput
            name="Discord Members"
            min={0}
            max={calculateMaxRange(rangeData.discordMembersCountMax)}
            value={discordFolFilter}
            setValue={setDiscordFolFilter}
            showEtherIcon={false}
            step={calculateInputStep(rangeData.discordMembersCountMax)}
          />
        </div>

        <div className="sidebar__buttons">
          <Button type="submit">Apply</Button>
          <Button variant="secondary" onClick={resetBtn}>
            Reset
          </Button>
        </div>
      </form>
    </aside>
  );
});

export default Sidebar;
