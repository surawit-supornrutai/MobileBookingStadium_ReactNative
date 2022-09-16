import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
  Pressable,
} from "react-native";
import { useDispatch } from "react-redux";
import {
  user,
  admin,
  dbuser,
  dbstadium,
  dbbooking,
  userbooking,
} from "../store/actions/Action";
import { getBooking, getStadium, getUser } from "../data/test";
import { Entypo, MaterialIcons } from "@expo/vector-icons";

const StartApp = ({ navigation }) => {
  const dispatch = useDispatch();
  // ...เพิ่มโค้ดกำหนด state...
  const [modalVisible, setModalVisible] = useState(false);
  const [userType, setUserType] = useState("");
  const [passwordUser, setPasswordUser] = useState("");
  const [passEye, setPassEye] = useState(true);

  const Input = (inputText) => {
    setUserType(inputText);
  };
  const pass = (inputText) => {
    setPasswordUser(inputText);
  };
  const toggleUser = (userId) => {
    dispatch(user(userId));
  };
  const toggleAdmin = (adminId) => {
    dispatch(admin(adminId));
  };

  const toggleStadium = (userId) => {
    dispatch(userbooking(userId));
  };

  const UserTypeno = async () => {
    const Stadium = await getStadium();
    const User = await getUser();
    const Booking = await getBooking();
    dispatch(dbstadium(Stadium));
    dispatch(dbuser(User));
    dispatch(dbbooking(Booking));

    const checkValid = await User.find((user) => {
      return user.email == userType && user.password == passwordUser;
    });
    if (checkValid === undefined) {
      Alert.alert(
        "Login Failed",
        "ไม่มีบัญชีผู้ใช้นี้กรุณากรอกข้อมูลให้ถูกต้อง"
      );
    } else if (checkValid.type == "user") {
      toggleUser(checkValid.id);
      navigation.navigate("mainTab");
      setUserType("");
      setPasswordUser("");
      toggleStadium(checkValid.id);
    } else if (checkValid.type == "admin") {
      toggleAdmin(checkValid.id);
      navigation.navigate("adminTab");
      setUserType("");
      setPasswordUser("");
    } else {
      alert("ไม่มีบัญชีผู้ใช้นี้กรุณากรอกข้อมูลให้ถูกต้อง");
      setUserType("");
      setPasswordUser("");
    }
  };

  // signIn = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     this.setState({ userInfo });
  //   } catch (error) {
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       // user cancelled the login flow
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       // operation (e.g. sign in) is in progress already
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       // play services not available or outdated
  //     } else {
  //       // some other error happened
  //     }
  //   }
  // };

  return (
    <View style={styles.container}>
      {/* กรอกข้อมูลเพื่อเข้าสู่ระบบ */}
      <Modal transparent={true} visible={modalVisible}>
        <View style={styles.modalView}>
          <View style={styles.head_head_modal}>
            <View style={styles.head_modal}></View>
          </View>
          <View style={styles.viewHead}>
            <Text style={styles.modalHead}>ยินดีต้อนรับ</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              style={styles.textInput}
              placeholder="อีเมล"
              placeholderTextColor="#65656B"
              keyboardType="email-address"
              value={userType}
              onChangeText={Input}
              autoCapitalize="none"
            ></TextInput>
            <MaterialIcons
              name="email"
              size={24}
              color="#65656B"
              style={{ position: "absolute", marginLeft: 10, marginTop: 30 }}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              style={[styles.textInput, { paddingLeft: 20 }]}
              placeholder="รหัสผ่าน"
              placeholderTextColor="#65656B"
              textContentType="password"
              secureTextEntry={passEye}
              value={passwordUser}
              onChangeText={pass}
              autoCapitalize="none"
            ></TextInput>
            {passEye == true ? (
              <Entypo
                name="eye"
                size={24}
                color="#65656B"
                style={{
                  position: "absolute",
                  marginLeft: "86%",
                  marginTop: 30,
                }}
                onPress={() => {
                  setPassEye(false);
                }}
              />
            ) : (
              <Entypo
                name="eye-with-line"
                size={24}
                color="#65656B"
                style={{
                  position: "absolute",
                  marginLeft: "86%",
                  marginTop: 30,
                }}
                onPress={() => {
                  setPassEye(true);
                }}
              />
            )}
          </View>
          <TouchableOpacity style={styles.button_Forgot_Password}>
            <Text style={styles.text_Forgot_Password}>ลืมรหัสผ่าน</Text>
          </TouchableOpacity>
          <Pressable
            style={[styles.button_modal, styles.buttonClose]}
            onPress={() => {
              UserTypeno();
              setModalVisible(!modalVisible);
            }}
          >
            <Text style={styles.textStyle}>เข้าสู่ระบบ</Text>
          </Pressable>
          <View style={styles.viewText}>
            <Text style={styles.color_white}>ยังไม่มีบัญชีใช่มั้ย ?</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Register"), setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.color_blue}>สมัครสมาชิก</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.background_image_mba}>
        <Image
          style={{ width: 400, height: 600 }}
          source={require("../assets/Ronaldo.png")}
        />
      </View>

      <Text style={styles.text_booking}>BOOKING STADIUM</Text>
      {/* ปุ่ม สมัครสมาชิก กับ เข้าสู่ระบบ */}
      <View style={styles.button}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View style={styles.button_signup}>
            <Text style={styles.text_button_signUp}>เข้าสู่ระบบ</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <View style={styles.button_signIn}>
            <Text style={styles.text_button_signIn}>สมัครสมาชิก</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#181829",
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
    paddingBottom: 40,
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
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
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
  image_mba: {
    width: 40,
    height: 40,
  },
  background_image_mba: {
    backgroundColor: "#222232",
    justifyContent: "center",
    width: "85%",
    height: "30%",
    marginLeft: 28,
    marginBottom: 40,
    borderRadius: 20,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button_signup: {
    backgroundColor: "#246BFD",
    padding: 10,
    paddingLeft: 50,
    paddingRight: 50,
    borderRadius: 16,
  },
  button_signIn: {
    padding: 10,
    paddingLeft: 30,
  },
  text_button_signUp: {
    color: "#ffffff",
    fontSize: 18,
  },
  text_button_signIn: {
    color: "#C4C4C4",
    fontSize: 15,
  },
  text_booking: {
    color: "#ffffff",
    fontSize: 50,
    marginBottom: 100,
    marginLeft: 50,
  },
  textInput: {
    marginTop: 15,
    backgroundColor: "#181829",
    color: "#ffffff",
    borderRadius: 20,
    padding: 20,
    paddingLeft: 40,
    fontSize: 15,
    width: "100%",
  },
  text_Forgot_Password: {
    marginTop: 10,
    color: "#ffffff",
  },
  button_Forgot_Password: {
    alignItems: "flex-end",
  },
  modalView: {
    width: "100%",
    backgroundColor: "#222232",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 35,
    marginTop: "115%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button_modal: {
    marginTop: 15,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  modalButton: {
    width: "85%",
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalHead: {
    fontSize: 30,
    color: "white",
  },
  viewHead: {
    justifyContent: "flex-start",
  },
  viewText: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  color_white: {
    color: "#ffffff",
  },
  color_blue: {
    color: "#1414F0",
  },
  head_modal: {
    backgroundColor: "#65656B",
    padding: 2,
    width: "25%",
    borderRadius: 100,
    marginBottom: 10,
  },
  head_head_modal: {
    alignItems: "center",
  },
});

export default StartApp;
