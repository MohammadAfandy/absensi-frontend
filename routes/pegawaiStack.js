import { createStackNavigator } from "react-navigation-stack";
import React from "react";
import Pegawai from "../screens/pegawai";
import DetailAbsensi from "../screens/detailAbsensi";
import AddPegawai from "../screens/addPegawai";
import Header from "../shared/header";

const screens = {
  Pegawai: {
    screen: Pegawai,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title="Pegawai" navigation={navigation} />,
      };
    },
  },
  DetailAbsensi: {
    screen: DetailAbsensi,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title="Detail Absensi" navigation={navigation} />,
      };
    },
  },
  AddPegawai: {
    screen: AddPegawai,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title="Tambah Pegawai" navigation={navigation} />,
      };
    },
  },
};

const PegawaiStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: "#444",
    headerStyle: { backgroundColor: "#eee", height: 70 },
    headerLeft: () => {},
  },
});

export default PegawaiStack;
