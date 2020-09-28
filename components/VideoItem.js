import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Video } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { Camera } from "expo-camera";

import {
  TouchableOpacity,
  Dimensions,
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";

let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;
let logoimg = "../assets/icon-noexlogo.png";

const VideoItem = (props) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Container>
        <Video
          source={{
            uri: props.video,
          }}
          posterSource={require("../assets/icon-noexlogo.png")}
          shouldPlay
          useNativeControls={true}
          resizeMode="contain"
          style={{ width: screenWidth, height: 345 }}
        />
        <CloseView>
          <TouchableOpacity
            onPress={props.onBackClick}
            // props.navigation.goBack();

            style={{ padding: 20 }}
          >
            <Ionicons name="ios-close" size={44} color="white" />
          </TouchableOpacity>
        </CloseView>
      </Container>
      <Camera style={{ flex: 1 }} type={type}>
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            alignItems: "center",
            alignSelf: "center",
            justifyContent: "center",
            // flexDirection: "row",
          }}
        >
          <Image
            style={{
              width: 200,
              height: 200,
            }}
            source={{
              uri: "https://media.giphy.com/media/3o7TKKlj7BTQGna32o/giphy.gif",
            }}
          />

          {/* <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: "flex-end",
              alignItems: "center",
              marginLeft: 9,
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 19, color: "white" }}>
              {" "}
              Flip{" "}
            </Text>
          </TouchableOpacity> */}
        </View>
      </Camera>
    </View>
  );
};

export default VideoItem;

const styles = StyleSheet.create({
  bottom: {
    marginTop: 10,
  },
});

const Container = styled.View`
  height: 45%;
  background: black;
  align-items: center;
  justify-content: center;
`;

const CloseView = styled.View`
  position: absolute;
  top: 0px;
  right: 12px;
`;
