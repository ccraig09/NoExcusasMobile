import { AsyncStorage, Alert } from "react-native";

// export const SIGNUP = "SIGNUP";
// export const LOGIN = "LOGIN";
export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
import * as Google from "expo-google-app-auth";
import * as Facebook from "expo-facebook";

import firebase from "../../components/firebase";

// let timer;

export const authenticate = (userId, token, expiryTime) => {
  return (dispatch) => {
    // dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: AUTHENTICATE, userId: userId, token: token });
  };
};

export function signInWithGoogleAsync() {
  return async (dispatch) => {
    const result = await Google.logInAsync({
      androidClientId: `734413363397-tn9ofnqr47he7pib1g8nvio99eo5qqag.apps.googleusercontent.com`,
      iosClientId:
        "734413363397-i9is32ffnnpg3s2q3r1ur2an05iktsb4.apps.googleusercontent.com",
      scopes: ["profile", "email"],
    });

    if (result.type === "success") {
      const { idToken, accessToken } = result;
      const credential = firebase.auth.GoogleAuthProvider.credential(
        idToken,
        accessToken
      );
      firebase
        .auth()
        .signInWithCredential(credential)
        .then((res) => {
          // user res, create your user, do whatever you want
        })
        .catch((error) => {
          console.log("firebase cred err:", error);
        });
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          console.log("this is authstatechange user  ", user);
          const userRes = user.toJSON().stsTokenManager;
          // user.getIdToken().then(function (idToken) {
          var token = userRes.accessToken.toString();
          var id = user.uid.toString();
          var time = userRes.expirationTime.toString();
          console.log("this is tkn", token);
          console.log("this is id", id);
          console.log("this is time", time);
        }
      });

      // console.log(resData);
      var user = firebase.auth().currentUser;
      console.log("this is current user   ", user);

      // const id = user.uid;
      const resData = await user.toJSON().stsTokenManager;
      const userId = user.uid.toString();
      var token = resData.accessToken.toString();

      dispatch(
        authenticate(userId, token, parseInt(resData.expirationTime) * 1000)
      );

      const expirationDate = new Date(
        new Date().getTime() + parseInt(resData.expirationTime) * 1000
      );
      saveDataToStorage(userId, token, expirationDate);
      return result.accessToken;
    } else {
      return { cancelled: true };
    }
  };
}

export function loginWithFacebook() {
  return async (dispatch) => {
    // this.setState({ isLoading: true });
    await Facebook.initializeAsync("525920638107168");

    const { type, token } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ["public_profile", "email"],
    });

    if (type === "success") {
      // console.log(type);
      // Build Firebase credential with the Facebook access token.
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      const response = await fetch(
        // `https://graph.facebook.com/me?access_token=${token}`
        `https://graph.facebook.com/v6.0/me?access_token=${token}&fields=id,name,email,picture.height(961) `
      ).then((response) => {
        response.json().then((json) => {
          console.log(json.name);
          console.log(json.picture.data.url);
          console.log(json.id);
          console.log(json.email);
          console.log(token);
        });
      });

      firebase
        .auth()
        .signInWithCredential(credential)
        .catch((error) => {
          // Handle Errors here.
          alert(`Facebook Login Error: ${error}`);
        });
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          console.log("this is authstatechange user  ", user);
          const userRes = user.toJSON().stsTokenManager;
          // user.getIdToken().then(function (idToken) {
          var token = userRes.accessToken.toString();
          var id = user.uid.toString();
          var time = userRes.expirationTime.toString();
          console.log("this is tkn", token);
          console.log("this is id", id);
          console.log("this is time", time);

          const userId = id;

          dispatch(
            authenticate(userId, token, parseInt(userRes.expirationTime) * 1000)
          );

          const expirationDate = new Date(
            new Date().getTime() + parseInt(userRes.expirationTime) * 1000
          );
          saveDataToStorage(userId, token, expirationDate);
        }
      });

      // console.log(resData);
      // return result.accessToken;
    } else {
      return { cancelled: true };
    }
  };
}

export const signup = (email, password) => {
  return async (dispatch) => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        let message = "Something went wrong!";
        if (errorCode === "auth/email-already-in-use") {
          message = "This email exists already!";
        } else if (errorCode === "auth/weak-password") {
          message = "This password is not valid";
        } else if (errorCode === "auth/invalid-email") {
          message = "This email is not valid";
        }
        throw new Error(message);

        // ...
      });
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        const userRes = user.toJSON().stsTokenManager;
        console.log("this is userRes  ", userRes);
        // user.getIdToken().then(function (idToken) {
        var token = userRes.accessToken.toString();
        var id = user.uid.toString();
        var time = userRes.expirationTime.toString();
        console.log("this is tkn", token);
        console.log("this is id", id);
        console.log("this is time", time);
      }
    });

    var user = firebase.auth().currentUser;
    console.log("this is ONLYuser  ", user);

    const resData = await user.toJSON().stsTokenManager;
    const userId = user.uid.toString();

    var token = resData.accessToken.toString();

    dispatch(
      authenticate(userId, token, parseInt(resData.expirationTime) * 1000)
    );

    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expirationTime) * 1000
    );
    saveDataToStorage(userId, token, expirationDate);
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        let message = "Something went wrong!";
        if (errorCode === "auth/user-not-found") {
          message = "No account found for this email!";
        } else if (errorCode === "auth/wrong-password") {
          message = "This password is not the correct password";
        } else if (errorCode === "auth/invalid-email") {
          message = "This email is not valid";
        }
        throw new Error(message);

        // ...
      });
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        const userRes = user.toJSON().stsTokenManager;
        console.log("this is userRes  ", userRes);
        // user.getIdToken().then(function (idToken) {
        var token = userRes.accessToken.toString();
        var id = user.uid.toString();
        var time = userRes.expirationTime.toString();
        console.log("this is tkn", token);
        console.log("this is id", id);
        console.log("this is time", time);
      }
    });

    // console.log(resData);
    var user = firebase.auth().currentUser;
    console.log("this is ONLYuser  ", user);

    // const id = user.uid;
    const resData = await user.toJSON().stsTokenManager;
    const userId = user.uid.toString();

    var token = resData.accessToken.toString();

    console.log("user has signed in");

    dispatch(
      authenticate(userId, token, parseInt(resData.expirationTime) * 1000)
    );

    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expirationTime) * 1000
    );
    saveDataToStorage(userId, token, expirationDate);
  };
};

export const logout = () => {
  // clearLogoutTimer();
  firebase
    .auth()
    .signOut()
    .then(function () {
      console.log("signed out sucessfully");
      // Sign-out successful.
    })
    .catch(function (error) {
      console.log(error);
      // An error happened.
    });

  AsyncStorage.removeItem("userData");
  return { type: LOGOUT };
};

// const clearLogoutTimer = () => {
//   if (timer) {
//     clearTimeout(timer);
//   }
// };

// const setLogoutTimer = (expirationTime) => {
//   return (dispatch) => {
//     timer = setTimeout(() => {
//       dispatch(logout());
//     }, expirationTime);
//   };
// };

const saveDataToStorage = (token, userId, expirationDate) => {
  // const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString(),
    })
  );
};
