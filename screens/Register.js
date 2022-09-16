import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import firebase from "../database/firebaseDB";
import { useDispatch } from "react-redux";
import { getUser } from "../data/test";
import { Entypo, Feather, MaterialIcons, Foundation } from "@expo/vector-icons";
import { addNewUser } from "../store/actions/Action";

const Register = ({ navigation }) => {
  // ...เพิ่มโค้ดกำหนด state...
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Pass, setPass] = useState("");
  const [Conpass, setConpass] = useState("");
  const [Tel, setTel] = useState("");
  const [passEye, setPassEye] = useState(true);
  const [conpassEye, setConpassEye] = useState(true);

  const username = (inputText) => {
    setName(inputText);
  };
  const email = (inputText) => {
    setEmail(inputText);
  };
  const pass = (inputText) => {
    setPass(inputText);
  };
  const conpass = (inputText) => {
    setConpass(inputText);
  };
  const tel = (inputText) => {
    setTel(inputText);
  };

  // เช็คข้อมูลการกรอกของผู้ใช้
  const check = () => {
    if (name != "" && Email != "" && Pass != "" && Conpass != "" && Tel != "") {
      getUse();
    } else {
      alert("กรุณากรอกข้อมูลให้ครบ");
    }
  };
  //เช็คว่ามีผู้ใช้กี่คนแล้วเพื่อกำหนดid
  async function getUse() {
    const user = await getUser();

    const checkEmail = await user.filter((use) => {
      return use.email == Email;
    });
    const checkTel = await user.filter((use) => {
      return use.tel == Tel;
    });
    const validateEmail = () => {
      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (reg.test(Email) === true) {
        return true;
      } else {
        return false;
      }
    };
    if (checkEmail.length == 1) {
      Alert.alert("Create Alert", "มีอีเมลนี้แล้ว");
    } else if (checkTel.length == 1) {
      Alert.alert("Create Alert", "มีเบอร์นี้แล้ว");
    } else if (Tel.length != 10) {
      Alert.alert("Create Alert", "กรุณากรอกเบอร์ให้ถูกต้อง");
    } else if (
      Tel.charAt(0) != "0" &&
      (Tel.charAt(1) != "8" || Tel.charAt(1) != "9" || Tel.charAt(1) != "6")
    ) {
      Alert.alert("Create Alert", "กรุณากรอกเบอร์ให้ถูกต้อง");
    } else if (validateEmail() == false) {
      Alert.alert("Create Alert", "กรุณากรอกอีเมลให้ถูกต้อง");
    } else if (Pass != Conpass) {
      Alert.alert("Create Alert", "กรุณากรอก พาสเวิรด ให้ตรงกัน");
    } else if (Pass.length < 8) {
      Alert.alert("Create Alert", "กรุณากรอก พาสเวิรด ไม่น้อยกว่า 8 ตัว");
    } else {
      createUser(user.length + 1);
    }
  }
  // สร้างผู้ใช้งานใหม่
  function createUser(id) {
    firebase
      .firestore()
      .collection("users")
      .add({
        id: id + "",
        email: Email,
        name: name,
        password: Pass,
        tel: Tel,
        type: "user",
        price: 0,
      })
      .then(() => {
        setEmail("");
        setName("");
        setPass("");
        setConpass("");
        setTel("");
        Alert.alert("Adding Alert", "สมัครสมาชิกเสร็จแล้ว");
        navigation.popToTop();
      });
  }
  return (
    // ฟอรมการกรอกข้อมูลของผู้ใช้
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          style={styles.textInput}
          placeholder="ชื่อ"
          keyboardType="default"
          placeholderTextColor="#65656B"
          value={name}
          onChangeText={username}
          autoCapitalize="none"
        />
        <Feather
          name="user"
          size={24}
          color="#65656B"
          style={{ position: "absolute", marginLeft: 10, marginTop: 30 }}
        />
      </View>

      <View style={{ flexDirection: "row" }}>
        <TextInput
          style={styles.textInput}
          placeholder="อีเมล"
          keyboardType="email-address"
          placeholderTextColor="#65656B"
          value={Email}
          onChangeText={email}
          autoCapitalize="none"
        />
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
          keyboardType="default"
          placeholderTextColor="#65656B"
          value={Pass}
          onChangeText={pass}
          autoCapitalize="none"
          secureTextEntry={passEye}
        />
        {passEye == true ? (
          <Entypo
            name="eye"
            size={24}
            color="#65656B"
            style={{ position: "absolute", marginLeft: "75%", marginTop: 30 }}
            onPress={() => {
              setPassEye(false);
            }}
          />
        ) : (
          <Entypo
            name="eye-with-line"
            size={24}
            color="#65656B"
            style={{ position: "absolute", marginLeft: "75%", marginTop: 30 }}
            onPress={() => {
              setPassEye(true);
            }}
          />
        )}
      </View>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          style={[styles.textInput, { paddingLeft: 20 }]}
          placeholder="ยืนยันรหัสผ่าน"
          keyboardType="default"
          placeholderTextColor="#65656B"
          value={Conpass}
          onChangeText={conpass}
          autoCapitalize="none"
          secureTextEntry={conpassEye}
        />
        {conpassEye == true ? (
          <Entypo
            name="eye"
            size={24}
            color="#65656B"
            style={{ position: "absolute", marginLeft: "75%", marginTop: 30 }}
            onPress={() => {
              setConpassEye(false);
            }}
          />
        ) : (
          <Entypo
            name="eye-with-line"
            size={24}
            color="#65656B"
            style={{ position: "absolute", marginLeft: "75%", marginTop: 30 }}
            onPress={() => {
              setConpassEye(true);
            }}
          />
        )}
      </View>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          style={styles.textInput}
          placeholder="เบอร์โทรศัพท์"
          keyboardType="phone-pad"
          placeholderTextColor="#65656B"
          value={Tel}
          onChangeText={tel}
          autoCapitalize="none"
        />
        <Foundation
          name="telephone"
          size={24}
          color="#65656B"
          style={{ position: "absolute", marginLeft: 12, marginTop: 30 }}
        />
      </View>
      <View style={styles.button_row}>
        <TouchableOpacity
          style={[styles.button, styles.color_blue]}
          onPress={() => {
            check();
          }}
        >
          <Text style={styles.color_white}>สมัครสมาชิก</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.color_red]}
          onPress={() => {
            navigation.popToTop();
          }}
        >
          <Text style={styles.color_white}>ยกเลิก</Text>
        </TouchableOpacity>
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
  textInput: {
    marginTop: 15,
    backgroundColor: "#181829",
    color: "#ffffff",
    borderRadius: 20,
    padding: 20,
    paddingLeft: 40,
    fontSize: 15,
    width: "85%",
  },
  button_row: {
    flexDirection: "row",
  },
  button: {
    padding: 10,
    margin: 10,
    marginTop: 20,
    borderRadius: 10,
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
});

export default Register;
