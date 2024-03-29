import firebase from "../firebase";
import { getHistory } from "./classify";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const VERIFY_REQUEST = "VERIFY_REQUEST";
export const VERIFY_SUCCESS = "VERIFY_SUCCESS";

const requestLogin = () => {
  return {
    type: LOGIN_REQUEST
  };
};

const receiveLogin = user => {
  return {
    type: LOGIN_SUCCESS,
    user
  };
};

const loginError = () => {
  return {
    type: LOGIN_FAILURE
  };
};

const requestSignup = () => {
  return {
    type: SIGNUP_REQUEST
  };
};

const receiveSignup = user => {
  return {
    type: SIGNUP_SUCCESS,
    user
  };
};

const signupError = () => {
  return {
    type: SIGNUP_FAILURE
  };
};

const requestLogout = () => {
  return {
    type: LOGOUT_REQUEST
  };
};

const receiveLogout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

const logoutError = () => {
  return {
    type: LOGOUT_FAILURE
  };
};

const verifyRequest = () => {
  return {
    type: VERIFY_REQUEST
  };
};

const verifySuccess = () => {
  return {
    type: VERIFY_SUCCESS
  };
};

export const loginUser = (email, password) => dispatch => {
  dispatch(requestLogin());
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => {
      firebase.firestore().collection("users").doc(user.user.uid).get().then(doc => {
        var userDetails = doc.data();
        dispatch(receiveLogin({ ...user, ...userDetails }));
        dispatch(getHistory({ ...user, ...userDetails }));
      });
    })
    .catch(error => {
      dispatch(loginError());
    });
};

export const signupUser = (firstName, surname, email, password) => dispatch => {
  dispatch(requestSignup());
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(user => {
      var newUser = {
        firstName,
        surname,
        email,
        isAuthority: false,
        uid: user.user.uid
      }
      firebase.firestore().collection("users").doc(user.user.uid).set(newUser);
      dispatch(receiveSignup({ ...user, ...newUser }));
    })
    .catch(error => {
      dispatch(signupError());
    });
};

export const logoutUser = () => dispatch => {
  dispatch(requestLogout());
  firebase
    .auth()
    .signOut()
    .then(() => {
      dispatch(receiveLogout());
    })
    .catch(error => {
      dispatch(logoutError());
    });
};

export const verifyAuth = () => dispatch => {
  dispatch(verifyRequest());
  firebase
    .auth()
    .onAuthStateChanged(user => {
      if (user !== null) {
        firebase.firestore().collection("users").doc(user.uid).get().then(doc => {
          var userDetails = doc.data();
          dispatch(receiveLogin({ ...user, ...userDetails }));
          dispatch(getHistory({ ...user, ...userDetails }));
        });
      }
      dispatch(verifySuccess());
    });
};