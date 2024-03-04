import "./App.css";

import React, { useState, useEffect } from "react";

import ProductsList from "./components/ProductsList.jsx";
import ShoppingCart from "./components/ShoppingCart.jsx";
import CreateProductForm from "./components/CreateProductForm.jsx";

import { myBase } from "./models/MyFirebase.js";

export default function App() {
  const [products, setProducts] = useState([]);

  const [productsToBuy, setProductsToBuy] = useState([]);

  const onAddProduct = (product) => {
    const lastId = products.reduce((maxId, product) => {
      return product.id > maxId ? product.id : maxId;
    }, 0);
    const addedProduct = {...product, id: +lastId + 1,};

    myBase.addProduct(addedProduct);
    setProducts([...products, addedProduct,]);
  };

  const onAddProductToBuy = (product) => {
    const productIndex = productsToBuy.findIndex(p => p.id === product.id);
    if (productIndex !== -1){
      const updatedProducts = productsToBuy.map((product, index) => {
        if (index === productIndex) {
          myBase.addMultiple(product);
          return { ...product, quantity: product.quantity + 1 };
        } else {
          return product;
        }
      });
      setProductsToBuy(updatedProducts);
    }
    else{
      myBase.addProductToCart(product);
      setProductsToBuy([...productsToBuy, { ...product, quantity: 1 }]);
    }

  };

  // delete from cart
  const onDeleteProduct = (id) => {

    myBase.removeProductFromCart(id);

    const updatedProducts = productsToBuy.map(product => {
      if (product.id === id) {
        return { ...product, quantity: product.quantity - 1 };
      }
      return product;
    }).filter(product => product.quantity > 0);
  
    setProductsToBuy(updatedProducts);
  };

  // delete from product list
  const onRemoveProduct = (product) =>{
    myBase.removeProductFromList(product);
    const updatedList = products.filter(p => p.id !== product.id);
    setProducts(updatedList);
  };

  const onClear = () => {
    myBase.clearCart();
    setProductsToBuy([]);
  };

  useEffect( () => {
    const getProducts = async () => {
      const products = await myBase.getProducts();
      setProducts(products);
    };

    const getShoppingCart = async () => {
      const cart = await myBase.getCart();
      setProductsToBuy(cart);
    };
    
    getProducts();
    getShoppingCart();
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-8">
          <h1>Basic Shopping Site</h1>
          <CreateProductForm onAddProduct={onAddProduct} /> 
          <ProductsList products={products} onAddProductToBuy={onAddProductToBuy} onRemoveProduct={onRemoveProduct}/>
        </div>
        {/* col-8 */}

        <div className="col-4">
          <h2>Shopping Cart</h2>
          <ShoppingCart productsToBuy={productsToBuy} onDeleteProduct = {onDeleteProduct} onClear={onClear}/>
        </div>
      </div>
    </div>
  );
}

// export default class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       products: [
//         {
//           id: 1,
//           name: "Product 1",
//           price: 100,
//           image: "https://via.placeholder.com/150",
//         },
//         {
//           id: 2,
//           name: "Product 2",
//           price: 200,
//           image: "https://via.placeholder.com/150",
//         },
//         {
//           id: 3,
//           name: "Product 3",
//           price: 300,
//           image: "https://via.placeholder.com/150",
//         },
//       ],
//     };
//   }

//   render() {
//     return (
//       <div>
//         <h1>Basic Shopping Site</h1>

//         <h2>Products</h2>
//         <div className="products">
//           {this.state.products.map((product) => (
//             <div key={product.id} className="product">
//               <img src={product.image} alt={product.name} />
//               <h3>{product.name}</h3>
//               <p>Price: {product.price}</p>
//               <button>Add to Cart</button>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }
// }
