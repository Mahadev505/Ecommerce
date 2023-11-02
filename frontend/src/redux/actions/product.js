import axios from "axios";
import { server } from "../../server";

// create product
const DELETE_PRODUCT_REQUEST = "DELETE_PRODUCT_REQUEST";
const DELETE_PRODUCT_SUCCESS = "DELETE_PRODUCT_SUCCESS";
const DELETE_PRODUCT_FAILED = "DELETE_PRODUCT_FAILED";
export const createProduct =
  (
    name,
    description,
    category,
    tags,
    originalPrice,
    discountPrice,
    stock,
    shopId,
    images
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "productCreateRequest",
      });

      const { data } = await axios.post(
        `${server}/product/create-product`,
        name,
        description,
        category,
        tags,
        originalPrice,
        discountPrice,
        stock,
        shopId,
        images,
      );
      dispatch({
        type: "productCreateSuccess",
        payload: data.product,
      });
    } catch (error) {
      dispatch({
        type: "productCreateFail",
        payload: error.response.data.message,
      });
    }
  };

// get All Products of a shop
export const getAllProductsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsShopRequest",
    });

    const { data } = await axios.get(
      `${server}/product/get-all-products-shop/${id}`
    );
    dispatch({
      type: "getAllProductsShopSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsShopFailed",
      payload: error.response.data.message,
    });
  }
};

// delete product of a shop
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_PRODUCT_REQUEST,
    });

    // Make the delete request to your API
    await axios.delete(`${server}/product/delete-shop-product/${id}`, {
      withCredentials: true,
    });

    // Dispatch success action with the ID of the deleted product
    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: id, // Assuming 'id' is the ID of the deleted product
    });
  } catch (error) {
    // Dispatch a failure action in case of an error
    dispatch({
      type: DELETE_PRODUCT_FAILED,
      payload: error.response.data, // You can adjust the payload based on the actual error structure
    });
  }
};
// get all products
export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsRequest",
    });

    const { data } = await axios.get(`${server}/product/get-all-products`);
    dispatch({
      type: "getAllProductsSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsFailed",
      payload: error.response.data.message,
    });
  }
};
