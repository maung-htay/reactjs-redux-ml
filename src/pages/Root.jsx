import React, { useEffect } from "react";
import MainNavigation from "../components/MainNavigation.jsx";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const RootLayout = () => {
  const { i18n } = useTranslation();
  const language = useSelector((state) => state.languageChange.language);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
