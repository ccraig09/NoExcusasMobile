import React from "react";
import {
  FlatList,
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { PlayIcon } from "./UI/icons";

import CategoryItem from "../components/CategoryItem";

const ClassStartItem = (props) => {
  let logoimg = "../assets/icon-noexlogo.png";

  return (
    <View style={styles.Container}>
      <StatusBar hidden />
      <View style={styles.Cover}>
        <Image style={styles.Image} source={{ uri: props.image }} />
        <View style={styles.PlayWrapper}>
          <TouchableOpacity
            underlayColor="transparent"
            onPress={props.onVideoClick}
          >
            <View style={styles.PlayView}>
              <PlayIcon style={{ marginLeft: -10 }} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.Wrapper}>
          <Image style={styles.Logo} source={{ uri: props.image }} />
          <Text style={styles.Subtitle}>{props.subtitle}</Text>
        </View>
      </View>
    </View>
  );
};

ClassStartItem.navigationOptions = {
  title: "Cardio",
  headerShown: false,
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  Cover: {
    height: 375,
  },
  Image: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  PlayWrapper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -40,
    marginLeft: -40,
  },
  PlayView: {
    width: 80,
    height: 80,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  Wrapper: {
    flexDirection: "row",
    position: "absolute",
    top: 40,
    left: 20,
    alignItems: "center",
  },
  Logo: {
    width: 24,
    height: 24,
  },
  Subtitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.8)",
    marginLeft: 5,
    textTransform: "uppercase",
  },
});

export default ClassStartItem;
