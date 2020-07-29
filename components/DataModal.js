import React from "react";
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  Button,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import Modal from "react-native-modal";
import { Formik } from "formik";
import * as yup from "yup";
import DropDownPicker from "react-native-dropdown-picker";
import AwesomeAlert from "react-native-awesome-alerts";

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
  });
  const validationSchemaBase = yup.object().shape({
    age: yup
      .number()
      .typeError("Debe ser un número")
      .max(99, "Dos digitos por edad por favor")
      .required(),
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
              <Text style={styles.modalText}>Editar Informacion</Text>

              <Formik
                initialValues={props.initialValues}
                onSubmit={props.submit}
                validationSchema={props.schema}
              >
                {(formikProps) => (
                  <React.Fragment>
                    {props.genderSelect ? (
                      <View style={styles.picker}>
                        <DropDownPicker
                          items={[
                            { label: "Masculino", value: "M" },
                            { label: "Femenino", value: "F" },
                          ]}
                          defaultIndex={0}
                          containerStyle={{ height: 40 }}
                          onChangeItem={(item) =>
                            console.log(item.label, item.value)
                          }
                        />
                      </View>
                    ) : (
                      <View style={{ marginTop: 10 }}>
                        <StyledInput
                          label={props.formikLabel}
                          formikProps={formikProps}
                          formikKey={props.FormikKey}
                          keyboardType={props.formikKeyboard}
                          maxLength={props.formikMaxLength}
                          placeholder={props.formikPlaceholder}
                        />
                      </View>
                    )}
                    {formikProps.isSubmitting ? (
                      <ActivityIndicator />
                    ) : (
                      <Button
                        title="Guardar"
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
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  picker: {
    marginBottom: 80,

    height: 60,
    width: 200,
  },
});

export default DataModal;
