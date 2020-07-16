import React from "react";
import Chart from "react-apexcharts";

function OrdersChart({ data }) {
  const series = [
    {
      name: "Total Amount",
      data: data.map((d) => [new Date(d.date), d.totalAmount]),
    },
  ];

  const options = {
    chart: {
      type: "area",
      stacked: false,
      height: 350,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: "zoom",
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    title: {
      text: "Orders Chart",
      align: "left",
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    yaxis: {
      title: {
        text: "Total Orders",
      },
    },
    xaxis: {
      type: "datetime",
    },
    tooltip: {
      shared: false,
    },
  };

  return (
    <Chart
      options={options}
      series={series}
      type="area"
      width={"100%"}
      height={320}
    />
  );
}

export default OrdersChart;
