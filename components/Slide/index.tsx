import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import Formula from "../Formula";
import ProgressWheel from "../../components/UI/ProgressWheelBase";

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
      <View style={{ marginTop: 5 }}>
        <Text style={{ ...styles.slideText }}>Resultado:</Text>
        <Text style={{ ...styles.slideText }}>{result}</Text>
      </View>
      <View style={{ marginTop: 25 }}>
        <Text style={{ ...styles.slideText }}>Meta:</Text>
        <Text style={{ ...styles.slideText }}>{result}</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={{ ...styles.progress }}>
          <TouchableOpacity onPress={props.edit}>
            <ProgressWheel
              title={props.title}
              composition={props.title}
              current={parseInt(props.comp)}
              update={props.comp - props.updated}
            />
          </TouchableOpacity>
        </View>
        <View style={{ top: 150, marginLeft: 10 }}>
          <Text style={{ ...styles.slideText }}>Categoria:</Text>
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
      </View>
    </View>
  );
};

export default Slide;
