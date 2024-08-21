import { PropsWithChildren, createContext, useContext, useState } from "react";

const TabContext = createContext({
  currentTab: "data-table",
  changeTab: function (_newTab: string) {},
});

export const TabProvider = ({ children }: PropsWithChildren) => {
  const [currentTab, setCurrentTab] = useState("data-table");

  const changeTab = (newTab: string) => {
    setCurrentTab(newTab);
  };

  return (
    <TabContext.Provider value={{ currentTab, changeTab }}>
      {children}
    </TabContext.Provider>
  );
};

export const useTabContext = () => {
  return useContext(TabContext);
};
