import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);

  const fetchMyOrder = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/myOrderData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: localStorage.getItem('userEmail')
        })
      });

      const response = await res.json();
      setOrderData(response.orderData.reverse()); // Reverse to show latest first
    } catch (err) {
      console.error("Error fetching order history:", err);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <Navbar />

      <div className='container'>
        <div className='row'>

          {orderData.length > 0 ? (
            orderData.map((order, index) => (
              <div key={index} className="order-section mt-5">
                {order.map((entry, i) => {
                  if (entry.Order_date) {
                    return (
                      <div key={i} className="w-100 text-center">
                        <h5>Order Date: {entry.Order_date}</h5>
                        <hr />
                      </div>
                    );
                  }

                  return (
                    <div key={i} className='col-12 col-md-6 col-lg-3'>
                      <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                        <div className="card-body">
                          <h5 className="card-title">{entry.name}</h5>
                          <div className='container w-100 p-0' style={{ height: "38px" }}>
                            <span className='m-1'>Qty: {entry.qty}</span>
                            <span className='m-1'>Size: {entry.size}</span>
                            <div className='d-inline ms-2 h-100 w-20 fs-5'>
                              ₹{entry.price}/-
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))
          ) : (
            <div className='text-center fs-4 mt-5'>No past orders found.</div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
