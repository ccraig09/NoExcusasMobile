import React from "react";
import styled from "styled-components";
import { Video } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

import { TouchableOpacity, Dimensions } from "react-native";

let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;
let logoimg = "../assets/icon-noexlogo.png";

const VideoItem = (props) => {
  return (
    <Container>
      <Video
        source={{
          uri: props.video,
        }}
        posterSource={require("../assets/icon-noexlogo.png")}
        shouldPlay
        useNativeControls={true}
        resizeMode="contain"
        style={{ width: screenWidth, height: 375 }}
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
  );
};

export default VideoItem;

const Container = styled.View`
  height: 375px;
  background: black;
  align-items: center;
  justify-content: center;
`;

const CloseView = styled.View`
  position: absolute;
  top: 0px;
  right: 12px;
`;
