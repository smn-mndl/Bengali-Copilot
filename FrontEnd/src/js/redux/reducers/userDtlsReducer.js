// reducers/dataReducer.js
const initialState = {
  userDtls: {
    loggedIn: false,
    user: {},
  },
};

const userDtlsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_DETAILS":
      return action.payload;
    case "SET_REGISTER_DETAILS_ACTION":
      return {
        ...state,
        userDtls: {
          ...state.userDtls,
          loggedIn: action.payload.isLoggedIn,
          user: action.payload.userDtls,
        },
      };
      case "SET_USER_LOGIN_STATUS_ACTION":
      return {
        ...state,
        userDtls: {
          ...state.userDtls,
          loggedIn: action.payload.isLoggedIn,
          user: action.payload.userDtls,
        },
      }
    default:
      return state;
  }
};

export default userDtlsReducer;
