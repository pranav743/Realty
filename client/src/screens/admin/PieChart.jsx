import React from "react";
import { Chart } from "react-google-charts";
import { useTheme } from "@chakra-ui/react";

export default function PieCHart({assigned, notAssigned}) {

  const {colors} = useTheme();

  const data = [
    ["Type", "Properties"],
    ["Listed", assigned],
    ["Not Listed", notAssigned],
  ];

  const options = {
    legend: "none",
    pieSliceText: "label",
    title: "Total Properties Minted",
    titleTextStyle: {
      fontSize: 21,
      color: colors.brand.pink,
      bold: true,
      italic: false,
      alignment: "center",
    },
    pieStartAngle: 0,
    colors: [colors.brand.pink, colors.brand.violet],
    backgroundColor: '#000',
    chartArea: {
      left: 10,
      width: "95%",
      height: "80%",
    },
    pieSliceTextStyle: {
      fontSize: 19,
      color: "#000",
      bold: true,
      italic: false,
      alignment: "center",
    },
    is3D: true, // Enable 3D effect
  };
  

  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"350px"}
      height={"400px"}
    />
  );
}
