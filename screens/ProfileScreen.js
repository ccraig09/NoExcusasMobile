import React, { useState, useCallback, useReducer, useEffect } from "react";
import {
  StatusBar,
  Dimensions,
  ScrollView,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Image,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
  Button,
  Picker,
  Alert,
  RefreshControl,
} from "react-native";
import Modal from "react-native-modal";
import AwesomeAlert from "react-native-awesome-alerts";
import { Formik } from "formik";
import * as yup from "yup";
// import { Picker } from "@react-native-community/picker";
import styled, { useTheme } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import Input from "../components/UI/Input";
import { Avatar } from "react-native-elements";
import HeaderButton from "../components/UI/HeaderButton";

import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { AsyncStorage } from "react-native";
// import AvatarProfile from "../components/AvatarProfile";
import { ProgressChart } from "react-native-chart-kit";
// import { DataTable } from "react-native-paper";
import Colors from "../constants/Colors";
import * as detailsActions from "../store/actions/membersDetails";
import firebase from "../components/firebase";
import { SafeAreaView } from "react-native-safe-area-context";

import BaseInfoDT from "../components/BaseInfoDataTable";
import BaseEvalDT from "../components/BaseEvalDataTable";
// import ProgressCircle from "../components/UI/ProgressCircle";
// import PercentageCircle from "react-native-percentage-circle";
import ProgressWheel from "../components/UI/ProgressWheel";

let screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
StatusBar.setHidden(true);

const currentHour = new Date().getHours();

const greetingMessage =
  currentHour >= 4 && currentHour < 12 // after 4:00AM and before 12:00PM
    ? "Buenos Días "
    : currentHour >= 12 && currentHour <= 17 // after 12:00PM and before 6:00pm
    ? "Buenas Tardes"
    : currentHour > 17 || currentHour < 4 // after 5:59pm or before 4:00AM (to accommodate night owls)
    ? "Buenas Noches" // if for some reason the calculation didn't work
    : "Bienvenido";

export const db = firebase.firestore().collection("Members");

const ProfileScreen = (props) => {
  const loadedMemberDeets = useSelector((state) => state.memberdeets.details);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [baseInfoModal, setBaseInfoModal] = useState(false);
  const [evalInfoModal, setEvalInfoModal] = useState(false);
  // const [gender, setGender] = useState();
  // const [firstName, setFirstName] = useState();
  // const [lastName, setLastName] = useState();
  // const [age, setAge] = useState();
  // const [height, setHeight] = useState();
  // const [weight, setWeight] = useState();
  // const [bmi, setBmi] = useState();
  // const [fat, setFat] = useState();
  // const [muscle, setMuscle] = useState();
  // const [kcal, setKcal] = useState();
  // const [meta, setMeta] = useState();
  // const [vifat, setVifat] = useState();
  const [userPhoto, setUserPhoto] = useState();
  const dispatch = useDispatch();
  const firstName = loadedMemberDeets.FirstName;
  const lastName = loadedMemberDeets.LastName;
  const age = loadedMemberDeets.Age;
  const height = loadedMemberDeets.Height;
  const bmi = loadedMemberDeets.BMI;
  const fat = loadedMemberDeets.Fat;
  const muscle = loadedMemberDeets.Muscle;
  const kcal = loadedMemberDeets.KCAL;
  const meta = loadedMemberDeets.Metabolical;
  const vifat = loadedMemberDeets.ViFat;
  const gender = loadedMemberDeets.Gender;
  const weight = loadedMemberDeets.Weight;
  // setFirstName(loadedMemberDeets.FirstName);
  // const submitDetails = (name, last, age) => {
  //   console.log("final name to past!!!!", name);
  //   firebase.auth().onAuthStateChanged(function (user) {
  //     if (user) {
  //       var userId = user.uid.toString();
  //       try {
  //         db.doc(userId)
  //           .update({
  //             FirstName: name,
  //             LastName: last,
  //             Age: age,
  //             // Height: height,
  //             // Weight: weight,
  //             // BMI: bmi,
  //             // Fat: fat,
  //             // Muscle: muscle,
  //             // KCAL: kcal,
  //             // Metabolical: meta,
  //             // ViFat: vifat,
  //           })
  //           .catch(function (error) {
  //             console.log("Error getting document:", error);
  //           });
  //       } catch (err) {
  //         setError(err.message);
  //       }
  //     }
  //   });
  // };

  const loadDetails = useCallback(() => {
    setError(null);
    setIsRefreshing(true);

    try {
      dispatch(detailsActions.fetchMemberDetails());

      AsyncStorage.getItem("userData").then((value) => {
        const data = JSON.parse(value);
        setUserPhoto(data.avatar);
      });

      // setFirstName(loadedMemberDeets.FirstName);
      // setLastName(loadedMemberDeets.LastName);
      // setHeight(loadedMemberDeets.Height);
      // setGender(loadedMemberDeets.Gender);

      // AsyncStorage.getItem("resData").then((value) => {
      //   const data = JSON.parse(value);
      //   console.log("resData should be and is ", data);

      //   console.log("loaded member deets after first load", data);
      //   setAge(data.loadedDetails.Age);
      //   setFirstName(data.loadedDetails.FirstName);
      //   setLastName(data.loadedDetails.LastName);
      //   setHeight(data.loadedDetails.Height);
      //   setGender(data.loadedDetails.Gender);
      // });
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsRefreshing, setError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener("willFocus", loadDetails);
    return () => {
      willFocusSub.remove();
    };
  }, [loadDetails]);

  // useEffect(() => {
  //   const willFocusSub = props.navigation.addListener("willFocus", assign);
  //   return () => {
  //     willFocusSub.remove();
  //   };
  // }, [assign]);

  useEffect(() => {
    setIsLoading(true);
    loadDetails();
    setIsLoading(false);
  }, [loadDetails]);

  const submitHandler = useCallback(async (name, last) => {
    try {
      dispatch(detailsActions.baseDetails(name, last));
    } catch (err) {
      setError(err.message);
    }
    loadDetails();
    setModalVisible(!modalVisible);
  });
  const submitBaseInfo = useCallback(async (age, height, gender, weight) => {
    try {
      dispatch(detailsActions.baseInfo(age, height, gender, weight));
    } catch (err) {
      setError(err.message);
    }
    loadDetails();
    setBaseInfoModal(!baseInfoModal);
  });
  const submitEvalInfo = useCallback(
    async (bmi, fat, muscle, kcal, metabolical, visceral) => {
      try {
        dispatch(
          detailsActions.evalInfo(bmi, fat, muscle, kcal, metabolical, visceral)
        );
      } catch (err) {
        setError(err.message);
      }
      loadDetails();
      setEvalInfoModal(!evalInfoModal);
    }
  );

  const tapBackground = () => {
    setShowAlert(true);
  };

  const FieldWrapper = ({ children, label, formikProps, formikKey }) => (
    <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
      <Text style={{ marginBottom: 3 }}>{label}</Text>
      {children}
      <Text style={{ color: "red" }}>
        {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
      </Text>
    </View>
  );

  const StyledInput = ({ label, formikProps, formikKey, ...rest }) => {
    const inputStyles = {
      borderWidth: 1,
      borderColor: "black",
      padding: 10,
      marginBottom: 3,
      borderRadius: 10,
      color: "black",
    };

    if (formikProps.touched[formikKey] && formikProps.errors[formikKey]) {
      inputStyles.borderColor = "red";
    }

    return (
      <FieldWrapper
        label={label}
        formikKey={formikKey}
        formikProps={formikProps}
      >
        <TextInput
          style={inputStyles}
          returnKeyType="next"
          onChangeText={formikProps.handleChange(formikKey)}
          onBlur={formikProps.handleBlur(formikKey)}
          {...rest}
        />
      </FieldWrapper>
    );
  };

  const validationSchema = yup.object().shape({
    name: yup.string().label("name").required(),
    last: yup.string().label("last").required(),
  });
  const validationSchemaBase = yup.object().shape({
    age: yup
      .number()
      .typeError("Debe ser un número")
      .max(99, "Dos digitos por edad por favor"),
    height: yup
      .number()
      .typeError("Debe ser un número")
      .max(123456, "Digitos validos por altura por favor"),
  });
  const validationSchemaEval = yup.object().shape({
    bmi: yup
      .number()
      .typeError("Debe ser un número")
      .max(99, "Dos digitos por edad por favor"),
    fat: yup
      .number()
      .typeError("Debe ser un número")
      .max(99, "Dos digitos por edad por favor"),
    muscle: yup
      .number()
      .typeError("Debe ser un número")
      .max(99, "Dos digitos por edad por favor"),
    kcal: yup
      .number()
      .typeError("Debe ser un número")
      .max(9999, "Dos digitos por edad por favor"),
    metabolical: yup
      .number()
      .typeError("Debe ser un número")
      .max(99, "Dos digitos por edad por favor"),
    visceral: yup
      .number()
      .typeError("Debe ser un número")
      .max(99, "Dos digitos por edad por favor"),
    weight: yup
      .number()
      .typeError("Debe ser un número")
      .max(999999, "Dos digitos por edad por favor"),
  });

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.noExprimary} />
        <Text>Cargando detalles del usuario</Text>
      </View>
    );
  }
  return (
    <RootView>
      <Modal
        isVisible={modalVisible}
        animationIn="slideInLeft"
        customBackdrop={
          <TouchableWithoutFeedback onPress={tapBackground}>
            <View style={{ flex: 1, backgroundColor: "black" }}></View>
          </TouchableWithoutFeedback>
        }
        avoidKeyboard
        onBackButtonPress={tapBackground}
        onSwipeComplete={() => setModalVisible(!modalVisible)}
        swipeDirection={["left", "right"]}
        propagateSwipe
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "android" ? "padding" : "position"}
          keyboardVerticalOffset={-80}
          // style={styles.screen}
        >
          <View style={styles.centeredView}>
            <AwesomeAlert
              show={showAlert}
              showProgress={false}
              title="Salir sin guardar?"
              message=""
              closeOnTouchOutside={true}
              closeOnHardwareBackPress={false}
              showCancelButton={true}
              showConfirmButton={true}
              cancelText="No, continuar"
              confirmText="Si, sin guardar"
              confirmButtonColor="#DD6B55"
              onCancelPressed={() => {
                setShowAlert(false);
              }}
              onConfirmPressed={() => {
                setModalVisible(!modalVisible);
                setShowAlert(false);
              }}
            />
            <View style={styles.modalView}>
              <ScrollView>
                <View style={styles.form}>
                  <Text style={styles.modalText}>edit info!</Text>
                  <Formik
                    initialValues={{
                      name: "",
                      last: "",
                    }}
                    onSubmit={(values) => {
                      const { name, last } = values;
                      console.log("submitting ihope", name);
                      submitHandler(name, last);
                    }}
                    validationSchema={validationSchema}
                  >
                    {(formikProps) => (
                      <React.Fragment>
                        <StyledInput
                          label="Nombre"
                          formikProps={formikProps}
                          formikKey="name"
                          placeholder={firstName}
                        />
                        <StyledInput
                          label="Apellido"
                          formikProps={formikProps}
                          formikKey="last"
                          placeholder={lastName}
                        />

                        {formikProps.isSubmitting ? (
                          <ActivityIndicator />
                        ) : (
                          <Button
                            title="Submit"
                            onPress={formikProps.handleSubmit}
                          />
                        )}
                      </React.Fragment>
                    )}
                  </Formik>
                </View>
              </ScrollView>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      <Container>
        <SafeAreaView>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={loadDetails}
              />
            }
          >
            <Header>
              {/* {this.state.Bcg2 ? (
                    <Background source={{ uri: this.state.Bcg2 }} />
                  ) : null} */}
              <Background source={require("../assets/yellow.png")} />
              {/* <Name>{this.props.name}</Name> */}
            </Header>
            <AvatarView>
              <Avatar
                rounded
                size="xlarge"
                style={{ width: 125, height: 125 }}
                source={{
                  uri: userPhoto,
                }}
                showEditButton={true}
              />
            </AvatarView>
            <View style={styles.displayName}>
              <Text style={styles.hello}>{greetingMessage}, </Text>
              <Text style={styles.hello}>{firstName} </Text>
            </View>
            <ScrollView
              style={{
                flexDirection: "row",
                padding: 20,
                paddingLeft: 12,
                paddingTop: 30,
                marginTop: 40,
              }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {/* {evals.map((evalinfo, index) => ( */}
              {/* key={index} text={evalinfo.text}  */}

              <ItemContainer>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate("Eval1")}
                >
                  <Item>
                    <Text>Eval 1</Text>
                  </Item>
                </TouchableOpacity>

                <Item>
                  <Text>Eval 2</Text>
                </Item>
                <Item>
                  <Text>Eval 3</Text>
                </Item>
                <Item>
                  <Text>Eval 4</Text>
                </Item>
                <Item>
                  <Text>Eval 5</Text>
                </Item>
                <Item>
                  <Text>Eval 6</Text>
                </Item>
              </ItemContainer>
            </ScrollView>
            <View style={styles.edit}>
              <Subtitle>{"User Info".toUpperCase()}</Subtitle>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true);
                }}
              >
                <Text style={styles.textStyle}>Edit Profile</Text>
              </TouchableOpacity>
            </View>

            <Modal
              isVisible={baseInfoModal}
              animationIn="slideInLeft"
              customBackdrop={
                <TouchableWithoutFeedback onPress={tapBackground}>
                  <View style={{ flex: 1, backgroundColor: "black" }}></View>
                </TouchableWithoutFeedback>
              }
              avoidKeyboard
              onBackButtonPress={tapBackground}
              onSwipeComplete={() => setBaseInfoModal(!baseInfoModal)}
              swipeDirection={["left", "right"]}
              propagateSwipe
            >
              <KeyboardAvoidingView
                behavior={Platform.OS === "android" ? "padding" : "position"}
                keyboardVerticalOffset={-80}
                // style={styles.screen}
              >
                <View style={styles.centeredView}>
                  <AwesomeAlert
                    show={showAlert}
                    showProgress={false}
                    title="Salir sin guardar?"
                    message=""
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={true}
                    showConfirmButton={true}
                    cancelText="No, continuar"
                    confirmText="Si, sin guardar"
                    confirmButtonColor="#DD6B55"
                    onCancelPressed={() => {
                      setShowAlert(false);
                    }}
                    onConfirmPressed={() => {
                      setBaseInfoModal(!baseInfoModal);
                      setShowAlert(false);
                    }}
                  />
                  <View style={styles.modalView}>
                    <ScrollView>
                      <View style={styles.form}>
                        <Text style={styles.modalText}>edit info!</Text>
                        <View
                          style={{
                            margin: 25,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text>Elige un género</Text>
                        </View>

                        <Formik
                          initialValues={{
                            age: "",
                            height: "",
                            gender: "",
                            weight: "",
                          }}
                          onSubmit={(values, actions) => {
                            const { age, height, gender, weight } = values;

                            submitBaseInfo(age, height, gender, weight);
                            actions.setSubmitting(false);
                          }}
                          validationSchema={validationSchemaBase}
                        >
                          {(formikProps) => (
                            <React.Fragment>
                              <View
                                style={
                                  Platform.OS === "android" ? "" : styles.picker
                                }
                              >
                                <Picker
                                  selectedValue={formikProps.values.gender}
                                  mode="dropdown"
                                  style={{ height: 20, width: 200 }}
                                  itemStyle={{ fontSize: 13 }}
                                  // itemStyle={{ backgroundColor: "grey" }}
                                  onValueChange={(itemValue) =>
                                    formikProps.setFieldValue(
                                      "gender",
                                      itemValue
                                    )
                                  }
                                >
                                  <Picker.Item
                                    label="Elige un género"
                                    color="grey"
                                    value="N/A"
                                  />
                                  <Picker.Item
                                    label="Masculino"
                                    color="blue"
                                    value="M"
                                  />
                                  <Picker.Item
                                    label="Femenino"
                                    color="red"
                                    value="F"
                                  />
                                </Picker>
                              </View>
                              <View style={{ marginTop: 50 }}>
                                <StyledInput
                                  label="Edad"
                                  formikProps={formikProps}
                                  formikKey="age"
                                  keyboardType="numeric"
                                  maxLength={2}
                                  placeholder={age}
                                />
                                <StyledInput
                                  label="Altura"
                                  formikProps={formikProps}
                                  formikKey="height"
                                  keyboardType="numeric"
                                  maxLength={6}
                                  placeholder={height}
                                />
                                <StyledInput
                                  label="Peso"
                                  formikProps={formikProps}
                                  formikKey="weight"
                                  keyboardType="numeric"
                                  maxLength={5}
                                  // placeholder={}
                                />
                              </View>
                              {formikProps.isSubmitting ? (
                                <ActivityIndicator />
                              ) : (
                                <Button
                                  title="Submit"
                                  onPress={formikProps.handleSubmit}
                                />
                              )}
                            </React.Fragment>
                          )}
                        </Formik>
                      </View>
                    </ScrollView>
                  </View>
                </View>
              </KeyboardAvoidingView>
            </Modal>

            <Modal
              isVisible={evalInfoModal}
              animationIn="slideInLeft"
              customBackdrop={
                <TouchableWithoutFeedback onPress={tapBackground}>
                  <View style={{ flex: 1, backgroundColor: "black" }}></View>
                </TouchableWithoutFeedback>
              }
              avoidKeyboard
              onBackButtonPress={tapBackground}
              onSwipeComplete={() => setEvalInfoModal(!evalInfoModal)}
              swipeDirection={["left", "right"]}
              propagateSwipe
            >
              <KeyboardAvoidingView
                behavior={Platform.OS === "android" ? "padding" : "position"}
                keyboardVerticalOffset={-80}
                // style={styles.screen}
              >
                <View style={styles.centeredView}>
                  <AwesomeAlert
                    show={showAlert}
                    showProgress={false}
                    title="Salir sin guardar?"
                    message=""
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={true}
                    showConfirmButton={true}
                    cancelText="No, continuar"
                    confirmText="Si, sin guardar"
                    confirmButtonColor="#DD6B55"
                    onCancelPressed={() => {
                      setShowAlert(false);
                    }}
                    onConfirmPressed={() => {
                      setEvalInfoModal(!evalInfoModal);
                      setShowAlert(false);
                    }}
                  />
                  <View style={styles.modalView}>
                    <ScrollView>
                      <View style={styles.form}>
                        <Text style={styles.modalText}>edit info!</Text>

                        <Formik
                          initialValues={{
                            bmi: "",
                            fat: "",
                            muscle: "",
                            kcal: "",
                            metabolical: "",
                            visceral: "",
                          }}
                          onSubmit={(values, actions) => {
                            const {
                              bmi,
                              fat,
                              muscle,
                              kcal,
                              metabolical,
                              visceral,
                            } = values;

                            submitEvalInfo(
                              bmi,
                              fat,
                              muscle,
                              kcal,
                              metabolical,
                              visceral
                            );
                            actions.setSubmitting(false);
                          }}
                          validationSchema={validationSchemaEval}
                        >
                          {(formikProps) => (
                            <React.Fragment>
                              <View style={{ marginTop: 50 }}>
                                <StyledInput
                                  label="IMC"
                                  formikProps={formikProps}
                                  formikKey="bmi"
                                  keyboardType="numeric"
                                  maxLength={2}
                                  // placeholder={}
                                />
                                <StyledInput
                                  label="Grasa"
                                  formikProps={formikProps}
                                  formikKey="fat"
                                  keyboardType="numeric"
                                  maxLength={2}
                                  // placeholder={}
                                />
                                <StyledInput
                                  label="Músculo"
                                  formikProps={formikProps}
                                  formikKey="muscle"
                                  keyboardType="numeric"
                                  maxLength={2}
                                  // placeholder={}
                                />
                                <StyledInput
                                  label="KCAL"
                                  formikProps={formikProps}
                                  formikKey="kcal"
                                  keyboardType="numeric"
                                  maxLength={4}
                                  // placeholder={}
                                />
                                <StyledInput
                                  label="Edad Metabolica"
                                  formikProps={formikProps}
                                  formikKey="metabolical"
                                  keyboardType="numeric"
                                  maxLength={2}
                                  // placeholder={}
                                />
                                <StyledInput
                                  label="Grasa Visceral"
                                  formikProps={formikProps}
                                  formikKey="visceral"
                                  keyboardType="numeric"
                                  maxLength={2}
                                  // placeholder={}
                                />
                              </View>
                              {formikProps.isSubmitting ? (
                                <ActivityIndicator />
                              ) : (
                                <Button
                                  title="Submit"
                                  onPress={formikProps.handleSubmit}
                                />
                              )}
                            </React.Fragment>
                          )}
                        </Formik>
                      </View>
                    </ScrollView>
                  </View>
                </View>
              </KeyboardAvoidingView>
            </Modal>

            <BaseInfoDT
              age={age}
              height={height}
              gender={gender}
              weight={weight}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setBaseInfoModal(true);
              }}
            >
              <Text style={styles.buttonText}>Editar Datos</Text>
            </TouchableOpacity>

            <Subtitle>Progress Chart</Subtitle>

            <View style={styles.wheelBlock}>
              <View>
                <View style={styles.wheel}>
                  <ProgressWheel
                    composition={"IMC"}
                    current={parseInt(bmi)}
                    Meta={18}
                  />
                </View>
                <View
                  style={{
                    marginTop: 10,
                  }}
                >
                  <View>
                    <BaseEvalDT current={bmi} metaTitle={"Meta"} Meta={18} />
                  </View>
                </View>
              </View>

              <View>
                <View style={styles.wheel}>
                  <ProgressWheel
                    composition={"Grasa"}
                    current={parseInt(fat)}
                    Meta={10}
                  />
                </View>
                <View
                  style={{
                    marginTop: 10,
                  }}
                >
                  <View>
                    <BaseEvalDT current={fat} metaTitle={"Meta"} Meta={10} />
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.wheelBlock}>
              <View>
                <View style={styles.wheel}>
                  <ProgressWheel
                    composition={"Músculo"}
                    current={parseInt(muscle)}
                    Meta={48}
                  />
                </View>
                <View
                  style={{
                    marginTop: 10,
                  }}
                >
                  <View>
                    <BaseEvalDT current={muscle} metaTitle={"Meta"} Meta={48} />
                  </View>
                </View>
              </View>

              <View>
                <View style={styles.wheel}>
                  <ProgressWheel
                    composition={"KCAL"}
                    current={parseInt(kcal)}
                    Meta={2000}
                  />
                </View>
                <View
                  style={{
                    marginTop: 10,
                  }}
                >
                  <View>
                    <BaseEvalDT current={kcal} metaTitle={"Meta"} Meta={2000} />
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.wheelBlock}>
              <View>
                <View style={styles.wheel}>
                  <ProgressWheel
                    composition={"Metabolica"}
                    current={parseInt(meta)}
                    Meta={15}
                  />
                </View>
                <View
                  style={{
                    marginTop: 10,
                  }}
                >
                  <View>
                    <BaseEvalDT current={meta} metaTitle={"Meta"} Meta={19} />
                  </View>
                </View>
              </View>

              <View>
                <View style={styles.wheel}>
                  <ProgressWheel
                    composition={"Viseral"}
                    current={parseInt(vifat)}
                    Meta={1}
                  />
                </View>
                <View
                  style={{
                    marginTop: 10,
                  }}
                >
                  <View>
                    <BaseEvalDT current={vifat} metaTitle={"Meta"} Meta={3} />
                  </View>
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setEvalInfoModal(true);
              }}
            >
              <Text style={styles.buttonText}>Editar Eval</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </Container>
      {/* </KeyboardAvoidingView> */}
    </RootView>
  );
};
// ProfileScreen.navigationOptions = (navData) => {
//   const submitFn = navData.navigation.getParam("submit");
//   return {
//     headerShown: false,
//     // title: navData.navigation.getParam("productId")
//     //   ? "Edit Product"
//     //   : "Add Product",
//     headerRight: () => (
//       <HeaderButtons HeaderButtonComponent={HeaderButton}>
//         <Item
//           title="Save"
//           iconName={
//             Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
//           }
//           onPress={submitFn}
//         />
//       </HeaderButtons>
//     ),
//   };
// };
ProfileScreen.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  // input: {
  //   flex: 1,
  //   paddingLeft: 16,
  //   fontSize: 16,
  // },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  button: {
    margin: 10,
    width: 160,
    height: 50,
    backgroundColor: Colors.noExprimary,
    borderRadius: 10,
    elevation: 5,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
    alignSelf: "center",
    textTransform: "uppercase",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "80%",
    margin: 20,
    backgroundColor: "#E8E8E8",
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
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  edit: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  textStyle: {
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
    marginRight: 10,
  },
  form: {
    margin: 20,
  },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  hello: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15,
  },
  displayName: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  screen: {
    flex: 1,
  },
  picker: {
    marginBottom: 80,
    marginTop: -80,
    height: 20,
    width: 200,
  },
  wheel: {
    backgroundColor: "#dfdbdb",
    borderRadius: 10,
    paddingTop: 20,
    paddingBottom: 20,
    width: 150,
  },
  wheelBlock: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 10,
    paddingTop: 20,
    paddingBottom: 20,
  },
});

const RootView = styled.View`
  background: black;
  flex: 1;
`;
const Container = styled.View`
  flex: 1;
  background-color: #f0f3f5;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const ItemContainer = styled.View`
  flex-direction: row;
`;

const DataContainer = styled.View`
  background: #dfdbdb;
  height: 375px;
  width: 350px;
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
  justify-content: center;
  align-self: center;
  padding: 15px;
`;
const UserContainer = styled.View`
  background: #dfdbdb;
  height: 95px;
  width: 360px;
  margin-right: 10px;
  margin-left: 10px;
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
  justify-content: center;
  align-self: center;
  padding: 10px;
  padding-right: 50px;
  margin-top: 15px;
`;

const Item = styled.View`
  background: #ffc733;
  height: 60px;
  width: 90px;
  padding: 12px 16px 12px;
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
  align-items: center;
  justify-content: center;
  margin: 0 8px;
`;

const Header = styled.View`
  height: 200px;
  background: #3c4560;
`;
const Name = styled.Text`
  font-size: 30px;
  color: white;
  font-weight: bold;
  margin-top: 75px;

  align-self: center;
  position: absolute;
`;

// const Text = styled.Text`
//   font-size: 15px;
//   font-weight: 400;
//   position: absolute;
//   align-items: center;
//   justify-content: center;
// `;

const Background = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  width: ${screenWidth}px;
  height: 200px;
`;
const AvatarView = styled.View`
  width: 150px;
  height: 150px;
  border-radius: 75px;
  position: absolute;
  top: 120px;
  left: 38%;
  margin-left: -22px;
  z-index: 1;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
`;
const Subtitle = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 25px;
  margin-left: 20px;
  margin-top: 20px;
  text-transform: uppercase;
`;

const Content = styled.View`
  /* height: ${screenHeight}px; */
  width: ${screenWidth}px;
  background: #f0f3f5;
  padding: 20px;
`;
export default ProfileScreen;
