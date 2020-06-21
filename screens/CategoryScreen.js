import React from "react";
import { FlatList } from "react-native";
import { useSelector } from "react-redux";

import CategoryItem from "../components/CategoryItem";

const CategoryScreen = (props) => {
  const classes = useSelector((state) => state.products.cardioSelected);
  const classId = props.navigation.getParam("classId");
  const selectedClass = useSelector((state) =>
    state.products.cardioSelected.find((clas) => clas.id === classId)
  );
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={classes}
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
            props.navigation.navigate("Section", {
              classId: itemData.item.id,
              classTitle: itemData.item.title,
              classDescription: itemData.item.description,
            });
          }}
          onAddToCart={() => {}}
        />
      )}
    />
  );
};

CategoryScreen.navigationOptions = {
  title: "Cardio",
};

export default CategoryScreen;
