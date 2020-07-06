import { createStackNavigator, HeaderTitle } from "react-navigation-stack";
import React from "react";
import Home from "../screens/home";
import QrCode from "../screens/qrcode";
import Header from "../shared/header";

const screens = {
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title="Home" navigation={navigation} />,
      };
    },
  },
  QrCode: {
    screen: QrCode,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title="QRCode" navigation={navigation} />,
      };
    },
  },
};

const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: "#444",
    headerStyle: { backgroundColor: "#eee", height: 70 },
    headerLeft: () => {},
  },
});

export default HomeStack;
