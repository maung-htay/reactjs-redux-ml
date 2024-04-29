import React, { useRef, useState } from "react";
import { Form, useNavigate, useNavigation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fileColumnsActions } from "../store/file-columns-slice.js";
import { useTranslation } from "react-i18next";

// shadcn ui
Label;
import { Input } from "./ui/input";
import { Label } from "./ui/label.jsx";
import { Button } from "./ui/button.jsx";
import { BACK_URL } from "@/constant.jsx";
import PropTypes from "prop-types";

const FileUpload = ({ page, predictedData }) => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const navigation = useNavigation();
  const fileInput = useRef(null);

  const model_name = useSelector((state) => state.fileColumns.model_name);
  const model_id = useSelector((state) => state.fileColumns.model_id);
  const file_name = useSelector((state) => state.fileColumns.file_name);

  const dispatch = useDispatch();

  const isSubmitting = navigation.state === "submitting";
  const [submitControl, setSubmitControl] = useState(false);
  const [error, setError] = useState(null);

  const handleFileUpload = async () => {
    // const file = document.getElementById("file").files[0];
    const file = fileInput.current.files[0];
    const formData = new FormData();
    formData.append("file", file);
    if (page === "home") {
      const response = await fetch(`${BACK_URL}/upload-file`, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        //console.log("Resonpse ok", await response.json());
        const { columns, file_name, data } = await response.json();
        dispatch(fileColumnsActions.setColumns(columns));
        dispatch(fileColumnsActions.setFileName(file_name));

        dispatch(fileColumnsActions.setDatas(data));
        fileInput.current.value = "";
        setSubmitControl(false);

        dispatch(fileColumnsActions.setModelName(""));
      }
    } else if (page === "ticket") {
      formData.append("trainned_model_name", model_name);
      formData.append("trainned_model_id", model_id);
      //console.log("model name ", model_name);
      const response = await fetch(`${BACK_URL}/upload-predict-file`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const { columns, data, status, message } = await response.json();

        if (status === "error") {
          setError(message);
        } else {
          fileInput.current.value = "";
          setSubmitControl(false);
          predictedData({ columns, data });
          setError(null);
        }
      }
    }
  };

  const handleInputChange = () => {
    if (fileInput.current.value) {
      setSubmitControl(true);
    } else {
      setSubmitControl(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 max-w-sm border border-blue-300 rounded-md p-5">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="picture">{t("uploaded_file")} </Label>
        <Input
          id="file"
          type="file"
          ref={fileInput}
          className="cursor-pointer"
          onChange={handleInputChange}
        />
      </div>
      <Button
        disabled={isSubmitting || !submitControl}
        onClick={handleFileUpload}
        className="ml-32"
      >
        {isSubmitting ? "Submitting..." : t("submit_button")}
      </Button>
      <div>
        {error && (
          <div className="text-red-500 text-sm font-semibold">{error}</div>
        )}
      </div>
      <div className="flex pt-10">
        <Label>
          {t("uploaded_file_label")} : {file_name}
        </Label>
      </div>
    </div>
  );
};

FileUpload.propTypes = {
  page: PropTypes.string,
  predictedData: PropTypes.func,
};

export default FileUpload;
