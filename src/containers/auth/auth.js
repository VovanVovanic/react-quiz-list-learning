import React, { Component } from 'react'
import Button from '../../ui/buttons'
import Input from '../../ui/input'
import classes from './auth.module.css'

class Auth extends Component {
  state = {
    formControls: {
      email: {
        type: "email",
        label: "Email",
        placeholder: "Enter your email here",
        errorMsg: "Wrong email format",
        valid: false,
        touched: false,
        validate: {
          required: true,
          email: true,
        },
      },
      password: {
        type: "password",
        label: "Password",
        placeholder: "Enter your password here",
        errorMsg: "Too short password",
        valid: false,
        touched: false,
        validate: {
          required: true,
          minLength: 6
        },
      },
    },
  };
  onLogin = () => {
    console.log("ok");
  };
  onRegister = () => {
    console.log("okok");
    };
    onInputChange = (e, control) => {
        console.log(e.target.value, control)
    }
    onInputsRender = () => {
        return Object.keys(this.state.formControls).map((control, i) => {
            const currentControl = this.state.formControls[control]
            const {value, type, label, placeholder, errorMsg, valid, touched, validate} = currentControl
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
                    onChange={(e)=>this.onInputChange(e, control)}
                
                
                />
            )
        })
    }
  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h2>Authorization</h2>
          <form
            className={classes.AuthForm}
            onSubmit={(e) => e.preventDefault()}>
            {this.onInputsRender()}
            <Button onClick={this.onLogin} type="success">
              Log In
            </Button>
            <Button onClick={this.onRegister} type="primary">
              Register
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default Auth