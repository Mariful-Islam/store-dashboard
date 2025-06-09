import React, { useContext, useState } from "react";
import Wrapper from "./Wrapper";
import TextInput from "./TextInput";
import { GlobalContext } from "../contexts/GlobalContext";
import Button from "./Button";
import { CiFilter } from "react-icons/ci";
import DropdownMenu from "./DropdownMenu";
import { IoFilterOutline } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";
import { MdOutlineClear } from "react-icons/md";
import { Tooltip } from "react-tooltip";

interface MenuGroupsItemsProps {
  label: string;
  key: string;
}

interface SearchFilterProps {
  data: any;
  menuGroupsItems: MenuGroupsItemsProps[][];
}

function SearchFilter({ data, menuGroupsItems }: SearchFilterProps) {
  const [search] = useState<string>();
  const { handleClear, handleSearch } = useContext(GlobalContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const getActiveMenu = (orderName: string) => {
    return searchParams.get("ordering") === orderName;
  };

  const menuGroups = menuGroupsItems.map((menuItems) =>
    menuItems.map((menu) => ({
      label: menu.label,
      onClick: () =>
        setSearchParams((prev) => {
          const newParams = new URLSearchParams(prev);
          newParams.set("ordering", menu.key);
          return newParams;
        }),
      isActive: getActiveMenu(menu.key),
    }))
  );


  return (
    <Wrapper style={{ gap: 12 }} className="mb-2 flex flex-col">
      <div className="flex flex-row justify-between items-center gap-4 w-full">
        <TextInput
          id="search"
          name="search"
          placeholder="Search orders"
          value={search}
          onChange={handleSearch}
        />

        <Button
          btntype="white-btn"
          data-tooltip-id={`item-filter`}
          data-tooltip-content={"Filter"}
        >
          <CiFilter className="w-5 min-w-5 h-5 min-h-5" />
        </Button>

        <Tooltip
          id={`item-filter`}
          place="top"
          style={{ fontSize: 12, fontWeight: "bold" }}
        />

        <DropdownMenu
          buttonLabel={
            <div
              className={ `border border-gray-200 dark:border-gray-700 p-[6px] rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-white dark:hover:bg-black duration-150`}
              data-tooltip-id={`item-sort`}
              data-tooltip-content={"Sort"}
            >
              <IoFilterOutline className="w-5 min-w-5 h-5 min-h-5" />
            </div>
          }
          items={menuGroups as any}
        />

        <Tooltip
          id={`item-sort`}
          place="top"
          style={{ fontSize: 12, fontWeight: "bold" }}
        />

        <Button
          btntype="white-btn"
          onClick={handleClear}
          data-tooltip-id={`clear-filter`}
          data-tooltip-content={"Clear Filter"}
        >
          <MdOutlineClear className="w-5 h-5" />
        </Button>

        <Tooltip
          id={`clear-filter`}
          place="top"
          style={{ fontSize: 12, fontWeight: "bold" }}
        />
      </div>
      <div className="flex gap-4 items-center justify-between w-full text-[12px]">
        <div>
          <strong className="text-gray-500 dark:text-gray-200">Items: </strong>
          <strong className="text-gray-700 dark:text-gray-200">
            {data?.results?.length}
          </strong>
        </div>
        <div>
          <strong className="text-gray-500 dark:text-gray-200">Total: </strong>
          <strong className="text-gray-700 dark:text-gray-200">
            {data?.count}
          </strong>
        </div>
      </div>
    </Wrapper>
  );
}

export default SearchFilter;
