import React from "react";
import { View, StyleSheet, Button } from "react-native";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";

const LogoutSreen = (props) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.screen}>
      <Button
        title="Logout"
        onPress={() => {
          dispatch(authActions.logout());
          props.navigation.navigate("Auth");
        }}
      />
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

export default LogoutSreen;
