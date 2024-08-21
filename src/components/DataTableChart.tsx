import { BarChart, axisClasses } from "@mui/x-charts";
import { FC } from "react";

import {
  aggregateData,
  collectEntityTypes,
  transformToFormattedData,
} from "../helpers/chart";

const DataTableChart: FC<any> = ({ originalData }) => {
  const chartData = transformToFormattedData(
    aggregateData(originalData),
    collectEntityTypes(originalData)
  );

  return (
    <BarChart
      dataset={chartData}
      xAxis={[
        {
          scaleType: "band",
          dataKey: "month",
          label: "Month",
        },
      ]}
      yAxis={[{ label: "Count" }]}
      series={Object.keys(chartData[0] || {})
        .filter((key) => key !== "month")
        .map((key) => ({
          dataKey: key,
          label: key,
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
      leftAxis={{
        labelStyle: {
          fontSize: 14,
        },
        tickLabelStyle: {
          fontSize: 12,
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
      height={500}
    />
  );
};

export default DataTableChart;
