import React, { useState, useEffect } from "react";
import "./Products.css";

const Products = () => {

  const [data, setData] = useState([]);

  const URL = "https://dummyjson.com/products";

  const fetchData = () => {
      try {

        fetch(URL)
      .then(res => res.json())
      .then((data) => {
        console.log(data.products);
        setData(data.products);
      })
      .catch((e) => {
        console.log("fetch failed :",e);
      })
      

      } catch (error) {
        console.log(error);
        
      }
  }

  useEffect(() => {
    fetchData();
  },[]);

  return (
    <>
      <div className="item-card">
        {data.map((item, index) => (
          
            <div key={(item.id)} className="item-box">
              <div className="item-img">
                <img src={item.thumbnail} alt="" />
              </div>
              <div className="item-name">
                <p>{item.title}</p>
              </div>
              <div className="item-d-box">
                <div className="item-category">
                  <p>{item.category}</p>
                </div>
                <div className="item-price">
                  <p>₹ {item.price}</p>
                </div>
              </div>
              <div className="item-btns">
                <button className="ibtn-1">Add to Cart</button>
                <button className="ibtn-2">Buy</button>
              </div>
            </div>
          
        ))}
      </div>
      <div>products....</div>
    </>
  );
};

export default Products;
