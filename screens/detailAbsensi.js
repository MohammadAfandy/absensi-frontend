import React, { useState, useEffect } from "react";
import { Text, View, FlatList, StyleSheet, Image } from "react-native";
import { globalStyles } from "../styles/global";
import api from "../services/api";
import { TouchableOpacity } from "react-native-gesture-handler";
import moment from "moment";

export default function DetailAbsensi({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [dataPegawai, setDataPegawai] = useState({});

  const Item = ({ item }) => (
    <TouchableOpacity>
      <View style={globalStyles.itemContainer}>
        <View style={globalStyles.itemTextContainer}>
          <Text style={globalStyles.itemText}>Tanggal</Text>
          <Text style={globalStyles.itemText}>:</Text>
          <Text style={[globalStyles.itemText, { flex: 2 }]}>{moment(item.date).format("dddd, D MMMM YYYY")}</Text>
        </View>
        <View style={globalStyles.itemTextContainer}>
          <Text style={globalStyles.itemText}>Jam Masuk</Text>
          <Text style={globalStyles.itemText}>:</Text>
          <Text style={[globalStyles.itemText, { flex: 2 }]}>{moment(item.in).format("HH:mm:ss")}</Text>
        </View>
        <View style={globalStyles.itemTextContainer}>
          <Text style={globalStyles.itemText}>Jam Keluar</Text>
          <Text style={globalStyles.itemText}>:</Text>
          <Text style={[globalStyles.itemText, { flex: 2 }]}>{moment(item.out).format("HH:mm:ss")}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => <Item item={item} />;
  const renderEmptyContainer = <Text style={globalStyles.emptyFlatList}>Data absensi tidak ditemukan</Text>;

  const refreshItem = async () => {
    try {
      setRefreshing(true);
      setDataPegawai(await fetchData());
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
        setDataPegawai(await fetchData());
      } catch (error) {
        console.log(error);
      } finally {
        setRefreshing(false);
      }
    })();
  }, []);

  const fetchData = async () => {
    try {
      let response = await api().get(`pegawai/${navigation.state.params.id}`);
      return response.data.data;
    } catch (error) {
      throw new Error(error.response.data.error || "Gagal");
    }
  };

  return (
    <View style={globalStyles.container}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          // backgroundColor: "yellow",
        }}
      >
        <View style={styles.pegawaiContainer}>
          <Image source={require("../assets/avatar.png")} style={styles.avatarDetail} />
          <Text numberOfLines={1} selectable={true} style={{ fontSize: 25, fontWeight: "bold", marginTop: 10 }}>
            {dataPegawai.nama}
          </Text>
          <View style={{ minWidth: "85%", marginTop: 20 }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={[globalStyles.itemText, { flex: 0.5 }]}>NIK</Text>
              <Text style={[globalStyles.itemText, { flex: 0.1 }]}>:</Text>
              <Text style={[globalStyles.itemText, { flex: 1 }]}>{dataPegawai.nik}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={[globalStyles.itemText, { flex: 0.5 }]}>Email</Text>
              <Text style={[globalStyles.itemText, { flex: 0.1 }]}>:</Text>
              <Text style={[globalStyles.itemText, { flex: 1 }]}>{dataPegawai.email}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={[globalStyles.itemText, { flex: 0.5 }]}>Jabatan</Text>
              <Text style={[globalStyles.itemText, { flex: 0.1 }]}>:</Text>
              <Text style={[globalStyles.itemText, { flex: 1 }]}>{dataPegawai.jabatan}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={[globalStyles.itemText, { flex: 0.5 }]}>Divisi</Text>
              <Text style={[globalStyles.itemText, { flex: 0.1 }]}>:</Text>
              <Text style={[globalStyles.itemText, { flex: 1 }]}>{dataPegawai.divisi}</Text>
            </View>
          </View>
        </View>
        <FlatList
          style={globalStyles.listContainer}
          data={dataPegawai.absensi}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          refreshing={refreshing}
          onRefresh={() => refreshItem()}
          ListEmptyComponent={renderEmptyContainer}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pegawaiContainer: {
    flex: 0.7,
    backgroundColor: "lightblue",
    // flexDirection: "row",
    width: "100%",
    marginBottom: 20,
    padding: 10,
    alignItems: "center",
    overflow: "hidden",
  },
  itemPegawai: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "yellow",
  },
  avatarDetail: { width: 120, height: 120, borderRadius: 75, overflow: "hidden", borderWidth: 3, borderColor: "#fefefe" },
});
