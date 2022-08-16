import React, { Dispatch, SetStateAction } from "react";
import "./tableFilterTitle.scss";
import SortAscIcon from "@assets/icons/sort-asc.svg";
import SortDescIcon from "@assets/icons/sort-desc.svg";
import { useAppDispatch } from "@store/store.hook";
import { updateOrder } from "@store/state/filterSlice";
import { FilterType, ICollectionOrder } from "@models/filters";
import { useDidMountEffect } from "@hooks/useDidMountEffect";

interface ITableFilterTitleProps {
  name: string;
  isSortAsc: boolean;
  setActiveFilter: Dispatch<SetStateAction<number>>;
  setIsSortAsc: Dispatch<SetStateAction<boolean>>;
  activeFilter: number;
  filter: number;
}

const TableFilterTitle = ({
  name,
  isSortAsc,
  setActiveFilter,
  setIsSortAsc,
  activeFilter,
  filter,
}: ITableFilterTitleProps) => {
  const dispatch = useAppDispatch();

  const handleActiveFilter = () => {
    setActiveFilter(filter);
    if (filter === activeFilter) {
      setIsSortAsc(!isSortAsc);
    } else {
      setIsSortAsc(false);
    }
  };

  useDidMountEffect(() => {
    if (activeFilter === filter) {
      const newOrder: ICollectionOrder = {
        orderBy: activeFilter,
        orderType: isSortAsc ? FilterType.asc : FilterType.desc,
      };
      dispatch(updateOrder(newOrder));
    }
  }, [activeFilter, isSortAsc]);

  return (
    <button className="tableFilterTitle" onClick={handleActiveFilter}>
      <span>
        {name}
        {activeFilter === filter && (isSortAsc ? <SortAscIcon /> : <SortDescIcon />)}
      </span>
    </button>
  );
};

export default TableFilterTitle;
