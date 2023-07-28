import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from "../../features/cart/slice";
import { Link } from "react-router-dom";
import './Cart.css'


export default function CartDropdown() {
  const dispatch = useDispatch();
  const cartDropDown = useSelector((state) => state.cart.items);

  function removeProduct(item) {
    dispatch(removeFromCart(item.id));
    console.log(cartDropDown);
  }

  return (
    <div className="cart-dropdown">
      <ul>
        {cartDropDown == null ? (
          <li>Your cart is empty</li>
        ) : (
          cartDropDown.map((item) => (
            <li
              key={item.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #ccc',
                padding: '10px 0',
              }}
            >
              <img
                src={item.image}
                alt=""
                srcSet=""
                style={{ width: '50px', height: '50px', marginRight: '10px' }}
              />
              <p style={{color: 'black'}}>{item.title}</p>
              <span className="spn">${item.price}</span>
              <button
                className='btn'
                onClick={() => removeProduct(item)}
                style={{ marginTop: '5px' }}
              >
                X
              </button>
            </li>
          ))
        )}
      </ul> 
      <Link to='/cart'>
        <button className="checkout-btn">Checkout</button>
      </Link> 
    </div>
  );
}
