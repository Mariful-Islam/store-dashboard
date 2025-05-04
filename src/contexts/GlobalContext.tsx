import { createContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const GlobalContext = createContext<any>(null);

const GlobalProvider = ({ children }: { children: any }) => {
  const [openHeaderSidebar, setOpenHeaderSidebar] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams({ pages: "10" });
  const [filter, setFilter] = useState<boolean>(false);

  useEffect(() => {
    if (window.innerWidth <= 860) {
      setOpenHeaderSidebar(false);
    }
  }, [window.innerWidth]);

  const toggleHeaderSidebar = () => {
    setOpenHeaderSidebar(!openHeaderSidebar);
  };

  const handleClear = () => {
    setSearchParams({});
  };

  const handleFilter = () => {
    setFilter(!filter);
  };

  const handleFormValidation = (formData: any, fields: string[]): boolean => {
    return fields.every((field) => {
      const value = formData?.[field];
      return value !== null && value !== undefined && value !== "";
    });
  };

  const handleSearch = (e: any) => {
    setSearchParams((prev: any) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("search", e.target.value);
      return newParams;
    });
  };

  const handleSelectItemPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("pages", value.toString());
      return newParams;
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        openHeaderSidebar,
        toggleHeaderSidebar,
        handleClear,
        handleFormValidation,
        filter,
        handleFilter,
        handleSearch,
        handleSelectItemPerPage
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
