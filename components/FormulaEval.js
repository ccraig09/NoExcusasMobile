import React from "react";
import { View, Text } from "react-native";

const Formula = (props) => {
  const res = () => {
    if (props.title === "IMC") {
      return bmiRes();
    }
    if (props.title === "Grasa") {
      return fatRes();
    }
    if (props.title === "Grasa Viseral") {
      return viFatRes();
    }
    if (props.title === "Músculo") {
      return muscleRes();
    }
  };

  const bmiRes = () => {
    if (props.updatedBmi < "18.5") {
      return "Peso inferior al normal";
    }
    if (props.updatedBmi >= "18.6" && props.updatedBmi <= "24.9") {
      return "Normal";
    }
    if (props.updatedBmi >= "25" && props.updatedBmi <= "29.9") {
      return "Sobrepeso";
    }
    if (props.updatedBmi >= "30") {
      return "Obesidad";
    }
  };

  const fatRes = () => {
    if (
      props.gender === "F" &&
      props.updatedFat < "21" &&
      props.age >= "20" &&
      props.age <= "39"
    ) {
      return "Bajo";
    }
    if (
      props.gender === "F" &&
      props.updatedFat < "23" &&
      props.age >= "40" &&
      props.age <= "59"
    ) {
      return "Bajo";
    }
    if (
      props.gender === "F" &&
      props.updatedFat < "24" &&
      props.age >= "60" &&
      props.age <= "79"
    ) {
      return "Bajo";
    }
    if (
      props.gender === "F" &&
      props.updatedFat >= "21" &&
      props.updatedFat <= "32.9" &&
      props.age >= "20" &&
      props.age <= "39"
    ) {
      return "Normal";
    }
    if (
      props.gender === "F" &&
      props.updatedFat >= "23" &&
      props.updatedFat <= "33.9" &&
      props.age >= "40" &&
      props.age <= "59"
    ) {
      return "Normal";
    }
    if (
      props.gender === "F" &&
      props.updatedFat >= "24" &&
      props.updatedFat <= "35.9" &&
      props.age >= "60" &&
      props.age <= "79"
    ) {
      return "Normal";
    }
    if (
      props.gender === "F" &&
      props.updatedFat >= "33" &&
      props.updatedFat <= "38.9" &&
      props.age >= "20" &&
      props.age <= "39"
    ) {
      return "Elevado";
    }
    if (
      props.gender === "F" &&
      props.updatedFat >= "34" &&
      props.updatedFat <= "39.9" &&
      props.age >= "40" &&
      props.age <= "59"
    ) {
      return "Elevado";
    }
    if (
      props.gender === "F" &&
      props.updatedFat >= "36" &&
      props.updatedFat <= "41.9" &&
      props.age >= "60" &&
      props.age <= "79"
    ) {
      return "Elevado";
    }
    if (
      props.gender === "F" &&
      props.updatedFat >= "39" &&
      props.age >= "20" &&
      props.age <= "39"
    ) {
      return "Muy elevado";
    }
    if (
      props.gender === "F" &&
      props.updatedFat >= "40" &&
      props.age >= "40" &&
      props.age <= "59"
    ) {
      return "Muy elevado";
    }
    if (
      props.gender === "F" &&
      props.updatedFat >= "42" &&
      props.age >= "60" &&
      props.age <= "79"
    ) {
      return "Muy elevado";
    }
    if (
      props.gender === "M" &&
      props.updatedFat < 8 &&
      props.age >= "20" &&
      props.age <= "39"
    ) {
      return "Bajo";
    }
    if (
      props.gender === "M" &&
      props.updatedFat < 11 &&
      props.age >= "40" &&
      props.age <= "59"
    ) {
      return "Bajo";
    }
    if (
      props.gender === "M" &&
      props.updatedFat < 13 &&
      props.age >= "60" &&
      props.age <= "79"
    ) {
      return "Bajo";
    }
    if (
      props.gender === "M" &&
      props.updatedFat >= 8 &&
      props.updatedFat <= 19.9 &&
      props.age >= "20" &&
      props.age <= "39"
    ) {
      return "Normal";
    }
    if (
      props.gender === "M" &&
      props.updatedFat >= 11 &&
      props.updatedFat <= 21.9 &&
      props.age >= "40" &&
      props.age <= "59"
    ) {
      return "Normal";
    }
    if (
      props.gender === "M" &&
      props.updatedFat >= 13 &&
      props.updatedFat <= 24.9 &&
      props.age >= "60" &&
      props.age <= "79"
    ) {
      return "Normal";
    }
    if (
      props.updatedFat >= 20 &&
      props.updatedFat <= 24.9 &&
      props.gender === "M" &&
      props.age >= "20" &&
      props.age <= "39"
    ) {
      return "Elevado";
    }
    if (
      props.updatedFat >= 22 &&
      props.updatedFat <= 27.9 &&
      props.gender === "M" &&
      props.age >= "40" &&
      props.age <= "59"
    ) {
      return "Elevado";
    }
    if (
      props.updatedFat >= 25 &&
      props.updatedFat <= 29.9 &&
      props.gender === "M" &&
      props.age >= "60" &&
      props.age <= "79"
    ) {
      return "Elevado";
    }
    if (
      props.updatedFat >= 25 &&
      props.gender === "M" &&
      props.age >= "20" &&
      props.age <= "39"
    ) {
      return "Muy elevado";
    }
    if (
      props.updatedFat >= 28 &&
      props.gender === "M" &&
      props.age >= "40" &&
      props.age <= "59"
    ) {
      return "Muy elevado";
    }
    if (
      props.updatedFat >= 30 &&
      props.gender === "M" &&
      props.age >= "60" &&
      props.age <= "79"
    ) {
      return "Muy elevado";
    }
  };
  const viFatRes = () => {
    if (props.updatedVifat <= 9) {
      return "Normal";
    }
    if (props.updatedVifat >= 10 && props.updatedVifat <= 14) {
      return "Alto";
    }
    if (props.updatedVifat >= 15) {
      return "Muy Alto";
    }
  };

  const muscleRes = () => {
    if (
      props.gender === "F" &&
      props.updatedMuscle < "24.3" &&
      props.age >= "18" &&
      props.age <= "39"
    ) {
      return "Bajo";
    }
    if (
      props.gender === "F" &&
      props.updatedMuscle < "24.1" &&
      props.age >= "40" &&
      props.age <= "59"
    ) {
      return "Bajo";
    }
    if (
      props.gender === "F" &&
      props.updatedMuscle < "23.9" &&
      props.age >= "60" &&
      props.age <= "80"
    ) {
      return "Bajo";
    }
    if (
      props.gender === "F" &&
      props.updatedMuscle >= "24.3" &&
      props.updatedMuscle <= "30.3" &&
      props.age >= "18" &&
      props.age <= "39"
    ) {
      return "Normal";
    }
    if (
      props.gender === "F" &&
      props.updatedMuscle >= "24.1" &&
      props.updatedMuscle <= "30.1" &&
      props.age >= "40" &&
      props.age <= "59"
    ) {
      return "Normal";
    }
    if (
      props.gender === "F" &&
      props.updatedMuscle >= "23.9" &&
      props.updatedMuscle <= "29.9" &&
      props.age >= "60" &&
      props.age <= "80"
    ) {
      return "Normal";
    }
    if (
      props.gender === "F" &&
      props.updatedMuscle >= "30.4" &&
      props.updatedMuscle <= "35.3" &&
      props.age >= "18" &&
      props.age <= "39"
    ) {
      return "Elevado";
    }
    if (
      props.gender === "F" &&
      props.updatedMuscle >= "30.2" &&
      props.updatedMuscle <= "35.1" &&
      props.age >= "40" &&
      props.age <= "59"
    ) {
      return "Elevado";
    }
    if (
      props.gender === "F" &&
      props.updatedMuscle >= "30" &&
      props.updatedMuscle <= "34.9" &&
      props.age >= "60" &&
      props.age <= "80"
    ) {
      return "Elevado";
    }
    if (
      props.gender === "F" &&
      props.updatedMuscle >= "35.4" &&
      props.age >= "18" &&
      props.age <= "39"
    ) {
      return "Muy elevado";
    }
    if (
      props.gender === "F" &&
      props.updatedMuscle >= "35.2" &&
      props.age >= "40" &&
      props.age <= "59"
    ) {
      return "Muy elevado";
    }
    if (
      props.gender === "F" &&
      props.updatedMuscle >= "35" &&
      props.age >= "60" &&
      props.age <= "80"
    ) {
      return "Muy elevado";
    }
    if (
      props.gender === "M" &&
      props.updatedMuscle < 33.3 &&
      props.age >= "18" &&
      props.age <= "39"
    ) {
      return "Bajo";
    }
    if (
      props.gender === "M" &&
      props.updatedMuscle < 33.1 &&
      props.age >= "40" &&
      props.age <= "59"
    ) {
      return "Bajo";
    }
    if (
      props.gender === "M" &&
      props.updatedMuscle < 32.9 &&
      props.age >= "60" &&
      props.age <= "80"
    ) {
      return "Bajo";
    }
    if (
      props.gender === "M" &&
      props.updatedMuscle >= 33.3 &&
      props.updatedMuscle <= 39.3 &&
      props.age >= "18" &&
      props.age <= "39"
    ) {
      return "Normal";
    }
    if (
      props.gender === "M" &&
      props.updatedMuscle >= 33.1 &&
      props.updatedMuscle <= 39.1 &&
      props.age >= "40" &&
      props.age <= "59"
    ) {
      return "Normal";
    }
    if (
      props.gender === "M" &&
      props.updatedMuscle >= 32.9 &&
      props.updatedMuscle <= 38.9 &&
      props.age >= "60" &&
      props.age <= "80"
    ) {
      return "Normal";
    }
    if (
      props.updatedMuscle >= 39.4 &&
      props.updatedMuscle <= 44 &&
      props.gender === "M" &&
      props.age >= "18" &&
      props.age <= "39"
    ) {
      return "Elevado";
    }
    if (
      props.updatedMuscle >= 39.2 &&
      props.updatedMuscle <= 43.8 &&
      props.gender === "M" &&
      props.age >= "40" &&
      props.age <= "59"
    ) {
      return "Elevado";
    }
    if (
      props.updatedMuscle >= 39 &&
      props.updatedMuscle <= 43.6 &&
      props.gender === "M" &&
      props.age >= "60" &&
      props.age <= "80"
    ) {
      return "Elevado";
    }
    if (
      props.updatedMuscle >= 44.1 &&
      props.gender === "M" &&
      props.age >= "18" &&
      props.age <= "39"
    ) {
      return "Muy elevado";
    }
    if (
      props.updatedMuscle >= 43.9 &&
      props.gender === "M" &&
      props.age >= "40" &&
      props.age <= "59"
    ) {
      return "Muy elevado";
    }
    if (
      props.updatedMuscle >= 43.7 &&
      props.gender === "M" &&
      props.age >= "60" &&
      props.age <= "80"
    ) {
      return "Muy elevado";
    }
  };

  return (
    <View>
      <Text>{res()}</Text>
    </View>
  );
};

export default Formula;
