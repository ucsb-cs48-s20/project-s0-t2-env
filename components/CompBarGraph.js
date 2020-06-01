import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import { Card, Button } from "react-bootstrap";

var cbkColor = "rgba(238,130,238,0.2)";
var cboColor = "rgba(238,130,238,1)";
var chbkColor = "rgba(238,130,238,0.4)";
var chboColor = "rgba(238,130,238,1)";
var bkColor,
  boColor,
  hbkColor,
  hboColor,
  ibkColor,
  iboColor,
  ihbkColor,
  ihboColor;

export default class CompBarGraph extends Component {
  static getDerivedStateFromProps(props, state) {
    ibkColor = "rgba(0,0,255,0.2)";
    iboColor = "rgba(0,0,255,1)";
    ihbkColor = "rgba(0,0,255,0.4)";
    ihboColor = "rgba(0,0,255,1)";
    bkColor = "rgba(0,255,0,0.2)";
    boColor = "rgba(0,255,0,1)";
    hbkColor = "rgba(0,255,0,0.4)";
    hboColor = "rgba(0,255,0,1)";
    return {
      labels: props.labels,
      datasets: [
        {
          label: props.title,
          backgroundColor: [
            ibkColor,
            bkColor,
            cbkColor,
            cbkColor,
            cbkColor,
            cbkColor,
            cbkColor,
          ],
          borderColor: [
            iboColor,
            boColor,
            cboColor,
            cboColor,
            cboColor,
            cboColor,
            cboColor,
          ],
          borderWidth: 1,
          hoverBackgroundColor: [
            ihbkColor,
            hbkColor,
            chbkColor,
            chbkColor,
            chbkColor,
            chbkColor,
          ],
          hoverBorderColor: [
            ihboColor,
            hboColor,
            chboColor,
            chboColor,
            chboColor,
            chboColor,
          ],
          data: props.data,
        },
      ],
    };
  }

  render() {
    return (
      <div>
        <Bar
          id="bar-graph"
          data={this.state}
          width={100}
          height={50}
          options={{
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          }}
        />
      </div>
    );
  }
}