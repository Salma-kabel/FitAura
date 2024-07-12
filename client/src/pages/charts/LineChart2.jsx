import { useTheme } from "@mui/material/styles";
import ReactEcharts from "echarts-for-react";

export default function LineChart({ height, color = [], muscle, fat }) {
  const theme = useTheme();
  let minm = (muscle | fat)? Math.min(...muscle, ...fat) - 10: 0;
  let maxm = (muscle | fat)? Math.max(...muscle, ...fat) + 20: 100;
  const option = {
    grid: { top: "10%", bottom: "10%", left: "5%", right: "5%" },
    legend: {
      itemGap: 20,
      icon: "circle",
      textStyle: {
        fontSize: 13,
        color: theme.palette.text.secondary,
        fontFamily: theme.typography.fontFamily
      }
    },
    label: {
      fontSize: 13,
      color: theme.palette.text.secondary,
      fontFamily: theme.typography.fontFamily
    },
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        fontSize: 14,
        fontFamily: "roboto",
        color: theme.palette.text.secondary
      }
    },
    yAxis: {
      type: "value",
      min: minm,
      max: maxm,
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: {
        lineStyle: { color: theme.palette.text.secondary, opacity: 0.15 }
      },
      axisLabel: { color: theme.palette.text.secondary, fontSize: 13, fontFamily: "roboto" }
    },
    series: [
      {
        data: muscle,
        type: "line",
        stack: "muscle",
        name: "Muscle",
        smooth: true,
        symbolSize: 4,
        lineStyle: { width: 4 }
      },
      {
        data: fat,
        type: "line",
        stack: "fat",
        name: "Fat",
        smooth: true,
        symbolSize: 4,
        lineStyle: { width: 4 }
      }
    ]
  };

  return <ReactEcharts style={{ height: height }} option={{ ...option, color: [...color] }} />;
}
