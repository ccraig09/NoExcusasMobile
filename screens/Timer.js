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
  const [isPrePlaying, setIsPrePlaying] = useState(false);
  const [duration, setDuration] = useState();
  const [preCount, setPreCount] = useState(3);
  const [selected, setSelected] = useState(0);
  const [intIsStopped, setIntIsStopped] = useState(false);
  const [background, setBackground] = useState("white");
  const [colorInterval, setColorInterval] = useState(2000);
  const [colorInterval2, setColorInterval2] = useState(3000);
  const [fInterval, setFInterval] = useState();

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

  // const bcgInterval = useCallback(() => {
  //   let colorInt = setTimeout(function CInt() {
  //     setBackground("green"), console.log("greentime");
  //     setTimeout(CInt, colorInterval);
  //   }, colorInterval);

  //   if (intIsStopped === true) {
  //     console.log("int has been cleared");
  //     clearInterval(colorInt);
  //     setBackground("white");
  //   }
  //   setTimeout(() => {
  //     console.log("is not playin anymore so chilll");
  //     clearInterval(colorInt);
  //     setBackground("white");
  //   }, selected * 1000);
  // });

  //   const bcgInterval2 = useCallback(() => {
  //     let mainInt = setInterval(() => {
  //       const timer = setTimeout(() => {
  //        const intt = setInterval(() => setBackground("red"), console.log("whitetime")),
  //           colorInterval2
  //       }, 5000);
  // //run a timer inside interval etc or something
  //       return () => clearTimeout(timer);
  //     }, 8000);

  // if (intIsStopped === true) {
  //   console.log("int has been cleared");
  //   // clearInterval(colorInt);
  //   setBackground("white");
  // }
  // setTimeout(() => {
  //   console.log("is not playin anymore so chilll");
  //   // clearInterval(colorInt);
  //   setBackground("white");
  // }, selected * 1000);

  // if (fInterval === colorInterval) {
  //   let colorInt = setInterval(function CInt() {
  //     setBackground("green"),
  //       setFInterval(colorInterval),
  //       console.log("greentime");
  //   }, fInterval);

  //   if (intIsStopped === true) {
  //     console.log("int has been cleared");
  //     clearInterval(colorInt);
  //     setBackground("green");
  //   }
  //   setTimeout(() => {
  //     console.log("is not playin anymore so chilll");
  //     clearInterval(colorInt);
  //     setBackground("green");
  //   }, selected * 1000);
  // }
  // });

  // const whtInterval = useCallback(() => {
  //   let whiteInt = setTimeout(function WIint() {
  //     setBackground("white"), console.log("whitetime");
  //   }, whiteInterval);
  //   if (intIsStopped === true) {
  //     console.log("white int has been cleared");
  //     clearInterval(whiteInt);
  //     setBackground("white");
  //   }
  //   setTimeout(() => {
  //     console.log("white is not playin anymore so chilll");
  //     clearInterval(whiteInt);
  //     setBackground("white");
  //   }, selected * 1000);
  // });

  const stopHandler = useCallback(() => {
    setIntIsStopped(true);
    setBackground("white");
    setKey((prevKey) => prevKey);
    setDuration(0);
    setIsPlaying(false);
  });

  const startHandler = useCallback(async () => {
    setDuration(preCount);
    setBackground("white");
    // setIntIsStopped(false);
    setIsPlaying(true);
    setKey((prevKey) => prevKey + 1);

    setTimeout(() => {
      setDuration(selected);
      setKey((prevKey) => prevKey + 1);
      setIntIsStopped(false);
      // bcgInterval();
      bcgInterval2();
      console.log("stop pre count");
    }, preCount * 998);
  });

  const onEndHandler = () => {
    if (isPlaying) {
      console.log("Finished count");
      setIsPlaying(false);
    }
  };

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
        // onChange={console.log("tick")}
        onFinish={() => onEndHandler()}
        digitStyle={{
          backgroundColor: Colors.noExprimary,
          borderRadius: "1000%",
          height: 150,
          width: 150,
        }}
        running={isPlaying}
        // onChange={() => bcgInterval()}
        digitTxtStyle={{ color: "black" }}
        timeToShow={duration >= 59 ? ["M", "S"] : ["S"]}
        timeLabels={
          duration >= 59 ? { m: "minutos", s: "Falta" } : { s: "Falta" }
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
      {/* <Button onPress={() => startHandler()} title="Reiniciar Cronomitro" />
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

      <Button
        onPress={() => {
          isPlaying ? stopHandler() : startHandler();
        }}
        title={
          isPlaying
            ? "Parar Cronometro"
            : isPrePlaying
            ? " "
            : "Iniciar Cronometro"
        }
      />
      {/* {isPlaying ? (
        <Button
          onPress={() => setIsPlaying((prevState) => !prevState)}
          title={isPlaying ? "Pausa" : "Empezar"}
        />
      ) : (
        <View>
          {isPrePlaying ? <Text> </Text> : <Text>Click para empezar</Text>}
        </View>
      )} */}
    </View>
  );
};

export default Timer;
