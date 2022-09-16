import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { useSelector } from "react-redux";
import firebase from "../../database/firebaseDB";
const Stadium_queue = ({ route, navigation }) => {
  //เรียกข้อมูลการจองของสนาม
  const Stadium = useSelector((state) => state.reducer.stadiumBooking);

  //เรียกข้อมูลผู้ใช้งานทั้งหมด
  const User = useSelector((state) => state.reducer.user);
  const [selectDay, setSelectDay] = useState(null);
  const [selectMonth, setSelectMonth] = useState(null);
  const [selectDate, setSelectDate] = useState([]);

  function getDateBooking() {
    const selectDateBooking = Stadium.filter((stadiumBook) => {
      return (
        stadiumBook.day == selectDay &&
        stadiumBook.month == months[selectMonth - 1]
      );
    });
    setSelectDate(selectDateBooking);
  }

  const months = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];

  function updateBooking(
    key,
    id,
    price,
    stadiumId,
    day,
    field,
    month,
    year,
    stadiumName,
    start,
    stop,
    username,
    tel,
    status
  ) {
    firebase
      .firestore()
      .collection("booking")
      .doc(key)
      .set({
        stadiumID: stadiumId,
        field: field,
        stadiumName: stadiumName,
        start: start,
        stop: stop,
        userID: id,
        userName: username,
        day: day,
        month: month,
        year: year,
        price: price,
        userTel: tel,
        status: status,
      })
      .then(() => {
        selectUser(id, price);
        updateBookingUser(id, price);
        Alert.alert("Update Alert", "เปลี่ยนสถานะการชำระเงินเสร็จแล้ว");
      });
  }
  function deleteBooking(key, id, price) {
    firebase
      .firestore()
      .collection("booking")
      .doc(key)
      .delete()
      .then(() => {
        selectUser(id, price);
        updateBookingUser(id, price);
        Alert.alert("Delete Alert", "ยกเลิกการจองแล้ว");
      });
  }
  async function selectUser(id, price) {
    const Use = await User.find((user) => {
      return user.id == id;
    });
    var sum = Use.price - price;
    updateBookingUser(
      Use.key,
      Use.id,
      Use.name,
      Use.email,
      Use.password,
      Use.tel,
      sum
    );
  }
  async function updateBookingUser(key, id, name, email, password, tel, sum) {
    firebase
      .firestore()
      .collection("users")
      .doc(key)
      .set({
        id: id,
        name: name,
        email: email,
        password: password,
        tel: tel,
        type: "user",
        price: sum,
      })
      .then(() => {
        navigation.goBack();
      });
  }
  //เรนเดอร์ข้อมูลการจองของสนามที่เลือก
  const renderItem = (itemData) => {
    return (
      <View>
        {itemData.item.status == "notpay" ? (
          <View>
            <View
              style={{
                backgroundColor: "#222232",
                width: "100%",
                padding: 10,
                marginTop: 20,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={[
                    styles.color_white,
                    { fontWeight: "bold", marginTop: 6, fontSize: 15 },
                  ]}
                >
                  {itemData.item.start} - {itemData.item.stop}
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={[
                      styles.color_red,
                      styles.booking_status,
                      { padding: 5 },
                    ]}
                  >
                    <Text style={[styles.color_white, { fontSize: 15 }]}>
                      ยังไม่จ่าย
                    </Text>
                  </View>
                  {route.params.type != "user" ? (
                    <TouchableOpacity
                      onPress={() =>
                        updateBooking(
                          itemData.item.key,
                          itemData.item.userID,
                          itemData.item.price,
                          itemData.item.stadiumID,
                          itemData.item.day,
                          itemData.item.field,
                          itemData.item.month,
                          itemData.item.year,
                          itemData.item.stadiumName,
                          itemData.item.start,
                          itemData.item.stop,
                          itemData.item.userName,
                          itemData.item.userTel,
                          "pay"
                        )
                      }
                    >
                      <View
                        style={[
                          styles.color_blue,
                          styles.booking_status,
                          { padding: 5 },
                        ]}
                      >
                        <Text style={[styles.color_white, { fontSize: 15 }]}>
                          จ่าย
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>
              <View
                style={{
                  borderBottomColor: "#FFF",
                  borderBottomWidth: 1,
                  marginTop: 10,
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={[
                    styles.color_white,
                    { fontWeight: "bold", fontSize: 20 },
                  ]}
                >
                  สนาม
                </Text>
                <Text
                  style={{ color: "#246BFD", fontSize: 20, fontWeight: "bold" }}
                >
                  {itemData.item.field}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={[
                    styles.color_white,
                    { fontWeight: "bold", fontSize: 20 },
                  ]}
                >
                  จองโดย
                </Text>
                <Text
                  style={{ color: "#246BFD", fontSize: 20, fontWeight: "bold" }}
                >
                  {itemData.item.userName}
                </Text>
              </View>
              {route.params.type != "user" ? (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={[
                      styles.color_white,
                      { fontWeight: "bold", fontSize: 20 },
                    ]}
                  >
                    เบอร์โทรศัพท์ผู้ใช้
                  </Text>
                  <Text
                    style={{
                      color: "#246BFD",
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    {itemData.item.userTel}
                  </Text>
                </View>
              ) : null}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={[
                    styles.color_white,
                    { fontWeight: "bold", fontSize: 20 },
                  ]}
                >
                  วันที่จอง
                </Text>
                <Text
                  style={{ color: "#246BFD", fontSize: 20, fontWeight: "bold" }}
                >
                  {itemData.item.day} {itemData.item.month} {itemData.item.year}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={[
                    styles.color_white,
                    { fontWeight: "bold", fontSize: 20 },
                  ]}
                >
                  ราคา
                </Text>
                <Text
                  style={{ color: "#246BFD", fontSize: 20, fontWeight: "bold" }}
                >
                  {itemData.item.price}
                </Text>
              </View>
              {route.params.type != "user" ? (
                <TouchableOpacity
                  style={{
                    padding: 20,
                    backgroundColor: "#EF5479",
                    width: "40%",
                    borderRadius: 10,
                    alignSelf: "flex-end",
                  }}
                  onPress={() => {
                    deleteBooking(
                      itemData.item.key,
                      itemData.item.userID,
                      itemData.item.price
                    );
                  }}
                >
                  <Text style={{ color: "#FFF" }}>ยกเลิกการจอง</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        ) : null}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={(day) => {
          setSelectDay(day.day);
          setSelectMonth(day.month);
          getDateBooking();
        }}
      />
      <FlatList
        data={selectDate}
        renderItem={renderItem}
        style={{ width: "85%" }}
      />
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
  booking_status: {
    borderRadius: 10,
  },
});

export default Stadium_queue;
