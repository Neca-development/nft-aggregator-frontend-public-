import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import CollectionTableItem from "@components/CollectionTableItem/CollectionTableItem";
import Sidebar from "@components/Sidebar/Sidebar";
import "./collections.scss";
import CollectionItemSkeleton from "@components/UI/CollectionItemSkeleton/CollectionItemSkeleton";
import PagePresenceWrapper from "@components/UI/PagePresenceWrapper";
import { useDidMountEffect } from "@hooks/useDidMountEffect";
import { ICollection, IMaxRanges } from "@models/collection";
import { CollectionsFilterBy, FilterType, IFilterRequest } from "@models/filters";
import { useGetCollectionsMutation } from "@services/collections.api";
import { selectFilterRequest } from "@store/state/filterSlice";
import { useAppSelector } from "@store/store.hook";
import Button from "@UI/Button/Button";
import TableFilterTitle from "@UI/TableFilterTitle/TableFilterTitle";
import Loader from "@components/UI/Loader/Loader";
import { useRemToPx } from "@hooks/useRemToPx";

const PER_PAGE = 9;

function Collections() {
  const [activeFilter, setActiveFilter] = useState(CollectionsFilterBy.name);
  const [isSortAsc, setIsSortAsc] = useState(false);
  const filterRequest = useAppSelector(selectFilterRequest);
  const [fetchCollections, { data }] = useGetCollectionsMutation();
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [localData, setLocalData] = useState<ICollection[]>([]);
  const [rangeData, setRangeData] = useState<IMaxRanges>(null);
  const initialRender = useRef(true);
  const sidebarRef = useRef(null);
  const { result: rowHeight } = useRemToPx(3.875);

  const handleResetSearch = () => {
    sidebarRef.current.resetFunction();
  };

  const requestNextPage = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchCollections({ filter: filterRequest, page: nextPage, perPage: PER_PAGE });
  };

  // Get max ranges at first render
  useEffect(() => {
    const getMaxRanges = async () => {
      const initialFilter: IFilterRequest = {
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
      const res = await fetchCollections({
        filter: initialFilter,
        page: 0,
        perPage: PER_PAGE,
      }).unwrap();
      setRangeData(res.data.items.ranges);
      initialRender.current = false;
    };
    getMaxRanges();
  }, [fetchCollections]);

  // Observe filter change
  useDidMountEffect(() => {
    setPage(0);
    setHasMore(true);
    fetchCollections({ filter: filterRequest, page: 0, perPage: PER_PAGE });
  }, [filterRequest]);

  // Writing incoming data
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
            page="collections"
            sizeMax={rangeData.sizeMax}
            discordMembersCountMax={rangeData.discordMembersCountMax}
            floorPriceMax={rangeData.floorPriceMax}
            twitterFollowersCountMax={rangeData.twitterFollowersCountMax}
            searchPlaceholder="Collection name"
            ref={sidebarRef}
          />
        )}

        <section className="collections">
          <div className="collections__header">
            <TableFilterTitle
              name="Collection name"
              isSortAsc={isSortAsc}
              activeFilter={activeFilter}
              filter={CollectionsFilterBy.name}
              setActiveFilter={setActiveFilter}
              setIsSortAsc={setIsSortAsc}
            />
            <TableFilterTitle
              name="Collection size"
              isSortAsc={isSortAsc}
              activeFilter={activeFilter}
              filter={CollectionsFilterBy.size}
              setActiveFilter={setActiveFilter}
              setIsSortAsc={setIsSortAsc}
            />
            <TableFilterTitle
              name="Floor price"
              isSortAsc={isSortAsc}
              activeFilter={activeFilter}
              filter={CollectionsFilterBy.floorPrice}
              setActiveFilter={setActiveFilter}
              setIsSortAsc={setIsSortAsc}
            />
            <TableFilterTitle
              name="24h change"
              isSortAsc={isSortAsc}
              activeFilter={activeFilter}
              filter={CollectionsFilterBy.change}
              setActiveFilter={setActiveFilter}
              setIsSortAsc={setIsSortAsc}
            />
            <TableFilterTitle
              name="Discord"
              isSortAsc={isSortAsc}
              activeFilter={activeFilter}
              filter={CollectionsFilterBy.discordMembersCount}
              setActiveFilter={setActiveFilter}
              setIsSortAsc={setIsSortAsc}
            />
            <TableFilterTitle
              name="Twitter"
              isSortAsc={isSortAsc}
              activeFilter={activeFilter}
              filter={CollectionsFilterBy.twitterFollowersCount}
              setActiveFilter={setActiveFilter}
              setIsSortAsc={setIsSortAsc}
            />
            <span></span>
          </div>

          {localData?.length > 0 ? (
            <InfiniteScroll
              dataLength={localData.length}
              height={rowHeight * PER_PAGE}
              next={requestNextPage}
              hasMore={hasMore}
              loader={<CollectionItemSkeleton />}
            >
              {localData.map(item => (
                <CollectionTableItem key={item.openseaId} item={item} />
              ))}
            </InfiniteScroll>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15 }}
              key="empty"
              className="collections__empty"
            >
              <h2>No items found for this search</h2>
              <Button size="large" variant="gradient" onClick={handleResetSearch}>
                Back to all items
              </Button>
            </motion.div>
          )}
        </section>
      </div>
    </PagePresenceWrapper>
  );
}

export default Collections;
