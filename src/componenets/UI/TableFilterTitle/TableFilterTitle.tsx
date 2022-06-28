import React, { Dispatch, SetStateAction } from "react";
import "./tableFilterTitle.scss";
import sortAscIcon from "../../../assets/icons/sort-asc.svg";
import sortDescIcon from "../../../assets/icons/sort-desc.svg";

interface ITableFilterTitleProps {
  name: string;
  isSortAsc: boolean;
  setActiveFilter: Dispatch<SetStateAction<string | null>>;
  setIsSortAsc: Dispatch<SetStateAction<boolean>>;
  activeFilter: string | null;
  filter: string;
}

const TableFilterTitle = ({
  name,
  isSortAsc,
  setActiveFilter,
  setIsSortAsc,
  activeFilter,
  filter,
}: ITableFilterTitleProps) => {
  const handleActiveFilter = () => {
    setActiveFilter(filter);
    if (filter === activeFilter) {
      setIsSortAsc(!isSortAsc);
    } else {
      setIsSortAsc(true);
    }
  };

  return (
    <button className="tableFilterTitle" onClick={handleActiveFilter}>
      <span>
        {name}
        {activeFilter === filter &&
          (isSortAsc ? <img src={sortAscIcon} alt="asc" /> : <img src={sortDescIcon} alt="desc" />)}
      </span>
    </button>
  );
};

export default TableFilterTitle;
