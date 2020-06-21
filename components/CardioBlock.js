import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
} from "react-native";
import styled from "styled-components";
import { useSelector } from "react-redux";
import ClassItem from "../components/ClassItem";

const CardioBlock = (props) => {
  const classId = props.navigation.getParam("classId");
  const classes = useSelector((state) =>
    state.products.availableClasses.find((clas) => clas.id === classId)
  );

  return (
    // <FlatList
    //   style={styles.classRow}
    //   horizontal={true}
    //   showsHorizontalScrollIndicator={false}
    //   data={classes}
    //   renderItem={(itemData) => (
    <ClassItem
      image={classes.image}
      title={classes.title}
      subtitle={classes.subtitle}
      caption={classes.caption}
      logo={classes.logo}
      onClassClick={() => {
        props.navigation.navigate("Cardio", {
          classId: classes.id,
          classTitle: classes.title,
        });
      }}
    />
  );
};
// />
//   );
// };

const styles = StyleSheet.create({
  classRow: {
    flexDirection: "row",
    padding: 20,
    paddingLeft: 12,
    paddingTop: 30,
  },
});

export default CardioBlock;
