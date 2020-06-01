import Layout from "../components/Layout";
import { requiredAuth } from "../utils/ssr";
import useSWR from "swr";
import { fetch } from "../utils/fetch";
import { useRouter } from "next/router";
import Button from "react-bootstrap/Button";
import React, { Component, useState } from "react";
import DatePicker from "react-datepicker";
import { Test, QuestionGroup, Question, Option } from "react-multiple-choice";
import Image from "react-bootstrap/Image";

export const getServerSideProps = requiredAuth;

function PersonalInputPage(props) {
  const user = props.user;
  const { data: names } = useSWR("/api/cities/all", fetch, {});
  // const [username, setUsername] = useState(props.user.nickname); for future storing of data per user?
  let [milesDriven, setMilesDriven] = useState("N/A");
  let [meatConsumption, setMeatConsumption] = useState("N/A");
  let [tempApplianceUsage, setTempApplianceUsage] = useState("N/A");
  let [showerTime, setShowerTime] = useState("N/A");
  let [screenTime, setScreenTime] = useState("N/A");
  const [total, setTotal] = useState(0);
  const [info, setInfo] = useState("");

  const resetTotal = () => {
    setTotal(0);
    setMilesDriven("N/A");
    setMeatConsumption("N/A");
    setTempApplianceUsage("N/A");
    setShowerTime("N/A");
    setScreenTime("N/A");
    setInfo("");
  };

  const [date1, setDate1] = useState(new Date());
  const handleChange1 = (date1) => setDate1(date1);

  const today = new Date();
  let pastWeek = new Date();
  pastWeek.setDate(pastWeek.getDate() - 6);

  let averages = {
    milesDriven: {
      value: 29,
      metric: "mile(s) driven ",
    },
    meatConsumption: {
      value: 1,
      metric: "meal(s) with meat eaten ",
    },
    tempApplianceUsage: {
      value: 4,
      metric: "hour(s) of heater/AC usage ",
    },
    showerTime: {
      value: 8,
      metric: "minute(s) in the shower ",
    },
    screenTime: {
      value: 3,
      metric: "hour(s) in front of screen ",
    },
  };
  let userAverages = {
    milesDriven,
    meatConsumption,
    tempApplianceUsage,
    showerTime,
    screenTime,
  };

  let keys = Object.keys(userAverages);

  const getInfo = () => {
    setInfo(
      info +
        "On " +
        // date1.toUTCString().substring(0, date1.toUTCString().indexOf(":") - 3) +
        date1.toDateString() +
        ": \n"
    );
  };

  let totalHTML = keys.map((key) => {
    let trueAvg = averages[key];
    let userAvg = userAverages[key];
    if (trueAvg.value < userAvg) {
      return (
        <div style={{ color: "#d00202" }}>
          Your entered value: {userAvg}. You are above the average by{" "}
          {userAvg - trueAvg.value} {trueAvg.metric} daily.
        </div>
      );
    }
    if (trueAvg.value > userAvg) {
      return (
        <div style={{ color: "#7ed321" }}>
          Your entered value: {userAvg}. You are below the average by{" "}
          {trueAvg.value - userAvg} {trueAvg.metric} daily.
        </div>
      );
    }
    if (trueAvg.value == userAvg) {
      return (
        <div style={{ color: "#f8e71c" }}>
          Your entered value: {userAvg}. You are exactly the same as the average
          of {userAvg} {trueAvg.metric} daily.
        </div>
      );
    }
  });

  const resetInfo = () => {
    setInfo("");
  };

  return (
    <Layout
      user={user}
      names={names}
      onChange={(event, newValue) => {
        if (newValue != null) {
          window.location.href = "/cities/" + newValue;
        }
      }}
    >
      <Image
        src="https://i.pinimg.com/originals/dd/56/f4/dd56f428a0c5fda79f60aba5bda482a2.jpg"
        width="400"
        height="700"
        align="right"
        style={{
          marginTop: "100px",
          marginRight: "25px",
        }}
      />
      <p
        style={{
          fontSize: "20px",
          margin: "25px",
          className: "mr-auto",
        }}
      >
        See how you compare to the average person in your city! If you do not
        know a certain field type 0. Please approximate your values to the
        nearest whole number.
      </p>
      <label
        htmlFor="dateSelect"
        style={{
          marginLeft: "25px",
        }}
      >
        <b>Please select a date:</b>
      </label>
      <br></br>
      <DatePicker
        className="ml-4"
        selected={date1}
        onChange={handleChange1}
        minDate={pastWeek}
        maxDate={today}
        dateFormat="MMMM d, yyyy"
      />
      <br></br>
      <label
        htmlFor="milesDriven"
        style={{
          marginTop: "25px",
          marginLeft: "25px",
        }}
      >
        <b>Miles driven on the day selected:</b>
      </label>
      <br></br>
      <input
        style={{
          marginLeft: "25px",
          marginRight: "25px",
          marginBottom: "25px",
        }}
        value={milesDriven}
        onChange={(event) => setMilesDriven(event.target.value)}
        type="number"
        placeholder="0"
        name="milesDriven"
        required
      ></input>
      <br></br>
      <label
        htmlFor="meatConsumption"
        style={{
          marginLeft: "25px",
        }}
      >
        <b>Meals eaten containing meat on the day selected:</b>
      </label>
      <br></br>
      <input
        style={{
          marginLeft: "25px",
          marginRight: "25px",
          marginBottom: "25px",
        }}
        value={meatConsumption}
        onChange={(event) => setMeatConsumption(event.target.value)}
        type="number"
        placeholder="0"
        name="meatConsumption"
        required
      ></input>
      <br></br>
      <label
        htmlFor="tempApplianceUsage"
        style={{
          marginLeft: "25px",
        }}
      >
        <b>Hours air-conditioning or heater was used on the day selected:</b>
      </label>
      <br></br>
      <input
        style={{
          marginLeft: "25px",
          marginRight: "25px",
          marginBottom: "25px",
        }}
        value={tempApplianceUsage}
        onChange={(event) => setTempApplianceUsage(event.target.value)}
        type="number"
        placeholder="0"
        name="tempApplianceUsage"
        required
      ></input>
      <br></br>
      <label
        htmlFor="showerTime"
        style={{
          marginLeft: "25px",
        }}
      >
        <b>Minutes in shower on the day selected:</b>
      </label>
      <br></br>
      <input
        style={{
          marginLeft: "25px",
          marginRight: "25px",
          marginBottom: "25px",
        }}
        value={showerTime}
        onChange={(event) => setShowerTime(event.target.value)}
        type="number"
        placeholder="0"
        name="showerTime"
        required
      ></input>
      <br></br>
      <label
        htmlFor="screenTime"
        style={{
          marginLeft: "25px",
        }}
      >
        <b>Hours in front of a screen on the day selected:</b>
      </label>
      <br></br>
      <input
        style={{
          marginLeft: "25px",
          marginRight: "25px",
        }}
        value={screenTime}
        onChange={(event) => setScreenTime(event.target.value)}
        type="number"
        placeholder="0"
        name="screenTime"
        required
      ></input>

      <br></br>
      <br></br>
      {milesDriven >= 0 &&
        meatConsumption >= 0 &&
        tempApplianceUsage >= 0 &&
        showerTime >= 0 &&
        screenTime >= 0 &&
        info.length <= 0 && (
          <button
            style={{
              marginLeft: "25px",
            }}
            onClick={getInfo}
          >
            View My Information
          </button>
        )}
      {info.length > 0 && (
        <button
          style={{
            marginLeft: "25px",
          }}
          onClick={getInfo}
        >
          Update My Information
        </button>
      )}
      <br></br>
      <br></br>
      {milesDriven >= 0 &&
        meatConsumption >= 0 &&
        tempApplianceUsage >= 0 &&
        showerTime >= 0 &&
        screenTime >= 0 &&
        info.length > 0 && (
          <p
            style={{
              marginLeft: "25px",
              whiteSpace: "pre-line",
            }}
          >
            Log (last updated {today.toLocaleString()}):
            <br></br>
            {info}
            {totalHTML}
            <br></br>
          </p>
        )}
      {info.length > 0 && (
        <button
          style={{
            marginLeft: "25px",
          }}
          onClick={resetTotal}
        >
          Clear My Information
        </button>
      )}
      <br></br>
      <br></br>
    </Layout>
  );
}
export default PersonalInputPage;
