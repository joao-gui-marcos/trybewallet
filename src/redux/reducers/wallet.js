// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { REQUEST_CURRENCIES, RECEIVE_CURRENCIES, ADD_EXPENSE,
  DELETE_EXPENSE, EDIT_EXPENSE_FLAG, EDIT_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  isFetching: false,
};

function wallet(state = INITIAL_STATE, action) {
  const aux = [...state.expenses];
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return {
      ...state,
      isFetching: true,
    };
  case RECEIVE_CURRENCIES:
    return {
      ...state,
      currencies: Object.keys(action.currencies).filter((elem) => elem !== 'USDT'),
      isFetching: false,
    };
  case ADD_EXPENSE:
    action.payload.id = state.expenses.length;
    action.payload.exchangeRates = action.data;
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case DELETE_EXPENSE:
    aux.splice(aux.find((elem) => elem.id === action.payload), 1);
    return {
      ...state,
      expenses: aux,
    };
  case EDIT_EXPENSE_FLAG:
    return {
      ...state,
      editor: true,
      idToEdit: Number(action.payload),
    };
  case EDIT_EXPENSE:
    aux.find((elem) => elem.id === action.id).value = action.payload.value;
    aux.find((elem) => elem.id === action.id).description = action.payload.description;
    aux.find((elem) => elem.id === action.id).currency = action.payload.currency;
    aux.find((elem) => elem.id === action.id).method = action.payload.method;
    aux.find((elem) => elem.id === action.id).tag = action.payload.tag;
    return {
      ...state,
      editor: false,
      expenses: aux,
    };
  default: return state;
  }
}

export default wallet;
