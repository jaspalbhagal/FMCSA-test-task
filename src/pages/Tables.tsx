import FMSCADataTable from "../components/FMSCADataTable";
import { useTabContext } from "../context/TabContext";

const Tables = () => {
  const { currentTab } = useTabContext();

  const tabMapper: Record<string, React.ReactElement> = {
    "data-table": <FMSCADataTable isPivot={false} key="data-table" />,
    "pivote-table": <FMSCADataTable isPivot={true} key="pivote-table" />,
  };

  return <>{tabMapper[currentTab]}</>;
};

export default Tables;
