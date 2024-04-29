import React, { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";
import MyChartComponent from "./MyChartComponent";
import Chart from "@/pages/Chart";
import { ScrollArea } from "./ui/scroll-area";
import TableComponent from "./TableComponent";
import { BACK_URL } from "@/constant";

const FlexiableLayout = () => {
  const [chartType, setChartType] = useState("line");
  const [chartData, setChartData] = useState({});
  const [fileName, setFileName] = useState("");

  const data = {
    labels: chartData.x,
    datasets: [
      {
        label: fileName,
        data: chartData.y,
        fill: false,
        borderColor: "rgb(0,0,230)",
        backgroundColor: "rgb(0,0,230)", // "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const updateChartType = async (value, x_row, y_column, file_name) => {
    setChartType(value);
    setFileName(file_name);

    const req_data = {
      x_row: x_row,
      y_column: y_column,
      file_name: file_name,
      chart_type: value,
    };
    const response = await fetch(`${BACK_URL}/create-chart`, {
      method: "POST",
      body: JSON.stringify(req_data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      //chargesconsole.log("Response ok", await response.json());
      const res_data = await response.json();
      setChartData(res_data);
      //setModelRes(res_data);
    }
  };

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="rounded-lg border border-blue-300"
    >
      <ResizablePanel defaultSize={40}>
        <ScrollArea className="p-5 h-5/6 lg:h-full">
          {/* <TableComponent1 /> */}
          <TableComponent />
        </ScrollArea>

        {/* <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Table</span>
         
        </div> */}
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={60}>
        {/* <MyChartComponent data={data} options={options} /> */}
        <div className="flex flex-col gap-3 h-full justify-center p-7">
          <Chart chartTypeAction={updateChartType} />

          <MyChartComponent data={data} options={options} type={chartType} />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default FlexiableLayout;
