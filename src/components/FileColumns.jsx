import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fileColumnsActions } from "@/store/file-columns-slice";
import { Button } from "./ui/button";
import { Label } from "@radix-ui/react-label";
import { ScrollArea } from "./ui/scroll-area";
import { Textarea } from "./ui/textarea";
import { Slider } from "./ui/slider";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { BACK_URL } from "@/constant";
import { useTranslation } from "react-i18next";
import Processing from "./dialog/Processing";

const FileColumns = () => {
  const fileColumns = useSelector((state) => state.fileColumns.columns);
  const file_name = useSelector((state) => state.fileColumns.file_name);
  const model_name = useSelector((state) => state.fileColumns.model_name);
  const dispatch = useDispatch();

  const [parentModel, setParentModel] = useState("sciket");

  const [modelRes, setModelRes] = useState({});
  const [textSize, setTextSize] = useState(0.2);
  const [randomState, setRandomState] = useState(42);
  const [model, setModel] = useState("linear");

  const [realData, setRealData] = useState({});
  const [error, setError] = useState("");
  // Model creating loading
  const [loading, setLoading] = useState(false);

  // ref
  const input_column = useRef(null);
  const output_column = useRef(null);
  // const text_size = useRef(null);
  // const random_state = useRef(null);

  const { t } = useTranslation();

  const handleCreateModel = async () => {
    setLoading(true);
    const data = {
      input_column: input_column.current.value.split("\n"),
      output_column: output_column.current.value.split("\n"),
      text_size: parseFloat(textSize),
      random_state: parseInt(randomState),
      file_name: file_name,
      model: model,
      parentModel: parentModel,
    };
    const response = await fetch(`${BACK_URL}/create-model`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        // "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    if (response.ok) {
      //chargesconsole.log("Response ok", await response.json());
      const res_data = await response.json();
      if (res_data["status"] === "error") {
        setError(res_data["message"]);
      } else {
        setModelRes(res_data);
        setError("");
      }
      setLoading(false);
    }
  };

  const handleRealData = async () => {
    const real_data = input_column.current.value.split("\n");
    let data = {};
    for (let i = 0; i < real_data.length; i++) {
      const column = document.getElementById(real_data[i]);
      data[real_data[i]] = parseInt(column.value);
    }
    data["parentModel"] = parentModel;
    data["model_name"] = model_name;
    const response = await fetch(`${BACK_URL}/check-model`, {
      method: "POST",
      body: JSON.stringify({ data: data }),
      headers: {
        "Content-Type": "application/json",
        // "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    if (response.ok) {
      //chargesconsole.log("Response ok", await response.json());
      const data = await response.json();
      //console.log(predict);
      setRealData(data);
    }
  };

  const handlerSaveModel = async () => {
    let data = {};
    data["input_column"] = input_column.current.value.split("\n");
    data["parentModel"] = parentModel;
    data["accuracy"] = modelRes["r2"];
    data["file_name"] = file_name;

    const response = await fetch(`${BACK_URL}/save-model`, {
      method: "POST",
      body: JSON.stringify({ data: data }),
      headers: {
        "Content-Type": "application/json",
        // "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    if (response.ok) {
      //chargesconsole.log("Response ok", await response.json());
      const { model_name, status } = await response.json();
      if (status === "success") {
        dispatch(fileColumnsActions.setModelName(model_name));
        dispatch(fileColumnsActions.setFileName(""));
      }
      if (status === "error") {
        console.log("Error");
      }
    }
  };

  return (
    <div className="flex gap-2 justify-between">
      <ScrollArea className=" w-48 rounded-md border border-blue-300">
        <div className="p-4">
          <h4 className="mb-4 text-sm font-medium leading-none">
            {t("file_columns")}
          </h4>
          {fileColumns.map((column, index) => (
            <div key={index}>{column}</div>
          ))}
        </div>
      </ScrollArea>

      <div className="flex flex-col gap-2 border border-blue-300 rounded-md p-3">
        <Label htmlFor="input_column">{t("file_inputs")}</Label>
        <Textarea
          placeholder="Input Columns"
          ref={input_column}
          id="input_column"
        />
        {error && <Label className="text-red-500">{error}</Label>}
        <Label htmlFor="output_column" className="pt-5">
          {t("output_columns")}
        </Label>
        <Textarea
          placeholder="Output Columns"
          ref={output_column}
          className=""
          id="output_column"
        />
      </div>

      <ScrollArea className="w-80 border border-blue-300 p-3 rounded-md">
        <h1>{t("configuration_data")}</h1>

        <div className="p-2 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <Label htmlFor="text_size">Text Size: {textSize}</Label>
            <Slider
              defaultValue={[0.2]}
              max={0.9}
              step={0.1}
              id="text_size"
              onValueChange={(value) => setTextSize(value[0])}
            />
          </div>
          <div>
            <Label htmlFor="random_state">Random State: {randomState}</Label>

            <Slider
              defaultValue={[42]}
              max={100}
              step={1}
              id="random_state"
              onValueChange={(value) => setRandomState(value[0])}
            />
          </div>
          <Select
            onValueChange={(value) => {
              setParentModel(value);
            }}
          >
            <SelectTrigger className="">
              <SelectValue placeholder={t("select_library")} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="sciket">SciketLearn</SelectItem>
                <SelectItem value="tensorflow"> TensorFlow</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            onValueChange={(value) => {
              setModel(value);
            }}
          >
            <SelectTrigger className="">
              <SelectValue placeholder={t("select_model")} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="linear">LinearRegression</SelectItem>
                <SelectItem value="decisiontree">
                  {" "}
                  DecisionTreeRegressor
                </SelectItem>
                <SelectItem value="sequential">Sequential</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button
            disabled={
              file_name.length === 0 || model_name.length !== 0 || loading
            }
            onClick={handleCreateModel}
            className="ml-28"
          >
            {t("create_model_button")}
            {loading && <Processing />}
          </Button>
        </div>
      </ScrollArea>

      <div className="flex flex-col w-64 gap-5 border border-blue-300 rounded-md p-3">
        <h2>{t("model_result")} </h2>
        <Label>mse: {modelRes["mse"]}</Label>
        <Label>r2(Score): {modelRes["r2"]} </Label>
        <Button
          disabled={file_name.length === 0 || modelRes["r2"] === undefined}
          className="ml-32"
          onClick={handlerSaveModel}
        >
          {t("save_model_button")}
        </Button>
      </div>
      <div className="flex flex-col w-64 gap-1 border border-blue-300 rounded-md p-3">
        <h2>
          {t("check_real_data_label")} {model_name}{" "}
        </h2>

        {input_column.current &&
          input_column.current.value.split("\n").map((column, index) => (
            <div key={index}>
              <Input type="text" placeholder={column} id={column} />
            </div>
          ))}

        <Button
          disabled={model_name.length === 0 || input_column.current === null}
          className="ml-32"
          onClick={handleRealData}
        >
          {t("check_button")}
        </Button>
        <Label>
          {t("result_label")}: {realData["predict"]}{" "}
        </Label>
      </div>
    </div>
  );
};

export default FileColumns;
