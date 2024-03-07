import httpUtils from "../../utils/httpUtils";
import {
  apiRouteForGetAllBooks,
  apiRouteForSearchSpecificBOOKS,
} from "../../constants/apiRoutes";

import {
  GET_ALL_BOOKS_START,
  GET_ALL_BOOKS_SUCCESS,
  GET_ALL_BOOKS_FAIL,
  GET_ENROLLED_BOOKS_START,
  GET_ENROLLED_BOOKS_SUCCESS,
  GET_ENROLLED_BOOKS_FAIL,
  GET_ALL_SEARCH_BOOKS_FINISH,
  GET_ALL_SEARCH_BOOKS_START,
  GET_ALL_SEARCH_BOOKS_SUCCESS,
} from "../types";

export const fetchStart = (type) => {
  return {
    type: type,
  };
};

export const fetchSuccess = (type, payload) => {
  return {
    type: type,
    data: payload,
  };
};

export const fetchFailed = ({ type, message }) => {
  return {
    type: type,
    error: message,
  };
};

export const getAllBooks = () => {
  return async function (dispatch) {
    const defaultErrorMsg = "Error getting all books.";

    try {
      dispatch(fetchSuccess(GET_ALL_BOOKS_START));
      const response = await httpUtils.get(apiRouteForGetAllBooks);
      const { status } = response?.data;
      if (!status === 200) {
        const { error } = response?.data;
        throw error;
      }

      const { data: responseData } = response?.data;

      //   localStorage.setItem("auth", responseData);
      dispatch(fetchSuccess(GET_ALL_BOOKS_SUCCESS, responseData));
    } catch (error) {
      console.log("error", error);
      //   dispatch(loginFailed({ message: error.message ?? defaultErrorMsg }));
    }
  };
};
