import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { ChartDataType } from "../chart";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import countriesAndFlags from "../../../../countriesAndFlags";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "../../../../assets/icons";

ChartJS.register(ArcElement, Tooltip, Legend);

// The options that determines what the piechart shows on screen
const pieOptions = {
  plugins: {
    title: {
      display: false,
    },

    legend: {
      display: false,
      labels: {
        boxWidth: 0,
      },
    },
  },
};

interface PieChartProps {
  chartData: ChartDataType;
  type: "location" | "sources";
}

interface LocationDataType {
  country: string;
  percentage: number;
  flagImage: string;
}

export function Piechart({ chartData, type }: PieChartProps) {
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

  // filtering out the count based on the resource type
  const count =
    type === "location"
      ? chartData.top_locations.map((item) => item.count)
      : type === "sources"
      ? chartData.top_sources.map((item) => item.count)
      : [];

  // filtering out the background color of the piechart based on the resource type
  const bgColor =
    type === "location"
      ? ["#599EEA", "#844FF6", "#F09468", "#0FB77A", "#FAB70A"]
      : type === "sources"
      ? ["#599EEA", "#844FF6", "#F09468", "#0FB77A"]
      : [];

  // filtering out the labels of the piechart based on the resource type
  const pieLabels =
    type === "location"
      ? chartData.top_locations.map((item) => item.country)
      : type === "sources"
      ? chartData.top_sources.map((item) => item.source)
      : [];

  // filtering out the pie chart information based on the resource type
  const pieChartInfo =
    type === "location"
      ? chartData.top_locations.map((item, index) => {
          // An object in the shape of the data needed
          const locationData: LocationDataType = {
            country: item.country,
            percentage: item.percent,
            flagImage: "",
          };

          // Mapping through an of countries with flag to add flag images to the required data object based on the country
          const filteredFlag = countriesAndFlags.filter((country) => {
            const matchCountry =
              country.name.toLowerCase() == item.country.toLowerCase();
            if (matchCountry) return country;
          });

          // Adding the flag image
          const allRequiredfields = {
            ...locationData,
            flagImage: filteredFlag[0].image,
          };

          // This is the jsx element of the pie chart information with all the fields required
          return (
            <div
              key={index}
              className="flex items-center font-Sohne font-normal"
            >
              <img
                src={allRequiredfields.flagImage}
                alt="flag"
                className="min-h-[15px] max-h-[15px] min-w-[21px] max-w-[21px] mr-3"
              />
              <span className="font-[inherit]">
                {allRequiredfields.country}
              </span>
              <span className="ml-2 font-Sohne font-semibold">
                {allRequiredfields.percentage}%
              </span>
              <div
                className="min-h-[12px] min-w-[12px] rounded-full ml-3"
                style={{ backgroundColor: `${bgColor[index]}` }}
              />
            </div>
          );
        })
      : type === "sources"
      ? chartData.top_sources.map((item, index) => {
          // Initiating the source in a lowercase form to remove repitition
          const source = item.source.toLowerCase();
          return (
            <div
              key={index}
              className="flex items-center font-Sohne font-normal"
            >
              {/* For social icons other than google */}
              {source !== "google" && (
                <img
                  src={
                    source === "facebook"
                      ? Facebook
                      : source === "instagram"
                      ? Instagram
                      : source === "linkedin"
                      ? Linkedin
                      : source === "twitter"
                      ? Twitter
                      : ""
                  }
                  alt="flag"
                  className="min-h-[15px] max-h-[15px] min-w-[21px] max-w-[21px] mr-3"
                />
              )}

              {/* If the source is google - using react icons because google was not part of the resources provided on figma */}
              {source === "google" && (
                <FcGoogle className="min-h-[15px] min-w-[21px] mr-3" />
              )}

              {/* The source name */}
              <span className="font-[inherit] capitalize">{item.source}</span>
              {/* The source percentage */}
              <span className="ml-2 font-Sohne font-semibold">
                {item.percent}%
              </span>
              {/* The source color code */}
              <div
                className="min-h-[12px] min-w-[12px] rounded-full ml-3"
                style={{ backgroundColor: `${bgColor[index]}` }}
              />
            </div>
          );
        })
      : [];

  // The pie chart data needed to properly display the piechart
  const data = {
    labels: pieLabels,
    datasets: [
      {
        label: "count",
        data: count,
        backgroundColor: bgColor,

        spacing: 0,
        borderWidth: 0,
        radius: 85,
        cutout: 90,
      },
    ],
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between">
        <h1 className="font-Sohne font-semibold">Top Locations</h1>
        <Link className="text-orange-2 text-sm" to="/view-analytics">
          View full reports
        </Link>
      </div>

      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col w-full gap-4">{pieChartInfo}</div>
        <div>
          <Doughnut options={pieOptions} data={data} />
        </div>
      </div>
    </div>
  );
}
