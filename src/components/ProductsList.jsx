import React, { useState } from "react";
import PropTypes from "prop-types";
import Product from "./Product";

export default function ProductsList({ products, onAddProductToBuy, onRemoveProduct }) {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6; // Number of products you want to show per page

  // Calculate total pages
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Calculate the index of the first and last product on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  // Current page products
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Function to change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <h2>Products</h2>
      <div className="products row">
        {currentProducts.map((p, i) => (
          <Product key={i} product={p} onAddProductToBuy={onAddProductToBuy} onRemoveProduct={onRemoveProduct}></Product>
        ))}
      </div>
      <div className="pagination">
        {currentPage > 1 && (
          <button onClick={() => paginate(currentPage - 1)}>Previous</button>
        )}
        {currentPage < totalPages && (
          <button onClick={() => paginate(currentPage + 1)}>Next</button>
        )}
      </div>
      <p>Page {currentPage} of {totalPages}</p>
    </>
  );
}

ProductsList.propTypes = {
  products: PropTypes.array.isRequired,
  onAddProductToBuy: PropTypes.func.isRequired,
  onRemoveProduct: PropTypes.func.isRequired,
};
