import logo from "./logo.svg";
import "./App.css";
import { useEffect, useRef } from "react";
import * as d3 from "d3";

function App() {
  const data = [
    { name: "Medellín", index2005: 3, index2006: 33 },
    { name: "Cali", index2005: 39, index2006: 45 },
    { name: "Bogotá", index2005: 7, index2006: 31 },
    { name: "Pereira", index2005: 35, index2006: 36 },
    { name: "Bucaramanga", index2005: 16, index2006: 23 },
    { name: "Cúcuta", index2005: 45, index2006: 45 },
    { name: "Armenia", index2005: 6, index2006: 16 },
  ];

  const width = 700;
  const height = 500;
  const margin = { top: 10, left: 50, bottom: 40, right: 10 };
  const iwidth = width - margin.left - margin.right;
  const iheight = height - margin.top - margin.bottom;

  const canvas = useRef();
  const data2005 = useRef();
  const data2006 = useRef();

  const drawChart = () => {
    const svg = d3
      .select(canvas.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    let g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    const y = d3.scaleLinear().domain([0, 45]).range([iheight, 0]);
    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .range([0, iwidth])
      .padding(0.1);
    g.append("g")
      .classed("x--axis", true)
      .call(d3.axisBottom(x))
      .attr("transform", `translate(0, ${iheight})`);
    g.append("g").classed("y--axis", true).call(d3.axisLeft(y));

    const bars = g
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .style("fill", "steelblue")
      .attr("x", (d) => x(d.name))
      .attr("width", x.bandwidth())
      .attr("y", (d) => iheight)
      .attr("height", (d) => 0);

    d3.select(data2005.current).on("click", () => {
      bars
        .transition()
        .style("fill", "steelblue")
        .attr("y", (d) => y(d.index2005))
        .attr("height", (d) => iheight - y(d.index2005))
        .duration(3000);
    });

    d3.select(data2006.current).on("click", () => {
      bars
        .transition()
        .style("fill", "red")
        .attr("y", (d) => y(d.index2006))
        .attr("height", (d) => iheight - y(d.index2006))
        .duration(3000);
    });
  };

  useEffect(() => {
    drawChart();
  });

  return (
    <div>
      <div ref={canvas}></div>
      <span>
        <button ref={data2005}>2005</button>
        <button ref={data2006}>2006</button>
      </span>
    </div>
  );
}

export default App;
