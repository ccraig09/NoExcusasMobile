import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
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
import EvalScreen from "../screens/EvalScreen";
import CategoryScreen from "../screens/CategoryScreen";
import ClassStart from "../screens/ClassStart";
import AuthScreen from "../screens/AuthScreen";
import StartupScreen from "../screens/StartupScreen";
import Timer from "../screens/Timer";
import OnboardingScreen from "../screens/OnboardingScreen";
import EditProfile from "../screens/EditProfile";

import LogoutScreen from "../screens/LogoutScreen";

const defaultStackNavOptions = {
  headerShown: false,
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

const TimerStack = createStackNavigator(
  {
    onboarding: OnboardingScreen,
    timer: Timer,
  },
  {
    // mode: "modal",
    // initialRouteName: "Categories",

    defaultNavigationOptions: defaultStackNavOptions,
    mode: "modal",
  }
);
const ProfileStack = createStackNavigator(
  {
    Perfil: ProfileScreen,
    Eval: EvalScreen,
    Edit: EditProfile,
  },
  {
    // mode: "modal",
    // initialRouteName: "Categories",
    defaultNavigationOptions: defaultStackNavOptions,
    mode: "modal",
  }
);

ProfileStack.navigationOptions = ({ navigation }) => {
  var tabBarVisible = true;
  const routeName = navigation.state.routes[navigation.state.index].routeName;

  if (routeName == "Edit" || routeName == "Eval") {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};

const LogoutStack = createStackNavigator({
  Logout: LogoutScreen,
});

const tabScreenConfig = {
  Home: {
    screen: HomeStack,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="ios-home" size={28} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.noExprimary,
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans-bold" }}>Home</Text>
        ) : (
          "Home"
        ),
    },
  },
  Perfil: {
    screen: ProfileStack,
    navigationOptions: {
      tabBarLabel: "Favorites!",
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons name="ios-person" size={28} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: "gray",
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans-bold" }}>Perfil</Text>
        ) : (
          "Perfil"
        ),
    },
  },
  Timer: {
    screen: TimerStack,
    navigationOptions: {
      tabBarLabel: "Favorites!",
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons name="ios-timer" size={28} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: "gray",
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans-bold" }}>Timer</Text>
        ) : (
          "Timer"
        ),
    },
  },
  Logout: {
    screen: LogoutStack,
    navigationOptions: {
      tabBarLabel: "NoClue",
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons name="ios-settings" size={28} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: "blue",
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans-bold" }}>LogoutDroi</Text>
        ) : (
          "Logout"
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

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
  }
  // {
  //   defaultNavigationOptions: defaultNavOptions,
  // }
);

const MainFinalNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  Main: MainNavigator,
});

export default createAppContainer(MainFinalNavigator);
