import React, { useState } from "react";
import "./giveaways.scss";
import Sidebar from "@components/Sidebar/Sidebar";
import { GiveawaysAndAnnMock } from "@mocks/gaa";
import GaATableItem from "@components/GaATableItem/GaATableItem";
import Button from "@UI/Button/Button";
import { useNavigate } from "react-router-dom";
import { GivewaysFilterBy } from "@models/filters";
import TableFilterTitle from "@UI/TableFilterTitle/TableFilterTitle";
import Tabs from "@UI/Tabs/Tabs";
import PagePresenceWrapper from "@components/UI/PagePresenceWrapper";

enum GaaTabs {
  all = "All",
  giveaway = "Giveaways",
  announce = "Announcements",
}

function Giveaways() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(GaaTabs.all);
  const [activeFilter, setActiveFilter] = useState(null);
  const [isSortAsc, setIsSortAsc] = useState(true);

  return (
    <PagePresenceWrapper>
      <div className="container tableLayout">
        {/* <Sidebar
          page="giveaways"
          collectionMax={GiveawaysAndAnnMock.ranges.sizeMax}
          discordMax={GiveawaysAndAnnMock.ranges.membersCountMax}
          searchPlaceholder="Search"
        /> */}

        <section className="giveaways">
          <div className="giveaways__header">
            <Tabs
              tabsArray={[GaaTabs.all, GaaTabs.giveaway, GaaTabs.announce]}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <div className="giveaways__colNames">
              <TableFilterTitle
                name="Date"
                isSortAsc={isSortAsc}
                activeFilter={activeFilter}
                filter={GivewaysFilterBy.date}
                setActiveFilter={setActiveFilter}
                setIsSortAsc={setIsSortAsc}
              />
              <TableFilterTitle
                name="Collection size"
                isSortAsc={isSortAsc}
                activeFilter={activeFilter}
                filter={GivewaysFilterBy.size}
                setActiveFilter={setActiveFilter}
                setIsSortAsc={setIsSortAsc}
              />
              <TableFilterTitle
                name="Floor price"
                isSortAsc={isSortAsc}
                activeFilter={activeFilter}
                filter={GivewaysFilterBy.floorPrice}
                setActiveFilter={setActiveFilter}
                setIsSortAsc={setIsSortAsc}
              />
              <TableFilterTitle
                name="Collection name"
                isSortAsc={isSortAsc}
                activeFilter={activeFilter}
                filter={GivewaysFilterBy.name}
                setActiveFilter={setActiveFilter}
                setIsSortAsc={setIsSortAsc}
              />
            </div>
          </div>

          {GiveawaysAndAnnMock.collections.length > 0 ? (
            <div className="giveaways__body">
              {GiveawaysAndAnnMock.collections.map((item, idx) => (
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
