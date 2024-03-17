import {
  GET_ALL_INVOICES_START,
  GET_ALL_INVOICES_SUCCESS,
  GET_FINANCE_ACCOUNT_INFO_START,
  GET_FINANCE_ACCOUNT_INFO_SUCCESS,
} from "../types";
import { updateObject } from "../utility";

const initial_state = { loading: false, error: null, data: null };
const initial_state_finance = {
  loading: false,
  error: null,
  financeData: null,
};

const Start = (state, action) =>
  updateObject(state, { error: null, loading: true });

const Success = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    data: action?.data,
  });
};

const Finance_Acc_Start = (state, action) =>
  updateObject(state, { error: null, loading: true });

const Finance_Acc_Success = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    financeData: action?.data,
  });
};

export default function invoiceReducer(state = initial_state, action) {
  switch (action.type) {
    case GET_ALL_INVOICES_START:
      return Start(state, action);

    case GET_ALL_INVOICES_SUCCESS:
      return Success(state, action);

    case GET_FINANCE_ACCOUNT_INFO_START:
      return Finance_Acc_Start(initial_state_finance, action);

    case GET_FINANCE_ACCOUNT_INFO_SUCCESS:
      return Finance_Acc_Success(initial_state_finance, action);

    default:
      return state;
  }
}
