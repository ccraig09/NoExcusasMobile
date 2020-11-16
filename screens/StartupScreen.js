import React, { useEffect } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage,
} from "react-native";
import { useDispatch } from "react-redux";
import firebase from "../components/firebase";

import Colors from "../constants/Colors";
import * as authActions from "../store/actions/auth";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const StartupScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        props.navigation.navigate("Auth");
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId } = transformedData;

      if (!token || !userId) {
        props.navigation.navigate("Auth");
        return;
      }

      props.navigation.navigate("Main");
      dispatch(authActions.authenticate(userId, token));
    };

    tryLogin();
  }, [dispatch]);
  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.noExprimary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StartupScreen;
