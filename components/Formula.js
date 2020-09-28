import React, { useState, useCallback, useReducer, useEffect } from "react";
import { View, Text } from "react-native";

const Formula = (props) => {
  const res = () => {
    if (props.title === "BMI") {
      return bmiRes();
    }
    if (props.title === "Grasa") {
      return fatRes();
    }
  };

  const bmiRes = () => {
    if (props.bmi < "18.5") {
      return "Peso inferior al normal";
    }
    if (props.bmi > "18.6" && props.bmi < "24.9") {
      return "Normal";
    }
    if (props.bmi > "25" && props.bmi < "29.9") {
      return "Sobrepeso";
    }
    if (props.bmi > "30") {
      return "Obesidad";
    }
  };

  const fatRes = () => {
    if (props.fat < "21") {
      return "Bajo";
    }
  };
  // const gender = () => {
  //   if (
  //     props.gender === "M" &&
  //     props.age < "29" &&
  //     props.age > "25" &&
  //     props.bmi > "27" &&
  //     props.bmi < "29"
  //   ) {
  //     return "yaaa estas bien";
  //   }
  //   if (
  //     props.gender === "M" &&
  //     props.age < "29" &&
  //     props.age > "25" &&
  //     props.bmi > "23" &&
  //     props.bmi < "26"
  //   ) {
  //     return "test 1";
  //   }
  //   if (
  //     props.gender === "M" &&
  //     props.age < "29" &&
  //     props.age > "25" &&
  //     props.bmi > "20" &&
  //     props.bmi < "22"
  //   ) {
  //     return "test 2";
  //   }
  // };
  //   (props.gender === "M") &
  //   (props.age < "29" && props.age > "25") &
  //   (props.bmi > "27" && props.bmi < "29")
  //     ? "yaaa estas bien"
  //     : "wouuu tranquilo ya";
  // (props.gender === "M") &
  // (props.age < "29" && props.age > "25") &
  // (props.bmi > "23" && props.bmi < "26")
  //   ? "testing 1"
  //   : "testing 2";
  // (props.gender === "M") &
  // (props.age < "29" && props.age > "25") &
  // (props.bmi > "20" && props.bmi < "22")
  //   ? "testing 3"
  //   : "testing 4";

  return (
    <View>
      <Text>
        {res()}
        {/* {bmiRes()} {fatRes()} */}
      </Text>
    </View>
  );
};

export default Formula;

//add text and view
// import this into diffenent caroulel component
