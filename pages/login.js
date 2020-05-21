import Layout from "../components/Layout";
import { requiredAuth } from "../utils/ssr";
import useSWR from "swr";
import { fetch } from "../utils/fetch";
import { useRouter } from "next/router";
import Button from "react-bootstrap/Button";
import React, { Component, useState } from "react";
import DatePicker from "react-datepicker";
import { Test, QuestionGroup, Question, Option } from "react-multiple-choice";

export const getServerSideProps = requiredAuth;

function PersonalInputPage(props) {
  const user = props.user;
  // const [username, setUsername] = useState(props.user.nickname); for future storing of data per user?
  const [milesDriven, setMilesDriven] = useState("N/A");
  const [meatConsumption, setMeatConsumption] = useState("N/A");
  const [tempApplianceUsage, setTempApplianceUsage] = useState("N/A");
  const [total, setTotal] = useState(0);
  const [info, setInfo] = useState("");

  const calculateTotal = () => {
    setTotal(
      parseFloat(milesDriven) +
        parseFloat(meatConsumption) +
        parseFloat(tempApplianceUsage)
    );
  };
  const resetTotal = () => {
    setTotal(0);
    setMilesDriven(0);
    setMeatConsumption(0);
    setTempApplianceUsage(0);
  };

  const [date1, setDate1] = useState(new Date());
  const handleChange1 = (date1) => setDate1(date1);

  const [date2, setDate2] = useState(new Date());
  const handleChange2 = (date2) => setDate2(date2);

  const [date3, setDate3] = useState(new Date());
  const handleChange3 = (date3) => setDate3(date3);

  const [date4, setDate4] = useState(new Date());
  const handleChange4 = (date4) => setDate4(date4);

  const [date5, setDate5] = useState(new Date());
  const handleChange5 = (date5) => setDate5(date5);

  const today = new Date();
  let pastWeek = new Date();
  pastWeek.setDate(pastWeek.getDate() - 6);

  const getInfo = () => {
    setInfo(
      info +
        "On " +
        date1.toUTCString().substring(0, date1.toUTCString().indexOf(":") - 3) +
        ", " +
        user.name +
        " drove " +
        parseFloat(milesDriven) +
        " miles." +
        "\n" +
        "On " +
        date2.toUTCString().substring(0, date2.toUTCString().indexOf(":") - 3) +
        ", " +
        user.name +
        " ate " +
        parseFloat(meatConsumption) +
        " meals containing meat." +
        "\n" +
        "On " +
        date3.toUTCString().substring(0, date3.toUTCString().indexOf(":") - 3) +
        ", " +
        user.name +
        " had the air-conditioning or heater on for " +
        parseFloat(tempApplianceUsage) +
        " hours.\n"
    );
  };

  const resetInfo = () => {
    setInfo("");
  };

  return (
    <Layout user={user}>
      <p
        style={{
          fontSize: "20px",
          margin: "25px",
        }}
      >
        See how you compare to the average person in your city! If you do not
        know a certain field type 0.
      </p>
      <label
        htmlFor="milesDriven"
        style={{
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
        placeholder="00.00"
        name="milesDriven"
        required
      ></input>
      <DatePicker
        selected={date1}
        onChange={handleChange1}
        minDate={pastWeek}
        maxDate={today}
        dateFormat="MMMM d, yyyy"
      />
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
        placeholder="00.00"
        name="meatConsumption"
        required
      ></input>
      <DatePicker
        selected={date2}
        onChange={handleChange2}
        minDate={pastWeek}
        maxDate={today}
        dateFormat="MMMM d, yyyy"
      />
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
        }}
        value={tempApplianceUsage}
        onChange={(event) => setTempApplianceUsage(event.target.value)}
        type="number"
        placeholder="00.00"
        name="tempApplianceUsage"
        required
      ></input>
      <DatePicker
        selected={date3}
        onChange={handleChange3}
        minDate={pastWeek}
        maxDate={today}
        dateFormat="MMMM d, yyyy"
      />

      <br></br>
      <br></br>
      {milesDriven >= 0 &&
        meatConsumption >= 0 &&
        tempApplianceUsage >= 0 &&
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
          </p>
        )}
      {info.length > 0 && (
        <button
          style={{
            marginLeft: "25px",
          }}
          onClick={resetInfo}
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
