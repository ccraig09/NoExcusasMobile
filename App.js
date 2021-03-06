import React, { useState } from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import MainNavigator from "./navigation/MainNavigator";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import ReduxThunk from "redux-thunk";

import { enableScreens } from "react-native-screens";
import authReducer from "./store/reducers/auth";
import memberReducer from "./store/reducers/membersDetails";
import evalReducer from "./store/reducers/evals";
import updateReducer from "./store/reducers/evalUpdate";

import productsReducer from "./store/reducers/products";
// import { encode, decode } from "react-native-base64";

import { decode, encode } from "base-64";

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

enableScreens();

const rootReducer = combineReducers({
  products: productsReducer,
  memberdeets: memberReducer,
  auth: authReducer,
  evals: evalReducer,
  updates: updateReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    aliens: require("./assets/fonts/aliens.ttf"),
    cursive: require("./assets/fonts/cursive.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  // if font is not loaded ex(!fontLoaded) because inital state is falst ex(useState(false))
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }

  // export default function App() {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}
