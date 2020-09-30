import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import Formula from "../Formula";

export const Slide = (props: any) => {
  const { title, result } = props;

  return (
    <View style={styles.slide}>
      <View>
        <TouchableOpacity onPress={props.edit}>
          <Text style={{ ...styles.title }}>{title}</Text>
          <Text>{props.button}</Text>
        </TouchableOpacity>
      </View>
      <Text style={{ ...styles.slideText }}>{result}</Text>
      <Formula
        gender={props.gender}
        age={props.age}
        bmi={props.bmi}
        fat={props.fat}
        title={props.title}
        vifat={props.vifat}
        muscle={props.muscle}
      />
    </View>
  );
};

export default Slide;
