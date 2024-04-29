import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { languageChangeActions } from "@/store/language-change-slice";
import { Label } from "./ui/label";

const LanguageSwitcher = () => {
  const dispatch = useDispatch();
  const selectedLanguage = useSelector(
    (state) => state.languageChange.language
  );
  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(language);

  useEffect(() => {
    setCurrentLanguage(language);
  }, [language]);

  const changeLanguageHandler = (language) => {
    const newLanguage = currentLanguage === "en" ? "ja" : "en";
    setCurrentLanguage(newLanguage);

    changeLanguage(language);
    dispatch(languageChangeActions.setLanguage(language));
  };

  return (
    <div className="flex gap-4 items-baseline">
      <Label> {t("change_language")}</Label>
      <Select
        onValueChange={(value) => {
          changeLanguageHandler(value);
        }}
        defaultValue={selectedLanguage}
      >
        <SelectTrigger className="w-[110px]">
          <SelectValue placeholder={t("language")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="ja">日本語</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSwitcher;
