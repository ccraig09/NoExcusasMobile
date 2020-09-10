import React from "react";
import { View, Text, Platform } from "react-native";
import AnimatedProgressWheel from "react-native-progress-wheel";
import ProgressCircle from "./ProgressCircle";

const ProgressWheel = (props, { value }) => {
  // value = 20;

  const A = props.current;
  const B = props.Meta;
  const P = props.update;
  const C = A - B;
  const D = P / C;
  const X = isNaN(D) ? 0 : D.toFixed(2);

  let result;
  if (X * 100 < 25) {
    result = "red";
  }
  if (X * 100 >= 25 && X * 100 <= 75) {
    result = "yellow";
  }
  if (X * 100 > 75) {
    result = "#00ff00";
  }
  // console.log("x is equal to", Math.abs(X));
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
      <ProgressCircle
        value={Math.abs(X)}
        size={140}
        thickness={17}
        color={result}
        animationMethod="spring"
        animationConfig={{ delay: 2000, stiffness: 30 }}
        unfilledColor="grey"
        shouldAnimateFirstValue={true}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          {props.composition}
        </Text>
        <Text
          style={{
            color: result,
            fontSize: 15,
            fontFamily: "aliens",
            fontWeight: "bold",
          }}
        >
          {(Math.abs(X) * 100).toFixed(2)} %
        </Text>
      </ProgressCircle>
    </View>
  );
};

export default ProgressWheel;
