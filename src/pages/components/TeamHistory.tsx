/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Line } from "react-chartjs-2";
import Image from "next/image";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { api } from "~/utils/api";

export default function TeamHistory(props: {
  id: string;
  w?: number;
  h?: number;
}) {
  // Register scales and other elements before using them
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
  );

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      line: {
        tension: 0,
        borderWidth: 2,
        borderColor: "rgba(35,195,91, 1)",
        fill: "start",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        backgroundColor: (context: any) => {
          const chart = context.chart as ChartJS;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return undefined;
          }

          // const gradient = ctx.createLinearGradient(
          //   chartArea.left,
          //   chartArea.top,
          //   chartArea.right,
          //   chartArea.bottom
          // );

          // gradient.addColorStop(0, "rgba(255, 0, 0, 0.5)");
          // gradient.addColorStop(1, "rgba(0, 255, 0, 0.5)");

          const { top, bottom } = chartArea;

          const gradient = ctx.createLinearGradient(0, top, 0, bottom);
          gradient.addColorStop(0, "rgba(35,195,91, 0.3)");
          gradient.addColorStop(1, "rgba(35,195,91, 0)");

          return gradient;
        },
      },
      point: {
        radius: 0,
        hoverRadius: 0,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
  };

  let width = 500;
  let height = 80;

  if (props.w) {
    width = props.w;
  }
  if (props.h) {
    height = props.h;
  }

  const teamHistory = api.teams.getTeamRankHistory.useQuery({ id: props.id });

  if (teamHistory.data) {
    const dataset = {
      labels: teamHistory.data.map(
        (x) => x.date?.getDay() + " / " + x.date?.getMonth()
      ),
      datasets: [
        {
          data: teamHistory.data.map((x) => x.ranking),
        },
      ],
    };
    const list = teamHistory.data;
    const len = list.length;

    const currentRanking = list[len - 1]?.ranking; // Current ranking
    const ranking5MatchesAgo = list[len - 5 - 1]?.ranking; // Ranking from 5 matches ago

    let increased = false;
    if (currentRanking && ranking5MatchesAgo) {
      increased = currentRanking > ranking5MatchesAgo;
    }

    return (
      <>
        <div className={`relative  h-[${height}px] w-[${width}px] `}>
          <div className="-mt-7 flex flex-col">
            <div className="italic text-slate-400">Rating</div>

            <div className=" z-40  flex items-center rounded-full bg-black bg-opacity-10">
              <svg
                className={` h-5 w-5${
                  increased ? " fill-green-500" : " fill-red-500"
                } `}
                data-name="Arrow"
                viewBox="0 0 32 32"
              >
                <path
                  d="m26.71 10.29-10-10a1 1 0 0 0-1.41 0l-10 10 1.41 1.41L15 3.41V32h2V3.41l8.29 8.29z"
                  transform={`
                  ${increased ? "" : "scale (1, -1)"}
                  `}
                  transform-origin="center"
                ></path>
              </svg>
              <div className="font-poppins text-3xl text-slate-200">
                {typeof parseFloat(String(currentRanking)) === "number"
                  ? (parseFloat(String(currentRanking)) * 1000).toFixed(0)
                  : "Unranked"}
              </div>
            </div>

            <div className="font-poppins text-3xl text-slate-200"></div>
          </div>
          <div className=" absolute  z-0 font-poppins text-3xl text-slate-200">
            <Line
              data={dataset}
              height={height}
              width={width}
              options={options}
            />
          </div>
        </div>
      </>
    );
  } else {
    return null;
  }
}
