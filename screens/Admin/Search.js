import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { stadiumbooking } from "../../store/actions/Action";
import SelectDropdown from "react-native-select-dropdown";
import { FontAwesome5 } from "@expo/vector-icons";
const Search = ({ route, navigation }) => {
  // ...เพิ่มโค้ดกำหนด state...
  const [stadium, setStadium] = useState([]);
  const User = useSelector((state) => state.reducer.adminProfile);
  const Stadium = useSelector((state) => state.reducer.ownerStadium);
  const dispatch = useDispatch();
  useEffect(() => {
    if (Stadium) {
      setStadium(Stadium);
    }
  }, [Stadium]);
  const renderItem = (itemData) => {
    return (
      <TouchableOpacity
        style={styles.background_stadium}
        onPress={() => {
          navigation.navigate("StadiumQueue", {
            StadiumName: itemData.item.stadiumName,
            stadiumID: itemData.item.id,
          });
          dispatch(stadiumbooking(itemData.item.id));
        }}
      >
        <View style={styles.view_row}>
          <Image
            style={styles.image_stadium}
            source={{ uri: itemData.item.pic }}
          />
          <View style={(styles.view_col, { marginLeft: 10 })}>
            <Text style={styles.font_bold}>
              {itemData.item.stadiumName} Stadium
            </Text>
            <Text style={styles.font_bold}>ตำแหน่งที่ตั้ง</Text>
            <View style={styles.view_row}>
              <Text style={styles.font_bold}>เขต : </Text>
              <Text>{itemData.item.district}</Text>
            </View>
            <View style={styles.view_row}>
              <Text style={styles.font_bold}>แขวง : </Text>
              <Text>{itemData.item.subdistrict}</Text>
            </View>
            <View style={styles.view_row}>
              <Text style={styles.font_bold}>จังหวัด : </Text>
              <Text>{itemData.item.city}</Text>
            </View>
            <View style={styles.view_row}>
              <Text style={styles.font_bold}>Tel : </Text>
              <Text>{itemData.item.tel}</Text>
            </View>
            <View style={styles.view_row}>
              <Text style={styles.font_bold}>ราคาต่อชั่วโมง : </Text>
              <Text>{itemData.item.price}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <View style={[styles.top_row, { justifyContent: "space-between" }]}>
        <View style={{ flexDirection: "column" }}>
          <Image
            style={styles.user_pic}
            source={require("../../assets/stadium1.jpeg")}
          />
          <Text style={styles.color_white}>{User.name}</Text>
        </View>
        <View style={{ flexDirection: "row", width: 100 }}>
          <TextInput
            style={[
              styles.textInput,
              { marginLeft: 10, marginRight: 10, width: 120 },
            ]}
            placeholder="ค้นหา"
            keyboardType="default"
            autoCapitalize="none"
          />
          <FontAwesome5
            name="search"
            size={18}
            color="black"
            style={{ position: "absolute", marginLeft: 95, marginTop: 35 }}
          />
        </View>
        <SelectDropdown
          data={["ราคาน้อย - มาก", "ราคามาก - น้อย"]}
          onSelect={(selectedItem, index) => {
            // filterPrice(selectedItem);
          }}
          defaultButtonText="Filter"
          buttonStyle={{
            borderRadius: 10,
            backgroundColor: "#AAAAAA",
            width: "35%",
            fontSize: 10,
            height: 50,
            marginTop: 20,
            marginRight: 40,
          }}
        />
      </View>
      <Text style={[styles.color_white, styles.text_head]}>รายชื่อสนาม</Text>
      <FlatList data={stadium} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#181829",
    flex: 1,
  },
  color_red: {
    backgroundColor: "#FF2525",
  },
  color_blue: {
    backgroundColor: "#246BFD",
  },
  color_white: {
    color: "#FFF",
  },
  text_head: {
    fontSize: 40,
    marginTop: "10%",
  },
  user_pic: {
    width: 50,
    height: 50,
    marginTop: 9,
    borderRadius: 80,
  },
  top_row: {
    flexDirection: "row",
    marginTop: "15%",
    justifyContent: "space-between",
  },
  textInput: {
    backgroundColor: "#AAAAAA",
    color: "#000",
    borderRadius: 10,
    padding: 20,
    fontSize: 15,
    height: 50,
    marginTop: 20,
    fontSize: 15,
  },
  background_stadium: {
    width: "100%",
    backgroundColor: "#C4C4C4",
    borderRadius: 10,
    marginTop: 15,
  },
  image_stadium: {
    width: 144,
    height: 94,
    borderRadius: 15,
    marginTop: 18,
  },
  view_row: {
    flexDirection: "row",
  },
  view_col: {
    flexDirection: "column",
  },
  font_bold: {
    fontWeight: "bold",
  },
});

export default Search;
