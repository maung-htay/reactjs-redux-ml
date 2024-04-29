import React from "react";
import DataTable from "./table/data-table";
import { useSelector } from "react-redux";
import { createColumns } from "./table/columns";

const TableComponent = () => {
  const datas = useSelector((state) => state.fileColumns.datas);
  const columns = useSelector((state) => state.fileColumns.columns);

  let COLUMNS = [];
  if (columns.length !== 0) {
    COLUMNS = createColumns(columns);
  }

  return <DataTable columns={COLUMNS} data={datas} />;
};

export default TableComponent;
