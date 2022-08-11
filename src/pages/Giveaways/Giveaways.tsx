import React, { useState } from "react";
import "./giveaways.scss";
import Sidebar from "../../componenets/Sidebar/Sidebar";
import { GiveawaysAndAnnMock } from "../../mocks/gaa";
import GaATableItem from "../../componenets/GaATableItem/GaATableItem";
import Button from "../../componenets/UI/Button/Button";
import { useNavigate } from "react-router-dom";
import { GivewaysFilterBy } from "../../models/filters";
import TableFilterTitle from "../../componenets/UI/TableFilterTitle/TableFilterTitle";
import Tabs from "../../componenets/UI/Tabs/Tabs";
import { motion } from "framer-motion";

enum GaaTabs {
  all = "All",
  giveaway = "Giveaways",
  announce = "Announcements",
}

function Giveaways() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(GaaTabs.all);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [isSortAsc, setIsSortAsc] = useState(true);

  return (
    <motion.main
      className="container tableLayout"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      <Sidebar
        page="giveaways"
        collectionMax={GiveawaysAndAnnMock.ranges.sizeMax}
        discordMax={GiveawaysAndAnnMock.ranges.membersCountMax}
        searchPlaceholder="Search"
      />

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
    </motion.main>
  );
}

export default Giveaways;
