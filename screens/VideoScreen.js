import React from "react";
import styled from "styled-components";
import { Video } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import VideoItem from "../components/VideoItem";

import { TouchableOpacity, Dimensions } from "react-native";

let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;

// class VideoScreen extends React.Component {
const VideoScreen = (props) => {
  const classId = props.navigation.getParam("classId");
  const cardioStart = useSelector((state) =>
    state.products.cardioSelected.find((clas) => clas.id === classId)
  );
  const strengthStart = useSelector((state) =>
    state.products.strengthSelected.find((clas) => clas.id === classId)
  );
  const mixedStart = useSelector((state) =>
    state.products.mixedSelected.find((clas) => clas.id === classId)
  );
  const recoveryStart = useSelector((state) =>
    state.products.recoverySelected.find((clas) => clas.id === classId)
  );

  if (classId === "c1") {
    return (
      <VideoItem
        video={cardioStart.videoURL}
        onBackClick={() => {
          props.navigation.goBack();
        }}
      />
    );
  }
  if (classId === "c2") {
    return (
      <VideoItem
        video={cardioStart.videoURL}
        onBackClick={() => {
          props.navigation.goBack();
        }}
      />
    );
  }
  if (classId === "c3") {
    return (
      <VideoItem
        video={cardioStart.videoURL}
        onBackClick={() => {
          props.navigation.goBack();
        }}
      />
    );
  }
  if (classId === "s1") {
    return (
      <VideoItem
        video={strengthStart.videoURL}
        onBackClick={() => {
          props.navigation.goBack();
        }}
      />
    );
  }
};

VideoScreen.navigationOptions = {
  headerShown: false,
};

export default VideoScreen;
