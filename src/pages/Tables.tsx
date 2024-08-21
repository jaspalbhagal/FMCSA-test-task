import BackdropSpinner from "../components/BackdropSpinner";
import FMSCADataTable from "../components/FMSCADataTable";
import { useTabContext } from "../context/TabContext";
import { useTableData } from "../data-service/csv-data";

const Tables = () => {
  const { currentTab } = useTabContext();
  const { isLoading, parsedData, columns } = useTableData();

  const tabMapper: Record<string, React.ReactElement> = {
    "data-table": (
      <FMSCADataTable
        isPivot={false}
        isLoading={isLoading}
        parsedData={parsedData}
        columns={columns}
      />
    ),
    "pivote-table": (
      <FMSCADataTable
        isPivot={true}
        isLoading={isLoading}
        parsedData={parsedData}
        columns={columns}
      />
    ),
  };

  return (
    <>
      <BackdropSpinner open={isLoading} message="Records are loading..." />
      {tabMapper[currentTab]}
    </>
  );
};

export default Tables;
