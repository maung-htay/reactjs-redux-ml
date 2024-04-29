import React, { useState, Suspense } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable.jsx";
import FileUpload from "@/components/FileUpload";
import { ScrollArea } from "@/components/ui/scroll-area";
import DataTable from "@/components/table/data-table";
import { createColumns } from "@/components/table/columns";

import { useLoaderData, defer, json, Await } from "react-router-dom";
import ModelSelect from "@/components/ModelSelect";
import { BACK_URL } from "@/constant";

const Ticket = () => {
  const { models } = useLoaderData();
  const [useModel, setUseModel] = useState(""); // trainned model name

  const [columns, setColumns] = useState([]);
  const [predicedData, setPredicedData] = useState([]);

  const realPredictedData = async ({ columns, data }) => {
    if (columns && data) {
      const COLUMNS = createColumns(columns);
      setColumns(COLUMNS);
      setPredicedData(data);
    }
  };

  const useModelHandler = (value) => {
    setUseModel(value);
    // console.log("value ", value);
  };

  return (
    <div className="h-[calc(100vh-4rem)] p-2">
      <ResizablePanelGroup
        direction="horizontal"
        className="rounded-lg border border-blue-300"
      >
        <ResizablePanel defaultSize={25}>
          <div className="flex flex-col gap-2 p-2 h-fit">
            <Suspense fallback={<div>Loading...</div>}>
              <Await resolve={models}>
                {(loadedModels) => (
                  <ModelSelect
                    datas={loadedModels}
                    trainnedModel={useModelHandler}
                    predictedData={realPredictedData}
                  />
                )}
              </Await>
            </Suspense>
            {/* <ModelSelect datas={models} trainnedModel={useModelHandler} /> */}

            {useModel && (
              <FileUpload page="ticket" predictedData={realPredictedData} />
            )}
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>
          <ScrollArea className="flex flex-col gap-3 h-5/6 lg:h-full p-2">
            <DataTable columns={columns} data={predicedData} />
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Ticket;

export async function loader() {
  const response = await fetch(`${BACK_URL}/get-model-list`);
  //const response = await fetch("http://backend:8000/api/get-model-list");
  let data = await response.json();
  //console.log(data);
  return defer({
    models: data,
  });
}
