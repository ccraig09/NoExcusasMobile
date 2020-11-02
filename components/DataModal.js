import React from "react";
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  Button,
  TextInput,
  ActivityIndicator,
  Picker,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import Modal from "react-native-modal";
import { Formik } from "formik";
import * as yup from "yup";
import AwesomeAlert from "react-native-awesome-alerts";
import Colors from "../constants/Colors";

const DataModal = (props) => {
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
          onChangeText={formikProps.handleChange(props.FormikKey)}
          onBlur={formikProps.handleBlur(props.FormikKey)}
          {...rest}
        />
      </FieldWrapper>
    );
  };

  const validationSchema = yup.object().shape({
    name: yup.string().label("name").required(),
    last: yup.string().label("last").required(),
    title: yup.string().label("title").required(),
  });
  const validationSchemaBase = yup.object().shape({
    title: yup.string().label("title").required(),
    age: yup
      .number()
      .typeError("Debe ser un número")
      .max(99, "Digitos validos por favor")
      .required(),
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

  return (
    <Modal
      isVisible={props.visible}
      animationIn="slideInLeft"
      customBackdrop={
        <TouchableWithoutFeedback onPress={props.backPress}>
          <View style={{ flex: 1, backgroundColor: "black" }}></View>
        </TouchableWithoutFeedback>
      }
      avoidKeyboard
      onBackButtonPress={props.backPress}
      onSwipeComplete={props.swipeComplete}
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
            show={props.show}
            showProgress={false}
            title={props.alertTitle}
            message=""
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            showConfirmButton={true}
            cancelText={props.alertCancel}
            confirmText={props.alertConfirm}
            confirmButtonColor="#DD6B55"
            onCancelPressed={props.cancelPressed}
            onConfirmPressed={props.confirmedPressed}
          />
          <View style={styles.modalView}>
            <View style={styles.form}>
              <Text style={styles.modalText}>Editar {props.formikLabel}</Text>

              <Formik
                initialValues={props.initialValues}
                onSubmit={props.submit}
                validationSchema={props.schema}
              >
                {(formikProps) => (
                  <React.Fragment>
                    {props.genderSelect ? (
                      <View style={styles.picker}>
                        <Picker
                          selectedValue={formikProps.values.gender}
                          mode="dropdown"
                          style={{
                            height: 30,
                            marginTop: 20,
                            marginBottom: 30,
                            width: 200,
                            justifyContent: "center",
                          }}
                          itemStyle={{ fontSize: 16 }}
                          onValueChange={(itemValue) =>
                            formikProps.setFieldValue("gender", itemValue)
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
                          <Picker.Item label="Femenino" color="red" value="F" />
                        </Picker>
                      </View>
                    ) : (
                      <View style={{ marginTop: 10 }}>
                        {props.description ? (
                          <View>
                            <Image
                              style={styles.image}
                              source={props.bodyIcon}
                            />
                            <Text style={{ marginBottom: 10 }}>
                              {props.description}
                            </Text>
                          </View>
                        ) : null}
                        <View
                          style={{
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <StyledInput
                            label={props.formikLabel}
                            formikProps={formikProps}
                            formikKey={props.FormikKey}
                            keyboardType={props.formikKeyboard}
                            maxLength={props.formikMaxLength}
                            placeholder={props.formikPlaceholder}
                          />
                        </View>
                      </View>
                    )}
                    {formikProps.isSubmitting ? (
                      <ActivityIndicator />
                    ) : (
                      <Button
                        title="Guardar"
                        color={Colors.noExprimary}
                        onPress={formikProps.handleSubmit}
                      />
                    )}
                  </React.Fragment>
                )}
              </Formik>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "100%",
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
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  picker: {
    marginTop: 40,
    marginBottom: 30,

    height: 70,
    width: 200,
  },
  image: {
    height: 100,
    width: 100,
    alignSelf: "center",
    marginBottom: 5,
  },
});

export default DataModal;
