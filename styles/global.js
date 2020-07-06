import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  title: {
    alignItems: "center",
  },
  titleText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#333",
    alignSelf: "center",
  },
  paragraph: {
    marginVertical: 8,
    lineHeight: 20,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  camera: {
    width: 200,
    height: 200,
  },
});
