import Layout from "../components/Layout";
import { requiredAuth } from "../utils/ssr";
import useSWR from "swr";
import { fetch } from "../utils/fetch";
import { useRouter } from "next/router";
import Button from "react-bootstrap/Button";
import React, { Component, useState } from "react";
import DatePicker from "react-datepicker";

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

  const [date, setDate] = useState(new Date());
  const handleChange = (date) => setDate(date);

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
        See how you compare to the average person in your city! If you do not
        know a certain field type 0.
      </p>
      <label
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
      ></input>
      <DatePicker
        selected={date}
        onChange={handleChange}
        minDate={pastWeek}
        maxDate={today}
        dateFormat="MMMM d, yyyy"
      />
      <br></br>
      <label
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
      ></input>
      <DatePicker
        selected={date}
        onChange={handleChange}
        minDate={pastWeek}
        maxDate={today}
        dateFormat="MMMM d, yyyy"
      />
      <br></br>
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
      ></input>
      <DatePicker
        selected={date}
        onChange={handleChange}
        minDate={pastWeek}
        maxDate={today}
        dateFormat="MMMM d, yyyy"
      />
      <br></br>
      <br></br>
      <button
        style={{
          marginLeft: "25px",
        }}
        onClick={calculateTotal}
      >
        Calculate my Total
      </button>
      <br></br>
      <br></br>
      <p
        style={{
          marginLeft: "25px",
        }}
      >
        Your total is {total}
      </p>
      <button
        style={{
          marginLeft: "25px",
        }}
        onClick={resetTotal}
      >
        Reset my Total
      </button>
    </Layout>
  );
}

export default PersonalInputPage;
