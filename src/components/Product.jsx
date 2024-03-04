import React from "react";
import PropTypes from "prop-types";

export default function Product({ product, onAddProductToBuy, onRemoveProduct}) {

  const onAdd = () => {
    onAddProductToBuy(product);
  };

  const onRemove = () => {
    onRemoveProduct(product);
  };

  return (
    <div className="col-4">
      <div className="card ">
        <img src={product.image} alt={product.name} />
        {product.name} ${product.price}
        <button className="btn btn-outline-primary btn-sm" onClick={onAdd}>Add to Cart</button>
        <button className="success button" onClick={onRemove}>Remove</button>
      </div>
    </div>
  );
}

Product.propTypes = {
  product: PropTypes.object.isRequired,
  onAddProductToBuy: PropTypes.func.isRequired,
  onRemoveProduct: PropTypes.func.isRequired,
};

