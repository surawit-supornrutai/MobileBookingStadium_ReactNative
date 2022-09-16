export const USER = "USER";
export const ADMIN = "ADMIN";
export const DBUSER = "DBUSER";
export const DBSTADIUM = "DBSTADIUM";
export const BOOKING = "BOOKING";
export const STADIUMBOOKING = "STADIUMBOOKING";
export const USERBOOKING = "USERBOOKING";
export const LOGOUT = "LOGOUT";

export const user = (id) => {
  return { type: USER, userId: id };
};

export const admin = (id) => {
  return { type: ADMIN, userId: id };
};

export const dbuser = (db) => {
  return { type: DBUSER, userdb: db };
};

export const dbstadium = (db) => {
  return { type: DBSTADIUM, stadiumdb: db };
};

export const dbbooking = (db) => {
  return { type: BOOKING, booking: db };
};

export const stadiumbooking = (id) => {
  return { type: STADIUMBOOKING, stadiumbook: id };
};

export const userbooking = (id) => {
  return { type: USERBOOKING, userbook: id };
};
export const logout = () => {
  return { type: LOGOUT };
};
