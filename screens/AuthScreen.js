import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Button,
  Platform,
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Input from "../components/UI/Input";
import Card from "../components/UI/Card";
import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";
import { Entypo } from "@expo/vector-icons";

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

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occured", error, [{ text: "Okay" }]);
    }
  }, [error]);

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
    let action;
    if (isSignup) {
      action = authActions.signInWithGoogleAsync();
    } else {
      action = authActions.signInWithGoogleAsync();
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      if (!error);
      props.navigation.navigate("Main");
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };
  const authHandlerFacebook = async () => {
    let action;
    if (isSignup) {
      action = authActions.loginWithFacebook();
    } else {
      action = authActions.loginWithFacebook();
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
                      name="facebook-with-circle"
                      size={65}
                      color="#3b5998"
                      margin="20"
                      onPress={authHandlerFacebook}
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
  title: "Authenticate",
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
