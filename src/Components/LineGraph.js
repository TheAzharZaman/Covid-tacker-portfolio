import React from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

const graphOpts = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const LineGraph = ({
  setGraphType,
  graphTagline,
  graphDataDuration,
  sideBarGraph,
}) => {
  const [graphData, setGraphData] = React.useState({});

  const BuildChartData = (fetchedGraphData, dataType = "cases") => {
    let builtGraphData = [];
    let lastDataPoint;

    for (let date in fetchedGraphData.cases) {
      if (lastDataPoint) {
        const newDataPoint = {
          x: date,
          y: fetchedGraphData[dataType][date] - lastDataPoint,
        };
        builtGraphData.push(newDataPoint);
      }
      lastDataPoint = fetchedGraphData[dataType][date];
    }
    return builtGraphData;
  };

  const GRAPH_DATA_API_URL = `https://disease.sh/v3/covid-19/historical/all?lastdays=${graphDataDuration}`;

  React.useEffect(() => {
    const fetchGraphData = async () => {
      await fetch(GRAPH_DATA_API_URL)
        .then((response) => response.json())
        .then((fetchedGraphData) => {
          let finalGraphData = BuildChartData(fetchedGraphData, setGraphType);
          setGraphData(finalGraphData);
        });
    };

    fetchGraphData();
  }, []);

  console.log("This is the prepared graph data, to be rendered", graphData);

  return (
    <div
      className={`graph__container ${
        sideBarGraph && "sidebar__graphContainer"
      }`}
    >
      <h3>{graphTagline}</h3>

      {graphData?.length > 0 && (
        <Line
          className="graph"
          data={{
            datasets: [
              {
                backgroundColor: "rgba(204, 16, 52, 0.5)",
                borderColor: "#CC1034",
                data: graphData,
              },
            ],
          }}
          options={graphOpts}
        />
      )}
    </div>
  );
};

export default LineGraph;
