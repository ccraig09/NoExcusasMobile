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
import CardioBlock from "../components/CardioBlock";

const HomeScreen = (props) => {
  const classes = useSelector((state) => state.products.availableClasses);
  return (
    <View style={styles.RootView}>
      <View style={styles.Container}>
        <SafeAreaView>
          <ScrollView>
            <View style={styles.TitleBar}></View>
            <Subtitle>{"Entrenamientos".toUpperCase()}</Subtitle>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={classes}
              renderItem={(itemData) => (
                <ClassItem
                  image={itemData.item.imageUrl}
                  title={itemData.item.title}
                  price={itemData.item.price}
                  logo={itemData.item.logo}
                  caption={itemData.item.caption}
                  subtitle={itemData.item.subtitle}
                  image={itemData.item.image}
                  onClassClick={() => {
                    props.navigation.navigate("Section", {
                      classId: itemData.item.id,
                      classTitle: itemData.item.title,
                    });
                  }}
                />
              )}
            />
            {/* <CardioBlock /> */}
            <Subtitle>{"Deportes".toUpperCase()}</Subtitle>

            {/* <CardioBlock /> */}
            <View>
              <Text>This is the new HomeScreen</Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </View>
  );
};

HomeScreen.navigationOptions = (navData) => {
  return {
    headerShown: false,
  };
};

const Subtitle = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 15px;
  margin-left: 20px;
  margin-top: 20px;
  text-transform: uppercase;
`;
const CardsContainer = styled.View`
  flex-direction: row;
  padding-left: 10px;
`;

const styles = StyleSheet.create({
  RootView: {
    backgroundColor: "black",
    flex: 1,
  },
  Container: {
    flex: 1,
    backgroundColor: "#f0f3f5",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  TitleBar: {
    width: "100%",
    marginTop: 50,
    paddingLeft: 80,
  },
  classRow: {
    flexDirection: "row",
    padding: 20,
    paddingLeft: 12,
    paddingTop: 30,
  },
});

export default HomeScreen;
