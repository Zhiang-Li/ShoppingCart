import PropTypes from "prop-types";
import React, { useRef } from "react";

export default function ShoppingCart({ productsToBuy, onDeleteProduct, onClear }) {

  const idRef = useRef();

  const onDeleteHelper = (productId) => {
    onDeleteProduct(productId);
  };

  const onClearHelper = () => {
    onClear();
  };

  const renderProductToBuy = (product,i ) =>(
    <li className="list-group-item d-flex justify-content-between align-items-center" key={i} id = {i} ref={idRef}>
      {product.name} 
      <br></br>
      price: ${product.price} 
      <br></br>
      <button className="btn btn-sm btn-outline-danger" onClick={()=>onDeleteHelper(product.id)}> 
      - 
      </button>
      amount:{product.quantity}



    </li>
  );
  return (
    <div>
      Total : {" "}
      {productsToBuy.reduce(
        (prevTotalPrice, product) => prevTotalPrice+product.price*product.quantity,
        0
      )} $
      <br></br>
      <button className="btn btn-sm btn-outline-danger" onClick={onClearHelper}> 
      Clear Cart
      </button>

      <ul className="list-group">{productsToBuy.map(renderProductToBuy)}</ul>

    </div>
  );
}

ShoppingCart.propTypes = {
  productsToBuy: PropTypes.array.isRequired,
  onDeleteProduct: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};
