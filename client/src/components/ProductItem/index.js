import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers";

//TODO: remove the line below for 'useStoreContext. We will use React-Redux to generate state and dispatch method
// import { useStoreContext } from "../../utils/GlobalState";
import { useDispatch, useSelector } from 'react-redux';

import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

function ProductItem(item) {
  // TODO: remove the line below. We will use useDispatch and useSelector to generate state and dispatch
  // const [state, dispatch] = useStoreContext();
  // TODO: Create a const variable 'dispatch' and assign the returned value from useDispatch()
  const dispatch = useDispatch();
  // TODO: create a const varailbe 'state' and assign the returned value from useSelector(...)
  const state = useSelector(state => state);
  // Hint: search 28-Stu_Mini-Project for how to create the two variables, dispatch and state

  const { image, name, _id, price, quantity } = item;

  const { cart } = state;

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 },
      });
      idbPromise("cart", "put", { ...item, purchaseQuantity: 1 });
    }
  };

  return (
    <div className="card px-1 py-1">
      <Link to={`/products/${_id}`}>
        <img alt={name} src={`/images/${image}`} />
        <p>{name}</p>
      </Link>
      <div>
        <div>
          {quantity} {pluralize("item", quantity)} in stock
        </div>
        <span>${price}</span>
      </div>
      <button onClick={addToCart}>Add to cart</button>
    </div>
  );
}

export default ProductItem;
