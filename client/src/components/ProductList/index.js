import React, { useEffect } from "react";
import ProductItem from "../ProductItem";

//TODO: remove the line below for 'useStoreContext. We will use React-Redux to generate state and dispatch method
// import { useStoreContext } from "../../utils/GlobalState";
import { useDispatch, useSelector } from 'react-redux';

import { UPDATE_PRODUCTS } from "../../utils/actions";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import spinner from "../../assets/spinner.gif";

function ProductList() {
  // TODO: remove the line below. We will use useDispatch and useSelector to generate state and dispatch
  // const [state, dispatch] = useStoreContext();
  // TODO: Create a const variable 'dispatch' and assign the returned value from useDispatch()
  const dispatch = useDispatch();
  // TODO: create a const varailbe 'state' and assign the returned value from useSelector(...)
  const state = useSelector(state => state);
  // Hint: search 28-Stu_Mini-Project for how to create the two variables, dispatch and state

  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });
      data.products.forEach((product) => {
        idbPromise("products", "put", product);
      });
    } else if (!loading) {
      idbPromise("products", "get").then((products) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterProducts() {
    if (!currentCategory) {
      return state.products;
    }

    return state.products.filter(
      (product) => product.category._id === currentCategory
    );
  }

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {state.products.length ? (
        <div className="flex-row">
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;
