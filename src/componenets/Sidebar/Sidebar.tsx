import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";

import Button from "@UI/Button/Button";
import RangeInput from "@UI/RangeInput/RangeInput";
import TextInput from "@UI/TextInput/TextInput";
import "./sidebar.scss";
import { useAppDispatch, useAppSelector } from "@store/store.hook";
import { selectFilterRequest, updateFilter, resetFilter } from "@store/state/filterSlice";
import { calculateInputStep, calculateMaxRange } from "@utils/utils";

interface ISidebarProps {
  page: "collections" | "giveaways";
  searchPlaceholder: string;
  sizeMax: number;
  floorPriceMax?: number;
  twitterFollowersCountMax?: number;
  discordMembersCountMax: number;
}

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

  const [collectionSizeFilter, setCollectionSizeFilter] = useState([
    filterRequest.filter.size.from,
    calculateMaxRange(sizeMax),
  ]);
  const [priceFilter, setPriceFilter] = useState([
    filterRequest.filter.floorPrice.from,
    calculateMaxRange(floorPriceMax),
  ]);
  const [twitterFolFilter, setTwitterFolFilter] = useState([
    filterRequest.filter.twitterFollowersCount.from,
    calculateMaxRange(twitterFollowersCountMax),
  ]);
  const [discordFolFilter, setDiscordFolFilter] = useState([
    filterRequest.filter.discordMembersCount.from,
    calculateMaxRange(discordMembersCountMax),
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
    setCollectionSizeFilter([0, calculateMaxRange(sizeMax)]);
    setPriceFilter([0, calculateMaxRange(floorPriceMax)]);
    setTwitterFolFilter([0, calculateMaxRange(twitterFollowersCountMax)]);
    setDiscordFolFilter([0, calculateMaxRange(discordMembersCountMax)]);
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
            max={calculateMaxRange(sizeMax)}
            value={collectionSizeFilter}
            setValue={setCollectionSizeFilter}
            showEtherIcon={false}
            step={calculateInputStep(sizeMax)}
          />

          {page === "collections" && (
            <>
              <RangeInput
                name="Floor Price"
                min={0}
                max={calculateMaxRange(floorPriceMax)}
                value={priceFilter}
                setValue={setPriceFilter}
                showEtherIcon={true}
                step={calculateInputStep(floorPriceMax)}
              />
              <RangeInput
                name="Twitter Followers"
                min={0}
                max={calculateMaxRange(twitterFollowersCountMax)}
                value={twitterFolFilter}
                setValue={setTwitterFolFilter}
                showEtherIcon={false}
                step={calculateInputStep(twitterFollowersCountMax)}
              />
            </>
          )}

          <RangeInput
            name="Discord Members"
            min={0}
            max={calculateMaxRange(discordMembersCountMax)}
            value={discordFolFilter}
            setValue={setDiscordFolFilter}
            showEtherIcon={false}
            step={calculateInputStep(discordMembersCountMax)}
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
