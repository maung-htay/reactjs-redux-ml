import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { fileColumnsActions } from "@/store/file-columns-slice";
import { BACK_URL } from "@/constant";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

const ModelSelect = ({ datas, trainnedModel, predictedData }) => {
  const { t } = useTranslation();

  const [selectedModel, setSelectedModel] = useState({});
  const [selectedModelName, setSelectedModelName] = useState("");

  const [modelSelectBox, setModelSelectBox] = useState(datas);

  const dispatch = useDispatch();

  const loadDataHandler = async () => {
    const data = {
      trainned_model_name: selectedModelName,
      trainned_model_id: selectedModel.id,
    };
    const response = await fetch(`${BACK_URL}/get-loaded-tickets`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const { columns, data } = await response.json();
      predictedData({ columns, data });
    }
  };

  const reCreateModelSelection = async () => {
    const response = await fetch(`${BACK_URL}/get-model-list`);
    let data = await response.json();
    setModelSelectBox(data);
    setSelectedModel({});
    setSelectedModelName("");
  };

  const deleteModelHandler = async () => {
    const data = {
      trainned_model_name: selectedModelName,
      trainned_model_id: selectedModel.id,
    };
    const response = await fetch(`${BACK_URL}/delete-model`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const { model_name } = await response.json();
      // console.log("delete ok", model_name);

      await reCreateModelSelection();
      predictedData([], []);
    }
  };

  return (
    <div className="flex flex-col gap-3 max-w-sm border border-blue-300 rounded-md p-5">
      <Select
        onValueChange={(value) => {
          //console.log(value);
          setSelectedModel(value);
          setSelectedModelName(value.id);
          dispatch(fileColumnsActions.setModelName(value.id));
          dispatch(fileColumnsActions.setModelId(value.id));
          trainnedModel(value.id);
        }}
      >
        <SelectTrigger className="">
          <SelectValue placeholder={t("select_trainned_model")} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {modelSelectBox &&
              modelSelectBox.map((column, index) => (
                <SelectItem key={index} value={column}>
                  {column.file_name}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="flex flex-col gap-3 px-3">
        <div className="flex justify-between">
          <Label className="text-md">{t("accuracy_label")}:</Label>
          <Label className="text-sm text-gray-500">
            {selectedModel.accuracy}
          </Label>
        </div>
        <div className="">
          <Label className="text-md">{t("used_columns_data_label")}</Label>
          <div className="flex flex-col px-5 gap-1">
            {selectedModel.input_column &&
              selectedModel.input_column.map((column, index) => (
                <Label key={index} className="text-sm text-gray-500">
                  {column}
                </Label>
              ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between pt-10">
        <Button
          disabled={selectedModelName.length === 0}
          onClick={deleteModelHandler}
        >
          {t("delete_button")}
        </Button>
        <Button
          disabled={selectedModelName.length === 0}
          className=""
          onClick={loadDataHandler}
        >
          {t("load_data_button")}
        </Button>
      </div>
    </div>
  );
};

ModelSelect.propTypes = {
  datas: PropTypes.array,
  trainnedModel: PropTypes.func,
  predictedData: PropTypes.func,
};

export default ModelSelect;
