// Coloque aqui suas actions
export const SET_EMAIL = 'set-email';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REQUEST_EXCHANGE_RATE = 'REQUEST_EXCHANGE_RATE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE_FLAG = 'EDIT_EXPENSE_FLAG';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

export const setEmail = (email) => ({
  type: SET_EMAIL,
  payload: email,
});

export const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES });

export const receiveCurrencies = (currencies) => ({
  type: RECEIVE_CURRENCIES,
  currencies });

export function fetchCurrencies() {
  return (dispatch) => {
    dispatch(requestCurrencies());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((currencies) => dispatch(receiveCurrencies(currencies)));
  };
}

export const requestExchangeRate = () => ({
  type: REQUEST_EXCHANGE_RATE });

export const addExpense = (data, expense) => ({
  type: ADD_EXPENSE,
  payload: expense,
  data,
});

export function fetchExchangeRateAndAddExpense(expense) {
  return (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((data) => dispatch(addExpense(data, expense)));
}

export const deleteExpenseAction = (payload) => ({
  type: DELETE_EXPENSE,
  payload,
});

export const editExpenseFlag = (payload) => ({
  type: EDIT_EXPENSE_FLAG,
  payload,
});

export const editExpenseAction = (payload, id) => ({
  type: EDIT_EXPENSE,
  payload,
  id,
});
