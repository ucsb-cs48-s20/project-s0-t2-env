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
  const [electricity, setElectricity] = useState("");
  const [gas, setGas] = useState("");
  const [water, setWater] = useState("");
  const [total, setTotal] = useState(0);
  const calculateTotal = () => {
    setTotal(parseFloat(electricity) + parseFloat(gas) + parseFloat(water));
  };
  const resetTotal = () => {
    setTotal(0);
    setElectricity(0);
    setGas(0);
    setWater(0);
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
        {/* <label
        htmlFor="electricity"
        style={{
          marginLeft: "25px",
        }}
      >
        <b>Enter your monthly electricity bill</b>
      </label>
      <br></br>
      <input
        style={{
          marginLeft: "25px",
          marginRight: "25px",
          marginBottom: "25px",
        }}
        value={electricity}
        onChange={(event) => setElectricity(event.target.value)}
        type="number"
        placeholder="00.00"
        name="electricity"
        required
      ></input> */}
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
        {/* <label
        htmlFor="gas"
        style={{
          marginLeft: "25px",
        }}
      >
        <b>Enter your monthly gas mileage</b>
      </label>
      <br></br>
      <input
        style={{
          marginLeft: "25px",
          marginRight: "25px",
          marginBottom: "25px",
        }}
        value={gas}
        onChange={(event) => setGas(event.target.value)}
        type="number"
        placeholder="00.00"
        name="gas"
        required
      ></input> */}

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
        {/* <br></br>
      <label
        htmlFor="water"
        style={{
          marginLeft: "25px",
        }}
      >
        <b>Enter your monthly water bill</b>
      </label>
      <br></br>
      <input
        style={{
          marginLeft: "25px",
          marginRight: "25px",
        }}
        value={water}
        onChange={(event) => setWater(event.target.value)}
        type="number"
        placeholder="00.00"
        name="water"
        required
      ></input> */}
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

export default PersonalInputPage;
