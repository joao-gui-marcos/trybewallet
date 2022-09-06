import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpenseAction, editExpenseFlag } from '../redux/actions';

class Table extends Component {
  constructor() {
    super();
    this.deleteExpense = this.deleteExpense.bind(this);
    this.editExpense = this.editExpense.bind(this);
  }

  deleteExpense(event) {
    const { dispatch } = this.props;
    dispatch(deleteExpenseAction(event.target.name));
  }

  editExpense(event) {
    const { dispatch } = this.props;
    dispatch(editExpenseFlag(event.target.name));
  }

  render() {
    const { myExpenses } = this.props;
    return (
      <div>
        Table
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {myExpenses.map((elem) => (
              <tr key={ elem.id }>
                <td>{elem.description}</td>
                <td>{elem.tag}</td>
                <td>{elem.method}</td>
                <td>{Number(elem.value).toFixed(2)}</td>
                <td>{elem.exchangeRates[elem.currency].name}</td>
                <td>{Number(elem.exchangeRates[elem.currency].ask).toFixed(2)}</td>
                <td>{(elem.exchangeRates[elem.currency].ask * elem.value).toFixed(2)}</td>
                <td>Real</td>
                <td>
                  <button
                    data-testid="delete-btn"
                    type="button"
                    onClick={ this.deleteExpense }
                    name={ elem.id }
                  >
                    Excluir
                  </button>
                  <button
                    data-testid="edit-btn"
                    type="button"
                    onClick={ this.editExpense }
                    name={ elem.id }
                  >
                    Editar
                  </button>
                </td>
              </tr>))}

          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  myExpenses: state.wallet.expenses,
});

Table.propTypes = {
  myExpenses: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
