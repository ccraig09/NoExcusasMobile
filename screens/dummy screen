import React, { useState, useCallback, useEffect } from "react";
import {
  StatusBar,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Platform,
  StyleSheet,
  View,
  Text,
} from "react-native";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import * as detailsActions from "../store/actions/membersDetails";

import ProgressWheel from "../components/UI/ProgressWheel";
import BaseEvalDT from "../components/BaseEvalDataTable";
import DataModal from "../components/DataModal";

let screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

StatusBar.setHidden(true);

const EvalScreen = (props) => {
  const evalId = props.navigation.getParam("evalId");
  const EvalTitle = props.navigation.getParam("evalTitle");

  const [imcModal, setImcModal] = useState(false);
  const [vifatModal, setVifatModal] = useState(false);
  const [kcalModal, setKcalModal] = useState(false);
  const [muscleModal, setMuscleModal] = useState(false);
  const [fatModal, setFatModal] = useState(false);
  const [metaModal, setMetaModal] = useState(false);

  const dispatch = useDispatch();

  const bmi = loadedMemberDeets.BMI;
  const fat = loadedMemberDeets.Fat;
  const muscle = loadedMemberDeets.Muscle;
  const kcal = loadedMemberDeets.KCAL;
  const meta = loadedMemberDeets.Metabolical;
  const vifat = loadedMemberDeets.ViFat;

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

  return (
    <RootView>
      <Container>
        <ScrollView>
          <View style={styles.titleBar}>
            <Text style={styles.evalTitle}>{EvalTitle}</Text>
            <Text>"Date Picker"</Text>
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

              submitBmiInfo(bmi);
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

              submitMetaInfo(meta);
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

              submitVifat(vifat);
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

              submitKcalInfo(kcal);
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

              submitMuscleInfo(muscle);
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

              submitFatInfo(fat);
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
                    <BaseEvalDT current={bmi} metaTitle={"Meta"} Meta={18} />
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
                    <BaseEvalDT current={fat} metaTitle={"Meta"} Meta={10} />
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
                    <BaseEvalDT current={muscle} metaTitle={"Meta"} Meta={48} />
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
                    <BaseEvalDT current={kcal} metaTitle={"Meta"} Meta={2000} />
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
                    <BaseEvalDT current={meta} metaTitle={"Meta"} Meta={19} />
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
                    <BaseEvalDT current={vifat} metaTitle={"Meta"} Meta={3} />
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
