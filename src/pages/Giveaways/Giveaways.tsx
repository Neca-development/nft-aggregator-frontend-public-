import React, { useState } from "react";
import "./giveaways.scss";
import Sidebar from "../../componenets/Sidebar/Sidebar";
import { GiveawaysAndAnnMock } from "../../mocks/gaa";
import GaATableItem from "../../componenets/GaATableItem/GaATableItem";
import Button from "../../componenets/UI/Button/Button";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { GivewaysFilterBy } from "../../models/filters";
import TableFilterTitle from "../../componenets/UI/TableFilterTitle/TableFilterTitle";

enum GaaTabs {
  all = "all",
  giveaway = "giveaway",
  announce = "announcements",
}

function Giveaways() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(GaaTabs.all);
  const [activeFilter, setActiveFilter] = useState(null);
  const [isSortAsc, setIsSortAsc] = useState(true);

  return (
    <main className="container tableLayout">
      <Sidebar
        page="giveaways"
        collectionMax={GiveawaysAndAnnMock.ranges.sizeMax}
        discordMax={GiveawaysAndAnnMock.ranges.membersCountMax}
        searchPlaceholder="Search"
      />

      <section className="giveaways">
        <div className="giveaways__header">
          <div className="giveaways__tabs">
            <button
              className={classNames("giveaways__tabBtn", {
                giveaways__tabBtn_active: activeTab === GaaTabs.all,
              })}
              onClick={() => setActiveTab(GaaTabs.all)}
            >
              All
            </button>
            <button
              className={classNames("giveaways__tabBtn", {
                giveaways__tabBtn_active: activeTab === GaaTabs.giveaway,
              })}
              onClick={() => setActiveTab(GaaTabs.giveaway)}
            >
              Giveaways
            </button>
            <button
              className={classNames("giveaways__tabBtn", {
                giveaways__tabBtn_active: activeTab === GaaTabs.announce,
              })}
              onClick={() => setActiveTab(GaaTabs.announce)}
            >
              Announcements
            </button>
          </div>
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
    </main>
  );
}

export default Giveaways;
