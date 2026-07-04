import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";
import { toast } from 'react-toastify';

export default function Card({ foodItem = {}, options = {} }) {
  const dispatch = useDispatchCart();
  let data = useCart();
  const priceRef = useRef();
  const priceOptions = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

const handleAddToCart = () => {

    if (!localStorage.getItem("authToken")) {
        toast.warning("Please login to add items to your cart.");
        return;
    }

    const food = data.find(
        item => item.id === foodItem._id && item.size === size
    );

    if (food) {
        dispatch({
            type: "UPDATE",
            id: foodItem._id,
            size: size,
            qty: qty,
            price: finalPrice
        });
    } else {
        dispatch({
            type: "ADD",
            id: foodItem._id,
            name: foodItem.name,
            qty: qty,
            price: finalPrice,
            size: size,
            img: foodItem.img
        });
    }

    toast.success("Item added to cart successfully!");
};
  const finalPrice = Number(qty) * Number(options[size]);
 useEffect(() => {
    if (priceRef.current) {
        setSize(priceRef.current.value);
    }
}, []);

  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
        <img
          src={foodItem.img || "https://via.placeholder.com/150"}
          className="card-img-top"
          alt={foodItem.name || "Food item"}
          style={{ height: "180px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{foodItem.name}</h5>

          <div className="container w-100">
            <select
              className="m-2 h-100 bg-success rounded"
              onChange={(e)=>setQty(parseInt(e.target.value))}
            >
              {Array.from({ length: 6 }, (e, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>

            <select
              className="m-2 h-100 bg-success rounded"
              ref={priceRef}
              onChange={(e) => setSize(e.target.value)}
            >
              {priceOptions.length > 0 ? (
                priceOptions.map((data) => (
                  <option key={data} value={data}>
                    {data}
                  </option>
                ))
              ) : (
                <option value="">No options</option>
              )}
            </select>
          </div>

          <div className="d-inline h-100 fs-5">₹{finalPrice}/-</div>
        </div>

        <button
          className="btn btn-success justify-center mx-2"
          onClick={handleAddToCart}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}
