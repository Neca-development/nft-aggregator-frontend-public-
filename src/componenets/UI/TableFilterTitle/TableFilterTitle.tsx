import React from "react";
import "./tableFilterTitle.scss";
import sortAscIcon from "../../../assets/icons/sort-asc.svg";
import sortDescIcon from "../../../assets/icons/sort-desc.svg";

interface ITableFilterTitleProps {
  name: string;
  isSortAsc: boolean;
  setActiveFilter: (arg: string) => void;
  setIsSortAsc: (arg: boolean) => void;
  activeFilter: string;
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
    <div className="tableFilterTitle" onClick={handleActiveFilter}>
      <h2>
        {name}
        {activeFilter === filter &&
          (isSortAsc ? <img src={sortAscIcon} alt="asc" /> : <img src={sortDescIcon} alt="desc" />)}
      </h2>
    </div>
  );
};

export default TableFilterTitle;
