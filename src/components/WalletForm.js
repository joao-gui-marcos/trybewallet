import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, fetchExchangeRateAndAddExpense,
  editExpenseAction } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.handleAddExpense = this.handleAddExpense.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.resetInput = this.resetInput.bind(this);
    this.editExpense = this.editExpense.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleAddExpense() {
    const { dispatch, isEditing } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const newExpense = {
      id: 0,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: {},
    };
    if (!isEditing) {
      dispatch(fetchExchangeRateAndAddExpense(newExpense));
      this.resetInput();
    } else {
      this.editExpense();
    }
  }

  editExpense() {
    const { dispatch, idToEdit } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const newExpense = {
      value,
      description,
      currency,
      method,
      tag,
    };
    dispatch(editExpenseAction(newExpense, idToEdit));
    this.resetInput();
  }

  resetInput() {
    Array.from(document.querySelectorAll('input')).forEach((input) => {
      (input.value = '');
    });
    this.setState({
      value: '',
      description: '',
    });
  }

  render() {
    const { fetching, currArr, isEditing } = this.props;
    return (
      <div>
        WalletForm
        <legend>Valor Despesa:</legend>
        <input data-testid="value-input" name="value" onChange={ this.handleChange } />
        <legend>Descrição Despesa:</legend>
        <input
          data-testid="description-input"
          name="description"
          onChange={ this.handleChange }
        />
        <legend htmlFor="currency">Currency:</legend>
        <select
          name="currency"
          id="currency"
          data-testid="currency-input"
          onChange={ this.handleChange }
        >
          {!fetching && currArr.map((e, i) => <option key={ i } value={ e }>{e}</option>)}
        </select>
        <select
          name="method"
          id="method"
          data-testid="method-input"
          onChange={ this.handleChange }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select
          name="tag"
          id="tag"
          data-testid="tag-input"
          onChange={ this.handleChange }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        <button
          type="button"
          onClick={ this.handleAddExpense }
        >
          {isEditing ? 'Editar despesa' : 'Adicionar despesa'}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currArr: state.wallet.currencies,
  fetching: state.isFetching,
  isEditing: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
  currArr: PropTypes.string.isRequired,
  isEditing: PropTypes.bool.isRequired,
  idToEdit: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
