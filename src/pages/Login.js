import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';
import { saveName } from '../redux/actions/index';
import { getToken } from '../services/getApi';

class Login extends React.Component {
  state = {
    email: '',
    name: '',
    isDisabled: true,
  };

  validateEmail = () => {
    const { email } = this.state;
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    console.log(email);
    return isEmailValid;
  };

  validateName = () => {
    const { name } = this.state;
    const minLength = 3;
    const isNameValid = name.length >= minLength;
    console.log(name);
    return isNameValid;
  };

  fieldsValidation = () => this.validateEmail() && this.validateName();

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      this.setState({
        isDisabled: !this.fieldsValidation(),
      });
    });
  };

  handleClick = async () => {
    const { name, email } = this.state;
    const { dispatch, history } = this.props;
    const hash = MD5(email).toString();
    const imgUrl = `https://www.gravatar.com/avatar/${hash}`;
    dispatch(saveName({
      gravatarEmail: email,
      name,
      imgUrl,
    }));

    const currencys = await getToken();
    localStorage.setItem('token', currencys);
    history.push('/Game');
  };

  handleClickSettings = () => {
    const { history } = this.props;
    history.push('/Settings');
  };

  render() {
    const { email, name, isDisabled } = this.state;
    return (
      <form>
        <input
          type="email"
          name="email"
          value={ email }
          onChange={ this.handleChange }
          id="email"
          placeholder="Email"
          data-testid="input-gravatar-email"
        />
        <input
          type="name"
          name="name"
          value={ name }
          onChange={ this.handleChange }
          id="name"
          placeholder="name"
          data-testid="input-player-name"
        />
        <button
          type="button"
          disabled={ isDisabled }
          data-testid="btn-play"
          onClick={ this.handleClick }
        >
          Play
        </button>
        <button
          data-testid="btn-settings"
          onClick={ this.handleClickSettings }
        >
          Settings

        </button>
      </form>
    );
  }
}
Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default connect()(Login);
