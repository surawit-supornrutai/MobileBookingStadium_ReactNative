import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import firebase from "../../database/firebaseDB";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { Calendar } from "react-native-calendars";
import { logout } from "../../store/actions/Action";
const Booking = ({ navigation }) => {
  // ...เพิ่มโค้ดกำหนด state...
  const dispatch = useDispatch();
  const User = useSelector((state) => state.reducer.adminProfile);
  const Stadium = useSelector((state) => state.reducer.ownerStadium);
  const Booking = useSelector((state) => state.reducer.booking);

  const [choose, setChoose] = useState("Profile");
  const [chooseStadium, setChooseStadium] = useState("");

  const [selectDay, setSelectDay] = useState(null);
  const [selectMonth, setSelectMonth] = useState(null);
  const [selectDate, setSelectDate] = useState([]);

  const [name, setName] = useState("");
  const [district, setDistrict] = useState("");
  const [subdistrict, setSubdistrict] = useState("");
  const [city, setCity] = useState("");
  const [tel, setTel] = useState("");
  const [price, setPrice] = useState(0);
  const [sumprice, setSumprice] = useState(0);

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
  const stadiumName = (input) => {
    setName(input);
  };
  const District = (input) => {
    setDistrict(input);
  };
  const Subdistrict = (input) => {
    setSubdistrict(input);
  };
  const City = (input) => {
    setCity(input);
  };
  const Tel = (input) => {
    setTel(input);
  };
  const Price = (input) => {
    setPrice(input);
  };
  const Logout = () => {
    dispatch(logout());
  };
  async function getDateBooking() {
    const selectDateBooking = Booking.filter((stadiumBook) => {
      return (
        stadiumBook.day == selectDay &&
        stadiumBook.month == months[selectMonth - 1]
      );
    });
    const stadiumID = Stadium.map((sta) => {
      return sta.id;
    });
    const ownerBooking = await selectDateBooking.filter((sta) =>
      stadiumID.includes(sta.stadiumID)
    );
    if (ownerBooking.length != 0) {
      const bookingPay = ownerBooking.filter((id) => {
        return id.status == "pay";
      });
      const sumBookingPrice = bookingPay.reduce((previousValue, booking) => ({
        price: previousValue.price + booking.price,
      }));
      setSumprice(sumBookingPrice.price);
    } else {
      setSumprice(0);
    }

    setSelectDate(ownerBooking);
  }
  function setData(data) {
    setTel(data.tel);
    setName(data.stadiumName);
    setPrice(data.price);
    setCity(data.city);
    setDistrict(data.district);
    setSubdistrict(data.subdistrict);
  }

  function setStadium(key, owner, pic, id) {
    firebase
      .firestore()
      .collection("stadiums")
      .doc(key)
      .set({
        id: id,
        stadiumName: name,
        district: district,
        subdistrict: subdistrict,
        city: city,
        tel: tel,
        price: price,
        owner: owner,
        pic: pic,
      })
      .then(() => {
        setName("");
        setDistrict("");
        setSubdistrict("");
        setCity("");
        setTel("");
        setPrice("");
        Alert.alert("Update Alert", "อัพเดตสนามเสร็จแล้ว");
        navigation.goBack();
      });
  }
  const renderItem = (itemData) => {
    // const num = sumprice + itemData.item.price;
    // setSumprice(num);
    return (
      <View>
        {itemData.item.status == "pay" ? (
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
                      styles.booking_status,
                      { padding: 5, backgroundColor: "#02B95C" },
                    ]}
                  >
                    <Text style={[styles.color_white, { fontSize: 15 }]}>
                      จ่ายแล้ว
                    </Text>
                  </View>
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
                  ชื่อสนาม
                </Text>
                <Text
                  style={{ color: "#246BFD", fontSize: 20, fontWeight: "bold" }}
                >
                  {itemData.item.stadiumName} Stadium
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
            </View>
          </View>
        ) : null}
      </View>
    );
  };

  const renderStadiumItem = (itemData) => {
    return (
      <View style={{ marginTop: 20, marginLeft: 20, marginRight: 20 }}>
        {chooseStadium == itemData.item.stadiumName && choose == "Profile" ? (
          <View>
            <TouchableOpacity
              style={{
                backgroundColor: "#EF7A5D",
                padding: 10,
                borderRadius: 20,
                marginTop: -10,
                marginRight: -5,
              }}
            >
              <Text style={{ fontSize: 15, color: "#FFF", fontWeight: "bold" }}>
                {itemData.item.stadiumName}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setChooseStadium(itemData.item.stadiumName);
              setData(itemData.item);
            }}
          >
            <Text style={{ fontSize: 15, color: "#FFF", fontWeight: "bold" }}>
              {itemData.item.stadiumName}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderStadiumInformation = (itemData) => {
    return (
      <View>
        {chooseStadium == itemData.item.stadiumName ? (
          <View>
            <Text
              style={[
                styles.color_white,
                { fontSize: 15, fontWeight: "bold", marginTop: 10 },
              ]}
            >
              เปลี่ยนชื่อสนาม :
            </Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={stadiumName}
              autoCapitalize="none"
            />
            <Text
              style={[
                styles.color_white,
                { fontSize: 15, fontWeight: "bold", marginTop: 10 },
              ]}
            >
              เปลี่ยนเขต :
            </Text>
            <TextInput
              style={styles.input}
              value={district}
              onChangeText={District}
              autoCapitalize="none"
            />
            <Text
              style={[
                styles.color_white,
                { fontSize: 15, fontWeight: "bold", marginTop: 10 },
              ]}
            >
              เปลี่ยนแขวง :
            </Text>
            <TextInput
              style={styles.input}
              value={subdistrict}
              onChangeText={Subdistrict}
              autoCapitalize="none"
            />
            <Text
              style={[
                styles.color_white,
                { fontSize: 15, fontWeight: "bold", marginTop: 10 },
              ]}
            >
              เปลี่ยนจังหวัด :
            </Text>
            <TextInput
              style={styles.input}
              value={city}
              onChangeText={City}
              autoCapitalize="none"
            />
            <Text
              style={[
                styles.color_white,
                { fontSize: 15, fontWeight: "bold", marginTop: 10 },
              ]}
            >
              เปลี่ยนเบอร์โทรศัพท์ :
            </Text>
            <TextInput
              style={styles.input}
              value={tel}
              onChangeText={Tel}
              autoCapitalize="none"
            />
            <Text
              style={[
                styles.color_white,
                { fontSize: 15, fontWeight: "bold", marginTop: 10 },
              ]}
            >
              เปลี่ยนราคา ต่อ ชั่วโมง :
            </Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={Price}
              autoCapitalize="none"
            />
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <TouchableOpacity
                style={styles.button_blue}
                onPress={() => {
                  setStadium(
                    itemData.item.key,
                    itemData.item.owner,
                    itemData.item.pic,
                    itemData.item.id
                  );
                }}
              >
                <Text style={styles.color_white}>ยืนยัน</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button_red}>
                <Text style={styles.color_white}>ยกเลิก</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={[styles.backgroundColor, { marginTop: 30 }]}>
        {/* ChooseProfile & Booking & Setting */}
        <View
          style={{
            flexDirection: "row",
            width: "85%",
            justifyContent: "space-around",
            marginTop: 30,
          }}
        >
          {choose == "Profile" ? (
            <View>
              <TouchableOpacity
                style={{
                  backgroundColor: "#EF7A5D",
                  padding: 10,
                  borderRadius: 20,
                  marginTop: -10,
                  marginRight: -20,
                }}
              >
                <Text
                  style={{ fontSize: 15, color: "#FFF", fontWeight: "bold" }}
                >
                  โปรไฟล์
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setChoose("Profile");
              }}
            >
              <Text style={{ fontSize: 15, color: "#FFF", fontWeight: "bold" }}>
                โปรไฟล์
              </Text>
            </TouchableOpacity>
          )}

          {choose == "Booking" ? (
            <TouchableOpacity
              style={{
                backgroundColor: "#EF7A5D",
                padding: 10,
                borderRadius: 20,
                marginTop: -10,
                marginRight: -20,
              }}
            >
              <Text style={{ fontSize: 15, color: "#FFF", fontWeight: "bold" }}>
                ประวัติการจอง
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setChoose("Booking"), setChooseStadium("");
              }}
            >
              <Text style={{ fontSize: 15, color: "#FFF", fontWeight: "bold" }}>
                ประวัติการจอง
              </Text>
            </TouchableOpacity>
          )}

          {choose == "Setting" ? (
            <TouchableOpacity
              style={{
                backgroundColor: "#EF7A5D",
                padding: 10,
                borderRadius: 20,
                marginTop: -10,
                marginRight: -20,
              }}
            >
              <Text style={{ fontSize: 15, color: "#FFF", fontWeight: "bold" }}>
                ตั้งค่า
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setChoose("Setting"), setChooseStadium("");
              }}
            >
              <Text style={{ fontSize: 15, color: "#FFF", fontWeight: "bold" }}>
                ตั้งค่า
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* ChooseStadium */}
        {choose == "Profile" ? (
          <FlatList
            data={Stadium}
            renderItem={renderStadiumItem}
            numColumns={2}
            style={{ alignSelf: "center" }}
          />
        ) : null}

        {choose == "Booking" ? (
          <View>
            <Calendar
              onDayPress={(day) => {
                setSelectDay(day.day);
                setSelectMonth(day.month);
                getDateBooking();
              }}
              style={{ marginTop: 10 }}
            />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ color: "#FFF", fontSize: 25 }}>รายได้</Text>
              <Text style={{ color: "#FFF", fontSize: 25 }}>{sumprice}</Text>
            </View>
            <FlatList data={selectDate} renderItem={renderItem} />
          </View>
        ) : null}

        {/* profile */}
        <FlatList data={Stadium} renderItem={renderStadiumInformation} />

        {choose == "Setting" ? (
          <TouchableOpacity
            style={{
              padding: 20,
              backgroundColor: "#181829",
              borderRadius: 10,
              width: "100%",
              marginTop: 10,
            }}
            onPress={() => {
              Logout();
              navigation.popToTop();
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={[styles.color_white, { fontSize: 20 }]}>
                ออกจากระบบ
              </Text>
              <Ionicons name="exit" size={24} color="#FFF" />
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
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
  },
  color_white: {
    color: "#FFF",
  },
  button_red: {
    backgroundColor: "#FF2525",
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
    borderRadius: 10,
    marginLeft: 20,
  },
  button_blue: {
    backgroundColor: "#246BFD",
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
    borderRadius: 10,
    marginRight: 20,
  },
  font_size: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 15,
    alignItems: "flex-start",
  },
  input: {
    marginTop: 10,
    backgroundColor: "#181829",
    color: "#FFF",
    borderRadius: 20,
    padding: 15,
    fontSize: 15,
    width: "100%",
  },
  backgroundColor: {
    backgroundColor: "#222232",
    width: "100%",
    padding: 20,
  },
});

export default Booking;
