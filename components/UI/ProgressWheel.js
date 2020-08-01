import React from "react";
import { View, Text, Platform } from "react-native";
import AnimatedProgressWheel from "react-native-progress-wheel";
import ProgressCircle from "./ProgressCircle";

const AnimatedSpring = (props, { value }) => {
  // value = 20;
  var progress = 10;
  const A = props.current;
  const B = props.Meta;
  const C = A - B;
  const D = 2 / C;
  const X = D.toFixed(2);
  let result;
  if (Math.abs(X) < 0.25) {
    result = "#ff0000";
  }
  if (Math.abs(X) >= 0.25 && Math.abs(X) <= 0.75) {
    result = "yellow";
  }
  if (Math.abs(X) > 0.75) {
    result = "#00ff00";
  }
  console.log("x is equal to", Math.abs(X));
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffc733",
        padding: 10,
        borderRadius: 10,
      }}
    >
      <Text style={{ fontSize: 18, marginBottom: 10, fontWeight: "bold" }}>
        {props.composition}
      </Text>
      <ProgressCircle
        value={0.23}
        size={100}
        thickness={17}
        color={result}
        animationMethod="spring"
        animationConfig={{ delay: 2000, stiffness: 30 }}
        unfilledColor="grey"
        shouldAnimateFirstValue={true}
      ></ProgressCircle>
      {/* <AnimatedProgressWheel
        size={79}
        width={16}
        color={result}
        animateFromValue={0}
        duration={5000}
        progress={Math.abs(X)}
        fullColor={Platform.OS === "ios" ? "#00ff00" : null}
      /> */}
      <Text style={{ fontSize: 18 }}>{props.current / 100}</Text>
    </View>
  );
};

export default AnimatedSpring;
