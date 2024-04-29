import React, { useEffect } from "react";
import FileUpload from "../components/FileUpload.jsx";
import FileColumns from "../components/FileColumns.jsx";
import FlexiableLayout from "@/components/FlexiableLayout.jsx";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fileColumnsActions } from "@/store/file-columns-slice";
import { use } from "i18next";
import { defer } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch();
  const file_name = useSelector((state) => state.fileColumns.file_name);
  const file_size = file_name.length <= 0 ? true : false;
  useEffect(() => {
    if (file_size) {
      dispatch(fileColumnsActions.setColumns([]));
      //dispatch(fileColumnsActions.setModelName(""));
    }
  }, [file_size]);

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col mx-1 py-1 gap-2">
      <ResizablePanelGroup
        direction="vertical"
        className="min-h-[850px] rounded-lg border border-blue-300 p-2"
      >
        <ResizablePanel defaultSize={38}>
          <div className="flex gap-2">
            <FileUpload page="home" />
            <FileColumns />
          </div>
          {/* <Dialog /> */}
        </ResizablePanel>
        {/* <ResizableHandle /> */}
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={62}>
          <FlexiableLayout />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default HomePage;
