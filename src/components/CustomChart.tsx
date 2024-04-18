/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import {
  calculateArcAngles,
  calculateArcCenter,
  donutInnerRadius,
  donutOuterRadius,
  getSliceSize,
} from "../utils/chartUtils";
import tinycolor from "tinycolor2";

/**
 * returns doughnut chart component
 */
function CustomChart({
  data,
  bgColor,
  legends,
  previewData,
  variant,
  centerText,
  allowHover,
}: {
  data: number[];
  bgColor: string[];
  legends?: string[];
  previewData?: number[];
  variant?: "sm" | "md" | "lg";
  centerText?: string;
  allowHover?: boolean;
}) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const angle = Math.PI / 180;
  const width = donutOuterRadius - donutInnerRadius;
  let chartSize = "";
  let sliceBgArcLineWidth = 0;
  let sliceBgArcWidth = 0;
  let centerTextArcWidth = 0;
  let sliceTextCloudWidth = 0;

  switch (variant) {
    case "md":
      chartSize = "200px";
      sliceBgArcLineWidth = 44;
      sliceBgArcWidth = width;
      centerTextArcWidth = 42;
      sliceTextCloudWidth = 65;
      break;
    case "lg":
      chartSize = "300px";
      sliceBgArcLineWidth = 135;
      sliceBgArcWidth = width;
      centerTextArcWidth = 67;
      sliceTextCloudWidth = 100;
      break;
    default:
      chartSize = "150px";
      sliceBgArcLineWidth = 95;
      sliceBgArcWidth = 20;
      centerTextArcWidth = 30;
      sliceTextCloudWidth = 50;
  }

  const generateSliceBgArc = (
    chart: any,
    ctx: any,
    xCord: any,
    yCord: any,
    idx: number,
    start: number,
    end: number,
    brighten: number
  ) => {
    ctx.beginPath();
    ctx.lineWidth = sliceBgArcLineWidth;
    ctx.strokeStyle = tinycolor(
      chart.getDatasetMeta(0).data[idx].options.backgroundColor
    )
      .brighten(brighten)
      .toHexString();
    ctx.arc(xCord, yCord, sliceBgArcWidth, start, end, false);
    ctx.stroke();
  };

  // background of donut chart
  const backgroundCircle = {
    id: "backgroundCircle",
    beforeDatasetsDraw(chart: any) {
      const { ctx } = chart;
      ctx.save();
      const xCord = chart.getDatasetMeta(0).data[0].x;
      const yCord = chart.getDatasetMeta(0).data[0].y;
      const arcDetails = [
        {
          idx: 0,
          start: 224 * (Math.PI / 180),
          end: 314 * (Math.PI / 180),
          brighten: 40,
        },
        {
          idx: 1,
          start: -46 * (Math.PI / 180),
          end: 44 * (Math.PI / 180),
          brighten: 60,
        },
        {
          idx: 2,
          start: 44 * (Math.PI / 180),
          end: 134 * (Math.PI / 180),
          brighten: 30,
        },
        {
          idx: 3,
          start: 134 * (Math.PI / 180),
          end: 224 * (Math.PI / 180),
          brighten: 20,
        },
      ];

      // background slices
      arcDetails.forEach((arc) => {
        generateSliceBgArc(
          chart,
          ctx,
          xCord,
          yCord,
          arc.idx,
          arc.start,
          arc.end,
          arc.brighten
        );
      });
    },
  };

  // donut center text
  const chartCenterText = {
    id: "chartCenterText",
    afterDatasetsDraw(chart: any) {
      if (!chartRef.current) return;
      const { ctx } = chart;
      const xCord = chart.getDatasetMeta(0).data[0].x;
      const yCord = chart.getDatasetMeta(0).data[0].y;
      ctx.beginPath();
      ctx.arc(xCord, yCord, centerTextArcWidth, 0, 2 * Math.PI);
      ctx.fillStyle = "#F9BF34";
      ctx.fill();

      // text in the middle of the donut
      ctx.fillStyle = "#fff";
      ctx.font = "bold 30px Gilroy";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(centerText, xCord, yCord);
    },
  };

  // text with background in each slice
  const sliceTextCloud = {
    id: "sliceTextCloud",
    afterDatasetsDraw: (chart: any) => {
      const { ctx } = chart;
      const w = 30;
      ctx.save();
      previewData?.forEach((dataPoint, index) => {
        const { x: centerX, y: centerY } = chart.getDatasetMeta(0).data[index];
        const { startAngle, endAngle } = calculateArcAngles(
          previewData.length,
          index
        );
        const { x, y } = calculateArcCenter(
          startAngle,
          endAngle,
          sliceTextCloudWidth,
          centerX,
          centerY
        );

        // text background
        ctx.beginPath();
        ctx.arc(x, y, w / 2, 0, angle * 360, false);
        ctx.fillStyle = "#fff";
        ctx.fill();

        // text
        ctx.font = "bold 14px Gilroy";
        ctx.fillStyle = "#000";
        ctx.textAlign = "center";
        ctx.textBaseline = "center";
        ctx.fillText(dataPoint, x, y);
      });
    },
  };

  // adjust slice thickness based on value
  const sliceThickness = {
    id: "sliceThickness",
    beforeDraw: (chart: any) => {
      if (!previewData) return;
      const sliceThicknessPixel = previewData.map((val) => getSliceSize(val));
      sliceThicknessPixel.forEach((thickness, index) => {
        chart.getDatasetMeta(0).data[index].outerRadius =
          (chart.chartArea.width / thickness) * 100;
      });
    },
  };

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");

    if (!ctx) return;

    // chart initialization
    const donutChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: legends,
        datasets: [
          {
            data,
            backgroundColor: bgColor,
            hoverOffset: allowHover ? 15 : 0,
          },
        ],
      },
      options: {
        responsive: true,
        rotation: 314,
        plugins: {
          tooltip: { enabled: false },
          //   datalabels: {
          //     display: false
          //   }
        },
        layout: {
          padding: { bottom: 15 },
        },
      },
      plugins: [
        backgroundCircle,
        chartCenterText,
        sliceTextCloud,
        sliceThickness,
      ],
    });

    // eslint-disable-next-line consistent-return
    return () => {
      donutChart.destroy();
    };
  }, [bgColor, centerText, data, legends, previewData]);

  return (
    <div style={{ height: chartSize, width: chartSize, margin: "auto" }}>
      <canvas ref={chartRef} />
    </div>
  );
}

export default CustomChart;
