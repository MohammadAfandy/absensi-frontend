import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { globalStyles } from "../styles/global";

export default function Home({ navigation }) {
  return (
    <View style={globalStyles.container}>
      <View style={{ flex: 1 }}>
        <Text style={globalStyles.titleText}>ABSENSI PEGAWAI</Text>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <TouchableOpacity
            style={{
              borderColor: "#000",
              borderWidth: 2,
              padding: 20,
              borderRadius: 25,
            }}
            onPress={() => navigation.navigate("QrCode")}
          >
            <Image
              source={require("../assets/camera-icon.png")}
              style={globalStyles.camera}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
