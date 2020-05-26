import React from "react";
import { select, text, array } from "@storybook/addon-knobs";
import AppNavbar from "../components/AppNavbar";

export default {
  title: "AppNavbar",
  component: AppNavbar,
};

export const loggedOut = () => {
  const names = array(
    "Names",
    [
      "Los Angeles",
      "Goleta",
      "Isla Vista",
      "San Jose",
      "Fremont",
      "Newport Beach",
      "",
      "Cupertino",
      "Santa Barbara",
      "San Diego",
      "Sunnyvale",
    ],
    ","
  );
  return <AppNavbar names={names} />;
};

export const loggedIn = () => {
  const name = text("Name", "Phill Conrad");
  const role = select("Role", ["admin", "student", "guest"], "guest");
  const picture = text(
    "Image URL",
    "https://avatars3.githubusercontent.com/u/1119017"
  );
  const user = { name, role, picture };
  const names = array(
    "Names",
    [
      "Los Angeles",
      "Goleta",
      "Isla Vista",
      "San Jose",
      "Fremont",
      "Newport Beach",
      "",
      "Cupertino",
      "Santa Barbara",
      "San Diego",
      "Sunnyvale",
    ],
    ","
  );
  return <AppNavbar user={user} names={names} />;
};
