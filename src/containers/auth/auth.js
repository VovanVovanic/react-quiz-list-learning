import React, { Component } from 'react'
import Button from '../../ui/buttons'
import Input from '../../ui/input'
import ErrorMessage from '../../components/error-message'
import {
  onCreateControls,
  onInputValid,
  validForm,
} from "../../components/form/form-handlers";
import classes from './auth.module.css'
import Axios from 'axios';

class Auth extends Component {
  state = {
    isFormValid: false,
    error: '',
    formControls: {
      email: onCreateControls({
        type: "email",
        label: "Email",
        placeholder: "Enter your email here",
        errorMsg: "Wrong email format",
        validate: {
          required: true,
          email: true,
        },
      }),
      password: onCreateControls({
        type: "password",
        label: "Password",
        placeholder: "Enter your password here",
        errorMsg: "Too short password",
        validate: {
          required: true,
          minLength: 6,
        },
      }),
    },
  };
  onError = (event) => {
          this.setState({
            error: `${event.response.data.error.message}`,
          });
  }
  onAuthData = () => ({
    email: this.state.formControls.email.value,
    password: this.state.formControls.password.value,
    returnSecureToken: true,
  });
  onLogin = async () => {
    try {
      const result = await Axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA7pT-0dwEZlhLYnbTSKq2oPRu37hovKwQ",
        this.onAuthData()
      );
      console.log(result);
    } catch (e) {

    this.onError(e)
    }
  };

  onRegister = async () => {
    try {
      const result = await Axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA7pT-0dwEZlhLYnbTSKq2oPRu37hovKwQ",
        this.onAuthData()
      );
      console.log(result);
    } catch (e) {
      this.onError(e);
    }
  };

  onInputChange = (e, control) => {
    const formControls = { ...this.state.formControls };
    const currentControl = { ...formControls[control] };
    currentControl.value = e.target.value;
    currentControl.touched = true;
    currentControl.valid = onInputValid(
      e.target.value,
      currentControl.validate
    );

    formControls[control] = currentControl;
    this.setState({
      formControls,
      isFormValid: validForm(formControls),
    });
  };
  onInputsRender = () => {
    return Object.keys(this.state.formControls).map((control, i) => {
      const currentControl = this.state.formControls[control];
      const {
        value,
        type,
        label,
        placeholder,
        errorMsg,
        valid,
        touched,
        validate,
      } = currentControl;
      return (
        <Input
          key={i}
          value={value}
          type={type}
          label={label}
          placeholder={placeholder}
          errorMsg={errorMsg}
          valid={valid}
          touched={touched}
          shouldValidate={!!validate}
          onChange={(e) => this.onInputChange(e, control)}
        />
      );
    });
  };
  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h2>Authorization</h2>

          {this.state.error ? (
            <ErrorMessage message={this.state.error} />
          ) : (
            <form
              className={classes.AuthForm}
              onSubmit={(e) => e.preventDefault()}
            >
              {this.onInputsRender()}
              <Button
                disabled={!this.state.isFormValid}
                onClick={this.onLogin}
                type="success"
              >
                Log In
              </Button>
              <Button
                disabled={!this.state.isFormValid}
                onClick={this.onRegister}
                type="primary"
              >
                Register
              </Button>
            </form>
          )}
        </div>
      </div>
    );
  }
}

export default Auth