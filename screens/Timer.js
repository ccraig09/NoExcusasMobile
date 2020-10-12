import React, { useState, useCallback } from "react";
import { View, StyleSheet, Button, Animated, Text, Alert } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import CountDown from "react-native-countdown-component";
import Colors from "../constants/Colors";

import InputSpinner from "react-native-input-spinner";

const Timer = (props) => {
  // const UrgeWithPleasureComponent = () => (
  // );
  const [key, setKey] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(20);
  const [preCount, setPreCount] = useState(3);
  const [selected, setSelected] = useState(0);
  const [background, setBackground] = useState("white");
  const [colorInterval, setColorInterval] = useState(7000);
  const [whiteInterval, setWhiteInterval] = useState(9000);

  // let color = ["blue", "red", "purple"];
  // if
  // const [start, setStart] = useState(3);

  // const intervalHandler = () => {
  //   const interval = setInterval(() => {
  //     if (!isPlaying) {
  //       setStart((start) => start - 1);
  //     }
  //     if (isPlaying) {
  //       clearInterval(interval);
  //       setStart(3);
  //     }
  //   }, 1000);
  // };

  const bcgInterval = useCallback(async () => {
    setTimeout(() => {
      setBackground("green");
    }, colorInterval);
    setTimeout(() => {
      setBackground("white");
    }, whiteInterval);
  });

  const restartHandler = useCallback(async () => {
    // intervalHandler();
    setDuration(preCount);
    setBackground("white");

    setIsPlaying(true);
    setKey((prevKey) => prevKey + 1);

    setTimeout(() => {
      setDuration(selected);
      setKey((prevKey) => prevKey + 1);
      setIsPlaying(true);
    }, 2900);
  });

  return (
    <View
      style={{
        backgroundColor: background,
        alignItems: "center",
        justifyContent: "center",
        // alignSelf: "center",
        flex: 1,
      }}
    >
      <CountDown
        key={key}
        until={duration}
        size={50}
        onFinish={() => console.log("Finished")}
        digitStyle={{
          backgroundColor: Colors.noExprimary,
          borderRadius: "1000%",
          height: 150,
          width: 150,
        }}
        running={isPlaying}
        onChange={() => bcgInterval()}
        digitTxtStyle={{ color: "black" }}
        timeToShow={duration > 59 ? ["M", "S"] : ["S"]}
        timeLabels={
          duration > 59 ? { m: "minutos", s: "Falta" } : { s: "Falta" }
        }
        showSeparator
      />

      {/* <InputSpinner
        max={60 * 60}
        min={0}
        step={1}
        onMax={(max) => {
          Alert.alert("llego al Maximo", "El maximo seria 600 segundos");
        }}
        colorMax={"red"}
        colorMin={"green"}
        value={selected}
        onChange={(num) => {
          setSelected(num);
        }}
      /> */}

      {/* <Button onPress={() => restartHandler()} title="Reiniciar Cronomitro" />
      <Button
        onPress={() => setIsPlaying((prevState) => !prevState)}
        title={isPlaying ? "Pausa" : "Empezar"}
      /> */}
      {/* <Text>Timer</Text>
      <CountdownCircleTimer
        key={key}
        isPlaying={isPlaying}
        duration={duration}
        size={150}
        onComplete={() => {
          Alert.alert("Se Acabo!");
        }}
        colors={[
          ["#004777", 0.4],
          ["#F7B801", 0.4],
          ["#A30000", 0.2],
        ]}
      >
        {({ remainingTime, animatedColor }) => (
          <Animated.Text style={{ color: animatedColor }}>
            {remainingTime}
          </Animated.Text>
        )}
      </CountdownCircleTimer> */}
      {/* <Text>{duration}</Text> */}
      <InputSpinner
        max={10000}
        min={0}
        step={5}
        fontSize={20}
        onMax={(max) => {
          Alert.alert("llego al Maximo", "El maximo seria 1000 segundos");
        }}
        colorMax={"red"}
        colorMin={"green"}
        colorLeft={"red"}
        colorRight={"blue"}
        value={selected}
        onChange={(num) => {
          setSelected(num);
        }}
      />
      <Button onPress={() => restartHandler()} title="Reiniciar Cronomitro" />
      <Button
        onPress={() => setIsPlaying((prevState) => !prevState)}
        title={isPlaying ? "Pausa" : "Empezar"}
      />
    </View>
  );
};

export default Timer;
