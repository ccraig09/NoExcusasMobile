import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  AsyncStorage,
  KeyboardAvoidingView,
  Button,
  Platform,
  ActivityIndicator,
  Alert,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Input from "../components/UI/Input";
import Card from "../components/UI/Card";
import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";
import * as Facebook from "expo-facebook";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-google-app-auth";

// import * as Facebook from "expo-auth-session/providers/facebook";
import { ResponseType, useAuthRequest } from "expo-auth-session";

// import firebase from "firebase";

import firebase from "../components/firebase";

import * as authActions from "../store/actions/auth";
import { Entypo } from "@expo/vector-icons";

// if (!firebase.apps.length) {
//   firebase.initializeApp({
//     /* Config */
//   });
// }

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === "FORM_INPUT_UPDATE") {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const AuthScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSignup, setIsSignUp] = useState(false);
  const dispatch = useDispatch();

  WebBrowser.maybeCompleteAuthSession();

  const [request, response, promptAsync] = useAuthRequest({
    responseType: ResponseType.Token,
    clientId: "525920638107168",
  });

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;

      const credential = firebase.auth.FacebookAuthProvider.credential(
        access_token
      );
      // Sign in with the credential from the Facebook user.
      firebase.auth().signInWithCredential(credential);
    }
  }, [response]);

  // useEffect(() => {
  //   if (response?.type === "success") {
  //     const { access_token } = response.params;

  //     const credential = firebase.auth.FacebookAuthProvider.credential(
  //       access_token
  //     );
  //     // Sign in with the credential from the Facebook user.
  //     firebase.auth().signInWithCredential(credential);
  //   }

  //   if (error) {
  //     Alert.alert("An Error Occured", error, [{ text: "Okay" }]);
  //   }
  // }, [error, response]);

  const authHandler = async () => {
    let action;
    if (isSignup) {
      action = authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      setIsLoading(false);
      if (!error);
      props.navigation.navigate("Main");
    } catch (err) {
      setError(err.message);
    }
  };
  const authHandlerGoogle = async () => {
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
        await firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
          .then(function () {
            firebase.auth().signInWithCredential(credential);
          })
          .then((res) => {
            // user res, create your user, do whatever you want
          })
          .catch((error) => {
            console.log("firebase cred err:", error);
          });

        firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
            // console.log("this is authstatechange user  ", user);
            const userRes = user.toJSON().stsTokenManager;
            // user.getIdToken().then(function (idToken) {
            var token = userRes.accessToken.toString();
            var userId = user.uid.toString();
            // var time = userRes.expirationTime.toString();
            // console.log("this is tkn", token);
            // console.log("this is id", userId);
            // console.log("this is time", time);

            var avatar = result.user.photoUrl;
            var givenName = result.user.givenName.toString();
            // console.log("avatar uri should be", avatar);
            console.log("avatar NAME should be", givenName);

            // dispatch(
            //   authActions.signInWithGoogleAsync(
            //     userId,
            //     token,
            //     avatar,
            //     givenName
            //   )
            // );

            // const expirationDate = new Date(
            //   new Date().getTime() + parseInt(userRes.expirationTime) * 1000
            // );
            saveDataToStorage(avatar, givenName, token, userId);
            props.navigation.navigate("Main");
          }
        });
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };

  async function authHandlerFacebook() {
    try {
      await Facebook.initializeAsync({
        appId: "525920638107168",
        appName: "rnNoExcusas",
      });
      const {
        type,
        token,
        permissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile, email"],
      });

      if (type === "success") {
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        // const response = await fetch(
        //   // `https://graph.facebook.com/me?access_token=${token}`
        //   `https://graph.facebook.com/v6.0/me?access_token=${token}&fields=id,name,email,picture.height(961) `
        // ).then((response) => {
        //   response.json().then((json) => {
        //     // console.log(json.name);
        //     // console.log(json.picture.data.url);
        //   });
        // });
        await firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.LOCAL);

        await firebase.auth().signInWithCredential(credential);

        firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
            console.log("this is authstatechange user  ", user);
            const userRes = user.toJSON().stsTokenManager;
            // user.getIdToken().then(function (idToken) {
            var token = userRes.accessToken.toString();
            var userId = user.uid.toString();
            var givenName = user.displayName;
            // var time = userRes.expirationTime.toString();
            var avatar = user.photoURL + "?height=600";

            console.log("this is tkn", token);
            console.log("this is id", userId);
            console.log("this is pic", avatar);
            console.log("this is name", givenName);

            // dispatch(
            //   authActions.loginWithFacebook(userId, token, avatar, givenName)
            // );

            // dispatch(authenticate(userId, token));

            saveDataToStorage(avatar, givenName, token, userId);
          }
        });
        props.navigation.navigate("Main");
      } else {
        return { cancelled: true };
      }
    } catch ({ message }) {
      alert(`Facebook Login Error:: ${message}`);
      console.log(message);
    }
  }

  const saveDataToStorage = (avatar, givenName, token, userId) => {
    AsyncStorage.setItem(
      "userData",
      JSON.stringify({
        avatar: avatar,
        token: token,
        userId: userId,
        givenName: givenName,
      })
    );
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient
        colors={
          Platform.OS === "android"
            ? [Colors.noExprimary, "#F8F8F8"]
            : ["#ffffff", Colors.noExprimary]
        }
        style={styles.gradient}
      >
        <View style={{ marginBottom: 25 }}>
          {/* <Text>Bienvenido</Text> */}
          <Image
            style={styles.image}
            source={require("../assets/icon-noexlogo.png")}
          />
        </View>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="E-mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please enter a valid password."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <View style={styles.buttonContainer}>
              {isLoading ? (
                <ActivityIndicator size="small" color={Colors.noExprimary} />
              ) : (
                <Button
                  title={isSignup ? "Sign Up" : "Login"}
                  color={Colors.noExprimary}
                  onPress={authHandler}
                />
              )}
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={`Switch to ${isSignup ? "Login" : "Sign Up"}`}
                color="grey"
                onPress={() => {
                  setIsSignUp((prevState) => !prevState);
                }}
              />
              <View style={styles.socialContainer}>
                <Text style={{ marginBottom: 10 }}>Iniciar sesión con</Text>
                <View style={styles.socialRow}>
                  <TouchableOpacity padding="80">
                    <Entypo
                      disab
                      name="facebook-with-circle"
                      size={65}
                      color="#3b5998"
                      margin="20"
                      onPress={() => {
                        authHandlerFacebook();
                      }}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity padding="80">
                    <Entypo
                      name="google--with-circle"
                      size={65}
                      color="#B23121"
                      onPress={authHandlerGoogle}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  title: "Bienvenido",
  headerShown: false,
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 120,
    width: 120,
  },
  buttonContainer: {
    marginTop: 10,
  },
  socialContainer: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  socialRow: {
    flexDirection: "row",
    width: "60%",
    marginTop: 10,
    justifyContent: "space-between",
  },
});

export default AuthScreen;
