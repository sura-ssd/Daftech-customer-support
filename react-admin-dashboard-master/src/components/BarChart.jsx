import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import axios from "axios"; 


const BarChart = ({ isDashboard = false }) => {
  const [regionData, setRegionData] = useState([]); // State to store fetched region data
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    // Fetch region data from the backend
    axios.get("https://localhost:7291/api/Client/GetRegionCounts").then((response) => {
      setRegionData(response.data);
    });
  }, []);

  // Transform fetched region data for the bar chart
  const chartData = regionData.map((regionCount) => ({
    region: regionCount.region,
    users: regionCount.count,
  }));

  const colorPalette = [
    "#92c5de", "#99d8c9", "#c2e699", "#f7e1a0", "#f4a582",
  "#d6604d", "#d1e5f0", "#e6f5d0", "#f9ebae", "#fdd0a2"
  ];

  const colorByIndex = {};
  chartData.forEach((dataPoint, index) => {
    colorByIndex[dataPoint.region] = colorPalette[index % colorPalette.length];
  });

  return (
    
    <ResponsiveBar
      data={chartData} // Use the transformed data here
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
      }}
      keys={["users"]} // Use the users count as the data key
      indexBy="region" // Use the region as the index
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={(bar) => colorByIndex[bar.indexValue]}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Region",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Users",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      barAriaLabel={function (e) {
        return e.id + ": " + e.formattedValue + " in region: " + e.indexValue;
      }}
    />
    
  );
};

export default BarChart;
