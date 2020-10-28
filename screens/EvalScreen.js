import React, { useState, useCallback, useEffect } from "react";
import {
  StatusBar,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Platform,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  View,
  Alert,
  Text,
  Button,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import * as updateActions from "../store/actions/evalUpdate";
import * as addEvalAction from "../store/actions/evals";
import ImagePicker from "../components/ImagePicker";
import firebase from "../components/firebase";
import * as detailsActions from "../store/actions/membersDetails";
import Toast from "react-native-tiny-toast";

import * as yup from "yup";

import ProgressWheel from "../components/UI/ProgressWheel";
import UpdateDT from "../components/UpdateTable";
import DataModal from "../components/DataModal";
import Colors from "../constants/Colors";

let screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

StatusBar.setHidden(true);

const EvalScreen = (props) => {
  const dispatch = useDispatch();
  const loadedMemberDeets = useSelector((state) => state.memberdeets.details);
  const loadedUpdates = useSelector((state) => state.updates.updates);
  const evalId = props.navigation.getParam("evalId");
  const docId = props.navigation.getParam("docTitle");

  const EId = evalId;
  const EvalTitle = props.navigation.getParam("evalTitle");
  const EvTitle = JSON.stringify(EvalTitle);
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [imcModal, setImcModal] = useState(false);
  const [vifatModal, setVifatModal] = useState(false);
  const [kcalModal, setKcalModal] = useState(false);
  const [muscleModal, setMuscleModal] = useState(false);
  const [fatModal, setFatModal] = useState(false);
  const [metaModal, setMetaModal] = useState(false);

  // const updatedBmi = loadedUpdates;
  // const updatedId = loadedUpdates;
  const bmi = loadedMemberDeets.BMI;
  const fat = loadedMemberDeets.Fat;
  const muscle = loadedMemberDeets.Muscle;
  const kcal = loadedMemberDeets.KCAL;
  const meta = loadedMemberDeets.Metabolical;
  const vifat = loadedMemberDeets.ViFat;
  const gender =
    typeof loadedMemberDeets.Gender === "undefined"
      ? ""
      : loadedMemberDeets.Gender;
  const age =
    typeof loadedMemberDeets.Age === "undefined" ? "" : loadedMemberDeets.Age;
  const Eid = EId;
  // const UpId = updatedId;
  const [FImage, setFImage] = useState(null);
  const [SImage, setSImage] = useState(null);
  const updatedBmi = loadedUpdates.length === 0 ? "" : loadedUpdates[0].bmi;
  const updatedMeta = loadedUpdates.length === 0 ? "" : loadedUpdates[0].meta;
  const updatedVifat = loadedUpdates.length === 0 ? "" : loadedUpdates[0].vifat;
  const updatedKcal = loadedUpdates.length === 0 ? "" : loadedUpdates[0].kcal;
  const updatedMuscle =
    loadedUpdates.length === 0 ? "" : loadedUpdates[0].muscle;
  const updatedFat = loadedUpdates.length === 0 ? "" : loadedUpdates[0].fat;

  const UpId = loadedUpdates.length === 0 ? "" : loadedUpdates[0].id;

  const loadDetails = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    dispatch(updateActions.fetchUpdates(Eid));

    try {
      await dispatch(detailsActions.fetchMemberDetails());
    } catch (err) {
      setError(err.message);
    }
    await frontImageLoad();
    await sideImageLoad();
    setIsRefreshing(false);
  }, [dispatch, setIsRefreshing, setError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener("willFocus", loadDetails);
    return () => {
      willFocusSub.remove();
    };
  }, [loadDetails]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      setIsLoading(true);

      loadDetails();
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const frontImageLoad = useCallback(async () => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        var userId = user.uid.toString();
        var storage = firebase.storage().ref();
        storage
          .child(`UserBaseImages/${userId}/${Eid}/FrontImage`)
          .getDownloadURL()
          .then(function (url) {
            setFImage(url);
          })
          .catch(function (error) {
            switch (error.code) {
              case "storage/object-not-found":
                // console.log(error);
                break;
              case "storage/unauthorized":
                // User doesn't have permission to access the object
                break;

              case "storage/canceled":
                // User canceled the upload
                break;
            }
          });
      }
    });
  });

  const sideImageLoad = useCallback(async () => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        var userId = user.uid.toString();
        var storage = firebase.storage().ref();
        storage
          .child(`UserBaseImages/${userId}/${Eid}/SideImage`)
          .getDownloadURL()
          .then(function (url) {
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

  const updateMetaInfo = useCallback(async (meta) => {
    const toast = Toast.showLoading("Subiendo Edad Metabolica");
    setTimeout(() => {
      // Recommend
      Toast.hide(toast);

      // or Toast.hide()
      // If you don't pass toast，it will hide the last toast by default.
    }, 3000);
    try {
      dispatch(updateActions.metaInfo(meta, Eid, EvTitle));
    } catch (err) {
      setError(err.message);
    }
    setMetaModal(!metaModal);
    loadDetails();
  });

  const updateBmiInfo = useCallback(async (bmi) => {
    const toast = Toast.showLoading("Subiendo IMC");
    setTimeout(() => {
      // Recommend
      Toast.hide(toast);

      // or Toast.hide()
      // If you don't pass toast，it will hide the last toast by default.
    }, 3000);
    try {
      dispatch(updateActions.bmiInfo(bmi, Eid, EvTitle));
    } catch (err) {
      setError(err.message);
    }
    setImcModal(!imcModal);
    loadDetails();
    // setTimeout(() => loadDetails(), 3000);
  });
  const updateVifat = useCallback(async (vifat) => {
    const toast = Toast.showLoading("Subiendo Grasa Visceral");
    setTimeout(() => {
      // Recommend
      Toast.hide(toast);

      // or Toast.hide()
      // If you don't pass toast，it will hide the last toast by default.
    }, 3000);
    try {
      dispatch(updateActions.vifatInfo(vifat, Eid, EvTitle));
    } catch (err) {
      setError(err.message);
    }
    setVifatModal(!vifatModal);
    loadDetails();
  });
  const updateKcalInfo = useCallback(async (kcal) => {
    const toast = Toast.showLoading("Subiendo KCAL");
    setTimeout(() => {
      // Recommend
      Toast.hide(toast);

      // or Toast.hide()
      // If you don't pass toast，it will hide the last toast by default.
    }, 3000);
    try {
      dispatch(updateActions.kcalInfo(kcal, Eid, EvTitle));
    } catch (err) {
      setError(err.message);
    }
    loadDetails();
    setKcalModal(!kcalModal);
  });
  const updateMuscleInfo = useCallback(async (muscle) => {
    const toast = Toast.showLoading("Subiendo Músculo");
    setTimeout(() => {
      // Recommend
      Toast.hide(toast);

      // or Toast.hide()
      // If you don't pass toast，it will hide the last toast by default.
    }, 3000);
    try {
      dispatch(updateActions.muscleInfo(muscle, Eid, EvTitle));
    } catch (err) {
      setError(err.message);
    }
    loadDetails();
    setMuscleModal(!muscleModal);
  });
  const updateFatInfo = useCallback(async (fat) => {
    const toast = Toast.showLoading("Subiendo Grasa");
    setTimeout(() => {
      // Recommend
      Toast.hide(toast);

      // or Toast.hide()
      // If you don't pass toast，it will hide the last toast by default.
    }, 3000);
    try {
      dispatch(updateActions.fatInfo(fat, Eid, EvTitle));
    } catch (err) {
      setError(err.message);
    }
    setFatModal(!fatModal);
    loadDetails();
  });

  const deleteHandler = (docId, UpId, Eid) => {
    // const UpdId = UpId.UpId;
    // console.log("this is the deleted docId=", docId);
    // console.log("this is the deleted subdocid=", UpId);
    // console.log("this is the deleted eid=", Eid);

    Alert.alert("¿Usted esta seguro?", "Quiere borrar este evaluación?", [
      { text: "No", style: "default" },
      {
        text: "Si",
        style: "destructive",
        onPress: async () => {
          if (UpId === "") {
            // dispatch(updateActions.deleteSub(UpId));
            // dispatch(updateActions.deleteImages(Eid));
            if (SImage) await dispatch(updateActions.deleteLateral(Eid));
            if (FImage) await dispatch(updateActions.deleteFrontal(Eid));
            dispatch(addEvalAction.deleteEval(docId));
            props.navigation.goBack();
          } else {
            dispatch(updateActions.deleteSub(UpId));
            if (SImage) await dispatch(updateActions.deleteLateral(Eid));
            if (FImage) await dispatch(updateActions.deleteFrontal(Eid));
            dispatch(addEvalAction.deleteEval(docId));
            props.navigation.goBack();
          }
        },
      },
    ]);
  };

  const frontImageTakenHandler = useCallback(async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    try {
      await dispatch(updateActions.frontImage(blob, Eid));
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
    setTimeout(() => frontImageLoad(), 4500);
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
      await dispatch(updateActions.sideImage(blobS, Eid));
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
    setTimeout(() => sideImageLoad(), 4500);
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

  const tapBackground = () => {
    setShowAlert(true);
  };

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

  // if (loadedUpdates.length === 0) {
  //   return (
  //     <View style={styles.centered}>
  //       <Text>No products found. Maybe start adding some!</Text>
  //     </View>
  //   );
  // }

  return (
    <RootView>
      <Container>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={loadDetails} />
          }
        >
          <View style={styles.titleBar}>
            <View>
              <Text style={styles.evalTitle}>{EvalTitle}</Text>
              <Text style={{ marginLeft: 20 }}>"Date Picker"</Text>
            </View>
            <View style={{ marginRight: 20 }}>
              <Button
                title="Borrar"
                color="red"
                onPress={deleteHandler.bind(this, docId, UpId, Eid)}
              />
            </View>
          </View>

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

              updateBmiInfo(bmi, { Eid });
              actions.setSubmitting(false);
            }}
            schema={validationSchemaEval}
            genderSelect={false}
            formikLabel={"IMC"}
            FormikKey={"bmi"}
            formikKeyboard={"numeric"}
            formikMaxLength={4}
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

              updateMetaInfo(meta, { Eid });
              actions.setSubmitting(false);
            }}
            schema={validationSchemaEval}
            genderSelect={false}
            formikLabel={"EDAD METABOLICA"}
            FormikKey={"meta"}
            formikKeyboard={"numeric"}
            formikMaxLength={2}
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

              updateVifat(vifat, { Eid });
              actions.setSubmitting(false);
            }}
            schema={validationSchemaEval}
            genderSelect={false}
            formikLabel={"Grasa Viseral"}
            FormikKey={"vifat"}
            formikKeyboard={"numeric"}
            formikMaxLength={2}
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

              updateKcalInfo(kcal), { Eid };
              actions.setSubmitting(false);
            }}
            schema={validationSchemaEval}
            genderSelect={false}
            formikLabel={"KCAL"}
            FormikKey={"kcal"}
            formikKeyboard={"numeric"}
            formikMaxLength={4}
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

              updateMuscleInfo(muscle), { Eid };
              actions.setSubmitting(false);
            }}
            schema={validationSchemaEval}
            genderSelect={false}
            formikLabel={"MÚSCULO"}
            FormikKey={"muscle"}
            formikKeyboard={"numeric"}
            formikMaxLength={4}
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

              updateFatInfo(fat), { Eid };
              actions.setSubmitting(false);
            }}
            schema={validationSchemaEval}
            genderSelect={false}
            formikLabel={"GRASA"}
            FormikKey={"fat"}
            formikKeyboard={"numeric"}
            formikMaxLength={4}
          />

          <Subtitle>Progreso</Subtitle>
          <View>
            {loadedUpdates.length === 0 ? (
              <View style={styles.centered}>
                <Text>
                  Oprime una composición para actualizar primer evaluación
                </Text>
              </View>
            ) : (
              <View style={styles.centered}>
                <Text>Oprime una composición para actualizar evaluación</Text>
              </View>
            )}
          </View>
          <View style={styles.wheelBlock}>
            <View>
              <TouchableOpacity
                onPress={() => {
                  setImcModal(true);
                }}
              >
                <View style={styles.wheel}>
                  <ProgressWheel
                    title="BMI"
                    composition={"IMC"}
                    current={parseInt(bmi)}
                    update={bmi - updatedBmi}
                    // onChange={() => loadDetails()}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setImcModal(true);
                }}
              >
                <View
                  style={{
                    marginTop: 10,
                  }}
                >
                  <View>
                    <UpdateDT
                      title="BMI"
                      title1="Eval"
                      title2="logro"
                      metaTitle={"Meta"}
                      update={updatedBmi}
                      difference={updatedBmi === "" ? "" : bmi - updatedBmi}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                onPress={() => {
                  setFatModal(true);
                }}
              >
                <View style={styles.wheel}>
                  <ProgressWheel
                    composition={"Grasa"}
                    title={"Grasa"}
                    gender={gender}
                    age={age}
                    current={parseInt(fat)}
                    update={fat - updatedFat}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setFatModal(true);
                }}
              >
                <View
                  style={{
                    marginTop: 10,
                  }}
                >
                  <View>
                    <UpdateDT
                      title={"Grasa"}
                      gender={gender}
                      age={age}
                      title1="Eval"
                      title2="logro"
                      metaTitle={"Meta"}
                      update={updatedFat}
                      difference={updatedFat === "" ? "" : fat - updatedFat}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.wheelBlock}>
            <View>
              <TouchableOpacity
                onPress={() => {
                  setMuscleModal(true);
                }}
              >
                <View style={styles.wheel}>
                  <ProgressWheel
                    title={"Músculo"}
                    gender={gender}
                    age={age}
                    composition={"Músculo"}
                    current={parseInt(muscle)}
                    update={muscle - updatedMuscle}
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
                    <UpdateDT
                      title={"Músculo"}
                      gender={gender}
                      age={age}
                      title1="Eval"
                      title2="logro"
                      metaTitle={"Meta"}
                      update={updatedMuscle}
                      difference={
                        updatedMuscle === "" ? "" : muscle - updatedMuscle
                      }
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
                    title={"Grasa Viseral"}
                    composition={"Viseral"}
                    current={parseInt(vifat)}
                    Meta={6}
                    update={vifat - updatedVifat}
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
                    <UpdateDT
                      title={"Grasa Viseral"}
                      title1="Eval"
                      title2="logro"
                      metaTitle={"Meta"}
                      Meta={10}
                      update={updatedVifat}
                      difference={
                        updatedVifat === "" ? "" : vifat - updatedVifat
                      }
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
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
                    title={"Metabolica"}
                    age={age}
                    update={meta - updatedMeta}
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
                    <UpdateDT
                      title={"Metabolica"}
                      age={age}
                      title1="Eval"
                      title2="logro"
                      metaTitle={"Meta"}
                      update={updatedMeta}
                      difference={updatedMeta === "" ? "" : meta - updatedMeta}
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
                    update={kcal - updatedKcal}
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
                    <UpdateDT
                      title1="Eval"
                      title2="logro"
                      metaTitle={"Meta"}
                      Meta={10}
                      update={updatedKcal}
                      difference={updatedKcal === "" ? "" : kcal - updatedKcal}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Subtitle>{"progress imagen".toUpperCase()}</Subtitle>
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
                title="Frontal"
                source={FImage}
                docId={docId}
                UpId={UpId}
                Eid={Eid}
                onDelete={frontImageDeleteHandler}
                refresh={() => loadDetails()}
              />
              <ImagePicker
                onImageTaken={sideImageTakenHandler}
                title="Lateral"
                source={SImage}
                docId={docId}
                UpId={UpId}
                Eid={Eid}
                onDelete={sideImageDeleteHandler}
                refresh={() => loadDetails()}
              />
            </View>
          </View>
        </ScrollView>
      </Container>
      <TouchableOpacity
        onPress={() => {
          props.navigation.goBack();
        }}
        style={{ position: "absolute", top: 20, right: 20 }}
      >
        <CloseView>
          <Ionicons
            name="ios-close"
            size={36}
            color="#4775f2"
            style={{ marginTop: -2 }}
          />
        </CloseView>
      </TouchableOpacity>
    </RootView>
  );
};

EvalScreen.navigationOptions = {
  headerShown: false,
  mode: "modal",
};

export default EvalScreen;

const styles = StyleSheet.create({
  evalTitle: {
    color: "black",
    fontWeight: "600",
    fontSize: 25,
    marginLeft: 20,
    marginTop: 55,
    marginBottom: 20,
    textTransform: "uppercase",
  },
  titleBar: {
    flexDirection: "row",
    width: "100%",
    marginTop: 50,
    justifyContent: "space-between",
    alignItems: "center",
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
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});

const RootView = styled.View`
  background: black;
  /* margin-top: 80px; */
  flex: 1;
`;
const Container = styled.View`
  flex: 1;
  background-color: #f0f3f5;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const Subtitle = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 25px;
  margin-left: 20px;
  margin-top: 55px;
  margin-bottom: 30px;
  text-transform: uppercase;
`;

const Content = styled.View`
  height: ${screenHeight}px;
  width: ${screenWidth}px;
  background: #f0f3f5;
  margin: -15px;
  padding: 50px;
`;
const DataContainer = styled.View`
  background: #fcc454;
  height: 375px;
  width: 350px;
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
  justify-content: center;
  align-self: center;
  padding: 15px;
`;

const CloseView = styled.View`
  width: 32px;
  height: 32px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  justify-content: center;
  align-items: center;
`;
