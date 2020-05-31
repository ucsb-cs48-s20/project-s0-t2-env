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
  const [milesDriven, setMilesDriven] = useState("N/A");
  const [meatConsumption, setMeatConsumption] = useState("N/A");
  const [tempApplianceUsage, setTempApplianceUsage] = useState("N/A");
  const [showerTime, setShowerTime] = useState("N/A");
  const [screenTime, setScreenTime] = useState("N/A");
  const [total, setTotal] = useState(0);
  const [info, setInfo] = useState("");
  var miles = "";
  var meat = "";
  var tempAppliance = "";
  var shower = "";
  var screen = "";

  /*const calculateTotal = () => {
    setTotal(
      parseFloat(milesDriven) +
        parseFloat(meatConsumption) +
        parseFloat(tempApplianceUsage)
    );
  };*/

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

  // const [date2, setDate2] = useState(new Date());
  // const handleChange2 = (date2) => setDate2(date2);

  // const [date3, setDate3] = useState(new Date());
  // const handleChange3 = (date3) => setDate3(date3);

  // const [date4, setDate4] = useState(new Date());
  // const handleChange4 = (date4) => setDate4(date4);

  // const [date5, setDate5] = useState(new Date());
  // const handleChange5 = (date5) => setDate5(date5);

  const today = new Date();
  let pastWeek = new Date();
  pastWeek.setDate(pastWeek.getDate() - 6);

  const getInfo = () => {
    if (milesDriven > 29) {
      miles =
        "MORE than the average by " + parseInt(milesDriven - 29) + " mile(s).";
    }
    if (milesDriven == 29) {
      miles = "exactly the average number of miles a person drives a day.";
    }
    if (milesDriven < 29) {
      miles =
        "LESS than the average by " + parseInt(29 - milesDriven) + "mile(s).";
    }
    if (meatConsumption > 1) {
      meat =
        "MORE than the average by " +
        parseInt(meatConsumption - 1) +
        " meal(s).";
    }
    if (meatConsumption == 1) {
      meat =
        "exactly the average number of meals containing meat daily consumed.";
    }
    if (meatConsumption < 1) {
      meat =
        "LESS than the average by " +
        parseInt(1 - meatConsumption) +
        " meal(s).";
    }
    if (tempApplianceUsage > 4) {
      tempAppliance =
        "MORE than the average by " +
        parseInt(tempApplianceUsage - 4) +
        " hour(s).";
    }
    if (tempApplianceUsage == 4) {
      tempAppliance =
        "exactly the average number of hours of daily temperature appliance usage. ";
    }
    if (tempApplianceUsage < 4) {
      tempAppliance =
        "LESS than the average by " +
        parseInt(4 - tempApplianceUsage) +
        " hour(s).";
    }
    if (showerTime > 8) {
      shower =
        "MORE than the average minutes in the shower by " +
        parseInt(showerTime - 8) +
        " minute(s).";
    }
    if (showerTime == 8) {
      shower = "exactly the average number of minutes in the shower daily. ";
    }
    if (showerTime < 8) {
      shower =
        "LESS than the average by " + parseInt(8 - showerTime) + " minute(s).";
    }
    if (screenTime > 3) {
      screen =
        "MORE than the average by " + parseInt(screenTime - 3) + " hour(s).";
    }
    if (screenTime == 3) {
      screen = "exactly the average number of daily hours of screen time. ";
    }
    if (screenTime < 3) {
      screen =
        "LESS than the average by " + parseInt(3 - screenTime) + " hour(s).";
    }

    setInfo(
      info +
        "On " +
        date1.toUTCString().substring(0, date1.toUTCString().indexOf(":") - 3) +
        ", " +
        user.name +
        " drove " +
        parseFloat(milesDriven) +
        " mile(s). Which is " +
        miles +
        "\n" +
        "On " +
        date1.toUTCString().substring(0, date1.toUTCString().indexOf(":") - 3) +
        ", " +
        user.name +
        " ate " +
        parseFloat(meatConsumption) +
        " meal(s) containing meat. Which is " +
        meat +
        "\n" +
        "On " +
        date1.toUTCString().substring(0, date1.toUTCString().indexOf(":") - 3) +
        ", " +
        user.name +
        " had the air-conditioning or heater on for " +
        parseFloat(tempApplianceUsage) +
        " hour(s). Which is " +
        tempAppliance +
        "\n" +
        "On " +
        date1.toUTCString().substring(0, date1.toUTCString().indexOf(":") - 3) +
        ", " +
        user.name +
        " took a shower for " +
        parseFloat(showerTime) +
        " minute(s). Which is " +
        shower +
        "\n" +
        "On " +
        date1.toUTCString().substring(0, date1.toUTCString().indexOf(":") - 3) +
        ", " +
        user.name +
        " had a total screen time of " +
        parseFloat(screenTime) +
        " hour(s). Which is " +
        screen +
        "\n" +
        "----------------------------------------------------------------------------------------------------------------------------------------------------------------------" +
        "\n"
    );
  };

  /*function compareMiles () {
    if(parseFloat(milesDriven)>29.2){
       miles=("more than the average by " + parseFloat(milesDriven)-29.2 + " miles.");
    }
    else{
       miles=("less than the average by " + 29.2-parseFloat(milesDriven) + "miles.");
    }
    return miles;
  }*/

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
        src="https://blog.derby.ac.uk/wp-content/uploads/2017/01/Blog-800x450px-1.png"
        width="700"
        height="300"
        align="right"
        className="mt-5"
        fliud
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

/*
return (
    <Layout user={user}>
      <p
        style={{
          fontSize: "20px",
          margin: "25px",
        }}
      >
        See how you compare to the average person in your city!
      </p>
      <center>
      <Test
      onOptionSelect={(selectedOptions) => console.log(selectedOptions)}
    >
      <QuestionGroup questionNumber={0}>
        <Question>How many miles do you drive each week?</Question>
        <Option value="0">None!</Option>
        <Option value="1">Less than 50</Option>
        <Option value="2">Less than 100</Option>
        <Option value="3">More than 100 :(</Option>
      </QuestionGroup>
    </Test>

    <DatePicker
      selected={date1}
      onChange={handleChange1}
      minDate={pastWeek}
      maxDate={today}
      dateFormat="MMMM d, yyyy"
    />
    {}
    <br></br>
    <br></br>
    <Test
      onOptionSelect={(selectedOptions) => console.log(selectedOptions)}
    >
      <QuestionGroup questionNumber={1}>
        <Question>What's your car's MPG?</Question>
        <Option value="0">N/A</Option>
        <Option value="1">Less than 12 MPG</Option>
        <Option value="2">Less than 20 MPG</Option>
        <Option value="3">More than 20 MPG</Option>
      </QuestionGroup>
    </Test>

    <DatePicker
      selected={date2}
      onChange={handleChange2}
      minDate={pastWeek}
      maxDate={today}
      dateFormat="MMMM d, yyyy"
    />
    {}
    <br></br>
    <br></br>
    <Test
      onOptionSelect={(selectedOptions) => console.log(selectedOptions)}
    >
      <QuestionGroup questionNumber={2}>
        <Question>How often do you eat meat?</Question>
        <Option value="0">Never</Option>
        <Option value="1">Less than once a week</Option>
        <Option value="2">A few times a week</Option>
        <Option value="3">All the time</Option>
      </QuestionGroup>
    </Test>
    <DatePicker
      selected={date3}
      onChange={handleChange3}
      minDate={pastWeek}
      maxDate={today}
      dateFormat="MMMM d, yyyy"
    />
    <br></br>
    <br></br>
    <Test
      onOptionSelect={(selectedOptions) => console.log(selectedOptions)}
    >
      <QuestionGroup questionNumber={3}>
        <Question>How often do you run air-conditioning?</Question>
        <Option value="0">Never</Option>
        <Option value="1">Seldomly</Option>
        <Option value="2">Often</Option>
        <Option value="3">All the time</Option>
      </QuestionGroup>
    </Test>

    <DatePicker
      selected={date4}
      onChange={handleChange4}
      minDate={pastWeek}
      maxDate={today}
      dateFormat="MMMM d, yyyy"
    />
    <br></br>
    <br></br>
    <Test
      onOptionSelect={(selectedOptions) => console.log(selectedOptions)}
    >
      <QuestionGroup questionNumber={1}>
        <Question>How often do you fly?</Question>
        <Option value="0">Never</Option>
        <Option value="1">Less than once a year</Option>
        <Option value="2">A few times a year</Option>
        <Option value="3">Frequently</Option>
      </QuestionGroup>
    </Test>

    <DatePicker
      selected={date5}
      onChange={handleChange5}
      minDate={pastWeek}
      maxDate={today}
      dateFormat="MMMM d, yyyy"
    />
  </center>
  <br></br>
  <br></br>
  <center>
    <button
      style={{
        marginLeft: "25px",
      }}
      onClick={calculateTotal}
    >
      Submit!
    </button>
  </center>
  <br></br>
  <br></br>
  <p
    style={{
      marginLeft: "25px",
    }}
  >
    You did great! Our team is currently working on analyzing your data, but
    remember there are always ways to improve your impact!
  </p>
  <center>
    <button
      style={{
        marginLeft: "25px",
      }}
      onClick={resetTotal}
    >
      Reset my Quiz!
    </button>
  </center>
</Layout>
);
}
*/
