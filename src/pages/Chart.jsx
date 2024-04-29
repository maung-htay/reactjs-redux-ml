import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MyChartComponent from "@/components/MyChartComponent";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

const Chart = ({ chartTypeAction }) => {
  const { t } = useTranslation();

  const fileColumns = useSelector((state) => state.fileColumns.columns);
  const file_name = useSelector((state) => state.fileColumns.file_name);

  const [xRow, setXRow] = useState(null);
  const [yColumn, setYColumn] = useState(null);
  const [chartType, setChartType] = useState(null);

  const chartTypeHandler = (value, status) => {
    if (!xRow || !yColumn || !file_name) return;
    if (status === "type") {
      chartTypeAction(value, xRow, yColumn, file_name);
    } else if (status === "xRow") {
      chartTypeAction(chartType, value, yColumn, file_name);
    } else {
      chartTypeAction(chartType, xRow, value, file_name);
    }

    console.log(xRow, yColumn, chartType);
  };

  return (
    <div className="flex max-w-sm gap-3">
      <Select
        onValueChange={(value) => {
          setXRow(value);
          chartTypeHandler(value, "xRow");
        }}
      >
        <SelectTrigger className="">
          <SelectValue placeholder="Select X columns" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {fileColumns &&
              fileColumns.map((column, index) => (
                <SelectItem key={index} value={column}>
                  {column}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select
        onValueChange={(value) => {
          setYColumn(value);
          chartTypeHandler(value, "yColumn");
        }}
      >
        <SelectTrigger className="">
          <SelectValue placeholder="Secect Y columns" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {fileColumns &&
              fileColumns.map((column, index) => (
                <SelectItem key={index} value={column}>
                  {column}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select
        onValueChange={(value) => {
          setChartType(value);
          chartTypeHandler(value, "type");
        }}
      >
        <SelectTrigger className="">
          <SelectValue placeholder={t("chart_type")} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="line">Line</SelectItem>
            <SelectItem value="bar"> Bar</SelectItem>
            <SelectItem value="pie"> Pie</SelectItem>
            <SelectItem value="bubble"> Bubble</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

Chart.PropTypes = {
  chartTypeAction: PropTypes.func.isRequired,
};

export default Chart;
