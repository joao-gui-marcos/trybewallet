import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      totalExpense: 0,
    };
    this.calculateTotalExpense = this.calculateTotalExpense.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { myExpenses, isEditing } = this.props;
    if (prevProps.myExpenses.length !== myExpenses.length) {
      this.calculateTotalExpense();
    }
    if (prevProps.isEditing !== isEditing) {
      this.calculateTotalExpense();
    }
  }

  calculateTotalExpense() {
    const { myExpenses } = this.props;
    let total = 0;
    myExpenses.forEach((elem) => {
      const rate = elem.exchangeRates[elem.currency].ask;
      total += rate * elem.value;
    });
    this.setState({ totalExpense: total.toFixed(2) });
  }

  render() {
    const { userEmail } = this.props;
    const { totalExpense } = this.state;
    return (
      <div>
        Header
        <p data-testid="email-field">{`Email: ${userEmail}`}</p>
        <p data-testid="total-field">{totalExpense}</p>
        <p data-testid="header-currency-field">BRL</p>
        <button type="button" onClick={ this.calculateTotalExpense }>Teste</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  myExpenses: state.wallet.expenses,
  isEditing: state.wallet.editor,
});

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  myExpenses: PropTypes.string.isRequired,
  isEditing: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Header);
