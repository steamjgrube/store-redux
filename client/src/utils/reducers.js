//TODO: remove the line below, import { useReducer } from 'react', because we will not use the 'useReducer' hook to generate [ state, dispatch ]
// state and dispatch will be generated using react-redux hooks, useSelector and useDispatch in the conmponents
// import { useReducer } from 'react';
import {
  UPDATE_PRODUCTS,
  ADD_TO_CART,
  UPDATE_CART_QUANTITY,
  REMOVE_FROM_CART,
  ADD_MULTIPLE_TO_CART,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  CLEAR_CART,
  TOGGLE_CART,
} from './actions';

//TODO: create initialState for the defaults for your app by locating the default values used in this app in the other file and moving it here.
const initialState = {
  //TODO: fill in the default values here
  products: [],
  cart: [],
  cartOpen: false,
  categories: [],
  currentCategory: '',
}

// The reducer is a function that accepts the current state and an action. It returns a new state based on that action.
export const reducers = (state = initialState, action) => {
  switch (action.type) {
    // Returns a copy of state with an update products array. We use the action.products property and spread it's contents into the new array.
    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: [...action.products],
      };

    case ADD_TO_CART:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.product],
      };
    case ADD_MULTIPLE_TO_CART:
      return {
        ...state,
        cart: [...state.cart, ...action.products],
      };
    // Returns a copy of state, sets the cartOpen to true and maps through the items in the cart.
    // If the item's `id` matches the `id` that was provided in the action.payload, we update the purchase quantity.
    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        cartOpen: true,
        cart: state.cart.map((product) => {
          if (action._id === product._id) {
            product.purchaseQuantity = action.purchaseQuantity;
          }
          return product;
        }),
      };

    // First we iterate through each item in the cart and check to see if the `product._id` matches the `action._id`
    // If so, we remove it from our cart and set the updated state to a variable called `newState`
    case REMOVE_FROM_CART:
      let newState = state.cart.filter((product) => {
        return product._id !== action._id;
      });

      // Then we return a copy of state and check to see if the cart is empty.
      // If not, we set the cartOpen status to  `true`. Then we return an updated cart array set to the value of `newState`.
      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState,
      };

    case CLEAR_CART:
      return {
        ...state,
        cartOpen: false,
        cart: [],
      };

    case TOGGLE_CART:
      return {
        ...state,
        cartOpen: !state.cartOpen,
      };

    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories],
      };

    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory,
      };

    // Return the state as is in the event that the `action.type` passed to our reducer was not accounted for by the developers
    // This saves us from a crash.
    default:
      return state;
  }
};

//TODO: remove the following export code.

//TODO: Create a default export to export reducers

export default reducers;