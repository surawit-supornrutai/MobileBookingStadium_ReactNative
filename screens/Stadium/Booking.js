import React, { useState } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { useSelector, useDispatch } from "react-redux";
import firebase from "../../database/firebaseDB";
const Booking = ({ route, navigation }) => {
  // ...เพิ่มโค้ดกำหนด state...
  const [selectfield, setSelectfield] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [start, setStart] = useState("");
  const [stop, setStop] = useState("");
  const User = useSelector((state) => state.reducer.userProfile);
  const Stadium = useSelector((state) => state.reducer.stadium);
  const Booking = useSelector((state) => state.reducer.booking);
  const d = new Date();
  const [time, setTime] = useState(d.getHours() + "." + d.getMinutes());
  const field = ["สนามที่1", "สนามที่2"];
  const days = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
  ];
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
  const times = [
    "10.00",
    "11.00",
    "12.00",
    "13.00",
    "14.00",
    "15.00",
    "16.00",
    "17.00",
    "18.00",
    "19.00",
    "20.00",
    "21.00",
    "22.00",
    "23.00",
  ];
  const priceHour = Stadium.find((stadium) => {
    return stadium.id == route.params.stadiumID;
  });
  const checkBooking = Booking.filter((book) => {
    return (book.field =
      selectfield &&
      book.day == day &&
      book.month == month &&
      book.stadiumID == route.params.stadiumID &&
      ((parseFloat(book.start) <= parseFloat(start) &&
        parseFloat(start) <= parseFloat(book.stop)) ||
        (parseFloat(book.start) <= parseFloat(stop) &&
          parseFloat(stop) <= parseFloat(book.stop))));
  });
  function summary() {
    if (d.getMonth() > months.indexOf(month)) {
      Alert.alert("Warnning", "กรุณาเลือกเดือนให้ถูกต้อง");
    } else if (parseInt(start) >= parseInt(stop)) {
      Alert.alert("Warnning", "กรุณาเลือกเวลาให้ถูกต้อง");
    } else if (selectfield == "") {
      Alert.alert("Warnning", "กรุณาเลือกสนามให้ถูกต้อง");
    } else if (checkBooking.length !== 0) {
      Alert.alert("Warnning", "มีผู้ใช้งานจองแล้ว");
    } else if (d.getMonth() == months.indexOf(month)) {
      if (d.getDate() > day) {
        Alert.alert("Warnning", "กรุณาเลือกวันให้ถูกต้อง");
      }
      if (d.getDate() == day) {
        if (parseFloat(time) > parseFloat(start)) {
          Alert.alert("Warnning", "กรุณาเลือกเวลาให้ถูกต้อง");
        }
      } else {
        const hour = parseInt(stop) - parseInt(start);
        const sum = hour * priceHour.price;
        createBooking(sum);
      }
    } else {
      const hour = parseInt(stop) - parseInt(start);
      const sum = hour * priceHour.price;
      createBooking(sum);
    }
  }
  function createBooking(price) {
    firebase
      .firestore()
      .collection("booking")
      .add({
        field: selectfield,
        stadiumID: route.params.stadiumID,
        stadiumName: route.params.stadiumName,
        start: start,
        stop: stop,
        userID: User.id,
        userName: User.name,
        day: day + "",
        status: "notpay",
        month: month,
        year: 2564,
        price: price,
        userTel: User.tel,
      })
      .then(() => {
        setSelectfield("");
        setMonth("");
        setDay("");
        setStart("");
        setStop("");
        updatePriceUser(price + User.price);
        Alert.alert("Adding Alert", "จองสนามเสร็จแล้ว");
        navigation.popToTop();
      });
  }
  function updatePriceUser(price) {
    firebase.firestore().collection("users").doc(User.key).set({
      id: User.id,
      name: User.name,
      email: User.email,
      password: User.password,
      price: price,
      tel: User.tel,
      type: User.type,
    });
  }
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Text
          style={{
            fontSize: 40,
            color: "#FFF",
            marginTop: 40,
            fontWeight: "bold",
            marginRight: 30,
          }}
        >
          จองสนาม
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.button_red}
        >
          <Text style={[styles.color_white, { fontWeight: "bold" }]}>
            ยกเลิก
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={[styles.color_white, styles.font_size]}>สถานที่</Text>
      <SelectDropdown
        data={field}
        onSelect={(selectedItem, index) => {
          setSelectfield(selectedItem);
        }}
        defaultButtonText="เลือกสนาม"
        buttonStyle={{
          borderRadius: 10,
          backgroundColor: "#AAAAAA",
          width: "85%",
          marginTop: 15,
        }}
      />
      <Text style={[styles.color_white, styles.font_size]}>วันที่ - เดือน</Text>
      <View style={{ flexDirection: "row" }}>
        <SelectDropdown
          data={days}
          onSelect={(selectedItem, index) => {
            setDay(selectedItem);
          }}
          defaultButtonText="เลือกวัน"
          buttonStyle={{
            borderRadius: 10,
            backgroundColor: "#AAAAAA",
            width: "39%",
            marginLeft: 18,
          }}
        />
        <SelectDropdown
          data={months}
          onSelect={(selectedItem, index) => {
            setMonth(selectedItem);
          }}
          defaultButtonText="เลือกเดือน"
          buttonStyle={{
            borderRadius: 10,
            backgroundColor: "#AAAAAA",
            width: "39%",
            marginRight: 18,
          }}
        />
      </View>
      <Text style={[styles.color_white, styles.font_size]}>
        เริ่มต้นเวลา - ถึงเวลา
      </Text>
      <View style={{ flexDirection: "row", marginTop: 15 }}>
        <SelectDropdown
          data={times}
          onSelect={(selectedItem, index) => {
            setStart(selectedItem);
          }}
          defaultButtonText="เลือกเวลาเริ่มต้น"
          buttonStyle={{
            borderRadius: 10,
            backgroundColor: "#AAAAAA",
            width: "39%",
          }}
        />
        <Text style={{ fontSize: 40, color: "#AAAAAA" }}> - </Text>
        <SelectDropdown
          data={times}
          onSelect={(selectedItem, index) => {
            setStop(selectedItem);
          }}
          defaultButtonText="เลือกเวลาสิ้นสุด"
          buttonStyle={{
            borderRadius: 10,
            backgroundColor: "#AAAAAA",
            width: "39%",
          }}
        />
      </View>
      <TouchableOpacity
        style={styles.color_blue}
        onPress={() => {
          summary();
        }}
      >
        <Text style={{ color: "#FFF", fontSize: 25, fontWeight: "bold" }}>
          บันทึก
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#222232",
    flex: 1,
  },
  color_red: {
    backgroundColor: "#FF2525",
  },
  color_blue: {
    backgroundColor: "#246BFD",
    width: "85%",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 40,
  },
  color_white: {
    color: "#FFF",
  },
  button_red: {
    backgroundColor: "#FF2525",
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 50,
    borderRadius: 10,
    marginLeft: 50,
  },
  font_size: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 15,
    alignItems: "flex-start",
  },
  input: {
    marginTop: 15,
    backgroundColor: "#AAAAAA",
    color: "#000",
    borderRadius: 0,
    padding: 20,
    fontSize: 15,
    width: "85%",
  },
  input_time: {
    marginTop: 15,
    backgroundColor: "#AAAAAA",
    color: "#000",
    borderRadius: 20,
    padding: 20,
    fontSize: 15,
    width: "38%",
  },
});

export default Booking;
