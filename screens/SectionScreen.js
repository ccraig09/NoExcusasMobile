import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import CategoryItem from "../components/CategoryItem";

const SectionScreen = (props) => {
  const carclasses = useSelector((state) => state.products.cardioSelected);
  const strclasses = useSelector((state) => state.products.strengthSelected);
  const mixclasses = useSelector((state) => state.products.mixedSelected);
  const recclasses = useSelector((state) => state.products.recoverySelected);

  const classId = props.navigation.getParam("classId");
  const selectedClass = useSelector((state) =>
    state.products.cardioSelected.find((clas) => clas.id === classId)
  );

  if (classId === "C") {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={carclasses}
        renderItem={(itemData) => (
          <CategoryItem
            image={itemData.item.image}
            title={itemData.item.title}
            subtitle={itemData.item.subtitle}
            time={itemData.item.time}
            difficulty={itemData.item.difficulty}
            logo={itemData.item.logo}
            description={itemData.item.description}
            onClassClick={() => {
              props.navigation.navigate("Start", {
                // classId: itemData.item.id,
                // classTitle: itemData.item.title,
                classId: itemData.item.id,
                classDescription: itemData.item.description,
                coverImage: itemData.item.image,
              });
            }}
            onAddToCart={() => {}}
          />
        )}
      />
    );
  }

  if (classId === "S") {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={strclasses}
        renderItem={(itemData) => (
          <CategoryItem
            image={itemData.item.image}
            title={itemData.item.title}
            subtitle={itemData.item.subtitle}
            time={itemData.item.time}
            difficulty={itemData.item.difficulty}
            logo={itemData.item.logo}
            description={itemData.item.description}
            onClassClick={() => {
              props.navigation.navigate("Start", {
                classId: itemData.item.id,
                // classTitle: itemData.item.title,
                classDescription: itemData.item.description,
                coverImage: itemData.item.image,
              });
            }}
            onAddToCart={() => {}}
          />
        )}
      />
    );
  }

  if (classId === "M") {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={mixclasses}
        renderItem={(itemData) => (
          <CategoryItem
            image={itemData.item.image}
            title={itemData.item.title}
            subtitle={itemData.item.subtitle}
            time={itemData.item.time}
            difficulty={itemData.item.difficulty}
            logo={itemData.item.logo}
            description={itemData.item.description}
            onClassClick={() => {
              props.navigation.navigate("Start", {
                classId: itemData.item.id,
                // classTitle: itemData.item.title,
                classDescription: itemData.item.description,
                coverImage: itemData.item.image,
              });
            }}
            onAddToCart={() => {}}
          />
        )}
      />
    );
  }
  if (classId === "R") {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={recclasses}
        renderItem={(itemData) => (
          <CategoryItem
            image={itemData.item.image}
            title={itemData.item.title}
            subtitle={itemData.item.subtitle}
            time={itemData.item.time}
            difficulty={itemData.item.difficulty}
            logo={itemData.item.logo}
            description={itemData.item.description}
            onClassClick={() => {
              props.navigation.navigate("Start", {
                classId: itemData.item.id,
                // classTitle: itemData.item.title,
                classDescription: itemData.item.description,
                coverImage: itemData.item.image,
              });
            }}
            onAddToCart={() => {}}
          />
        )}
      />
    );
  }
};

SectionScreen.navigationOptions = (navData) => {
  return {
    title: navData.navigation.getParam("classTitle"),
  };
};

const styles = StyleSheet.create({});

export default SectionScreen;
