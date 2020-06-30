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

export async function signInWithGoogleAsync() {
  try {
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
      return result.accessToken;
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    return { error: true };
  }
}

export async function loginWithFacebook() {
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

        // this.storeName(json.name);
        // this.props.updateName(json.name);
        // this.storeAvatar(json.picture.data.url);
        // this.props.updateAvatar(json.picture.data.url);

        // setTimeout(() => {
        //   this.props.closeLogin();
        //   // this.setState({ isSuccessful: false });
        // }, 500);
      });
    });

    // this.setState({ isLoading: false });

    if (response) {
      Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
      // this.fetchUser();
      // this.props.updateName(response.email);
    }
    // console.log(user);

    // Sign in with credential from the Facebook user.
    firebase
      .auth()
      .signInWithCredential(credential)
      .catch((error) => {
        // Handle Errors here.
        alert(`Facebook Login Error: ${error}`);
      });
  }
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
        if (errorCode == "auth/email-already-in-use") {
          message = "This email is already in use!";
        } else if (errorCode === "auth/weak-password") {
          message = "This password is not valid";
        } else if (errorCode === "auth/invalid-email") {
          message = "This email is not valid";
        }
        throw new Error(message);
      });
    const resData = await user.toJSON().stsTokenManager;
    console.log(resData);
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        user.getIdToken().then(function (idToken) {
          console.log(idToken);
          // var expirationTime = user.toJSON().stsTokenManager.expirationTime;
          console.log("expire time   " + expirationTime);
          console.log("name retrieve test11" + user.email);
          console.log("id retrieve test" + user.uid);
          // User is signed in.
        });
      }
    });
    dispatch(
      authenticate(idToken, user.uid, parseInt(resData.expirationTime) * 1000)
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expirationTime) * 1000
    );
    saveDataToStorage(idToken, user.uid, expirationDate);
  };
};

//   var user = firebase.auth().currentUser;

//   if (user) {
//     // User is signed in.
//     firebase
//       .auth()
//       .currentUser.getIdToken()
//       .then((token) => {
//         // console.log("the token is", token);

//         // console.log(user);
//         console.log("name retrieve test222   " + user.email);
//         console.log("token retrieve test22   " + token);
//         console.log("id retrieve test22   " + user.uid);
//         console.log("expire time   " + expirationTime);
//       });
//   } else {
//     // No user is signed in.
//   }
//   dispatch(authenticate(token, user.uid));
// };

//   const response = await fetch(
//     "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC7T1dVJFpMAu8YT64sA1IjDduZc2dkV2M",
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email: email,
//         password: password,
//         returnSecureToken: true,
//       }),
//     }
//   );

//   if (!response.ok) {
//     const errorResData = await response.json();
//     const errorId = errorResData.error.message;
//     let message = "Something went wrong!";
//     if (errorId === "EMAIL_EXISTS") {
//       message = "This email exists already!";
//     }
//     throw new Error(message);
//   }

//   const resData = await response.json();
//   console.log(resData);
dispatch(
  authenticate(
    resData.localId,
    resData.idToken,
    parseInt(resData.expiresIn) * 1000
  )
);
//   const expirationDate = new Date(
//     new Date().getTime() + parseInt(resData.expiresIn) * 1000
//   );
//   saveDataToStorage(resData.idToken, resData.localId, expirationDate);
// };

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC7T1dVJFpMAu8YT64sA1IjDduZc2dkV2M",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = "Something went wrong!";
      if (errorId === "EMAIL_NOT_FOUND") {
        message = "This email could not be found!";
      } else if (errorId === "INVALID_PASSWORD") {
        message = "This password is not valid";
      }
      throw new Error(message);
    }

    const resData = await response.json();
    console.log(resData);
    dispatch(
      authenticate(
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn) * 1000
      )
    );
    // const expirationDate = new Date(
    //   new Date().getTime() + parseInt(resData.expiresIn) * 1000
    // );
    saveDataToStorage(resData.idToken, resData.localId);
    // saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

export const logout = () => {
  // clearLogoutTimer();
  firebase
    .auth()
    .signOut()
    .then(function () {
      // Sign-out successful.
    })
    .catch(function (error) {
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

const saveDataToStorage = (token, userId) => {
  // const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      // expiryDate: expirationDate.toISOString(),
    })
  );
};
