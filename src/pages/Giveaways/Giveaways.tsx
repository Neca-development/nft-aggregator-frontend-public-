import React, { useEffect, useRef, useState } from "react";
import "./giveaways.scss";
import InfiniteScroll from "react-infinite-scroll-component";

import GaATableItem from "@components/GaATableItem/GaATableItem";
import Sidebar from "@components/Sidebar/Sidebar";
import PagePresenceWrapper from "@components/UI/PagePresenceWrapper";
import { useDidMountEffect } from "@hooks/useDidMountEffect";
import {
  CollectionsFilterBy,
  FilterType,
  GiveawaysFilterBy,
  IFilterRequest,
} from "@models/filters";
import { GaaChannelTypes, IGaaItem, IMaxRangesGaa } from "@models/gaa";
import { useGetGiveawaysAndAnnouncementsMutation } from "@services/collections.api";
import { selectFilterRequest } from "@store/state/filterSlice";
import { useAppSelector } from "@store/store.hook";
import Button from "@UI/Button/Button";
import TableFilterTitle from "@UI/TableFilterTitle/TableFilterTitle";
import Tabs from "@UI/Tabs/Tabs";
import Loader from "@components/UI/Loader/Loader";
import { useRemToPx } from "@hooks/useRemToPx";
import GaaItemSkeleton from "@components/UI/GaaItemSkeleton/GaaItemSkeleton";

const gaaTabs = [
  { name: "All", type: GaaChannelTypes.all },
  { name: "Giveaways", type: GaaChannelTypes.giveaways },
  { name: "Announcements", type: GaaChannelTypes.announcement },
];

const PER_PAGE = 6;

function Giveaways() {
  const [activeTab, setActiveTab] = useState(gaaTabs[0]);
  const [activeFilter, setActiveFilter] = useState(GiveawaysFilterBy.date);
  const [isSortAsc, setIsSortAsc] = useState(false);
  const filterRequest = useAppSelector(selectFilterRequest);
  const [fetchGaa, { data }] = useGetGiveawaysAndAnnouncementsMutation();
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [localData, setLocalData] = useState<IGaaItem[]>(null);
  const [rangeData, setRangeData] = useState<IMaxRangesGaa>(null);
  const { result: rowHeight } = useRemToPx(28.125);

  const initialRender = useRef(true);
  const sidebarRef = useRef(null);

  // Reset filter options by function in the sidebar
  const handleResetSearch = () => {
    sidebarRef.current.resetFunction();
  };

  const requestNextPage = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchGaa({ filter: filterRequest, type: activeTab.type, page: nextPage, perPage: PER_PAGE });
  };

  // Initial request and retrieve max ranges for filter
  useEffect(() => {
    const getMaxRanges = async () => {
      const initialFilter: IFilterRequest = {
        filter: {
          name: "",
          size: {
            from: 0,
          },
          membersCount: {
            from: 0,
          },
        },
        order: {
          orderBy: CollectionsFilterBy.name,
          orderType: FilterType.asc,
        },
      };
      const res = await fetchGaa({
        filter: initialFilter,
        type: activeTab.type,
        page: 0,
        perPage: PER_PAGE,
      }).unwrap();
      setRangeData(res.data.items.ranges);
      initialRender.current = false;
    };
    getMaxRanges();
  }, [activeTab.type, fetchGaa]);

  // Track incoming data
  useEffect(() => {
    if (!data) {
      return;
    }

    if (page === 0) {
      setLocalData(data.data.items.collections);
    } else {
      setLocalData(prev => [...prev, ...data.data.items.collections]);
    }

    if (page + 1 >= data.data.meta.totalPages) {
      setHasMore(false);
    }
  }, [data, page]);

  // Observe filter change
  useDidMountEffect(() => {
    setPage(0);
    setHasMore(true);
    fetchGaa({ filter: filterRequest, type: activeTab.type, page: 0, perPage: PER_PAGE });
  }, [filterRequest]);

  if (initialRender.current) {
    return (
      <PagePresenceWrapper>
        <Loader variant="logo" />
      </PagePresenceWrapper>
    );
  }

  return (
    <PagePresenceWrapper>
      <div className="container tableLayout">
        {rangeData && (
          <Sidebar
            page="giveaways"
            sizeMax={rangeData.sizeMax}
            discordMembersCountMax={rangeData.membersCountMax}
            searchPlaceholder="Search"
            ref={sidebarRef}
          />
        )}

        <section className="giveaways">
          <div className="giveaways__header">
            <Tabs tabs={gaaTabs} activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="giveaways__colNames">
              <TableFilterTitle
                name="Date"
                isSortAsc={isSortAsc}
                activeFilter={activeFilter}
                filter={GiveawaysFilterBy.date}
                setActiveFilter={setActiveFilter}
                setIsSortAsc={setIsSortAsc}
              />
              <TableFilterTitle
                name="Collection size"
                isSortAsc={isSortAsc}
                activeFilter={activeFilter}
                filter={GiveawaysFilterBy.size}
                setActiveFilter={setActiveFilter}
                setIsSortAsc={setIsSortAsc}
              />
              <TableFilterTitle
                name="Floor price"
                isSortAsc={isSortAsc}
                activeFilter={activeFilter}
                filter={GiveawaysFilterBy.floorPrice}
                setActiveFilter={setActiveFilter}
                setIsSortAsc={setIsSortAsc}
              />
              <TableFilterTitle
                name="Collection name"
                isSortAsc={isSortAsc}
                activeFilter={activeFilter}
                filter={GiveawaysFilterBy.name}
                setActiveFilter={setActiveFilter}
                setIsSortAsc={setIsSortAsc}
              />
            </div>
          </div>

          {localData?.length > 0 ? (
            <InfiniteScroll
              dataLength={localData.length}
              height={rowHeight * 2}
              next={requestNextPage}
              hasMore={hasMore}
              loader={<GaaItemSkeleton />}
            >
              {localData.map((item, idx) => (
                <GaATableItem key={idx} item={item} />
              ))}
            </InfiniteScroll>
          ) : (
            <div className="giveaways__empty">
              <h2>No Giveaways and Announcements found for this search</h2>
              <Button size="large" variant="gradient" onClick={handleResetSearch}>
                Back to all messages
              </Button>
            </div>
          )}
        </section>
      </div>
    </PagePresenceWrapper>
  );
}

export default Giveaways;
