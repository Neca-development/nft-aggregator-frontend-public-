import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { useModal } from "@hooks/useModal";
import AdminEditCollectionModal from "@components/AdminEditCollectionModal/AdminEditCollectionModal";
import Button from "@UI/Button/Button";
import TextInput from "@UI/TextInput/TextInput";
import "./admin.scss";

const mockCollection = {
  name: "Super collection number 1",
  giveaways_channels: { selected: ["channel 1"], list: ["channel 1"] },
  announcements_channels: { selected: ["channel 2"], list: ["channel 1", "channel 2"] },
};

const mockCollection2 = {
  name: "Another collection number 2",
  giveaways_channels: {
    selected: ["channel 2"],
    list: ["channel 1", "channel 2", "channel 3", "channel 4"],
  },
  announcements_channels: {
    selected: ["channel 1", "channel 2"],
    list: ["channel 1", "channel 2", "channel 3", "channel 4"],
  },
};

const mockAll = [mockCollection, mockCollection2];

function Admin() {
  const { toggle: toggleEditModal, hookModal } = useModal();
  const [collectionToEdit, setCollectionToEdit] = useState(null);

  const handlePageClick = () => {};

  const openEditModal = (event, collection) => {
    setCollectionToEdit(collection);
    toggleEditModal();
  };

  return (
    <main className="container admin">
      <Button variant="link">
        <Link to="/">Return to client side</Link>
      </Button>

      <section className="admin__table">
        <div className="admin__header">
          <TextInput placeholder="Search collection" value="" setValue={null} />
          <label className="admin__selectWrapper">
            <span>Include giveaways channels</span>
            <select name="giveaways" id="">
              <option value="all">All</option>
              <option value="with">With allocation</option>
              <option value="without">Without allocation</option>
            </select>
          </label>
          <label className="admin__selectWrapper">
            <span>Include announcements channels</span>
            <select name="announcements" id="">
              <option value="all">All</option>
              <option value="with">With allocation</option>
              <option value="without">Without allocation</option>
            </select>
          </label>
        </div>
        <div className="admin__cols">
          <p>Collection name</p>
          <p>Giveaway channels</p>
          <p>Announcements channels</p>
        </div>

        <div className="admin__body">
          {mockAll.map((col, idx) => (
            <article key={idx} className="admin__item" onClick={e => openEditModal(e, col)}>
              <p>{col.name}</p>
              <p>{col.giveaways_channels.selected.join("; ")}</p>
              <p>{col.announcements_channels.selected.join("; ")}</p>
            </article>
          ))}
        </div>

        <div className="admin__footer">
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            pageRangeDisplayed={3}
            marginPagesDisplayed={3}
            pageCount={10}
            previousLabel="<"
            renderOnZeroPageCount={null}
            onPageChange={handlePageClick}
            className="pagination"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            activeClassName="active"
            disabledClassName="disabled"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
          />
        </div>
      </section>

      {hookModal(
        <AdminEditCollectionModal collection={collectionToEdit} onClose={toggleEditModal} />
      )}
    </main>
  );
}

export default Admin;
