import React from "react";
import Sidebar from "../../componenets/Sidebar/Sidebar";
import "./collections.scss";
import { collectionsDataMock } from "../../mocks/collection";
import CollectionTableItem from "../../componenets/CollectionTableItem/CollectionTableItem";

function Collections() {
  return (
    <main className="container tableLayout">
      <Sidebar />

      <section className="collections">
        <div className="collections__header">
          <h2>collection name</h2>
          <h2>collection size</h2>
          <h2>floor price</h2>
          <h2>24h change</h2>
          <h2>discord</h2>
          <h2>twitter</h2>
          <span></span>
        </div>

        <div className="collections__body">
          {collectionsDataMock[0].collections.map(item => (
            <CollectionTableItem key={item.id} item={item} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Collections;
