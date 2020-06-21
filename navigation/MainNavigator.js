import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { Platform, Text, Modal } from "react-native";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import { Ionicons } from "@expo/vector-icons";

// import ProductDetailScreen from "../screens/shop/ProductDetailScreen";

// import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";
import Colors from "../constants/Colors";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import VideoScreen from "../screens/VideoScreen";
import SectionScreen from "../screens/SectionScreen";
import CategoryScreen from "../screens/CategoryScreen";
import ClassStart from "../screens/ClassStart";

const defaultStackNavOptions = {
  // headerShown: false,
};

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Start: ClassStart,
    Category: CategoryScreen,
    Section: SectionScreen,
    Video: VideoScreen,
    // Signup: SignupScreen,
    // ProductOverview: ProductOverviewScreen,
    // ProductDetail: ProductDetailScreen,
  },
  {
    // mode: "modal",
    // initialRouteName: "Categories",
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

HomeStack.navigationOptions = ({ navigation }) => {
  var tabBarVisible = true;
  const routeName = navigation.state.routes[navigation.state.index].routeName;

  if (
    routeName == "Category" ||
    routeName == "Section" ||
    routeName == "Video"
  ) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};

const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen,
    // Eval: Evals,
    // Eval1: Eval1Screen,
    // Eval2: Eval2Screen,
  },
  {
    // mode: "modal",
    // initialRouteName: "Categories",
    defaultNavigationOptions: defaultStackNavOptions,
    mode: "modal",
  }
);

const tabScreenConfig = {
  Home: {
    screen: HomeStack,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="ios-home" size={28} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.primary,
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans-bold" }}>Home</Text>
        ) : (
          "Home"
        ),
    },
  },
  Profile: {
    screen: ProfileStack,
    navigationOptions: {
      tabBarLabel: "Favorites!",
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons name="ios-person" size={28} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: Colors.accent,
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans-bold" }}>Profile</Text>
        ) : (
          "Profile"
        ),
    },
  },
};

const MainNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeColor: "white",
        shifting: true,
        barStyle: {
          backgroundColor: Colors.primaryColor,
        },
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          labelStyle: {
            fontFamily: "open-sans-bold",
          },
          activeTintColor: Colors.accentColor,
        },
      });

export default createAppContainer(MainNavigator);
