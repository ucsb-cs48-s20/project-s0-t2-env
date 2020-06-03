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
  const username = user.name.substring(0, user.name.indexOf(" "));
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
      metric: "mile(s)",
      metric2: "mile(s)",
      action: "drove",
      advice:
        "Try to bike or walk if possible, if not, carpooling or public transportation is usually a good alternative!",
      saved: "saving gas and reducing carbon emissions",
      keep: "decrease the number of miles you drive",
    },
    meatConsumption: {
      value: 1,
      metric: "meal(s) containing meat",
      metric2: "meal(s)",
      action: "ate",
      advice:
        "You can lower your meals with meat by planning ahead what you're going to cook each day!",
      saved: "reducing carbon emissions",
      keep: "reduce the meals you eat containing meat",
    },
    tempApplianceUsage: {
      value: 4,
      metric: "hour(s)",
      metric2: "hour(s)",
      action: "had the AC/heater on for",
      advice: "Remember to turn off appliances when they are no longer needed!",
      saved: "saving electricity",
      keep: "limit the time you have your household appliances on",
    },
    showerTime: {
      value: 8,
      metric: "minute(s)",
      metric2: "minute(s)",
      action: "showered for",
      advice:
        "It can help to set an audible timer to prevent wasting too much water!",
      saved: "saving water",
      keep: "take quick showers",
    },
    screenTime: {
      value: 3,
      metric: "hour(s)",
      metric2: "hour(s)",
      action: "stared at a screen for",
      advice:
        "Try to do some electronic-free activities to relieve your eyes and help the environment!",
      saved: "saving electricity",
      keep: "avoid having electronics on for long periods of time",
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
          You {trueAvg.action} {userAvg} {trueAvg.metric}. You are above the
          average by {userAvg - trueAvg.value} {trueAvg.metric2}.{" "}
          {trueAvg.advice}
        </div>
      );
    }
    if (trueAvg.value > userAvg) {
      return (
        <div style={{ color: "#7ed321" }}>
          You {trueAvg.action} {userAvg} {trueAvg.metric}. You are below the
          average by {trueAvg.value - userAvg} {trueAvg.metric2}. Amazing! Keep
          up the good work in {trueAvg.saved}!
        </div>
      );
    }
    if (trueAvg.value == userAvg) {
      return (
        <div style={{ color: "#f8e71c" }}>
          You {trueAvg.action} {userAvg} {trueAvg.metric}. You are exactly the
          same as the average of {userAvg} {trueAvg.metric2}. Good job! Hope to
          see you continue to {trueAvg.keep}!
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
          height: "850px",
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
            width: "40%",
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
              width: "175px",
            }}
            value={milesDriven}
            onChange={(event) => setMilesDriven(event.target.value)}
            type="number"
            min="0"
            placeholder="0"
            name="milesDriven"
            required
            data-cy="milesdriven"
          ></input>
          <br></br>
          <label htmlFor="meatConsumption">
            <b>Meals eaten containing meat on the day selected:</b>
          </label>
          <br></br>
          <input
            style={{
              marginBottom: "25px",
              width: "175px",
            }}
            value={meatConsumption}
            onChange={(event) => setMeatConsumption(event.target.value)}
            type="number"
            min="0"
            placeholder="0"
            name="meatConsumption"
            required
            data-cy="meatConsumption"
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
              width: "175px",
            }}
            value={tempApplianceUsage}
            onChange={(event) => setTempApplianceUsage(event.target.value)}
            type="number"
            min="0"
            max="24"
            placeholder="0"
            name="tempApplianceUsage"
            required
            data-cy="tempApplianceUsage"
          ></input>
          <br></br>
          <label htmlFor="showerTime">
            <b>Minutes in shower on the day selected:</b>
          </label>
          <br></br>
          <input
            style={{
              marginBottom: "25px",
              width: "175px",
            }}
            value={showerTime}
            onChange={(event) => setShowerTime(event.target.value)}
            type="number"
            min="0"
            max="1440"
            placeholder="0"
            name="showerTime"
            required
            data-cy="showerTime"
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
            min="0"
            max="24"
            style={{
              width: "175px",
            }}
            placeholder="0"
            name="screenTime"
            required
            data-cy="screenTime"
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
          ) && (
            <button onClick={resetTotal} data-cy="reset">
              Reset
            </button>
          )}
        </div>
        <div
          style={{
            width: "60%",
            float: "right",
          }}
        >
          <div
            style={{
              width: "48%",
              float: "left",
            }}
          >
            {milesDriven != "N/A" && (
              <Card data-cy="milesDrivenGraph">
                <CompBarGraph
                  labels={["Average", username]}
                  data={[29, parseFloat(milesDriven)]}
                  title="Mile(s) Driven Per Day"
                />
              </Card>
            )}
            <br></br>
            {meatConsumption != "N/A" && (
              <Card data-cy="mealsEatenGraph">
                <CompBarGraph
                  labels={["Average", username]}
                  data={[1, parseFloat(meatConsumption)]}
                  title="Meal(s) with Meat Eaten Per Day"
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
              <Card data-cy="ACHeaterGraph">
                <CompBarGraph
                  labels={["Average", username]}
                  data={[4, parseFloat(tempApplianceUsage)]}
                  title="Hour(s) Using AC/Heater Per Day"
                />
              </Card>
            )}
            <br></br>
            {showerTime != "N/A" && (
              <Card data-cy="showerGraph">
                <CompBarGraph
                  labels={["Average", username]}
                  data={[8, parseFloat(showerTime)]}
                  title="Minute(s) In Shower Per Day"
                />
              </Card>
            )}
            <br></br>
            {screenTime != "N/A" && (
              <Card data-cy="screenGraph">
                <CompBarGraph
                  labels={["Average", username]}
                  data={[3, parseFloat(screenTime)]}
                  title="Hour(s) of Screen Time Per Day"
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
