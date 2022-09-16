import {
  USER,
  ADMIN,
  DBUSER,
  DBSTADIUM,
  BOOKING,
  STADIUMBOOKING,
  USERBOOKING,
  LOGOUT,
} from "../actions/Action";
const initialState = {
  user: [],
  stadium: [],
  userProfile: null,
  adminProfile: null,
  ownerStadium: [],
  ownerBooking: [],
  booking: [],
  stadiumBooking: [],
  userBooking: [],
};
const Reduser = (state = initialState, action) => {
  switch (action.type) {
    case DBUSER:
      return { ...state, user: action.userdb };
    case DBSTADIUM:
      return { ...state, stadium: action.stadiumdb };
    case USER:
      const selectUser = state.user.find((id) => {
        return id.id == action.userId;
      });
      return { ...state, userProfile: selectUser };
    case ADMIN:
      const selectAdmin = state.user.find((id) => {
        return id.id == action.userId;
      });
      const selectStadium = state.stadium.filter((id) => {
        return id.owner == action.userId;
      });
      return {
        ...state,
        adminProfile: selectAdmin,
        ownerStadium: selectStadium,
      };
    case BOOKING:
      return { ...state, booking: action.booking };
    case STADIUMBOOKING:
      const stadiumbooking = state.booking.filter((id) => {
        return id.stadiumID == action.stadiumbook;
      });
      return { ...state, stadiumBooking: stadiumbooking };
    case USERBOOKING:
      const userbooking = state.booking.filter((id) => {
        return id.userID == action.userbook;
      });

      return { ...state, userBooking: userbooking };
    case LOGOUT:
      return {
        user: [],
        stadium: [],
        userProfile: null,
        adminProfile: null,
        ownerStadium: [],
        ownerBooking: [],
        booking: [],
        stadiumBooking: [],
        userBooking: [],
      };

    default:
      return state;
  }
};

export default Reduser;
