import React, { useState, useEffect } from 'react';
import Layout from '../Components/deafaultdesign';
import { isAuthenticated } from '../path/fetchprofiling';
import { listOrders, getStatusValues, updateOrderStatus } from './fetchadmin';
import moment from 'moment';
import { Link } from 'react-router-dom';
// import OrdersChart from './ordersChart';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [statusValues, setStatusValues] = useState([]);
  // const [chartData, setChartData] = useState(null);

  const { user, token } = isAuthenticated();

  const loadOrders = () => {
    listOrders(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
        // let groupedData = data.reduce((r, a) => {
        //   r[a.createdAt] = r[a.createdAt] || [];
        //   r[a.createdAt].products = r[a.createdAt].products || [];
        //   r[a.createdAt].products.push(a);
        //   return r;
        // }, Object.create(null));
        // const res = Object.keys(groupedData).map((key) => {
        //   const products = groupedData[key].products;
        //   const count = products.length;
        //   const totalAmount = products.reduce((a, p) => a + p.amount, 0);
        //   return {
        //     date: key,
        //     products,
        //     count,
        //     totalAmount,
        //   };
        // });
        // setChartData(res);
      }
    });
  };

  const loadStatusValues = () => {
    // getStatusValues(user._id, token).then((data) => {
    //   if (data.error) {
    //     console.log(data.error);
    //   } else {
    //     setStatusValues(data);
    //   }
    // });
    setStatusValues(['Processing', 'Shipped', 'Delivered', 'Cancelled']);
  };

  useEffect(() => {
    loadOrders();
    loadStatusValues();
  }, []);

  const showOrdersLength = () => {
    if (orders.length > 0) {
      return <h4>Total orders: {orders.length}</h4>;
    } else {
      return (
        <div style={{ textAlign: 'center' }}>
          <img
            src={require('./images/undraw_empty_xct9.png')}
            width='500px'
            alt='Empty'
          />
          <h5>There are no orders yet!</h5>
        </div>
      );
    }
  };

  const showInput = (key, value) => (
    <div className='input-group mb-2 mr-sm-2'>
      <div className='input-group-prepend'>
        <div className='input-group-text'>{key}</div>
      </div>
      <input type='text' value={value} className='form-control' readOnly />
    </div>
  );

  const handleStatusChange = (e, orderId) => {
    updateOrderStatus(user._id, token, orderId, e.target.value).then((data) => {
      if (data.error) {
        console.log('Status update failed');
      } else {
        loadOrders();
      }
    });
  };

  const showStatus = (o) => (
    <div className='form-group'>
      <h2 className=' mb-4'>Status: {o.status}</h2>
      <select
        className='form-control'
        onChange={(e) => handleStatusChange(e, o._id)}
      >
        <option>Update Status</option>
        {statusValues.map((status, index) => (
          <option key={index} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <>
      <Layout
        title='Orders'
        description={`WELCOME ${user.name}, you can manage all the orders here`}
        className='container-fluid'
      />
      <section className='ftco-section '>
        <div className='container'>
          {/* {chartData && (
            <div className='row'>
              <div className='col-md-12'>
                <OrdersChart data={chartData} />
              </div>
            </div>
          )} */}
          <div className='row'>
            <div className='col-md-12'>
              {showOrdersLength()}
              <hr />
              {orders.length > 0 && (
                <div className='table-responsive'>
                  <table className='table table-hover'>
                    <thead className='thead-primary'>
                      <tr>
                        <th>ID</th>
                        <th>Transaction ID</th>
                        <th>Current Status</th>
                        <th>Amount</th>
                        <th>Products</th>
                        <th>Ordered by</th>
                        <th>Ordered On</th>
                        <th>Delivery address</th>
                        <th>Change Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((o, index) => (
                        <tr key={index} className='text-center'>
                          <td>{o._id}</td>
                          <td>{o.transaction_id}</td>
                          <td>{o.status}</td>
                          <td>
                            <b>${o.amount}</b>
                          </td>
                          <td>
                            {o.products.map((p, pIndex) => (
                              <p key={pIndex}>
                                <b>{pIndex + 1}.</b>{' '}
                                <Link to={`/product/${p._id}`}>
                                  {p.name} ({p.count})
                                </Link>
                              </p>
                            ))}
                          </td>
                          <td>{o.user.name}</td>
                          <td>{moment(o.createdAt).fromNow()}</td>
                          <td>{o.address}</td>

                          <td>
                            <select
                              className='form-control'
                              onChange={(e) => handleStatusChange(e, o._id)}
                              placeholder='Update Status'
                              value={o.status}
                            >
                              {statusValues.map((status, index) => (
                                <option key={index} value={status}>
                                  {status}
                                </option>
                              ))}
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Orders;
