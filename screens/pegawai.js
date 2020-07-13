import React, { useState, useEffect } from "react";
import { Text, View, FlatList, Image, TouchableOpacity, Button, Modal, StyleSheet, TouchableHighlight } from "react-native";
import { globalStyles } from "../styles/global";
import { MaterialIcons } from "@expo/vector-icons";
import api from "../services/api";

export default function Pegawai({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeItemId, setActiveItemId] = useState(null);

  const Item = ({ item }) => (
    <View style={globalStyles.itemContainer}>
      <TouchableOpacity
        onLongPress={() => {
          openModal(item._id);
        }}
        onPress={() => navigation.navigate("DetailAbsensi", { id: ({ id } = item._id) })}
      >
        <View style={globalStyles.itemTextContainer}>
          <Image source={require("../assets/avatar.png")} style={globalStyles.avatarImage} />
          <View style={{}}>
            <Text style={globalStyles.itemText}>{item.nama}</Text>
            <Text style={[globalStyles.itemText, { fontWeight: "normal" }]}>{item.jabatan}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item }) => <Item item={item} />;

  const refreshItem = async () => {
    try {
      setRefreshing(true);
      setDataSource(await fetchData());
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        setRefreshing(true);
        setDataSource(await fetchData());
      } catch (error) {
        console.log(error);
      } finally {
        setRefreshing(false);
      }
    })();
  }, []);

  const fetchData = async () => {
    try {
      let response = await api().get("pegawai");
      return response.data.data;
    } catch (error) {
      console.log(error.response.data.data);
    }
  };

  const handleDelete = async () => {
    setModalVisible(false);
    try {
      let response = await api().delete(`pegawai/${activeItemId}`);
      refreshItem();
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const openModal = (itemId) => {
    setActiveItemId(itemId);
    setModalVisible(true);
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.titleText}>DAFTAR PEGAWAI</Text>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <View style={{ backgroundColor: "red", alignSelf: "flex-end" }}>
          <Button title="Tambah Pegawai" onPress={() => navigation.navigate("AddPegawai")} />
        </View>
        <FlatList
          style={globalStyles.listContainer}
          data={dataSource}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          refreshing={refreshing}
          onRefresh={() => refreshItem()}
        />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Action</Text>

            <TouchableOpacity style={{ ...styles.openButton, backgroundColor: "#2196F3" }} onPress={handleDelete}>
              <MaterialIcons name="delete" size={28} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
