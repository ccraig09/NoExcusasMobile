import { useEffect } from "react";
import { AsyncStorage, Alert } from "react-native";

// export const SIGNUP = "SIGNUP";
// export const LOGIN = "LOGIN";
export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
import * as Google from "expo-google-app-auth";
import * as Facebook from "expo-facebook";

import firebase from "../../components/firebase";

// let timer;

export const authenticate = (userId, token) => {
  return (dispatch) => {
    // dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: AUTHENTICATE, userId: userId, token: token });
  };
};

// useEffect(() => {
//   loginWithFacebook();
// }, []);

export function signInWithGoogleAsync(userId, token, avatar, givenName) {
  return async (dispatch) => {
    dispatch(authenticate(userId, token, avatar, givenName));
  };
}

// return async (dispatch) => {
//   try {
//     const result = await Google.logInAsync({
//       androidClientId: `734413363397-tn9ofnqr47he7pib1g8nvio99eo5qqag.apps.googleusercontent.com`,
//       iosClientId:
//         "734413363397-i9is32ffnnpg3s2q3r1ur2an05iktsb4.apps.googleusercontent.com",
//       scopes: ["profile", "email"],
//     });

//     if (result.type === "success") {
//       const { idToken, accessToken } = result;
//       const credential = firebase.auth.GoogleAuthProvider.credential(
//         idToken,
//         accessToken
//       );
//       await firebase
//         .auth()
//         .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
//         .then(function () {
//           firebase.auth().signInWithCredential(credential);
//         })
//         .then((res) => {
//           // user res, create your user, do whatever you want
//         })
//         .catch((error) => {
//           console.log("firebase cred err:", error);
//         });

//       firebase.auth().onAuthStateChanged(function (user) {
//         if (user) {
//           console.log("this is authstatechange user  ", user);
//           const userRes = user.toJSON().stsTokenManager;
//           // user.getIdToken().then(function (idToken) {
//           var token = userRes.accessToken.toString();
//           var userId = user.uid.toString();
//           // var time = userRes.expirationTime.toString();
//           console.log("this is tkn", token);
//           console.log("this is id", userId);
//           // console.log("this is time", time);

//           var avatar = result.user.photoUrl;
//           var givenName = result.user.givenName;
//           console.log("avatar uri should be", avatar);
//           console.log("avatar NAME should be", result.user);

//           dispatch(
//             authenticate(
//               userId,
//               token
//               // parseInt(userRes.expirationTime) * 1000
//             )
//           );

//           // const expirationDate = new Date(
//           //   new Date().getTime() + parseInt(userRes.expirationTime) * 1000
//           // );
//           saveDataToStorage(avatar, givenName, token, userId);
//         }
//       });
//     } else {
//       return { cancelled: true };
//     }
//   } catch (e) {
//     return { error: true };
//   }
// };
// }

export function loginWithFacebook(userId, token) {
  return async (dispatch) => {
    dispatch(authenticate(userId, token));
  };
}
//   try {
//     await Facebook.initializeAsync("525920638107168");

//     const { type, token } = await Facebook.logInWithReadPermissionsAsync({
//       permissions: ["public_profile", "email"],
//     });

//     if (type === "success") {
//       const credential = firebase.auth.FacebookAuthProvider.credential(token);
//       const response = await fetch(
//         // `https://graph.facebook.com/me?access_token=${token}`
//         `https://graph.facebook.com/v6.0/me?access_token=${token}&fields=id,name,email,picture.height(961) `
//       ).then((response) => {
//         response.json().then((json) => {
//           // console.log(json.name);
//           // console.log(json.picture.data.url);
//         });
//       });
//       await firebase
//         .auth()
//         .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
//         .then(function () {
//           firebase.auth().signInWithCredential(credential);
//         })
//         .catch((error) => {
//           // Handle Errors here.
//           alert(`Facebook Login Error: ${error}`);
//         });
//       firebase.auth().onAuthStateChanged(function (user) {
//         if (user) {
//           console.log("this is authstatechange user  ", user);
//           const userRes = user.toJSON().stsTokenManager;
//           // user.getIdToken().then(function (idToken) {
//           var token = userRes.accessToken.toString();
//           var userId = user.uid.toString();
//           // var time = userRes.expirationTime.toString();
//           var avatar = user.photoURL + "?height=600";
//           console.log("this is tkn", token);
//           console.log("this is id", userId);
//           console.log("this is time", time);

//           dispatch(
//             authenticate(
//               userId,
//               token
//               // parseInt(userRes.expirationTime) * 1000
//             )
//           );

//           // const expirationDate = new Date(
//           //   new Date().getTime() + parseInt(userRes.expirationTime) * 1000
//           // );
//           saveDataToStorage(avatar, token, userId);
//         }
//       });
//     } else {
//       return { cancelled: true };
//     }
//   } catch ({ message }) {
//     alert(`Facebook Login Error: ${message}`);
//   }
// };
// }

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
        console.log("this is authstatechange user  ", user);
        const userRes = user.toJSON().stsTokenManager;
        // user.getIdToken().then(function (idToken) {
        var token = userRes.accessToken.toString();
        var userId = user.uid.toString();
        // var time = userRes.expirationTime.toString();
        console.log("this is tkn", token);
        console.log("this is id", userId);
        // console.log("this is time", time);

        dispatch(
          authenticate(
            userId,
            token
            //  parseInt(userRes.expirationTime) * 1000
          )
        );

        // const expirationDate = new Date(
        //   new Date().getTime() + parseInt(userRes.expirationTime) * 1000
        // );
        saveDataToStorage(token, userId, expirationDate);
      }
    });
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    await firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(function () {
        firebase.auth().signInWithEmailAndPassword(email, password);
      })
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
        console.log("this is authstatechange user  ", user);
        const userRes = user.toJSON().stsTokenManager;
        // user.getIdToken().then(function (idToken) {
        var token = userRes.accessToken.toString();
        var userId = user.uid.toString();
        // var time = userRes.expirationTime.toString();
        console.log("this is tkn", token);
        console.log("this is id", userId);
        // console.log("this is time", time);

        dispatch(
          authenticate(
            userId,
            token
            //  parseInt(userRes.expirationTime) * 1000
          )
        );

        // const expirationDate = new Date(
        //   new Date().getTime() + parseInt(userRes.expirationTime) * 1000
        // );
        saveDataToStorage(token, userId, expirationDate);
      }
    });
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

const saveDataToStorage = (avatar, givenName, token, userId) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      avatar: avatar,
      token: token,
      userId: userId,
      givenName: givenName,
      // expiryDate: expirationDate.toISOString(),
    })
  );
};
