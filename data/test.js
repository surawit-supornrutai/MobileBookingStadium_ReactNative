import firebase from "../database/firebaseDB";

export async function getStadium() {
  const snapshot = await firebase.firestore().collection("stadiums").get();
  const data = snapshot.docs.map((res) => {
    const {
      id,
      stadiumName,
      district,
      subdistrict,
      city,
      tel,
      price,
      owner,
      pic,
    } = res.data();
    return {
      key: res.id,
      id,
      stadiumName,
      district,
      subdistrict,
      city,
      tel,
      price,
      owner,
      pic,
    };
  });
  return data;
}

export async function getUser() {
  const snapshot = await firebase.firestore().collection("users").get();
  const data = snapshot.docs.map((res) => {
    const { id, name, email, password, tel, type, price } = res.data();
    return {
      key: res.id,
      id,
      name,
      email,
      password,
      tel,
      type,
      price,
    };
  });
  return data;
}

export async function getBooking() {
  const snapshot = await firebase.firestore().collection("booking").get();
  const data = snapshot.docs.map((res) => {
    const {
      stadiumID,
      field,
      stadiumName,
      start,
      stop,
      userID,
      userName,
      day,
      month,
      year,
      price,
      userTel,
      status,
    } = res.data();
    return {
      key: res.id,
      stadiumID,
      field,
      stadiumName,
      start,
      stop,
      userID,
      userName,
      day,
      month,
      year,
      price,
      userTel,
      status,
    };
  });
  return data;
}
