import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Camera } from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";
import moment from "moment";
import { globalStyles } from "../styles/global";
import api from "../services/api";

export default function QrCode({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleBarCodeScanned = async ({ type, data }) => {
    setLoading(true);
    let alertMessage = "";
    let isError = false;
    try {
      let response = await api().get(data);
      let json = await response.data.data;
      alertMessage = `Berhasil Absen ${
        json.type == "in" ? "Masuk" : "Keluar"
      }\n${json.email}\n${
        json.type == "in"
          ? moment(json.in).format("MMMM Do YYYY, h:mm:ss a")
          : moment(json.out).format("MMMM Do YYYY, h:mm:ss a")
      }`;
    } catch (error) {
      isError = true;
      alertMessage = error.response.data.error || "Gagal";
    } finally {
      Alert.alert("Absensi", alertMessage, [
        {
          text: "OK",
          onPress: () => {
            setLoading(false);
            if (!isError) {
              navigation.navigate("Home");
            }
          },
        },
      ]);
    }
  };
  return (
    <View
      style={[
        globalStyles.container,
        {
          flex: 1,
          justifyContent: "space-around",
          alignItems: "center",
        },
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{ width: "90%", height: "80%" }}
        />
      ) : (
        <Camera
          style={{
            width: "90%",
            height: "80%",
          }}
          onBarCodeScanned={handleBarCodeScanned}
          type={type}
          flashMode={flash}
        />
      )}
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <TouchableOpacity>
          <MaterialIcons
            name="arrow-back"
            size={28}
            onPress={() => {
              navigation.navigate("Home");
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons
            name={
              flash === Camera.Constants.FlashMode.torch
                ? "flash-on"
                : "flash-off"
            }
            size={28}
            onPress={() => {
              setFlash(
                flash === Camera.Constants.FlashMode.torch
                  ? Camera.Constants.FlashMode.off
                  : Camera.Constants.FlashMode.torch
              );
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons
            name="photo-camera"
            size={28}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
