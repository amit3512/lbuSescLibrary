import httpUtils from "../../utils/httpUtils";
import {
  apiRouteForGetInvoices,
  apiRouteForGetFinanceAccInfo,
} from "../../constants/apiRoutes";

import {
  GET_ALL_INVOICES_START,
  GET_ALL_INVOICES_SUCCESS,
  GET_FINANCE_ACCOUNT_INFO_START,
  GET_FINANCE_ACCOUNT_INFO_SUCCESS,
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

export const getAllInvoices = () => {
  return async function (dispatch) {
    const defaultErrorMsg = "Error on getting all invoices";

    try {
      dispatch(fetchStart(GET_ALL_INVOICES_START));
      const response = await httpUtils.get(apiRouteForGetInvoices);
      const { status } = response?.data;
      if (!status === 200) {
        const { error } = response?.data;
        throw error;
      }

      const { data: responseData } = response?.data;

      //   localStorage.setItem("auth", responseData);
      dispatch(fetchSuccess(GET_ALL_INVOICES_SUCCESS, responseData));
    } catch (error) {
      console.log("error", error);
      //   dispatch(loginFailed({ message: error.message ?? defaultErrorMsg }));
    }
  };
};

export const getFinanceAccInfo = () => {
  return async function (dispatch) {
    const defaultErrorMsg = "Error on getting finance Acc Info.";

    try {
      dispatch(fetchStart(GET_FINANCE_ACCOUNT_INFO_START));
      const response = await httpUtils.get(apiRouteForGetFinanceAccInfo);
      const { status } = response?.data;
      if (!status === 200) {
        const { error } = response?.data;
        throw error;
      }

      const { data: responseData } = response?.data;
      console.log("getFinanceAccInfo", response);

      dispatch(fetchSuccess(GET_FINANCE_ACCOUNT_INFO_SUCCESS, responseData));
    } catch (error) {
      console.log("error", error);
      //   dispatch(loginFailed({ message: error.message ?? defaultErrorMsg }));
    }
  };
};
