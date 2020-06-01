import Layout from "../components/Layout";
import { requiredAuth } from "../utils/ssr";
import useSWR from "swr";
import { fetch } from "../utils/fetch";
import { useRouter } from "next/router";
import Button from "react-bootstrap/Button";
import React, { Component, useState } from "react";
import DatePicker from "react-datepicker";
import { Test, QuestionGroup, Question, Option } from "react-multiple-choice";
import CompBarGraph from "../components/CompBarGraph";
import { Card, Image } from "react-bootstrap";

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

  const resetTotal = () => {
    setTotal(0);
    setMilesDriven("N/A");
    setMeatConsumption("N/A");
    setTempApplianceUsage("N/A");
    setShowerTime("N/A");
    setScreenTime("N/A");
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
      <div
        style={{
          margin: "25px",
          height: "800px",
        }}
      >
        {/* <Image
          src="https://i.pinimg.com/originals/dd/56/f4/dd56f428a0c5fda79f60aba5bda482a2.jpg"
          width="400"
          height="700"
          align="right"
          style={{
            marginTop: "100px",
            marginRight: "25px",
          }}
        /> */}
        <div
          style={{
            width: "750px",
            float: "left",
          }}
        >
          <label htmlFor="dateSelect">
            <b>Please select a date:</b>
          </label>
          <br></br>
          <DatePicker
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
            }}
          >
            <b>Miles driven on the day selected:</b>
          </label>
          <br></br>
          <input
            style={{
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
          <label htmlFor="meatConsumption">
            <b>Meals eaten containing meat on the day selected:</b>
          </label>
          <br></br>
          <input
            style={{
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
          <label htmlFor="tempApplianceUsage">
            <b>
              Hours air-conditioning or heater was used on the day selected:
            </b>
          </label>
          <br></br>
          <input
            style={{
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
          <label htmlFor="showerTime">
            <b>Minutes in shower on the day selected:</b>
          </label>
          <br></br>
          <input
            style={{
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
          <label htmlFor="screenTime">
            <b>Hours in front of a screen on the day selected:</b>
          </label>
          <br></br>
          <input
            value={screenTime}
            onChange={(event) => setScreenTime(event.target.value)}
            type="number"
            placeholder="0"
            name="screenTime"
            required
          ></input>
          <br></br>
          <br></br>
          {!(
            milesDriven == "N/A" &&
            meatConsumption == "N/A" &&
            tempApplianceUsage == "N/A" &&
            showerTime == "N/A" &&
            screenTime == "N/A"
          ) && (
            <p
              style={{
                whiteSpace: "pre-line",
              }}
            >
              Log (last updated {today.toLocaleString()}):
              <br></br>
              On {date1.toDateString()}:{totalHTML}
              <br></br>
            </p>
          )}
          {!(
            milesDriven == "N/A" &&
            meatConsumption == "N/A" &&
            tempApplianceUsage == "N/A" &&
            showerTime == "N/A" &&
            screenTime == "N/A"
          ) && <button onClick={resetTotal}>Reset</button>}
        </div>
        <div
          style={{
            marginLeft: "775px",
          }}
        >
          <div
            style={{
              width: "48%",
              float: "left",
            }}
          >
            {milesDriven != "N/A" && (
              <Card>
                <CompBarGraph
                  labels={["Average", "Yours"]}
                  data={[29, parseFloat(milesDriven)]}
                  title="Miles Driven Per Day"
                />
              </Card>
            )}
            <br></br>
            {meatConsumption != "N/A" && (
              <Card>
                <CompBarGraph
                  labels={["Average", "Yours"]}
                  data={[1, parseFloat(meatConsumption)]}
                  title="Meals with Meat Eaten Per Day"
                />
              </Card>
            )}
          </div>
          <div
            style={{
              width: "48%",
              float: "right",
            }}
          >
            {tempApplianceUsage != "N/A" && (
              <Card>
                <CompBarGraph
                  labels={["Average", "Yours"]}
                  data={[4, parseFloat(tempApplianceUsage)]}
                  title="Hours Using AC/Heater Per Day"
                />
              </Card>
            )}
            <br></br>
            {showerTime != "N/A" && (
              <Card>
                <CompBarGraph
                  labels={["Average", "Yours"]}
                  data={[8, parseFloat(showerTime)]}
                  title="Minutes In Shower Per Day"
                />
              </Card>
            )}
            <br></br>
            {screenTime != "N/A" && (
              <Card>
                <CompBarGraph
                  labels={["Average", "Yours"]}
                  data={[3, parseFloat(screenTime)]}
                  title="Hourse of Screen Time Per Day"
                />
              </Card>
            )}
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
    </Layout>
  );
}
export default PersonalInputPage;
