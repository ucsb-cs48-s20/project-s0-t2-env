import React from "react";
import Layout from "../components/Layout";
import Container from "react-bootstrap/Container";
import { select, text, array } from "@storybook/addon-knobs";

export default {
  title: "Layout",
  component: Layout,
};

export const loggedOutEmpty = () => {
  const names = array(
    "Names",
    [
      "Los Angeles",
      "Goleta",
      "Isla Vista",
      "San Jose",
      "Fremont",
      "Newport Beach",
      "Irvine",
      "Cupertino",
      "Santa Barbara",
      "San Diego",
      "Sunnyvale",
    ],
    ","
  );
  return <Layout names={names} onChange={(event, newValue) => {}} />;
};

export const loggedInWithContentInContainer = () => {
  const content = text("Sample Content", "This is sample content");
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
      "Irvine",
      "Cupertino",
      "Santa Barbara",
      "San Diego",
      "Sunnyvale",
    ],
    ","
  );
  return (
    <Layout user={user} names={names} onChange={(event, newValue) => {}}>
      <Container className="py-3">{content}</Container>
    </Layout>
  );
};
