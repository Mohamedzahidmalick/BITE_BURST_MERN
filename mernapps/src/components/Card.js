import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";
import { set } from "mongoose";

export default function Card({ foodItem = {}, options = {} }) {
    const dispatch = useDispatchCart();
    let data = useCart()
    const priceRef = useRef();
    const priceOptions = Object.keys(options);
    const [qty, setQty] = useState(1)
    const [size, setSize] = useState("")

    const handleAddToCart = async () => {
        let food = []
        for (const item of data) {
            if (item.id === foodItem._id) {
                food = item;
                break;
            }
        }
        if (food !== []) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty })
                return
            } else if (food.size != size) {
                await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size })
                console.log("Added to cart:", foodItem.name);
                return
                //await console.log(data);
            }
            return
        }
        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size })


    }
    let finalPrice = qty * parseInt(options[size]);
    useEffect(() => {
        setSize(priceRef.current.value)
    }, []
    )


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
                    <h5 className="card-title">{foodItem.name || "Unknown Item"}</h5>

                    <div className="container w-100">
                        <select className="m-2 h-100 bg-success rounded" onChange={(e) => setQty(e.target.value)}>
                            {Array.from({ length: 6 }, (e, i) => (
                                <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                </option>
                            ))}
                        </select>

                        <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
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

                <hr />

                <button className="btn btn-success justify-center mx-2" onClick={handleAddToCart}>
                    Add To Cart
                </button>
            </div>
        </div>
    );
}
