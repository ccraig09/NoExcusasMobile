import React from "react";
import { View, Text } from "react-native";

const MetaFormula = (props) => {
  const goal = () => {
    if (props.title === "BMI") {
      return "21.6";
    }
    if (props.title === "Grasa") {
      return fatRes();
    }
    if (props.title === "Grasa Viseral") {
      return "5";
    }
    if (props.title === "Músculo") {
      return muscleRes();
    }
    if (props.title === "Metabolica") {
      return props.age;
    }
  };

  const fatRes = () => {
    if (props.gender === "F" && props.age >= "20" && props.age <= "39") {
      return "26.9";
    }
    if (props.gender === "F" && props.age >= "40" && props.age <= "59") {
      return "28.4";
    }
    if (props.gender === "F" && props.age >= "60" && props.age <= "79") {
      return "29.9";
    }
    if (props.gender === "M" && props.age >= "20" && props.age <= "39") {
      return "13.9";
    }
    if (props.gender === "M" && props.age >= "40" && props.age <= "59") {
      return "16.5";
    }
    if (props.gender === "M" && props.age >= "60" && props.age <= "79") {
      return "18.9";
    }
  };

  const muscleRes = () => {
    if (props.gender === "F" && props.age >= "18" && props.age <= "39") {
      return "27.3";
    }
    if (props.gender === "F" && props.age >= "40" && props.age <= "59") {
      return "27.1";
    }
    if (props.gender === "F" && props.age >= "60" && props.age <= "80") {
      return "26.9";
    }

    if (props.gender === "M" && props.age >= "18" && props.age <= "39") {
      return "36.3";
    }
    if (props.gender === "M" && props.age >= "40" && props.age <= "59") {
      return "36.1";
    }
    if (props.gender === "M" && props.age >= "60" && props.age <= "80") {
      return "35.9";
    }
  };

  return (
    <View>
      <Text>{goal()}</Text>
    </View>
  );
};

export default MetaFormula;
