import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  title: {
    alignItems: "center",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    alignSelf: "center",
    marginBottom: 20,
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
  listContainer: {
    width: "100%",
    flex: 1,
    marginVertical: 10,
  },
  itemContainer: {
    backgroundColor: "#fefefe",
    padding: 10,
    marginVertical: 5,
  },
  itemTextContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  itemText: { flex: 1, fontWeight: "bold" },
  avatarImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  emptyFlatList: {
    color: "red",
    fontWeight: "bold",
    fontSize: 18,
    alignSelf: "center",
  },
});
