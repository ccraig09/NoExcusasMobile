import React, { useState, useCallback, useReducer, useEffect } from "react";
import { View, Text } from "react-native";

const Formula = (props) => {
  const gender =
    (props.gender === "M") &
    (props.age < "29" && props.age > "25") &
    (props.bmi > "25" && props.bmi < "29")
      ? "yaaa estas bien"
      : "wouuu tranquilo ya";

  return (
    <View>
      <Text>{gender}</Text>
    </View>
  );
};

export default Formula;

//add text and view
// import this into diffenent caroulel component
