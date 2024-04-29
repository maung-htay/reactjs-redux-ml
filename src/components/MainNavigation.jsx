import React from "react";
import LanguageSwitcher from "./LanguageSwitcher.jsx";
import { NavLink } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import { useTranslation } from "react-i18next";

const MainNavigation = () => {
  const { t } = useTranslation();

  return (
    <header className="px-10 py-2 h-14 bg-blue-500">
      <nav className="flex items-center justify-between">
        <div className="flex gap-3">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-white underline dark:text-black" : undefined
            }
          >
            {t("home_page")}
          </NavLink>
          <NavLink
            to="/ticket"
            className={({ isActive }) =>
              isActive ? "text-white underline dark:text-black" : undefined
            }
          >
            {t("ticket_page")}
          </NavLink>
        </div>
        <div className="flex gap-3 items-center">
          {/* <LanguageSwitcher /> */}
          <ModeToggle />
          <NavLink
            to="/setting"
            className={({ isActive }) =>
              isActive ? "text-white underline dark:text-black" : undefined
            }
          >
            {t("setting")}
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default MainNavigation;
