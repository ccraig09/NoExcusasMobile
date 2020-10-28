import React, { useState, useCallback, useReducer, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";
import { Avatar, Divider, Input, Button } from "react-native-elements";
// import { Button } from "react-native-paper";
import { AsyncStorage } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components";
import Colors from "../constants/Colors";

import FormikInput from "../components/UI/FormikInput";
import { Formik } from "formik";
import * as yup from "yup";

import * as detailsActions from "../store/actions/membersDetails";

const EditProfile = (props) => {
  const dispatch = useDispatch();
  const [userPhoto, setUserPhoto] = useState();
  const [nameModal, setNameModal] = useState(false);
  const [text, setText] = useState(false);
  const [fName, setFName] = useState();
  const [name, setName] = useState();

  const loadedMemberDeets = useSelector((state) => state.memberdeets.details);

  const firstName =
    typeof loadedMemberDeets.FirstName === "undefined"
      ? "__"
      : loadedMemberDeets.FirstName;

  const loadDetails = useCallback(async () => {
    await AsyncStorage.getItem("userData").then((value) => {
      const data = JSON.parse(value);
      setUserPhoto(data.avatar);
    });
    setFName(firstName);
  });

  useEffect(() => {
    loadDetails();
  }, [loadDetails]);

  const validationSchema = yup.object().shape({
    Nombre: yup.string().label("Nombre"),
  });

  const disableCheck = (name) => {
    if (name === fName) {
      return true;
    }
  };

  const submitName = useCallback(async (name) => {
    try {
      dispatch(detailsActions.baseName(name));
    } catch (err) {
      setError(err.message);
    }
    loadDetails();
    // setAgeModal(!ageModal);
  });

  const handleNameChange = (name) => {
    console.log(name);
    submitName(name);
    props.navigation.goBack();
    loadDetails();
  };
  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS == "ios" ? "height" : "height"}
      keyboardVerticalOffset={10}
    >
      <ScrollView>
        <View style={{ backgroundColor: "white", height: 200 }}>
          <View style={styles.avatar}>
            <Avatar
              rounded
              size="xlarge"
              style={{ width: 100, height: 100 }}
              source={{
                uri: userPhoto,
              }}
              showEditButton={true}
            />
          </View>

          <View style={styles.nameContainer}>
            <Text style={styles.name}>{fName} </Text>
          </View>
        </View>
        <View style={{ backgroundColor: "white", marginTop: 8 }}>
          <View style={styles.Datos}>
            <Text style={styles.title}>Datos</Text>
            {/* <Text style={styles.category}>Nombre</Text> */}
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                justifyContent: "flex-start",
              }}
            >
              <View
                style={{
                  width: "100%",
                  justifyContent: "flex-start",
                  alignContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                <Input
                  style={{ width: 200, fontSize: 25 }}
                  label="Nombre"
                  placeholder={fName}
                  placeholderTextColor={"black"}
                  onChangeText={(value) => setName(value)}
                />

                <View
                  style={{
                    alignSelf: "center",
                    marginBottom: 10,
                  }}
                >
                  <Button
                    title={"Guardar Cambios"}
                    // disabled={() => {
                    //   disableCheck(name, fName);
                    // }}
                    buttonStyle={{
                      borderRadius: 12,
                      backgroundColor: Colors.noExBright,
                    }}
                    onPress={() => {
                      Alert.alert("Guardar Cambios?", "test", [
                        ({
                          text: "No",
                          style: "cancel",
                        },
                        { text: "si", onPress: () => handleNameChange(name) }),
                      ]);
                    }}
                  />
                </View>
              </View>
            </View>
            {/* <Divider style={{ backgroundColor: "black" }} /> */}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

EditProfile.navigationOptions = {
  headerShown: true,
  title: "Editar Perfil",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  avatar: {
    alignItems: "center",
    marginTop: 30,
  },
  name: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
  },
  editName: {},
  title: {
    marginTop: 30,
    fontSize: 20,
    fontWeight: "bold",
  },
  category: {
    color: "#C0C0C0",
    fontSize: 12,
    marginTop: 30,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    height: 300,
    width: "80%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  Datos: {
    backgroundColor: "white",
    marginLeft: 15,
    marginRight: 15,
  },
});

const CloseView = styled.View`
  width: 32px;
  height: 32px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  justify-content: center;
  align-items: center;
`;

export default EditProfile;
