import { BarChart, axisClasses } from "@mui/x-charts";
import { FC } from "react";

import { pivotChartData } from "../helpers/chart";

const PivotChart: FC<any> = ({ grouping, tableData }) => {
  return (
    <BarChart
      dataset={pivotChartData[grouping as string](tableData)}
      xAxis={[
        {
          scaleType: "band",
          dataKey: grouping?.toLowerCase(),
          label: grouping || "",
          valueFormatter(value) {
            return value.split(" ").slice(0, 2).join(" ");
          },
        },
      ]}
      yAxis={[{ label: "Count" }]}
      series={Object.keys(
        pivotChartData[grouping as string](tableData)[0] || {}
      )
        .filter((key) => key !== grouping?.toLowerCase())
        .map((key) => ({
          dataKey: key,
          label: "Companies count",
          color: "white",
        }))}
      slotProps={{
        legend: {
          hidden: true,
          labelStyle: {
            fontSize: 12,
            display: "none",
          },
        },
      }}
      sx={{
        [`& .${axisClasses.left} .${axisClasses.label}`]: {
          transform: "translateX(-10px)",
        },
        [`& .${axisClasses.root} .${axisClasses.tickLabel}`]: {
          fill: "#ffffff",
        },
        [`& .${axisClasses.root} .${axisClasses.label}`]: {
          fill: "#ffffff",
          fontWeight: 700,
        },
        [`& .${axisClasses.root} .${axisClasses.line}, & .${axisClasses.root} .${axisClasses.tick}`]:
          {
            stroke: "#ffffff",
          },

        border: "1px solid rgba(255,255,255, 0.1)",
        backgroundImage: `linear-gradient(rgba(255,255,255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255, 0.1) 1px, transparent 1px)`,
        backgroundSize: "35px 35px",
        backgroundPosition: "20px 20px, 20px 20px",
      }}
      leftAxis={{
        labelStyle: {
          fontSize: 14,
          fontWeight: "bold",
        },
        tickLabelStyle: {
          fontSize: 12,
        },
      }}
      bottomAxis={{
        labelStyle: {
          fontSize: 14,
          fontWeight: "bold",
        },
      }}
      height={500}
    />
  );
};

export default PivotChart;
