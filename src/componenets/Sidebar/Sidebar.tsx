import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import Button from "@UI/Button/Button";
import RangeInput from "@UI/RangeInput/RangeInput";
import TextInput from "@UI/TextInput/TextInput";
import "./sidebar.scss";
import { useAppDispatch, useAppSelector } from "@store/store.hook";
import { selectFilterRequest, updateFilter, resetFilter } from "@store/state/filterSlice";
import { IMaxRanges } from "@models/collection";

interface ISidebarProps {
  page: "collections" | "giveaways";
  searchPlaceholder: string;
  rangeData: IMaxRanges;
}

const Sidebar = forwardRef((props: ISidebarProps, ref) => {
  const { page, searchPlaceholder, rangeData } = props;
  const filterRequest = useAppSelector(selectFilterRequest);
  const dispatch = useAppDispatch();

  const [collectionSizeFilter, setCollectionSizeFilter] = useState([
    filterRequest.filter.size.from,
    rangeData.sizeMax,
  ]);
  const [priceFilter, setPriceFilter] = useState([
    filterRequest.filter.floorPrice.from!,
    rangeData.floorPriceMax,
  ]);
  const [twitterFolFilter, setTwitterFolFilter] = useState([
    filterRequest.filter.twitterFollowersCount.from,
    rangeData.twitterFollowersCountMax,
  ]);
  const [discordFolFilter, setDiscordFolFilter] = useState([
    filterRequest.filter.discordMembersCount.from,
    rangeData.discordMembersCountMax,
  ]);
  const [searchValue, setSearchValue] = useState(filterRequest.filter.name);

  const convertToRange = (name: string, arr: number[]) => {
    const obj = {};
    return (obj[name] = {
      from: arr[0],
      to: arr[1],
    });
  };

  const updateFilterRequest = () => {
    const newFilter = { ...filterRequest.filter };
    newFilter.name = searchValue;
    newFilter.size = convertToRange("size", collectionSizeFilter);
    newFilter.floorPrice = convertToRange("floorPrice", priceFilter);
    newFilter.discordMembersCount = convertToRange("discordMembersCount", discordFolFilter);
    newFilter.twitterFollowersCount = convertToRange("twitterFollowersCount", twitterFolFilter);
    dispatch(updateFilter(newFilter));
  };

  const resetBtn = () => {
    dispatch(resetFilter());
    setSearchValue("");
    setCollectionSizeFilter([0, rangeData.sizeMax]);
    setPriceFilter([0, rangeData.floorPriceMax]);
    setTwitterFolFilter([0, rangeData.twitterFollowersCountMax]);
    setDiscordFolFilter([0, rangeData.discordMembersCountMax]);
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
      <TextInput placeholder={searchPlaceholder} value={searchValue} setValue={setSearchValue} />

      <div className="sidebar__ranges">
        <RangeInput
          name="Collection size"
          min={0}
          max={rangeData.sizeMax}
          value={collectionSizeFilter}
          setValue={setCollectionSizeFilter}
          showEtherIcon={true}
        />

        {page === "collections" && (
          <>
            <RangeInput
              name="Floor Price"
              min={0}
              max={rangeData.floorPriceMax}
              value={priceFilter}
              setValue={setPriceFilter}
              showEtherIcon={true}
            />
            <RangeInput
              name="Twitter Followers"
              min={0}
              max={rangeData.twitterFollowersCountMax}
              value={twitterFolFilter}
              setValue={setTwitterFolFilter}
              showEtherIcon={false}
            />
          </>
        )}

        <RangeInput
          name="Discord Members"
          min={0}
          max={rangeData.discordMembersCountMax}
          value={discordFolFilter}
          setValue={setDiscordFolFilter}
          showEtherIcon={false}
        />
      </div>

      <div className="sidebar__buttons">
        <Button onClick={updateFilterRequest}>Apply</Button>
        <Button variant="secondary" onClick={resetBtn}>
          Reset
        </Button>
      </div>
    </aside>
  );
});

export default Sidebar;
