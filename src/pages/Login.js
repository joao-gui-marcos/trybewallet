import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setEmail } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      userEmail: '',
      password: '',
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    this.loginEvent = this.loginEvent.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleValidation() {
    const { userEmail, password } = this.state;
    const maxPasswordLength = 6;
    const filter = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    let validEmailFlag = true;
    if (!filter.test(userEmail)) {
      validEmailFlag = false;
    }
    return !(validEmailFlag && password.length >= maxPasswordLength);
  }

  loginEvent() {
    const { dispatch } = this.props;
    const { userEmail } = this.state;
    dispatch(setEmail(userEmail));
    this.setState({ redirect: true });
  }

  render() {
    const { redirect } = this.state;
    return (
      <div>
        {redirect && <Redirect to="/carteira" />}
        <p>Login</p>
        <form>
          <legend>Email</legend>
          <input
            data-testid="email-input"
            name="userEmail"
            onChange={ this.handleChange }
          />
          <legend>Password</legend>
          <input
            data-testid="password-input"
            name="password"
            onChange={ this.handleChange }
          />
          <button
            disabled={ this.handleValidation() }
            type="button"
            onClick={ this.loginEvent }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
