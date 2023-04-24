import useSWR from "swr";
import { MouseEvent, useState } from "react";
import { Link } from "react-router-dom";
import { AreaChart } from "./AreaChart";
import { Piechart } from "./Piechart";

const filters = {
  data: [1, 3, 7, "All Time", "Custom Date"],
};

export default function DashboardHome() {
  const [selectedFilter, setSelectedFilter] = useState("All time");

  // Fetches the chart data
  const { data, isLoading } = useSWR(
    "https://fe-task-api.mainstack.io/",
    (data) => fetch(data).then((res) => res.json())
  );

  // Changes the style of the selected filter
  const filterHandler = (e: MouseEvent) => {
    const { target } = e;
    if (target instanceof HTMLButtonElement)
      setSelectedFilter(() => String(target.dataset.filter));
  };

  return (
    <div className="flex flex-col pb-12">
      {/* Top container */}
      <div className="w-full flex items-center justify-between">
        <div>
          <h1 className="font-SohneSemibold text-2xl">
            Good morning, Blessing ⛅️
          </h1>
          <span className="text-sm text-gray-2">
            Check out your dashboard summary.
          </span>
        </div>

        <Link className="text-orange-2 text-sm" to="/view-analytics">
          View analytics
        </Link>
      </div>

      {/* Button filter */}
      <div className="flex gap-3 items-center mt-6">
        {filters.data.map((filter: string | number, index: number) => (
          <button
            onClick={filterHandler}
            data-filter={filter}
            className={`h-10 flex items-center justify-center border ${
              selectedFilter.toLowerCase() === String(filter).toLowerCase()
                ? "border-orange-2 bg-orange-1 text-orange-2"
                : "border-gray-0"
            }  px-4 rounded-[100px] text-sm`}
            key={index}
          >
            {filter}{" "}
            {index === 0 ? "Day" : typeof filter === "string" ? null : "Days"}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <span>Fetching Chart Data ...</span>
        </div>
      ) : (
        <>
          {/* Chart Container */}
          <div className="min-h-max w-full border mt-6 rounded-xl px-6 pb-4">
            <AreaChart filterType={selectedFilter} chartData={data} />
          </div>

          {/* Top location and sources */}
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))] min-h-[326px] w-full gap-4 mt-6">
            <div className="flex border rounded-xl p-6">
              <Piechart type="location" chartData={data} />
            </div>
            <div className="flex border rounded-xl p-6">
              <Piechart type="sources" chartData={data} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
