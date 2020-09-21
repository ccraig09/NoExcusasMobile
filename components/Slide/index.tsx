import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import Formula from "../Formula";

export const Slide = (props: any) => {
  const { title, result } = props;

  return (
    <View style={styles.slide}>
      <Formula gender={props.gender} age={props.age} bmi={props.bmi} />

      <Text style={{ ...styles.title }}>{title}</Text>
      <Text style={{ ...styles.slideText }}>{result}</Text>
      <TouchableOpacity onPress={props.edit}>
        <Text>{props.button}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Slide;
