import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./Cart.css";
import './checkoutform'
import {
  setDeliveryOption,
  updateItemQuantity,
  removeFromCart,
  setTotalItems,
  setSumCost
} from "../../features/cart/slice";

import cartReducer from '../../features/cart/slice'
function Cart() {
  const redirect = useNavigate()
  const cartData = useSelector((state) => state.cart.items);
  const deliveryOption = useSelector((state) => state.cart.deliveryOption);
  const userLogin = useSelector((state) => state.user.user);
  const usersSignup = useSelector((state) => state.userSignup.users);
  console.log(deliveryOption)
  console.log(cartData);
  const dispatch = useDispatch();



  const handleQuantityChange = (event, id) => {
    console.log(cartData);
    const quantity = Number(event.target.value);
    console.log("quantity:", quantity);
    console.log("id:", id);
   // setTotalCost(getTotalCost());
    dispatch(updateItemQuantity({ id, quantity }));

    // const newCartData = cartData.map(item => {
    //   if (item.id === id) {
    //     return { ...item, quantity: event.target.value };
    //   }
    //   return item;
    // });
    // setCartData(newCartData);
    // setTotalCost(getTotalCost());
  };

  const handleDeliveryOptionChange = (event) => {
    dispatch(setDeliveryOption(event.target.value));
    // setTotalCost(getTotalCost());
    // setDeliveryOption(event.target.value);
    // setTotalCost(getTotalCost());
  };

  const getSubtotal = () => {
    const subtotal = cartData.reduce((acc, item) => {
      if (typeof item.quantity === "number") {
        return acc + item.price * item.quantity;
      }
      return acc;
    }, 0);
  
    return subtotal;
  };
  //  setTotalCost(subtotal)

  const getTotalItems = () => {
    const totalItems = cartData.reduce((acc, item) => acc + item.quantity, 0);
    console.log("getTotalItems returned:", totalItems);
   
    return totalItems;
  };

  // const getTotalCost = () => {
  //   let total = getSubtotal();
  //   if (deliveryOption === "delivery") {
  //     total += 0;
  //   } else if (deliveryOption === "collection") {
  //     total += 0;
  //   }
  //   console.log("getTotalCost returned:", total);
  //   return total;
  // };
  const handleRemove = (product) => {
    dispatch(removeFromCart(product.id));
  };
  //const [totalCost, setTotalCost] = useState(getTotalCost());
function handleCheckout(){
  if(userLogin || usersSignup){
    dispatch(setTotalItems(getTotalItems()))
    dispatch(dispatch(setSumCost(getSubtotal().toFixed(2))));
    redirect('/checkoutform')
  }else{
    redirect('/signup')
  }
 

}
  if (cartData.length === 0) {
    return <div className="cart-header" style={{color:'black'}}>Your cart is empty</div>;
  }
  return (
    <div className="cart__content__container">
      <div class="basket">
        {/* <div class="basket-module">
          <label for="promo-code">Enter a promotional code</label>
          <input
            id="promo-code"
            type="text"
            name="promo-code"
            maxlength="5"
            class="promo-code-field"
          />
          <button class="promo-code-cta">Apply</button>
        </div> */}
        <div class="basket-labels">
          <ul className="list">
            <li class="item item-heading">Prod</li>
            <li class="price">Price</li>
            <li class="quantity">Quantity</li>
            <li class="subtotal">Subtotal</li>
          </ul>
        </div>
        {cartData.map((product) => (
          <div class="basket-product">
            <div class="item">
              <div class="product-image-cart">
                <img
                  className="image"
                  src={product.image_url}
                  alt="Placholder Image 2"
                  class="product-frame"
                />
              </div>
              <div class="product-details">
                <h4>
                  
                    <span class="item-quantity">{}</span> {product.name}
                  {" "}
                
                </h4>
                <p>
                  {/* <strong>Navy, Size 18</strong> */}
                </p>
                {/* <p>Product Code - 232321939</p> */}
              </div>
            </div>
            <div class="price">{product.price}</div>
            <div class="quantity">
              <input
                type="number"
                value={product.quantity}
                min="1"
                class="quantity-field"
                onChange={(event) => handleQuantityChange(event, product.id)}
              />
            </div>
            <div class="subtotal">{product.price * product.quantity}</div>
            <div className="remove_btnn">
              <button onClick={() => handleRemove(product)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <aside>
        <div class="summary">
          <div class="summary-total-items">
            <span class="total-items">{getTotalItems()}</span> Items in your Bag
          </div>
          <div class="summary-subtotal">
            <div class="subtotal-title">Subtotal</div>
            <div class="subtotal-value final-value" id="basket-subtotal">
              {getSubtotal().toFixed(2)}
            </div>

            <div class="summary-promo hide">
              <div class="promo-title">Location/Address</div>
              <div class="promo-value final-value" id="basket-promo"></div>
            </div>
          </div>
          <div class="summary-delivery">
            <select
              name="delivery-collection"
              class="summary-delivery-selection"
              onChange={handleDeliveryOptionChange}
            >
              <option value="0">
                Select your Location/Address
              </option>
              <option value="Nairobi">Nairobi</option>
              <option value="Kisumu">Kisumu</option>
              <option value="Eldoret">Eldoret</option>
              <option value="Mombasa">Mombasa</option>
              <option value="Nakuru">Nakuru</option>
            </select>
          </div>
          <div class="summary-total">
            <div class="total-title">Total</div>
            <div class="total-value final-value" id="basket-total">
              {getSubtotal().toFixed(2)}
            </div>
          </div>
          <div class="summary-checkout">
            
            <button onClick={handleCheckout}className="checkout-cta">Go to Secure Checkout</button>
            
          </div>
        </div>
      </aside>
    </div>
  );
}

export default Cart;
