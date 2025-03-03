import {
  MRT_GlobalFilterTextField,
  MRT_TableInstance,
  MRT_ToggleFiltersButton,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DateTime } from "luxon";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { Cancel, Search, Share } from "@mui/icons-material";

import { compareDates } from "../helpers/table";
import { useTableData } from "../data-service/csv-data";
import BackdropSpinner from "./BackdropSpinner";
import TableResetModal from "./TableResetModal";
import PivotChart from "./PivotChart";
import DataTableChart from "./DataTableChart";

interface FMSCADataTableProps {
  isPivot: boolean;
}

const FMSCADataTable: FC<FMSCADataTableProps> = ({ isPivot }) => {
  const { isLoading, parsedData, columns } = useTableData();

  const [tableFilters, setTableFilters] = useState<any[]>(
    JSON.parse(localStorage.getItem("tableFilters") || "[]")
  );
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [rowGrouping, setRowGrouping] = useState<null | string>("Month");
  const [openResetModal, setOpenResetModal] = useState(false);
  const isFirstRender = useRef(true);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGrouping = (table: MRT_TableInstance<any>, group: string) => {
    switch (group) {
      case "Month":
        table.setGrouping(["dateMonth"]);
        setRowGrouping("Month");
        table.setColumnVisibility({
          dateMonth: isPivot ? true : false,
          dateYear: false,
          dateWeek: false,
        });
        break;
      case "Year":
        table.setGrouping(["dateYear"]);
        setRowGrouping("Year");
        table.setColumnVisibility({
          dateYear: isPivot ? true : false,
          dateMonth: false,
          dateWeek: false,
        });
        break;
      case "Week":
        table.setGrouping(["dateWeek"]);
        setRowGrouping("Week");
        table.setColumnVisibility({
          dateYear: false,
          dateMonth: false,
          dateWeek: isPivot ? true : false,
        });
        break;
      default:
        table.setGrouping([]);
        setRowGrouping("");
        table.setColumnVisibility({
          dateYear: false,
          dateMonth: isPivot ? true : false,
          dateWeek: false,
        });
    }
    handleClose();
  };

  const parsedCols = useMemo(
    () =>
      [
        ...columns,
        {
          headerName: "Month",
          field: "dateMonth",
        },
        {
          headerName: "Year",
          field: "dateYear",
        },
        {
          headerName: "Week",
          field: "dateWeek",
        },
      ].map((col) => ({
        ...col,
        header: col.headerName,
        enableColumnOrdering: true,
        accessorKey: col.field,
        muiEditTextFieldProps: () => ({
          type: ["created_dt", "data_source_modified_dt"].includes(col.field)
            ? "date"
            : "text",
          ...(["created_dt", "data_source_modified_dt"].includes(col.field) && {
            sortingFn: (rowA: any, rowB: any, columnId: any) => {
              return compareDates(
                rowA.getValue(columnId),
                rowB.getValue(columnId)
              );
            },
          }),
        }),
      })),
    [parsedData]
  );

  const memoParsedData = useMemo(
    () =>
      parsedData.map((dataItem: any) => ({
        ...dataItem,
        created_dt: DateTime.fromJSDate(new Date(dataItem.created_dt)).toFormat(
          "dd LLL, yyyy hh:MM a"
        ),
        dateMonth: DateTime.fromJSDate(new Date(dataItem.created_dt)).toFormat(
          "LLLL"
        ),
        dateYear: DateTime.fromJSDate(new Date(dataItem.created_dt)).toFormat(
          "yyyy"
        ),
        dateWeek:
          "Week " +
          DateTime.fromJSDate(new Date(dataItem.created_dt)).toFormat(`W`) +
          ` (${DateTime.fromJSDate(new Date(dataItem.created_dt))
            .startOf("week")
            .toFormat("d MMM, yyyy")} - ${DateTime.fromJSDate(
            new Date(dataItem.created_dt)
          )
            .endOf("week")
            .toFormat("d MMM, yyyy")})`,
        data_source_modified_dt: DateTime.fromJSDate(
          new Date(dataItem.data_source_modified_dt)
        ).toFormat("dd LLL, yyyy hh:MM a"),
      })),
    [parsedData]
  );

  const table = useMaterialReactTable({
    columns: parsedCols,
    data: memoParsedData,
    muiTableBodyRowProps: {
      sx: {
        fontSize: 14,
      },
    },
    muiTablePaperProps: {
      sx: { border: "2px solid gray", height: "100%" },
    },
    muiTableContainerProps: { sx: { height: "80%" } },
    muiPaginationProps: {
      shape: "rounded",
      variant: "outlined",
    },
    renderTopToolbar: ({ table }) => {
      return (
        <Box
          sx={{
            display: "flex",
            gap: "0.5rem",
            p: "8px",
            justifyContent: "space-between",
            borderBottom: "0.5px solid lightgray",
          }}
        >
          {!isPivot && (
            <Stack direction="row">
              {showSearch && <MRT_GlobalFilterTextField table={table} />}
              <IconButton onClick={() => setShowSearch((prev) => !prev)}>
                {showSearch ? <Cancel /> : <Search />}
              </IconButton>
            </Stack>
          )}

          <Box sx={{ display: "flex", gap: "0.5rem", ml: "auto" }}>
            {!isPivot && <MRT_ToggleFiltersButton table={table} />}
            <Button
              aria-controls="date-reset-btn"
              aria-haspopup="true"
              onClick={() => {
                setOpenResetModal(true);
              }}
              variant="contained"
              sx={{ textTransform: "unset" }}
            >
              Reset
            </Button>

            {isPivot && (
              <>
                <Button
                  aria-controls="date-groupby-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                  variant="contained"
                  sx={{ textTransform: "unset" }}
                >
                  Group By
                </Button>
                <Menu
                  id="date-groupby-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  {["Week", "Month", "Year", "Clear"].map((key) => {
                    return (
                      <MenuItem
                        key={key}
                        selected={key === rowGrouping}
                        onClick={() => handleGrouping(table, key)}
                        sx={{
                          "&.Mui-selected": {
                            bgcolor: "#66b2ff",
                            color: "white",
                          },
                        }}
                      >
                        {key}
                      </MenuItem>
                    );
                  })}
                </Menu>
              </>
            )}
            <Button
              aria-controls="date-share-btn"
              aria-haspopup="true"
              onClick={() => {
                const currentUrl = window.location.href;
                navigator.clipboard
                  .writeText(currentUrl)
                  .then(() => {
                    alert("URL copied to clipboard!");
                  })
                  .catch((err) => {
                    console.error("Failed to copy URL: ", err);
                  });
              }}
              variant="contained"
              sx={{ textTransform: "unset" }}
            >
              <Share />
            </Button>
          </Box>
        </Box>
      );
    },
    onColumnFiltersChange: setTableFilters,
    initialState: {
      columnVisibility: {
        dateMonth: isPivot ? true : false,
        dateYear: false,
        dateWeek: false,
      },
      showColumnFilters: tableFilters.length ? true : false,
      grouping: ["dateMonth"],
      columnFilters: tableFilters,
    },
    paginationDisplayMode: "pages",
    enableGrouping: isPivot,
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    enableGlobalFilter: !isPivot,
    // Editing
    enableCellActions: !isPivot,
    enableEditing: !isPivot,
    enableRowActions: !isPivot,
    editDisplayMode: "cell",
    // Columns
    enableColumnResizing: true,
    enableColumnDragging: !isPivot,
    enableColumnOrdering: true,
    enableColumnFilters: !isPivot,
    state: {
      showGlobalFilter: !isPivot,
      density: "compact",
      columnFilters: tableFilters,
    },
    autoResetAll: true,
  });

  const dataTableOriginalData = useMemo(() => {
    return table.getFilteredRowModel().rows.map((item) => item.original);
  }, [table.getFilteredRowModel().rows]);

  const handleSave = useCallback(() => {
    const filterArray = table.getState().columnFilters || [];
    localStorage.setItem("tableFilters", JSON.stringify(filterArray));

    setTableFilters(table.getState().columnFilters);
  }, [table.getFilteredRowModel().rows]);

  useEffect(() => {
    const params = new URLSearchParams();

    tableFilters.forEach((filter) => {
      params.append(filter.id, filter.value);
    });

    // For first render
    if (isFirstRender.current) {
      const tableFiltersFromURL = [];
      for (const [key, value] of new URL(window.location.href).searchParams) {
        if (value) tableFiltersFromURL.push({ id: key, value });
      }

      if (tableFiltersFromURL.length > 0) {
        setTableFilters(tableFiltersFromURL);
      }
      isFirstRender.current = false;

      return;
    }

    const newUrl = `${window.location.pathname.replace(/\/$/, "")}${
      "?" + params.toString()
    }`;
    window.history.pushState({}, "", newUrl);
    handleSave();
  }, [tableFilters]);

  return (
    <Box boxSizing="border-box">
      <BackdropSpinner open={isLoading} message="Records are loading..." />

      <Typography variant="h3">FMSCA Data Table</Typography>
      <MaterialReactTable table={table} />

      {openResetModal && (
        <TableResetModal
          handleAgree={() => {
            localStorage.removeItem("tableFilters");
            setTableFilters([]);
            setOpenResetModal(false);
          }}
          handleClose={() => {
            setOpenResetModal(false);
          }}
          open={openResetModal}
        />
      )}

      {parsedData.length > 0 && (
        <Box sx={{ mt: "1rem" }}>
          {!isPivot ? (
            <DataTableChart originalData={dataTableOriginalData} />
          ) : (
            <PivotChart grouping={rowGrouping} tableData={memoParsedData} />
          )}
        </Box>
      )}
    </Box>
  );
};

export default FMSCADataTable;
