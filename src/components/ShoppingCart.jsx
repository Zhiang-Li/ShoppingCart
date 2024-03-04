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
    <li key={i} id = {i} ref={idRef}>
      {product.name} 
      <br></br>
      ${product.price} 
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

      <ul>{productsToBuy.map(renderProductToBuy)}</ul>

    </div>
  );
}

ShoppingCart.propTypes = {
  productsToBuy: PropTypes.array.isRequired,
  onDeleteProduct: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};
