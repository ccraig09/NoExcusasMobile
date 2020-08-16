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
  Text,
  Button,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import * as updateActions from "../store/actions/evalUpdate";
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
  const EId = evalId;
  const EvalTitle = props.navigation.getParam("evalTitle");
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
  const Eid = EId;
  // const UpId = updatedId;

  const updatedBmi = loadedUpdates.length === 0 ? "" : loadedUpdates[0].bmi;

  const UpId = loadedUpdates.length === 0 ? "" : loadedUpdates[0].id;

  const loadDetails = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    dispatch(updateActions.fetchUpdates(Eid));
    console.log("eid will =", Eid);

    try {
      await dispatch(detailsActions.fetchMemberDetails());
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

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

  const updateMetaInfo = useCallback(async (meta) => {
    try {
      dispatch(updateActions.metaInfo(meta));
    } catch (err) {
      setError(err.message);
    }
    loadDetails();
    setMetaModal(!metaModal);
  });
  const editBmiInfo = useCallback(async (bmi, UpId, Eid) => {
    console.log("this is the updated id", UpId);
    const UpdId = UpId.UpId;
    try {
      dispatch(updateActions.bmiEdit(bmi, UpdId, Eid));
    } catch (err) {
      setError(err.message);
    }
    loadDetails();
    setImcModal(!imcModal);
  });
  const updateBmiInfo = useCallback(async (bmi, Eid) => {
    try {
      dispatch(updateActions.bmiInfo(bmi, Eid));
    } catch (err) {
      setError(err.message);
    }
    setImcModal(!imcModal);
    loadDetails();
  });
  const updateVifat = useCallback(async (vifat) => {
    try {
      dispatch(updateActions.vifatInfo(vifat));
    } catch (err) {
      setError(err.message);
    }
    loadDetails();
    setVifatModal(!vifatModal);
  });
  const updateKcalInfo = useCallback(async (kcal) => {
    try {
      dispatch(updateActions.kcalInfo(kcal));
    } catch (err) {
      setError(err.message);
    }
    loadDetails();
    setKcalModal(!kcalModal);
  });
  const updateMuscleInfo = useCallback(async (muscle) => {
    try {
      dispatch(updateActions.muscleInfo(muscle));
    } catch (err) {
      setError(err.message);
    }
    loadDetails();
    setMuscleModal(!muscleModal);
  });
  const updateFatInfo = useCallback(async (fat) => {
    try {
      dispatch(updateActions.fatInfo(fat));
    } catch (err) {
      setError(err.message);
    }
    loadDetails();
    setFatModal(!fatModal);
  });

  const deleteHandler = (Eid) => {
    Alert.alert("¿Usted esta seguro?", "Quiere borrar este ítem?", [
      { text: "No", style: "default" },
      {
        text: "Si",
        style: "destructive",
        onPress: () => {
          dispatch(updateActions.deleteEval(Eid));
        },
      },
    ]);
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
                onPress={deleteHandler.bind(this, Eid)}
              />
            </View>
          </View>

          {updatedBmi ? (
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

                actions.setSubmitting(false);
                editBmiInfo(bmi, { UpId }, { Eid });
              }}
              schema={validationSchemaEval}
              genderSelect={false}
              formikLabel={"IMC"}
              FormikKey={"bmi"}
              formikKeyboard={"numeric"}
              formikMaxLength={4}
            />
          ) : (
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
          )}
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

              updateMetaInfo(meta);
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

              updateVifat(vifat);
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

              updateKcalInfo(kcal);
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

              updateMuscleInfo(muscle);
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

              updateFatInfo(fat);
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
                    composition={"IMC"}
                    current={parseInt(bmi)}
                    Meta={18}
                    update={bmi - updatedBmi}
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
                      title1="Eval"
                      title2="logro"
                      metaTitle={"Meta"}
                      Meta={18}
                      update={updatedBmi}
                      difference={bmi - updatedBmi}
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
                    current={parseInt(fat)}
                    Meta={10}
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
                    <UpdateDT current={fat} metaTitle={"Meta"} Meta={10} />
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
                    <UpdateDT current={muscle} metaTitle={"Meta"} Meta={48} />
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
                    <UpdateDT current={kcal} metaTitle={"Meta"} Meta={2000} />
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
                    <UpdateDT current={meta} metaTitle={"Meta"} Meta={19} />
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
                    <UpdateDT current={vifat} metaTitle={"Meta"} Meta={3} />
                  </View>
                </View>
              </TouchableOpacity>
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
  centered: { justifyContent: "center", alignItems: "center" },
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
  margin-bottom: 20px;
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
