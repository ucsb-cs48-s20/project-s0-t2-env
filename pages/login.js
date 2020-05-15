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
      <DatePicker
        selected={date}
        onChange={handleChange}
        minDate={pastWeek}
        maxDate={today}
        showTimeSelect
        dateFormat="MMMM d, yyyy"
      />
      <p
        style={{
          fontSize: "20px",
          margin: "10px",
        }}
      >
        See how you compare to the average person in your city! If you do not
        know a certain field type 0.
      </p>
      <label htmlFor="electricity">
        <b>Enter your monthly electricity bill</b>
      </label>
      <br></br>
      <input
        value={electricity}
        onChange={(event) => setElectricity(event.target.value)}
        type="number"
        placeholder="00.00"
        name="electricity"
        required
      ></input>
      <br></br>
      <label htmlFor="gas">
        <b>Enter your monthly gas mileage</b>
      </label>
      <br></br>
      <input
        value={gas}
        onChange={(event) => setGas(event.target.value)}
        type="number"
        placeholder="00.00"
        name="gas"
        required
      ></input>
      <br></br>
      <label htmlFor="water">
        <b>Enter your monthly water bill</b>
      </label>
      <br></br>
      <input
        value={water}
        onChange={(event) => setWater(event.target.value)}
        type="number"
        placeholder="00.00"
        name="water"
        required
      ></input>
      <br></br>
      <br></br>
      <button onClick={calculateTotal}>Calculate my Total</button>
      <br></br>
      <br></br>
      <p>You're total is {total}</p>
      <button onClick={resetTotal}>Reset my Total</button>
    </Layout>
  );
}

export default PersonalInputPage;
