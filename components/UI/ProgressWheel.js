import React from "react";
import { View, Text, Platform } from "react-native";
import AnimatedProgressWheel from "react-native-progress-wheel";

const ProgressWheel = (props) => {
  const A = props.current;
  const B = props.Meta;
  const C = A - B;
  const D = 2 / C;
  const E = (D * 100).toFixed(2);
  let result;
  if (props.percent < 35) {
    result = "#ff0000";
  }
  if (props.percent >= 35 && props.percent <= 75) {
    result = "yellow";
  }
  if (props.percent > 75) {
    result = "#00ff00";
  }

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#dfdbdb",
        padding: 10,
        borderRadius: 10,
      }}
    >
      <Text style={{ fontSize: 18, marginBottom: 10, fontWeight: "bold" }}>
        {props.composition}
      </Text>
      <AnimatedProgressWheel
        size={79}
        width={16}
        color={result}
        animateFromValue={0}
        duration={5000}
        progress={E}
        fullColor={Platform.OS === "ios" ? "#00ff00" : null}
      />
      <Text style={{ fontSize: 18 }}>{Math.abs(E)}%</Text>
    </View>
  );
};

export default ProgressWheel;
