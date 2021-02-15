import axios from "axios";
import {
  ON_ERROR,
  ON_SESSION_EXPIRED,
  ON_TOKEN_SET,
} from "../actions/action-type";

export function auth(email, password, isLoggedIn) {
  return async (dispatch) => {
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA7pT-0dwEZlhLYnbTSKq2oPRu37hovKwQ";

    if (isLoggedIn) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA7pT-0dwEZlhLYnbTSKq2oPRu37hovKwQ";
    }
    try {
      const result = await axios.post(url, authData);
      const data = result.data;
      let expiresIn = new Date(new Date().getTime() + data.expiresIn * 1000);

      localStorage.setItem("token", data.idToken);
      localStorage.setItem("localId", data.localId);
      localStorage.setItem("expiresIn", expiresIn);

      dispatch(onTokenSet(data.idToken));
      dispatch(onSessionExpired(data.expiresIn));
    } catch (e) {
      const error = e.response.data.error.message;
      dispatch(getError(error));
    }
  };
}

export function onTokenSet(token) {
  return {
    type: ON_TOKEN_SET,
    token,
  };
}
export function getError(error) {
  return {
    type: ON_ERROR,
    error,
  };
}
export function onSessionExpired(expires) {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expires * 1000);
  };
}

export function autoLogin() {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      dispatch(logout());
    } else {
      const expiresDate = new Date(localStorage.getItem("expiresIn"));
      if (expiresDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(onTokenSet(token));
        dispatch(onSessionExpired((expiresDate.getTime() - new Date().getTime()) / 1000));
      }
    }
  };
}
export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("localId");
  localStorage.removeItem("expiresIn");
  return {
    type: ON_SESSION_EXPIRED,
  };
}

console.log(new Date(1702584640000));