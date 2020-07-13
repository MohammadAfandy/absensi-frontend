import { Input } from "react-native-elements";
import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, Alert, Picker, Button } from "react-native";
import { globalStyles } from "../styles/global";
import api from "../services/api";

export default function AddPegawai({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nama: "",
    nik: "",
    email: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    tanggal_bergabung: "",
    jabatan: "",
    divisi: "",
  });

  const handleSubmit = async () => {
    console.log(formData);
    setLoading(true);
    let isError = false;
    let alertMessage = "";
    try {
      let response = await api().post("pegawai", formData);
      alertMessage = "Sukses Tambah Pegawai";
      return response.data.data;
    } catch (error) {
      console.log(error.response.data.data);
      isError = true;
      alertMessage = "Gagal Tambah Pegawai";
    } finally {
      Alert.alert(isError ? "Gagal" : "Sukses", alertMessage, [
        {
          text: "OK",
          onPress: () => {
            setLoading(false);
            if (!isError) {
              navigation.navigate("Pegawai");
            }
          },
        },
      ]);
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.titleText}>TAMBAH PEGAWAI</Text>
      <ScrollView>
        <Input label="Nama" onChangeText={(text) => setFormData({ ...formData, nama: text })} />
        <Input label="Email" onChangeText={(text) => setFormData({ ...formData, email: text })} />
        <Input label="NIK" onChangeText={(text) => setFormData({ ...formData, nik: text })} />
        <Input label="Tempat Lahir" onChangeText={(text) => setFormData({ ...formData, tempat_lahir: text })} />

        <Text style={globalStyles.pickerTextStyle}>Jabatan</Text>
        <Picker
          style={globalStyles.picker}
          itemStyle={globalStyles.pickerItems}
          selectedValue={formData.jabatan}
          onValueChange={(itemValue) => setFormData({ ...formData, jabatan: itemValue })}
        >
          <Picker.Item label="-- Pilih Jabatan --" value="" />
          <Picker.Item label="Backend Developer" value="Backend Developer" />
          <Picker.Item label="Frontend Develper" value="Frontend Developer" />
          <Picker.Item label="DevOps" value="DevOps" />
          <Picker.Item label="Web Designer" value="Web Designer" />
          <Picker.Item label="Mobile Developer" value="Mobile Developer" />
        </Picker>
        <Text style={globalStyles.pickerTextStyle}>Divisi</Text>
        <Picker
          style={globalStyles.picker}
          itemStyle={globalStyles.pickerItems}
          selectedValue={formData.divisi}
          onValueChange={(itemValue) => setFormData({ ...formData, divisi: itemValue })}
        >
          <Picker.Item label="-- Pilih Divisi --" value="" />
          <Picker.Item label="IT" value="IT" />
          <Picker.Item label="HRD" value="HRD" />
          <Picker.Item label="BOD" value="BOD" />
          <Picker.Item label="GA" value="GA" />
        </Picker>
        <Button disabled={loading} title={loading ? "Loading ..." : "Submit"} onPress={handleSubmit} />
      </ScrollView>
    </View>
  );
}
