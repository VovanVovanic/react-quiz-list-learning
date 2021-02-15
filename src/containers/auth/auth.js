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
import { connect } from 'react-redux'
import {auth} from '../../store/actions/auth'

class Auth extends Component {
  createFormControls() {
    return {
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
    }
  }
  state = {
    isFormValid: false,
    formControls: this.createFormControls()
  };
 
  onLogin = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      true
    )
    this.setState({
      isFormValid: false,
      formControls: this.createFormControls(),
    });
  };

  onRegister = () => {
      this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      false
    )
    this.setState({
      isFormValid: false,
      formControls: this.createFormControls(),
    });
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
          <h4>(email: test2@test.com, password: 123456, or make your own registration)</h4>

          {this.props.error ? (
            <ErrorMessage message={this.props.error} />
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
function mapStateToProps(state) {
  return {
    error: state.auth.error
  }
}
function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password, isLoggedIn) => dispatch(auth(email, password, isLoggedIn))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth)