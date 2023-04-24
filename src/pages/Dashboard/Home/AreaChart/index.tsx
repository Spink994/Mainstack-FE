import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { ChartDataType } from "../chart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

// The area chart options
const options = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: "top" as const,
      align: "start" as const,
      labels: {
        boxWidth: 0,
      },
    },
    title: {
      display: true,
      align: "start" as const,
      padding: 80,
      text: "",
    },
  },
};

interface AreaChartProps {
  chartData: ChartDataType;
  filterType: string;
}

export function AreaChart({ chartData, filterType }: AreaChartProps) {
  if (chartData === undefined)
    return (
      <div className="w-full h-full flex items-center justify-center">
        No data to display at this time ...
      </div>
    );
  if (chartData === null)
    return (
      <div className="w-full h-full flex items-center justify-center">
        No data to display this time ...
      </div>
    );

  // Getting the data for the Y and the X axis
  const dataOnXAxis = Object.keys(chartData.graph_data.views);
  const dataOnYAxis = Object.values(chartData.graph_data.views);

  // Converting the string dates to fit the design
  const refinedDataForXAxis = dataOnXAxis.map((item) => {
    const date = new Date(item);

    return new Intl.DateTimeFormat("en-us", {
      month: "short",
      day: "2-digit",
    }).format(date);
  });

  // The output of the labels on the x axis is dependent on the filter type chosen
  const labels =
    Number(filterType) === 1
      ? refinedDataForXAxis.slice(dataOnXAxis.length - 1, dataOnXAxis.length)
      : Number(filterType) === 3
      ? refinedDataForXAxis.slice(dataOnXAxis.length - 3, dataOnXAxis.length)
      : Number(filterType) === 7
      ? refinedDataForXAxis.slice(dataOnXAxis.length - 7, dataOnXAxis.length)
      : refinedDataForXAxis;

  // The output of the labels on the y axis is dependent on the filter type chosen
  const yAxisData =
    Number(filterType) === 1
      ? dataOnYAxis.slice(dataOnYAxis.length - 1, dataOnYAxis.length)
      : Number(filterType) === 3
      ? dataOnYAxis.slice(dataOnYAxis.length - 3, dataOnYAxis.length)
      : Number(filterType) === 7
      ? dataOnYAxis.slice(dataOnYAxis.length - 7, dataOnYAxis.length)
      : dataOnYAxis;

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "",
        data: yAxisData,
        borderColor: "#FF5403",
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        backgroundColor: ({ chart: { ctx } }) => {
          const bg = ctx.createLinearGradient(0, 30, 0, 1200);
          bg.addColorStop(0, "#FF540333");
          bg.addColorStop(0.5, "#FF540300");
          bg.addColorStop(1, "#FF540300");
          return bg;
        },
      },
    ],
  };

  return (
    <div className="relative">
      <Line
        className="min-w-full min-h-[300px_!important]"
        options={options}
        data={data}
      />
      <div className="absolute bg-transparent min-h-[16px] w-max top-8 left-2">
        <h1 className="font-Sohne font-semibold text-[18px] mb-2">
          Page Views
        </h1>
        <span className="font-Sohne font-light text-sm text-gray-1">
          {filterType}{" "}
          {filterType.toLowerCase() !== "all time" ? "Day(s)" : null}
        </span>
        <h2 className="font-Sohne font-semibold  text-5xl mt-4">500</h2>
      </div>
    </div>
  );
}
