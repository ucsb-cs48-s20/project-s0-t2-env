import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import { Card, Button } from "react-bootstrap";

var averageColor,
  averageBorderColor,
  averageHoverColor,
  averageHoverBorderColor,
  goodColor,
  goodBorderColor,
  goodHoverColor,
  goodHoverBorderColor,
  sameColor,
  sameBorderColor,
  sameHoverColor,
  sameHoverBorderColor,
  badColor,
  badBorderColor,
  badHoverColor,
  badHoverBorderColor,
  userColor,
  userBorderColor,
  userHoverColor,
  userHoverBorderColor;

export default class CompBarGraph extends Component {
  static getDerivedStateFromProps(props, state) {
    averageColor = "#40acff";
    averageBorderColor = "#00518f";
    averageHoverColor = "#0f73bf";
    averageHoverBorderColor = "#63bbff";
    goodColor = "#7ed321";
    goodBorderColor = "green";
    goodHoverColor = "#bfffa6";
    goodHoverBorderColor = "#48ff00";
    sameColor = "#f8e71c";
    sameBorderColor = "#f5cf00";
    sameHoverColor = "#ffff96";
    sameHoverBorderColor = "#ffef96";
    badColor = "#d00202";
    badBorderColor = "#850000";
    badHoverColor = "#ff3d74";
    badHoverBorderColor = "#ffabca";
    if (props.data[0] < props.data[1]) {
      userColor = badColor;
      userBorderColor = badBorderColor;
      userHoverColor = badHoverColor;
      userHoverBorderColor = badHoverBorderColor;
    } else if (props.data[0] == props.data[1]) {
      userColor = sameColor;
      userBorderColor = sameBorderColor;
      userHoverColor = sameHoverColor;
      userHoverBorderColor = sameHoverBorderColor;
    } else {
      userColor = goodColor;
      userBorderColor = goodBorderColor;
      userHoverColor = goodHoverColor;
      userHoverBorderColor = goodHoverBorderColor;
    }
    return {
      labels: props.labels,
      datasets: [
        {
          label: props.title,
          backgroundColor: [averageColor, userColor],
          borderColor: [averageBorderColor, userBorderColor],
          borderWidth: 2,
          hoverBackgroundColor: [averageHoverColor, userHoverColor],
          hoverBorderColor: [averageHoverBorderColor, userHoverBorderColor],
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
          width={1000}
          height={500}
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
