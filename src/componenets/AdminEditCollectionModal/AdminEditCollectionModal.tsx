import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import Button from "@UI/Button/Button";
import "./adminEditCollectionModal.scss";

const AdminEditCollectionModal = ({
  collection,
  onClose,
}: {
  collection: any;
  onClose: (event: React.SyntheticEvent) => void;
}) => {
  const [giveawayChannels, setGiveawayChannels] = useState([]);
  const [announceChannels, setAnnounceChannels] = useState([]);
  const [giveawayChanSelected, setGiveawayChanSelected] = useState([]);
  const [annChanSelected, setAnnChanSelected] = useState([]);

  useEffect(() => {
    // TODO: rewrite it
    const prepareValuesForMultiselect = () => {
      collection.giveaways_channels.selected.forEach(ch => {
        const newOption = { label: ch, value: ch };
        setGiveawayChanSelected(prev => [...prev, newOption]);
      });
      collection.announcements_channels.selected.forEach(ch => {
        const newOption = { label: ch, value: ch };
        setAnnChanSelected(prev => [...prev, newOption]);
      });

      collection.giveaways_channels.list.forEach(ch => {
        const newOption = { label: ch, value: ch };
        setGiveawayChannels(prev => [...prev, newOption]);
      });
      collection.announcements_channels.list.forEach(ch => {
        const newOption = { label: ch, value: ch };
        setAnnounceChannels(prev => [...prev, newOption]);
      });
    };

    prepareValuesForMultiselect();
  }, [collection]);

  return (
    <div className="editModal">
      <h2>Edit</h2>
      <p>{collection.name}</p>

      <div className="editModal__wrapper">
        <div className="editModal__selectWrapper">
          <span style={{ color: "#00b6a0" }}>Giveaway channels</span>
          <MultiSelect
            options={giveawayChannels}
            value={giveawayChanSelected}
            onChange={setGiveawayChanSelected}
            labelledBy="Select giveaways"
            hasSelectAll={false}
            className="editModal__multiselect"
          />
        </div>

        <div className="editModal__selectWrapper">
          <span style={{ color: "#219cfb" }}>Announcement channels</span>
          <MultiSelect
            options={announceChannels}
            value={annChanSelected}
            onChange={setAnnChanSelected}
            labelledBy="Select announcements"
            hasSelectAll={false}
            className="editModal__multiselect"
          />
        </div>
      </div>

      <div className="editModal__btns">
        <Button size="large" variant="primary" onClick={onClose}>
          Cancel
        </Button>
        <Button size="large" variant="gradient">
          Save
        </Button>
      </div>
    </div>
  );
};

export default AdminEditCollectionModal;
