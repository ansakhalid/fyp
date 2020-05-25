import React, {Component} from 'react';
import {Bar,Line,Pie} from 'react-chartjs-2';
import  { useState, useEffect } from "react";
import Layout from "../Components/deafaultdesign";
import { isAuthenticated } from "../path/apiProfiling";
import { listOrders } from "./fetchadmin";
import moment from "moment";

const Chart = () => {
    const [orders, setOrders] = useState([]);
    const [statusValues, setStatusValues] = useState([]);

    const { user, token } = isAuthenticated();

    const loadOrders = () => {
        listOrders(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setOrders(data);
            }
        });
    };

    const barchart=()=>{

       this.state={
           chartData:{
               labels:[order._id]
           },
           datasets:{
           label:'purchase record',
           data:[
              orders.createdAt()
           ],
           backgroundColor:[
               'rgba(75,192,192,0.6)',
               'green',
               'yellow',
               'pink'
           ]

           
           } 
       }
    }
}

return(
    <div className="chart">
     <Bar data={this.state.chartData}
   
     options={{
       
     }} />
    </div>
)

export default Chart;
