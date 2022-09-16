import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
  Pressable,
  modalVisible,
  TextInput,
} from "react-native";

import {
  FontAwesome,
  AntDesign,
  MaterialCommunityIcons,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import firebase from "../../database/firebaseDB";
import { Entypo, Feather, MaterialIcons, Foundation } from "@expo/vector-icons";
import { logout } from "../../store/actions/Action";
const Profile = ({ navigation }) => {
  // ...เพิ่มโค้ดกำหนด state...
  const dispatch = useDispatch();
  const User = useSelector((state) => state.reducer.userProfile);
  const UserOri = useSelector((state) => state.reducer.user);
  const userBooking = useSelector((state) => state.reducer.userBooking);
  const [choose, setChoose] = useState("Profile");
  const [nameModal, setName] = useState(false);
  const [passModal, setPass] = useState(false);
  const [emailModal, setEmail] = useState(false);
  const [telModal, setTel] = useState(false);
  const [name, setNameuser] = useState(User.name);
  const [password, setPassuser] = useState(User.password);
  const [email, setEmailuser] = useState(User.email);
  const [tel, setTeluser] = useState(User.tel);
  const [afterPass, setAfterPass] = useState("");
  const [passEye, setPassEye] = useState(true);
  const [conpassEye, setConpassEye] = useState(true);
  const username = (inputText) => {
    setNameuser(inputText);
  };
  const emailuser = (inputText) => {
    setEmailuser(inputText);
  };
  const pass = (inputText) => {
    setPassuser(inputText);
  };
  const conpass = (inputText) => {
    setAfterPass(inputText);
  };
  const teluser = (inputText) => {
    setTeluser(inputText);
  };
  const checkpass = () => {
    if (password == User.password) {
      setUser(afterPass);
    } else {
      Alert.alert("Update Alert", "รหัสผ่่านก่อนหน้าไม่ถูกต้อง");
    }
  };
  const validateEmail = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email) === true) {
      return true;
    } else {
      return false;
    }
  };
  const Logout = () => {
    dispatch(logout());
  };
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
    const Use = await UserOri.find((user) => {
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
  function setUser(pass) {
    if (tel.length != 10) {
      Alert.alert("Update Alert", "กรุณากรอกเบอร์โทรศัท์ให้ถูกต้อง");
    } else if (tel.charAt(0) != "0" || tel.charAt(1) != "8") {
      Alert.alert("Update Alert", "กรุณากรอกเบอร์ให้ถูกต้อง");
    } else if (validateEmail() == false) {
      Alert.alert("Update Alert", "กรุณากรอกอีเมลให้ถูกต้อง");
    } else {
      firebase
        .firestore()
        .collection("users")
        .doc(User.key)
        .set({
          id: User.id,
          name: name,
          email: email,
          password: pass,
          tel: tel,
          type: "user",
          price: User.price,
        })
        .then(() => {
          setEmailuser(User.email);
          setNameuser(User.name);
          setPassuser(User.password);
          setTeluser(User.tel);
          setName(false);
          setPass(false);
          setEmail(false);
          setTel(false);
          Alert.alert("Update Alert", "อัพเดตข้อมูลผู้ใช้เสร็จแล้ว");
        });
    }
  }
  const renderItem = (itemData) => {
    return (
      <View>
        <View style={{ backgroundColor: "#222232", marginTop: 20 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={[
                styles.color_white,
                {
                  fontSize: 19,
                  fontWeight: "bold",
                  paddingLeft: 5,
                  paddingRight: 5,
                  marginRight: "35%",
                },
              ]}
            >
              ชื่อสนาม
            </Text>
            <Text
              style={{
                color: "#246BFD",
                fontSize: 19,
                fontWeight: "bold",
                paddingLeft: 5,
                paddingRight: 5,
              }}
            >
              {itemData.item.stadiumName} Stadium
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Text
              style={[
                styles.color_white,
                {
                  fontSize: 19,
                  fontWeight: "bold",
                  paddingLeft: 5,
                  paddingRight: 5,
                  marginRight: "35%",
                },
              ]}
            >
              สนาม
            </Text>
            <Text
              style={{
                color: "#246BFD",
                fontSize: 19,
                fontWeight: "bold",
                paddingLeft: 5,
                paddingRight: 5,
              }}
            >
              {itemData.item.field}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Text
              style={[
                styles.color_white,
                {
                  fontSize: 19,
                  fontWeight: "bold",
                  paddingLeft: 5,
                  paddingRight: 5,
                  marginRight: "30%",
                },
              ]}
            >
              วันที่
            </Text>
            <Text
              style={{
                color: "#246BFD",
                fontSize: 19,
                fontWeight: "bold",
                paddingLeft: 5,
                paddingRight: 5,
              }}
            >
              {itemData.item.day} {itemData.item.month} {itemData.item.year}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Text
              style={[
                styles.color_white,
                {
                  fontSize: 19,
                  fontWeight: "bold",
                  paddingLeft: 5,
                  paddingRight: 5,
                  marginRight: "35%",
                },
              ]}
            >
              เวลา
            </Text>
            <Text
              style={{
                color: "#246BFD",
                fontSize: 19,
                fontWeight: "bold",
                paddingLeft: 5,
                paddingRight: 5,
              }}
            >
              {itemData.item.start} - {itemData.item.stop}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Text
              style={[
                styles.color_white,
                {
                  fontSize: 19,
                  fontWeight: "bold",
                  paddingLeft: 5,
                  paddingRight: 5,
                  marginRight: "35%",
                },
              ]}
            >
              ราคา
            </Text>
            <Text
              style={{
                color: "#246BFD",
                fontSize: 19,
                fontWeight: "bold",
                paddingLeft: 5,
                paddingRight: 5,
              }}
            >
              {itemData.item.price} บาท
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Text
              style={[
                styles.color_white,
                {
                  fontSize: 19,
                  fontWeight: "bold",
                  paddingLeft: 5,
                  paddingRight: 5,
                  marginRight: "35%",
                },
              ]}
            >
              สถานะ
            </Text>
            {itemData.item.status == "notpay" ? (
              <Text
                style={{
                  color: "#FFF",
                  fontSize: 19,
                  fontWeight: "bold",
                  paddingLeft: 5,
                  paddingRight: 5,
                  marginRight: 5,
                  backgroundColor: "#FF2525",
                }}
              >
                ยังไม่จ่าย
              </Text>
            ) : (
              <Text
                style={{
                  color: "#246BFD",
                  fontSize: 19,
                  fontWeight: "bold",
                  paddingLeft: 5,
                  paddingRight: 5,
                  marginRight: 5,
                  backgroundColor: "#02B95C",
                }}
              >
                จ่ายแล้ว
              </Text>
            )}
          </View>
          {itemData.item.status == "notpay" ? (
            <TouchableOpacity
              style={{
                backgroundColor: "#EF5479",
                padding: 20,
                width: "35%",
                borderRadius: 10,
                alignSelf: "center",
                marginTop: 10,
                marginRight: 10,
              }}
              onPress={() => {
                deleteBooking(
                  itemData.item.key,
                  itemData.item.userID,
                  itemData.item.price
                );
              }}
            >
              <Text style={{ color: "#FFF", textAlign: "center" }}>
                ยกเลิกการจอง
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
        <View style={{ height: 1, backgroundColor: "#FFF", marginTop: 20 }} />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {/* เปลี่ยนชื่อ */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={nameModal}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setName(!nameModal);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>เปลี่ยนชื่อ</Text>
            <TextInput
              style={styles.inputModal}
              value={name}
              onChangeText={username}
              autoCapitalize="none"
            />
            <View style={{ flexDirection: "row" }}>
              <Pressable
                style={[styles.button, styles.color_blue]}
                onPress={() => setUser(password)}
              >
                <Text style={[styles.textStyle]}>ยืนยัน</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.color_red]}
                onPress={() => setName(!nameModal)}
              >
                <Text style={styles.textStyle}>ยกเลิก</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      {/* เปลี่ยนอีเมล */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={emailModal}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setEmail(!emailModal);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>เปลี่ยนอีเมล</Text>
            <TextInput
              style={styles.inputModal}
              value={email}
              onChangeText={emailuser}
              autoCapitalize="none"
            />
            <View style={{ flexDirection: "row" }}>
              <Pressable
                style={[styles.button, styles.color_blue]}
                onPress={() => setUser(password)}
              >
                <Text style={[styles.textStyle]}>ยืนยัน</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.color_red]}
                onPress={() => setEmail(!emailModal)}
              >
                <Text style={styles.textStyle}>ยกเลิก</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      {/* เปลี่ยนเบอร์โทร */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={telModal}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setTel(!telModal);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>เปลี่ยนเบอร์โทร</Text>
            <TextInput
              style={styles.inputModal}
              value={tel}
              onChangeText={teluser}
            />
            <View style={{ flexDirection: "row" }}>
              <Pressable
                style={[styles.button, styles.color_blue]}
                onPress={() => setUser(password)}
              >
                <Text style={[styles.textStyle]}>ยืนยัน</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.color_red]}
                onPress={() => setTel(!telModal)}
              >
                <Text style={styles.textStyle}>ยกเลิก</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      {/* เปลี่ยนรหัสผ่าน */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={passModal}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setPass(!passModal);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>เปลี่ยนรหัสผ่าน</Text>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                style={[styles.inputModal, { width: "85%" }]}
                placeholder="รหัสผ่านก่อนหน้า"
                onChangeText={pass}
                autoCapitalize="none"
                secureTextEntry={passEye}
              />
              {passEye == true ? (
                <Entypo
                  name="eye"
                  size={24}
                  color="#000"
                  style={{
                    position: "absolute",
                    marginLeft: "91%",
                    marginTop: 20,
                  }}
                  onPress={() => {
                    setPassEye(false);
                  }}
                />
              ) : (
                <Entypo
                  name="eye-with-line"
                  size={24}
                  color="#000"
                  style={{
                    position: "absolute",
                    marginLeft: "91%",
                    marginTop: 20,
                  }}
                  onPress={() => {
                    setPassEye(true);
                  }}
                />
              )}
            </View>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                style={[styles.inputModal, { width: "85%" }]}
                placeholder="รหัสผ่านใหม่"
                onChangeText={conpass}
                autoCapitalize="none"
                secureTextEntry={true}
              />
              {conpassEye == true ? (
                <Entypo
                  name="eye"
                  size={24}
                  color="#000"
                  style={{
                    position: "absolute",
                    marginLeft: "91%",
                    marginTop: 20,
                  }}
                  onPress={() => {
                    setConpassEye(false);
                  }}
                />
              ) : (
                <Entypo
                  name="eye-with-line"
                  size={24}
                  color="#000"
                  style={{
                    position: "absolute",
                    marginLeft: "91%",
                    marginTop: 20,
                  }}
                  onPress={() => {
                    setConpassEye(true);
                  }}
                />
              )}
            </View>
            <View style={{ flexDirection: "row" }}>
              <Pressable
                style={[styles.button, styles.color_blue]}
                onPress={() => checkpass()}
              >
                <Text style={[styles.textStyle]}>ยืนยัน</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.color_red]}
                onPress={() => setPass(!passModal)}
              >
                <Text style={styles.textStyle}>ยกเลิก</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Image
        style={styles.user_pic}
        source={require("../../assets/user.png")}
      />

      <Text style={[styles.color_white, { fontSize: 28, fontWeight: "bold" }]}>
        {User.name}
      </Text>
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
              <Text style={{ fontSize: 15, color: "#FFF", fontWeight: "bold" }}>
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
              <Text style={{ fontSize: 15, color: "#FFF", fontWeight: "bold" }}>
                จองสนาม
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setChoose("Booking");
            }}
          >
            <Text style={{ fontSize: 15, color: "#FFF", fontWeight: "bold" }}>
              จองสนาม
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
              setChoose("Setting");
            }}
          >
            <Text style={{ fontSize: 15, color: "#FFF", fontWeight: "bold" }}>
              ตั้งค่า
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {choose == "Booking" ? (
        <View style={{ alignItems: "flex-end", marginTop: 10 }}>
          <Text style={{ color: "#FFF", fontSize: 19, fontWeight: "bold" }}>
            ราคารวม {User.price} บาท
          </Text>
        </View>
      ) : null}
      {/* profile */}
      {choose == "Profile" ? (
        <View>
          <View style={{ flexDirection: "row" }}>
            <FontAwesome
              name="user-o"
              size={24}
              color="#FFF"
              style={{ marginTop: 26, marginRight: 10 }}
            />
            <TouchableOpacity
              style={{
                flexDirection: "row",
                marginTop: 20,
                justifyContent: "space-between",
                width: "80%",
              }}
              onPress={() => {
                setName(true);
              }}
            >
              <View style={{ flexDirection: "col" }}>
                <Text
                  style={{ color: "#FFF", fontSize: 17, fontWeight: "bold" }}
                >
                  ชื่อ
                </Text>
                <Text style={{ color: "#C4C4C4" }}>{User.name}</Text>
              </View>
              <AntDesign
                name="right"
                size={24}
                color="#FFF"
                style={{ marginTop: 6 }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: "#222232",
              width: "75%",
              marginTop: 25,
            }}
          />
          <View style={{ flexDirection: "row" }}>
            <MaterialCommunityIcons
              name="email-outline"
              size={24}
              color="#fff"
              style={{ marginTop: 26, marginRight: 10 }}
            />
            <TouchableOpacity
              style={{
                flexDirection: "row",
                marginTop: 20,
                justifyContent: "space-between",
                width: "80%",
              }}
              onPress={() => {
                setEmail(true);
              }}
            >
              <View style={{ flexDirection: "col" }}>
                <Text
                  style={{ color: "#FFF", fontSize: 17, fontWeight: "bold" }}
                >
                  อีเมล
                </Text>
                <Text style={{ color: "#C4C4C4" }}>{User.email}</Text>
              </View>
              <AntDesign
                name="right"
                size={24}
                color="#FFF"
                style={{ marginTop: 6 }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: "#222232",
              width: "75%",
              marginTop: 25,
            }}
          />
          <View style={{ flexDirection: "row" }}>
            <FontAwesome
              name="phone"
              size={24}
              color="#FFF"
              style={{ marginTop: 26, marginRight: 10 }}
            />
            <TouchableOpacity
              style={{
                flexDirection: "row",
                marginTop: 20,
                justifyContent: "space-between",
                width: "80%",
              }}
              onPress={() => {
                setTel(true);
              }}
            >
              <View style={{ flexDirection: "col" }}>
                <Text
                  style={{ color: "#FFF", fontSize: 17, fontWeight: "bold" }}
                >
                  เบอร์โทรศัพท์
                </Text>
                <Text style={{ color: "#C4C4C4" }}>{User.tel}</Text>
              </View>
              <AntDesign
                name="right"
                size={24}
                color="#FFF"
                style={{ marginTop: 6 }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: "#222232",
              width: "75%",
              marginTop: 25,
            }}
          />
          <View style={{ flexDirection: "row" }}>
            <FontAwesome5
              name="key"
              size={24}
              color="#fff"
              style={{ marginTop: 26, marginRight: 10 }}
            />
            <TouchableOpacity
              style={{
                flexDirection: "row",
                marginTop: 20,
                justifyContent: "space-between",
                width: "80%",
              }}
              onPress={() => {
                setPass(true);
              }}
            >
              <View style={{ flexDirection: "col" }}>
                <Text
                  style={{ color: "#FFF", fontSize: 17, fontWeight: "bold" }}
                >
                  เปลี่ยน รหัสผ่าน
                </Text>
                <Text style={{ color: "#C4C4C4" }}>******************</Text>
              </View>
              <AntDesign
                name="right"
                size={24}
                color="#FFF"
                style={{ marginTop: 6 }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: "#222232",
              width: "75%",
              marginTop: 25,
            }}
          />
        </View>
      ) : null}

      {choose == "Booking" ? (
        <FlatList data={userBooking} renderItem={renderItem} />
      ) : null}

      {choose == "Setting" ? (
        <View style={{ backgroundColor: "#181829", width: "90%" }}>
          <TouchableOpacity
            style={{
              padding: 20,
              backgroundColor: "#222232",
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
        </View>
      ) : null}
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
  user_pic: {
    width: 100,
    height: 100,
    marginTop: 70,
    borderRadius: 100,
  },
  textInput: {
    marginTop: 15,
    backgroundColor: "#181829",
    color: "#ffffff",
    borderRadius: 10,
    padding: 20,
    fontSize: 15,
  },
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
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
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
  inputModal: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default Profile;
