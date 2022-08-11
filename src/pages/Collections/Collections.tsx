import React, { useState } from "react";
import Sidebar from "../../componenets/Sidebar/Sidebar";
import "./collections.scss";
import { collectionsDataMock } from "../../mocks/collection";
import CollectionTableItem from "../../componenets/CollectionTableItem/CollectionTableItem";
import TableFilterTitle from "../../componenets/UI/TableFilterTitle/TableFilterTitle";
import { CollectionsFilterBy } from "../../models/filters";
import Button from "../../componenets/UI/Button/Button";
import { motion } from "framer-motion";

function Collections() {
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
        page="collections"
        collectionMax={collectionsDataMock.ranges.sizeMax}
        discordMax={collectionsDataMock.ranges.discordMembersCountMax}
        priceMax={collectionsDataMock.ranges.floorPriceMax}
        twitterMax={collectionsDataMock.ranges.twitterFollowersCountMax}
        searchPlaceholder="Collection name"
      />

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

        {collectionsDataMock.collections.length > 0 ? (
          <div className="collections__body">
            {collectionsDataMock.collections.map(item => (
              <CollectionTableItem key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="collections__empty">
            <h2>No items found for this search</h2>
            {/* Reset search here */}
            <Button size="large" variant="gradient">
              Back to all items
            </Button>
          </div>
        )}
      </section>
    </motion.main>
  );
}

export default Collections;
