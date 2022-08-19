import React, { useEffect, useRef, useState } from "react";
import "./giveaways.scss";
import { useNavigate } from "react-router-dom";

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
import { GaaChannelTypes, IGaaItem, IGaaRequest, IMaxRangesGaa } from "@models/gaa";
import { useGetGiveawaysAndAnnouncementsMutation } from "@services/collections.api";
import { selectFilterRequest } from "@store/state/filterSlice";
import { useAppSelector } from "@store/store.hook";
import Button from "@UI/Button/Button";
import TableFilterTitle from "@UI/TableFilterTitle/TableFilterTitle";
import Tabs from "@UI/Tabs/Tabs";
import Loader from "@components/UI/Loader/Loader";

const gaaTabs = [
  { name: "All", type: GaaChannelTypes.all },
  { name: "Giveaways", type: GaaChannelTypes.giveaways },
  { name: "Announcements", type: GaaChannelTypes.announcement },
];

function Giveaways() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(gaaTabs[0]);
  const [activeFilter, setActiveFilter] = useState(GiveawaysFilterBy.date);
  const [isSortAsc, setIsSortAsc] = useState(false);
  const filterRequest = useAppSelector(selectFilterRequest);
  const [fetchGaa, { data }] = useGetGiveawaysAndAnnouncementsMutation();
  const [page, setPage] = useState(0);
  const [localData, setLocalData] = useState<IGaaItem[]>(null);
  const [rangeData, setRangeData] = useState<IMaxRangesGaa>(null);

  const initialRender = useRef(true);
  const sidebarRef = useRef(null);

  // Get filter max ranges
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
      }).unwrap();
      setRangeData(res.data.items.ranges);
      initialRender.current = false;
    };
    getMaxRanges();
  }, [activeTab.type, fetchGaa]);

  // TODO pagination here
  useEffect(() => {
    if (data?.data.items) {
      setLocalData(data.data.items.collections);
    }
  }, [data]);

  // Observe filter change
  useDidMountEffect(() => {
    const requestCollections = async () => {
      const req: IGaaRequest = {
        filter: filterRequest,
        type: activeTab.type,
        page,
      };
      try {
        const res = await fetchGaa(req).unwrap();
        setLocalData(res.data.items.collections);
        // TODO get range data on tabs change
      } catch (error) {
        console.log(error);
      }
    };
    requestCollections();
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
            <div className="giveaways__body">
              {localData.map((item, idx) => (
                <GaATableItem key={idx} item={item} />
              ))}
            </div>
          ) : (
            <div className="giveaways__empty">
              <h2>No Giveaways and Announcements found for this search</h2>
              <Button size="large" variant="gradient" onClick={() => navigate("/")}>
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
