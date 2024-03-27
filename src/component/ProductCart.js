import React, { useState } from 'react';
import './ProductCart.css';

const ProductCart = () => {
    const [product, setProduct] = useState([
        {
            id: 1,
            name: "Product-1",
            price: 100,
            quantity: 0
        },
        {
            id: 2,
            name: "Product-2",
            price: 200,
            quantity: 0
        },
        {
            id: 3,
            name: "Product-3",
            price: 300,
            quantity: 0
        }
    ]);
    console.log(setProduct);  // only solve error
    const [carts, setCarts] = useState([]);

    const plusHandler = (pro) => {
        const existingProductIndex = carts.findIndex((item) => item.id === pro.id);
        if (existingProductIndex !== -1) {
            pro.quantity++;
            const updatedCarts = [...carts];
            updatedCarts[existingProductIndex].quantity++;
            setCarts(updatedCarts);
        } else {
            setCarts([...carts, { ...pro, quantity: 1 }]);
            pro.quantity++;
        }
    };

    const minusHandler = (pro) => {
        const existingProductIndex = carts.findIndex((item) => item.id === pro.id);
        if (existingProductIndex !== -1) {
            pro.quantity--;
            const updatedCarts = [...carts];
            updatedCarts[existingProductIndex].quantity--;
            setCarts(updatedCarts);
        } else {
            setCarts([...carts, { ...pro, quantity: 1 }]);
            pro.quantity--;
        }
    };

    // Function to calculate the total price for each item in the cart
    const calculateItemTotal = (cart) => {
        return cart.quantity * cart.price;
    };

    // Function to calculate the overall total of all items in the cart
    const calculateOverallTotal = () => {
        let total = 0;
        carts.forEach((cart) => {
            total += calculateItemTotal(cart);
        });
        return total;
    };

    return (
      <>
          <h1 style={{fontFamily : "monospace" ,fontSize : "40px",textAlign : "center"}}>Product Cart Page</h1>
          <div className='main'>
              <div className='product'>
                  <h1>Products</h1>
                  <ol>
                      {product.map((pro) => (
                          <li className='pro_li' key={pro.id}>
                              {pro.name}&nbsp;&nbsp; {pro.price}
                              <div className='btn'>
                                  <button onClick={() => minusHandler(pro)}>-</button>
                                  <button>{pro.quantity}</button>
                                  <button onClick={() => plusHandler(pro)}>+</button>
                              </div>
                          </li>
                      ))}
                  </ol>
              </div>

              <div className='cart'>
                  <h1>Cart</h1>
                  <ol style={{ listStyleType: "none" }}>
                      {carts.map((cart) => (
                          <li className='cart_li' key={cart.id}>
                              {cart.name}&nbsp;&nbsp;&nbsp;&nbsp;{cart.quantity}×{cart.price}&nbsp; = &nbsp;{calculateItemTotal(cart)}
                          </li>
                      ))}
                      <h2 style={{marginTop : "1rem"}}>Total: {calculateOverallTotal()}</h2>
                  </ol>
              </div>
          </div>
      </>
    );
};

export default ProductCart;
