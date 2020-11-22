import React from "react";
import { View, StyleSheet, Button, Alert } from "react-native";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";

const LogoutSreen = (props) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.screen}>
      <Button
        title="Cerrar sesión"
        onPress={() => {
          Alert.alert("Cerrar sesión?", "", [
            {
              text: "No",
              style: "default",
            },
            {
              text: "Si",
              style: "destructive",
              onPress: () => {
                dispatch(authActions.logout());
                props.navigation.navigate("Auth");
              },
            },
          ]);
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
