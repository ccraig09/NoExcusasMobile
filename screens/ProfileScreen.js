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
  FlatList,
  RefreshControl,
} from "react-native";
import Modal from "react-native-modal";
import AwesomeAlert from "react-native-awesome-alerts";
import { Formik } from "formik";
import * as yup from "yup";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-tiny-toast";

import styled, { useTheme } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Avatar } from "react-native-elements";
import HeaderButton from "../components/UI/HeaderButton";
import EvalBlock from "../components/EvalBlock";
import Carousel from "../components/Carousel";
// import Carousel from './Carousel';

import { AsyncStorage } from "react-native";
import Colors from "../constants/Colors";
import * as detailsActions from "../store/actions/membersDetails";
import * as addEvalAction from "../store/actions/evals";
import ImagePicker from "../components/ImagePicker";
import firebase from "../components/firebase";
import { SafeAreaView } from "react-native-safe-area-context";

import BaseEvalDT from "../components/BaseEvalDataTable";
import * as Description from "../components/UI/descriptions";
import ProgressWheel from "../components/UI/ProgressWheel";
import DataModal from "../components/DataModal";
import BasicInfoScroll from "../components/BasicInfoScrollview";
import Forumula from "../components/Formula";
import Formula from "../components/Formula";

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
  const loadedUpdates = useSelector((state) => state.updates.updates);

  const userEvals = useSelector((state) => {
    const transformedEvals = [];
    for (const key in state.evals.userEvals) {
      transformedEvals.push({
        evalId: key,
        evalTitle: state.evals.userEvals[key].title,
        evalOwner: state.evals.userEvals[key].ownerId,
        docTitle: state.evals.userEvals[key].docTitle,
        evalTime: state.evals.userEvals[key].time,
      });
    }

    return transformedEvals;
    // .sort((a, b) => (a.evalTime > b./evalTime ? 1 : -1));
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [ageModal, setAgeModal] = useState(false);
  const [heightModal, setHeightModal] = useState(false);
  const [weightModal, setWeightModal] = useState(false);
  const [genderModal, setGenderModal] = useState(false);
  const [imcModal, setImcModal] = useState(false);
  const [vifatModal, setVifatModal] = useState(false);
  const [kcalModal, setKcalModal] = useState(false);
  const [muscleModal, setMuscleModal] = useState(false);
  const [fatModal, setFatModal] = useState(false);
  const [metaModal, setMetaModal] = useState(false);
  const [evalModal, setEvalModal] = useState(false);
  const [FImage, setFImage] = useState("");
  const [SImage, setSImage] = useState("");
  const updatedBmi = loadedUpdates.length === 0 ? "" : loadedUpdates[0].bmi;
  console.log("this is updatedBmi=", updatedBmi);
  const [userPhoto, setUserPhoto] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const dispatch = useDispatch();
  const firstName =
    typeof loadedMemberDeets.FirstName === "undefined"
      ? "__"
      : loadedMemberDeets.FirstName;
  const lastName =
    typeof loadedMemberDeets.LastName === "undefined"
      ? ""
      : loadedMemberDeets.LastName;
  const age =
    typeof loadedMemberDeets.Age === "undefined" ? "" : loadedMemberDeets.Age;
  const height =
    typeof loadedMemberDeets.Height === "undefined"
      ? ""
      : loadedMemberDeets.Height;
  const bmi =
    typeof loadedMemberDeets.BMI === "undefined" ? "" : loadedMemberDeets.BMI;
  const fat =
    typeof loadedMemberDeets.Fat === "undefined" ? "" : loadedMemberDeets.Fat;
  const muscle =
    typeof loadedMemberDeets.Muscle === "undefined"
      ? ""
      : loadedMemberDeets.Muscle;
  const kcal =
    typeof loadedMemberDeets.KCAL === "undefined" ? "" : loadedMemberDeets.KCAL;
  const meta =
    typeof loadedMemberDeets.Metabolical === "undefined"
      ? ""
      : loadedMemberDeets.Metabolical;
  const vifat =
    typeof loadedMemberDeets.ViFat === "undefined"
      ? ""
      : loadedMemberDeets.ViFat;
  const gender =
    typeof loadedMemberDeets.Gender === "undefined"
      ? ""
      : loadedMemberDeets.Gender;
  const weight =
    typeof loadedMemberDeets.Weight === "undefined"
      ? ""
      : loadedMemberDeets.Weight;

  const [showEval, setShowEval] = useState(true);
  const [showDatos, setShowDatos] = useState(true);
  const [showProgreso, setShowProgreso] = useState(true);
  const [showImagen, setShowImagen] = useState(true);
  const [showAll, setShowAll] = useState(true);

  const loadDetails = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    dispatch(addEvalAction.fetchMemberEvals());

    try {
      await dispatch(detailsActions.fetchMemberDetails());
      await AsyncStorage.getItem("userData").then((value) => {
        const data = JSON.parse(value);
        setUserPhoto(data.avatar);
      });
      baseFrontImageLoad();
      baseSideImageLoad();
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

  useEffect(() => {
    setIsLoading(true);

    loadDetails();
    setIsLoading(false);
  }, [dispatch, loadDetails]);

  const selectEvalHandler = (id, title, docTitle) => {
    props.navigation.navigate("Eval", {
      evalId: id,
      evalTitle: title,
      docTitle: docTitle,
    });
  };

  const baseFrontImageLoad = useCallback(async () => {
    await firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        var userId = user.uid.toString();
        var storage = firebase.storage().ref();
        console.log("loading image");
        storage
          .child(`UserBaseImages/${userId}/FrontImage`)
          .getDownloadURL()
          .then(function (url) {
            // console.log("this will be image/s url:", url);
            setFImage(url);
          })
          .catch(function (error) {
            switch (error.code) {
              case "storage/object-not-found":
                // console.log(error);
                break;
              case "storage/unauthorized":
                // User doesn't have permission to access the object
                // console.log(error);
                break;

              case "storage/canceled":
                // User canceled the upload
                // console.log(error);

                break;
            }
          });
        // console.log(FImage);
      }
    });
  });

  const baseSideImageLoad = useCallback(async () => {
    await firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        var userId = user.uid.toString();
        var storage = firebase.storage().ref();
        storage
          .child(`UserBaseImages/${userId}/SideImage`)
          .getDownloadURL()
          .then(function (url) {
            // console.log("this will be image/s url:", url);
            setSImage(url);
          })
          .catch(function (error) {
            switch (error.code) {
              case "storage/object-not-found":
                // console.log(error);
                break;
              case "storage/unauthorized":
                // User doesn't have permission to access the object
                // console.log(error);

                break;

              case "storage/canceled":
                // User canceled the upload
                // console.log(error);

                break;
            }
          });
      }
    });
  });

  const submitHandler = useCallback(async (name, last) => {
    try {
      dispatch(detailsActions.baseDetails(name, last));
    } catch (err) {
      setError(err.message);
    }
    loadDetails();
    setModalVisible(!modalVisible);
  });
  const submitAgeInfo = useCallback(async (age) => {
    try {
      dispatch(detailsActions.ageInfo(age));
    } catch (err) {
      setError(err.message);
    }
    loadDetails();
    setAgeModal(!ageModal);
  });
  const submitHeightInfo = useCallback(async (height) => {
    try {
      dispatch(detailsActions.heightInfo(height));
    } catch (err) {
      setError(err.message);
    }
    loadDetails();
    setHeightModal(!height);
  });
  const submitWeightInfo = useCallback(async (weight) => {
    try {
      dispatch(detailsActions.weightInfo(weight));
    } catch (err) {
      setError(err.message);
    }
    loadDetails();
    setWeightModal(!weightModal);
  });
  const submitGenderInfo = useCallback(async (gender) => {
    try {
      dispatch(detailsActions.genderInfo(gender));
    } catch (err) {
      setError(err.message);
    }
    loadDetails();
    setGenderModal(!genderModal);
  });
  const submitMetaInfo = useCallback(async (meta) => {
    try {
      dispatch(detailsActions.metaInfo(meta));
    } catch (err) {
      setError(err.message);
    }
    loadDetails();
    setMetaModal(!metaModal);
  });
  const submitBmiInfo = useCallback(async (bmi) => {
    try {
      dispatch(detailsActions.bmiInfo(bmi));
    } catch (err) {
      setError(err.message);
    }
    loadDetails();
    setImcModal(!imcModal);
  });
  const submitVifat = useCallback(async (vifat) => {
    try {
      dispatch(detailsActions.vifatInfo(vifat));
    } catch (err) {
      setError(err.message);
    }
    loadDetails();
    setVifatModal(!vifatModal);
  });
  const submitKcalInfo = useCallback(async (kcal) => {
    try {
      dispatch(detailsActions.kcalInfo(kcal));
    } catch (err) {
      setError(err.message);
    }
    loadDetails();
    setKcalModal(!kcalModal);
  });
  const submitMuscleInfo = useCallback(async (muscle) => {
    try {
      dispatch(detailsActions.muscleInfo(muscle));
    } catch (err) {
      setError(err.message);
    }
    loadDetails();
    setMuscleModal(!muscleModal);
  });
  const submitFatInfo = useCallback(async (fat) => {
    try {
      dispatch(detailsActions.fatInfo(fat));
    } catch (err) {
      setError(err.message);
    }
    loadDetails();
    setFatModal(!fatModal);
  });

  const addEvalSquareHandler = useCallback(async (title) => {
    console.log("submitting evals ");
    try {
      await dispatch(addEvalAction.createEval(title));
    } catch (err) {
      setError(err.message);
    }
    loadDetails();
    setEvalModal(!evalModal);
  });

  const deleteHandler = (docId) => {
    // console.log("this is the deleted docId=", docId);
    Alert.alert("¿Usted esta seguro?", "Quiere borrar este evaluación?", [
      { text: "No", style: "default" },
      {
        text: "Si",
        style: "destructive",
        onPress: () => {
          dispatch(addEvalAction.deleteEval(docId));
          loadDetails();
        },
      },
    ]);
  };

  const frontImageTakenHandler = useCallback(async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    try {
      await dispatch(detailsActions.frontImage(blob));
    } catch (err) {
      setError(err.message);
    }
    const toast = Toast.showLoading("Subiendo Foto");
    setTimeout(() => {
      // Recommend
      Toast.hide(toast);

      // or Toast.hide()
      // If you don't pass toast，it will hide the last toast by default.
    }, 3000);
    setTimeout(() => loadDetails(), 4000);
    setTimeout(() => baseFrontImageLoad(), 4500);
  });

  const frontImageDeleteHandler = async () => {
    const toast = Toast.showLoading("Borrando Foto");
    setTimeout(() => {
      // Recommend
      Toast.hide(toast);

      // or Toast.hide()
      // If you don't pass toast，it will hide the last toast by default.
    }, 1000);
    setFImage("");
    setTimeout(() => loadDetails(), 3000);
  };

  const sideImageTakenHandler = useCallback(async (uri) => {
    const response = await fetch(uri);
    const blobS = await response.blob();
    try {
      await dispatch(detailsActions.sideImage(blobS));
    } catch (err) {
      setError(err.message);
    }
    const toast = Toast.showLoading("Subiendo Foto...");
    setTimeout(() => {
      // Recommend
      Toast.hide(toast);

      // or Toast.hide()
      // If you don't pass toast，it will hide the last toast by default.
    }, 3000);
    setTimeout(() => loadDetails(), 4000);
    setTimeout(() => baseSideImageLoad(), 4500);
  });

  const sideImageDeleteHandler = () => {
    const toast = Toast.showLoading("Borrando Foto");
    setTimeout(() => {
      // Recommend
      Toast.hide(toast);

      // or Toast.hide()
      // If you don't pass toast，it will hide the last toast by default.
    }, 1000);
    setSImage("");
    setTimeout(() => loadDetails(), 3000);
  };

  const showHandler = () => {
    setShowEval(false);
    setShowDatos(false);
    setShowProgreso(false);
    setShowImagen(false);
    setShowAll(false);
  };
  const hideHandler = () => {
    setShowEval(true);
    setShowDatos(true);
    setShowProgreso(true);
    setShowImagen(true);
    setShowAll(true);
  };

  const compPress = useCallback(() => {
    console.log("pressed the button");
  });

  const tapBackground = () => {
    setShowAlert(true);
  };

  const validationSchema = yup.object().shape({
    name: yup.string().label("name").required(),
    last: yup.string().label("last").required(),
    title: yup.string().label("title").required(),
  });
  const validationSchemaBase = yup.object().shape({
    title: yup.string(),
    age: yup
      .number()
      .typeError("Debe ser un número")
      .max(99, "Digitos validos por favor"),
    height: yup
      .number()
      .typeError("Debe ser un número")
      .max(123456, "Digitos validos por favor"),
    weight: yup
      .number()
      .typeError("Debe ser un número")
      .max(999999, "Digitos validos por favor"),
  });
  const validationSchemaEval = yup.object().shape({
    bmi: yup
      .number()
      .typeError("Debe ser un número")
      .max(99, "Digitos validos por favor"),
    fat: yup
      .number()
      .typeError("Debe ser un número")
      .max(99, "Digitos validos por favor"),
    muscle: yup
      .number()
      .typeError("Debe ser un número")
      .max(99, "Digitos validos por favor"),
    kcal: yup
      .number()
      .typeError("Debe ser un número")
      .max(9999, "Digitos validos por favor"),
    metabolical: yup
      .number()
      .typeError("Debe ser un número")
      .max(99, "Digitos validos por favor"),
    visceral: yup
      .number()
      .typeError("Debe ser un número")
      .max(99, "Digitos validos por favor"),
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
            <TouchableOpacity
              onPress={() => {
                showAll ? showHandler() : hideHandler();
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  marginLeft: 20,
                }}
              >
                <View>
                  <Text style={{ color: "grey", marginTop: 20 }}>
                    {!showAll ? "Mostrar todo" : "Ocultar todo"}
                  </Text>
                </View>
                <View style={{ marginTop: 20, marginLeft: 15 }}>
                  <Ionicons
                    name={
                      showAll
                        ? "ios-arrow-dropdown-circle"
                        : "ios-arrow-dropup-circle"
                    }
                    size={20}
                    color={Colors.noExprimary}
                  />
                </View>
              </View>
            </TouchableOpacity>
            <View style={styles.edit}>
              <TouchableOpacity
                onPress={() => {
                  setShowEval((prevState) => !prevState);
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View>
                    <Subtitle>{"evaluación".toUpperCase()}</Subtitle>
                  </View>
                  <View style={{ marginTop: 20, marginLeft: 15 }}>
                    <Ionicons
                      name={
                        showEval
                          ? "ios-arrow-dropdown-circle"
                          : "ios-arrow-dropup-circle"
                      }
                      size={25}
                      color={Colors.noExprimary}
                    />
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setEvalModal(true);
                }}
                style={{ marginRight: 20, marginTop: 10 }}
              >
                {showEval && (
                  <View
                    style={{
                      width: 35,
                      height: 30,
                      borderColor: Colors.noExprimary,
                      borderRadius: 10,
                      justifyContent: "center",
                      alignItems: "center",
                      borderWidth: 2,
                    }}
                  >
                    <Ionicons
                      name={Platform.OS === "android" ? "md-add" : "ios-add"}
                      size={25}
                      color={Colors.noExprimary}
                    />
                  </View>
                )}
              </TouchableOpacity>
            </View>
            {showEval &&
              // {isRefreshing ? (
              //   <View style={{ justifyContent: "center", alignItems: "center" }}>
              //     <ActivityIndicator size="large" color={Colors.noExprimary} />
              //   </View>
              // ) :
              (userEvals.length === 0 ? (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      padding: 10,
                      fontSize: 15,
                      textAlign: "center",
                      color: "#b8bece",
                    }}
                  >
                    Oprime el {<Text style={{ fontSize: 25 }}>'+'</Text>} para
                    crear tu primer evaluación.
                  </Text>
                </View>
              ) : (
                <FlatList
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  data={userEvals}
                  keyExtractor={(item) => item.evalId}
                  renderItem={(itemData) => (
                    <EvalBlock
                      title={itemData.item.evalTitle}
                      onSelect={() => {
                        selectEvalHandler(
                          itemData.item.evalId,
                          itemData.item.evalTitle,
                          itemData.item.docTitle
                        );
                      }}
                      longPress={() => {
                        deleteHandler(itemData.item.docTitle);
                      }}
                    />
                  )}
                />
              ))}
            {/* <ScrollView
              style={{
                flexDirection: "row",
                padding: 20,
                paddingLeft: 12,
                paddingTop: 30,
                marginTop: 10,
              }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {/* {evals.map((evalinfo, index) => ( */}
            {/* key={index} text={evalinfo.text}  */}
            {/* <ItemContainer>
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
            </ScrollView> */}
            <View style={styles.edit}>
              <TouchableOpacity
                onPress={() => {
                  setShowDatos((prevState) => !prevState);
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View>
                    <Subtitle>{"datos basicos".toUpperCase()}</Subtitle>
                  </View>
                  <View style={{ marginTop: 20, marginLeft: 15 }}>
                    <Ionicons
                      name={
                        showDatos
                          ? "ios-arrow-dropdown-circle"
                          : "ios-arrow-dropup-circle"
                      }
                      size={25}
                      color={Colors.noExprimary}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <DataModal
              visible={evalModal}
              backPress={tapBackground}
              swipeComplete={() => setEvalModal(!evalModal)}
              show={showAlert}
              alertTitle={"Salir sin guardar?"}
              alertCancel={"No, continuar"}
              alertConfirm={"Si, sin guardar"}
              cancelPressed={() => {
                setShowAlert(false);
              }}
              confirmedPressed={() => {
                setEvalModal(!evalModal);
                setShowAlert(false);
              }}
              initialValues={{ title: "" }}
              submit={(values, actions) => {
                const { title } = values;

                addEvalSquareHandler(title);
                actions.setSubmitting(false);
              }}
              schema={validationSchemaBase}
              genderSelect={false}
              formikLabel={"TITLE"}
              FormikKey={"title"}
              // formikKeyboard={"numeric"}
              // formikMaxLength={2}
            />
            <DataModal
              visible={imcModal}
              backPress={tapBackground}
              swipeComplete={() => setImcModal(!imcModal)}
              show={showAlert}
              alertTitle={"Salir sin guardar?"}
              alertCancel={"No, continuar"}
              alertConfirm={"Si, sin guardar"}
              cancelPressed={() => {
                setShowAlert(false);
              }}
              confirmedPressed={() => {
                setImcModal(!imcModal);
                setShowAlert(false);
              }}
              initialValues={{ bmi: "" }}
              submit={(values, actions) => {
                const { bmi } = values;

                submitBmiInfo(bmi);
                actions.setSubmitting(false);
              }}
              schema={validationSchemaEval}
              genderSelect={false}
              formikLabel={"IMC"}
              FormikKey={"bmi"}
              formikKeyboard={"numeric"}
              formikMaxLength={4}
              formikPlaceholder="Agrega tu IMC"
              bodyIcon={require("../assets/BMI.png")}
              description="El índice de masa corporal (IMC) es un número que se calcula utilizando el peso y la estatura de una
              persona. El IMC es un indicador confiable de la grasa corporal en las personas. Este índice no mide la
              grasa corporal directamente, pero hay estudios que han comprobado que el IMC está correlacionado con
              mediciones directas de la grasa corporal. El IMC se utiliza como una herramienta de detección para
              identificar posibles problemas de peso en los adultos"
            />
            <DataModal
              visible={metaModal}
              backPress={tapBackground}
              swipeComplete={() => setMetaModal(!metaModal)}
              show={showAlert}
              alertTitle={"Salir sin guardar?"}
              alertCancel={"No, continuar"}
              alertConfirm={"Si, sin guardar"}
              cancelPressed={() => {
                setShowAlert(false);
              }}
              confirmedPressed={() => {
                setMetaModal(!metaModal);
                setShowAlert(false);
              }}
              initialValues={{ meta: "" }}
              submit={(values, actions) => {
                const { meta } = values;

                submitMetaInfo(meta);
                actions.setSubmitting(false);
              }}
              schema={validationSchemaEval}
              genderSelect={false}
              formikLabel={"EDAD METABOLICA"}
              FormikKey={"meta"}
              formikKeyboard={"numeric"}
              formikMaxLength={2}
              formikPlaceholder="Agrega tu Edad Metabolica"
              bodyIcon={require("../assets/metaage.png")}
              description="La edad corporal se basa en su metabolismo basal. El peso, el porcentaje de grasa corporal y el
              porcentaje de músculo esquelético se tienen en cuenta para calcular un valor de referencia que permite
              determinar si su edad corporal se encuentra por encima o por debajo a su edad real."
            />
            <DataModal
              visible={vifatModal}
              backPress={tapBackground}
              swipeComplete={() => setVifatModal(!vifatModal)}
              show={showAlert}
              alertTitle={"Salir sin guardar?"}
              alertCancel={"No, continuar"}
              alertConfirm={"Si, sin guardar"}
              cancelPressed={() => {
                setShowAlert(false);
              }}
              confirmedPressed={() => {
                setVifatModal(!vifatModal);
                setShowAlert(false);
              }}
              initialValues={{ vifat: "" }}
              submit={(values, actions) => {
                const { vifat } = values;

                submitVifat(vifat);
                actions.setSubmitting(false);
              }}
              schema={validationSchemaEval}
              genderSelect={false}
              formikLabel={"Grasa Viseral"}
              FormikKey={"vifat"}
              formikKeyboard={"numeric"}
              formikMaxLength={2}
              formikPlaceholder="Agrega tu Grasa Viseral"
              bodyIcon={require("../assets/VisceralFat.png")}
              description="La grasa visceral se acumula en el abdomen y en los órganos vitales que lo rodean. Es diferente a la grasa
              que se encuentra directamente bajo la piel, la cual se conoce como grasa subcutánea. La grasa visceral
              puede pasar desapercibida ya que no es visible a simple vista. Una manera de ver la grasa visceral es por
              medio de imágenes de resonancia magnética (IRM)."
            />
            <DataModal
              visible={kcalModal}
              backPress={tapBackground}
              swipeComplete={() => setKcalModal(!kcalModal)}
              show={showAlert}
              alertTitle={"Salir sin guardar?"}
              alertCancel={"No, continuar"}
              alertConfirm={"Si, sin guardar"}
              cancelPressed={() => {
                setShowAlert(false);
              }}
              confirmedPressed={() => {
                setKcalModal(!kcalModal);
                setShowAlert(false);
              }}
              initialValues={{ kcal: "" }}
              submit={(values, actions) => {
                const { kcal } = values;

                submitKcalInfo(kcal);
                actions.setSubmitting(false);
              }}
              schema={validationSchemaEval}
              genderSelect={false}
              formikLabel={"KCAL"}
              FormikKey={"kcal"}
              formikKeyboard={"numeric"}
              formikMaxLength={4}
              formikPlaceholder="Agrega tu KCAL"
              bodyIcon={require("../assets/metabolicage.png")}
              description="Independientemente de su nivel de actividad, se necesita un consumo calórico mínimo para permitir las
              funciones corporales diarias. El metabolismo basal indica la cantidad de calorías que debe ingerir para
              darle a su cuerpo suficiente energía para funcionar"
            />
            <DataModal
              visible={muscleModal}
              backPress={tapBackground}
              swipeComplete={() => setMuscleModal(!muscleModal)}
              show={showAlert}
              alertTitle={"Salir sin guardar?"}
              alertCancel={"No, continuar"}
              alertConfirm={"Si, sin guardar"}
              cancelPressed={() => {
                setShowAlert(false);
              }}
              confirmedPressed={() => {
                setMuscleModal(!muscleModal);
                setShowAlert(false);
              }}
              initialValues={{ muscle: "" }}
              submit={(values, actions) => {
                const { muscle } = values;

                submitMuscleInfo(muscle);
                actions.setSubmitting(false);
              }}
              schema={validationSchemaEval}
              genderSelect={false}
              formikLabel={"MÚSCULO"}
              FormikKey={"muscle"}
              formikKeyboard={"numeric"}
              formikMaxLength={4}
              formikPlaceholder="Agrega tu Músculo"
              bodyIcon={require("../assets/musclemass.png")}
              description="El músculo esquelético es el tipo de músculo que se puede ver y sentir. Cuando hace ejercicios para
              aumentar su masa muscular, está ejercitando los músculos esqueléticos. Los músculos esqueléticos están
              unidos al esqueleto y vienen en pares; un músculo para mover el hueso en una dirección y el otro para
              moverlo en la dirección opuesta. El aumento de los músculos esqueléticos aumentará la necesidad de
              energía de su cuerpo. Cuanto más músculo tenga, más calorías quemará su cuerpo. El aumento de los
              músculos esqueléticos puede ayudar a prevenir un nuevo aumento de peso. El mantenimiento y aumento
              de los músculos esqueléticos está íntimamente relacionado con la tasa de metabolismo basal."
            />
            <DataModal
              visible={fatModal}
              backPress={tapBackground}
              swipeComplete={() => setFatModal(!fatModal)}
              show={showAlert}
              alertTitle={"Salir sin guardar?"}
              alertCancel={"No, continuar"}
              alertConfirm={"Si, sin guardar"}
              cancelPressed={() => {
                setShowAlert(false);
              }}
              confirmedPressed={() => {
                setFatModal(!fatModal);
                setShowAlert(false);
              }}
              initialValues={{ fat: "" }}
              submit={(values, actions) => {
                const { fat } = values;

                submitFatInfo(fat);
                actions.setSubmitting(false);
              }}
              schema={validationSchemaEval}
              genderSelect={false}
              formikLabel={"GRASA"}
              FormikKey={"fat"}
              formikKeyboard={"numeric"}
              formikMaxLength={4}
              formikPlaceholder="Agrega tu Grasa Corporal"
              bodyIcon={require("../assets/Bodyfpercentage.png")}
              description="La grasa corporal juega un importante papel en el almacenamiento de energía y en la protección de órganos
              internos. En nuestro cuerpo se almacenan dos tipos de grasas: 1) grasa esencial, la cual se aloja en pequeñas
              cantidades para proteger el cuerpo y 2) grasa almacenada, la cual el organismo guarda para obtener energía
              durante la actividad física. Si bien tener demasiada grasa corporal es poco saludable, también lo es tener
              muy poca. Además, la distribución de la grasa corporal es diferente en hombres y mujeres, por lo que las
              bases para la clasificación del porcentaje de grasa corporal son diferentes para ambos sexos."
            />
            <DataModal
              visible={ageModal}
              backPress={tapBackground}
              swipeComplete={() => setAgeModal(!ageModal)}
              show={showAlert}
              alertTitle={"Salir sin guardar?"}
              alertCancel={"No, continuar"}
              alertConfirm={"Si, sin guardar"}
              cancelPressed={() => {
                setShowAlert(false);
              }}
              confirmedPressed={() => {
                setAgeModal(!ageModal);
                setShowAlert(false);
              }}
              initialValues={{ age: "" }}
              submit={(values, actions) => {
                const { age } = values;

                submitAgeInfo(age);
                actions.setSubmitting(false);
              }}
              schema={validationSchemaBase}
              genderSelect={false}
              formikLabel={"EDAD"}
              FormikKey={"age"}
              formikKeyboard={"numeric"}
              formikMaxLength={2}
            />
            <DataModal
              visible={heightModal}
              backPress={tapBackground}
              swipeComplete={() => setHeightModal(!heightModal)}
              show={showAlert}
              alertTitle={"Salir sin guardar?"}
              alertCancel={"No, continuar"}
              alertConfirm={"Si, sin guardar"}
              cancelPressed={() => {
                setShowAlert(false);
              }}
              confirmedPressed={() => {
                setHeightModal(!heightModal);
                setShowAlert(false);
              }}
              initialValues={{ height: "" }}
              submit={(values, actions) => {
                const { height } = values;

                submitHeightInfo(height);
                actions.setSubmitting(false);
              }}
              schema={validationSchemaBase}
              genderSelect={false}
              formikLabel={"ALTURA"}
              FormikKey={"height"}
              formikKeyboard={"numeric"}
              formikMaxLength={5}
            />
            <DataModal
              visible={weightModal}
              backPress={tapBackground}
              swipeComplete={() => setWeightModal(!weightModal)}
              show={showAlert}
              alertTitle={"Salir sin guardar?"}
              alertCancel={"No, continuar"}
              alertConfirm={"Si, sin guardar"}
              cancelPressed={() => {
                setShowAlert(false);
              }}
              confirmedPressed={() => {
                setWeightModal(!weightModal);
                setShowAlert(false);
              }}
              initialValues={{ weight: "" }}
              submit={(values, actions) => {
                const { weight } = values;

                submitWeightInfo(weight);
                actions.setSubmitting(false);
              }}
              schema={validationSchemaBase}
              genderSelect={false}
              formikLabel={"PESO"}
              FormikKey={"weight"}
              formikKeyboard={"numeric"}
              formikMaxLength={5}
            />
            <DataModal
              visible={genderModal}
              backPress={tapBackground}
              swipeComplete={() => setGenderModal(!genderModal)}
              show={showAlert}
              alertTitle={"Salir sin guardar?"}
              alertCancel={"No, continuar"}
              alertConfirm={"Si, sin guardar"}
              genderSelect
              cancelPressed={() => {
                setShowAlert(false);
              }}
              confirmedPressed={() => {
                setGenderModal(!genderModal);
                setShowAlert(false);
              }}
              initialValues={{ gender: "" }}
              submit={(values, actions) => {
                const { gender } = values;

                submitGenderInfo(gender);
                actions.setSubmitting(false);
              }}
              schema={validationSchemaBase}
              formikLabel={"GÉNERO"}
              FormikKey={"gender"}
              formikKeyboard={"numeric"}
            />
            {showDatos && (
              <BasicInfoScroll
                agePress={() => {
                  setAgeModal(true);
                }}
                heightPress={() => {
                  setHeightModal(true);
                }}
                weightPress={() => {
                  setWeightModal(true);
                }}
                genderPress={() => {
                  setGenderModal(true);
                }}
                age={age}
                height={height}
                weight={weight}
                gender={gender}
              />
            )}
            <View style={styles.edit}>
              <TouchableOpacity
                onPress={() => {
                  setShowProgreso((prevState) => !prevState);
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View>
                    <Subtitle>{"Progreso".toUpperCase()}</Subtitle>
                  </View>
                  <View style={{ marginTop: 20, marginLeft: 15 }}>
                    <Ionicons
                      name={
                        showProgreso
                          ? "ios-arrow-dropdown-circle"
                          : "ios-arrow-dropup-circle"
                      }
                      size={25}
                      color={Colors.noExprimary}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            {showProgreso && (
              <Carousel
                style="slides"
                itemsPerInterval={1}
                items={[
                  {
                    title: "BMI",
                    result: bmi,
                    edit: () => {
                      setImcModal(true);
                    },
                    button: "Editar IMC",
                    bmi: bmi,
                  },
                  {
                    title: "Grasa",
                    result: fat,
                    edit: () => {
                      setFatModal(true);
                    },
                    button: "Editar Grasa",
                    gender: gender,
                    age: age,
                    fat: fat,
                  },
                  {
                    title: "Músculo",
                    result: muscle,
                    edit: () => {
                      setMuscleModal(true);
                    },
                    button: "Editar Músculo",
                    muscle: muscle,
                    age: age,
                    gender: gender,
                  },
                  {
                    title: "KCAL",
                    result: kcal,
                    edit: () => {
                      setKcalModal(true);
                    },
                    button: "Editar KCAL",
                  },
                  {
                    title: "Edad Metabolica",
                    result: meta,
                    edit: () => {
                      setMetaModal(true);
                    },
                    button: "Editar Edad Metabolica",
                  },
                  {
                    title: "Grasa Viseral",
                    result: vifat,
                    edit: () => {
                      setVifatModal(true);
                    },
                    button: "Editar Grasa Viseral",
                    vifat: vifat,
                  },
                ]}
              />

              // <View style={styles.wheelBlock}>
              //   <View>
              //     <TouchableOpacity
              //       onPress={() => {
              //         setImcModal(true);
              //       }}
              //     >
              //       <View style={styles.wheel}>
              //         <ProgressWheel
              //           composition={"IMC"}
              //           current={parseInt(bmi)}
              //           Meta={18}
              //           update={updatedBmi}
              //         />
              //       </View>
              //     </TouchableOpacity>
              //     <TouchableOpacity
              //       onPress={() => {
              //         setImcModal(true);
              //       }}
              //     >
              //       <View
              //         style={{
              //           marginTop: 10,
              //         }}
              //       >
              //         <View>
              //           <BaseEvalDT
              //             current={bmi}
              //             metaTitle={"Meta"}
              //             Meta={18}
              //           />
              //         </View>
              //       </View>
              //     </TouchableOpacity>
              //   </View>

              //   <View>
              //     <TouchableOpacity
              //       onPress={() => {
              //         setFatModal(true);
              //       }}
              //     >
              //       <View style={styles.wheel}>
              //         <ProgressWheel
              //           composition={"Grasa"}
              //           current={parseInt(fat)}
              //           Meta={10}
              //         />
              //       </View>
              //     </TouchableOpacity>
              //     <TouchableOpacity
              //       onPress={() => {
              //         setFatModal(true);
              //       }}
              //     >
              //       <View
              //         style={{
              //           marginTop: 10,
              //         }}
              //       >
              //         <View>
              //           <BaseEvalDT
              //             current={fat}
              //             metaTitle={"Meta"}
              //             Meta={10}
              //           />
              //         </View>
              //       </View>
              //     </TouchableOpacity>
              //   </View>
              // </View>
            )}

            {/* {showProgreso && (
              <View style={styles.wheelBlock}>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      setMuscleModal(true);
                    }}
                  >
                    <View style={styles.wheel}>
                      <ProgressWheel
                        composition={"Músculo"}
                        current={parseInt(muscle)}
                        Meta={48}
                      />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setMuscleModal(true);
                    }}
                  >
                    <View
                      style={{
                        marginTop: 10,
                      }}
                    >
                      <View>
                        <BaseEvalDT
                          current={muscle}
                          metaTitle={"Meta"}
                          Meta={48}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>

                <View>
                  <TouchableOpacity
                    onPress={() => {
                      setKcalModal(true);
                    }}
                  >
                    <View style={styles.wheel}>
                      <ProgressWheel
                        composition={"KCAL"}
                        current={parseInt(kcal)}
                        Meta={2000}
                      />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setKcalModal(true);
                    }}
                  >
                    <View
                      style={{
                        marginTop: 10,
                      }}
                    >
                      <View>
                        <BaseEvalDT
                          current={kcal}
                          metaTitle={"Meta"}
                          Meta={2000}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {showProgreso && (
              <View style={styles.wheelBlock}>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      setMetaModal(true);
                    }}
                  >
                    <View style={styles.wheel}>
                      <ProgressWheel
                        composition={"Metabolica"}
                        current={parseInt(meta)}
                        Meta={15}
                      />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setMetaModal(true);
                    }}
                  >
                    <View
                      style={{
                        marginTop: 10,
                      }}
                    >
                      <View>
                        <BaseEvalDT
                          current={meta}
                          metaTitle={"Meta"}
                          Meta={19}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>

                <View>
                  <TouchableOpacity
                    onPress={() => {
                      setVifatModal(true);
                    }}
                  >
                    <View style={styles.wheel}>
                      <ProgressWheel
                        composition={"Viseral"}
                        current={parseInt(vifat)}
                        Meta={1}
                      />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setVifatModal(true);
                    }}
                  >
                    <View
                      style={{
                        marginTop: 10,
                      }}
                    >
                      <View>
                        <BaseEvalDT
                          current={vifat}
                          metaTitle={"Meta"}
                          Meta={3}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            )} */}
            <View>
              <View style={styles.edit}>
                <TouchableOpacity
                  onPress={() => {
                    setShowImagen((prevState) => !prevState);
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <View>
                      <Subtitle>{"progress imagen".toUpperCase()}</Subtitle>
                    </View>
                    <View style={{ marginTop: 20, marginLeft: 15 }}>
                      <Ionicons
                        name={
                          showImagen
                            ? "ios-arrow-dropdown-circle"
                            : "ios-arrow-dropup-circle"
                        }
                        size={25}
                        color={Colors.noExprimary}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>

              {showImagen && (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginLeft: 30,
                    marginRight: 30,
                  }}
                >
                  <ImagePicker
                    onImageTaken={frontImageTakenHandler}
                    title="Base Frontal"
                    source={FImage}
                    onDelete={frontImageDeleteHandler}
                    refresh={() => loadDetails()}
                  />
                  <ImagePicker
                    onImageTaken={sideImageTakenHandler}
                    title="Base Lateral"
                    source={SImage}
                    onDelete={sideImageDeleteHandler}
                    refresh={() => loadDetails()}
                  />
                </View>
              )}
            </View>
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
  basicInfo: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 25,
    color: "#6C6C6C",
    fontFamily: "open-sans-bold",
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
    backgroundColor: "#ffc733",
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
