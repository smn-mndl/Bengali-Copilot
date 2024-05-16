// reducers/appReducer.js
const initialState = {
  serviceLoader: false,  navigation: {
    currentPage: "HomePage"
  },
  pageToast: {
    show: false,
    toastMsg: null,
    toastType: null,
  },
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SERVICE_LOADER":
      return {
        ...state,
        serviceLoader: action.payload,
      };
    case "SET_PAGE_TOAST_MISC_ACTION":
      return {
        ...state,
        pageToast: action.payload,
      };
    case "PAGE_CLICK_ACTION":
      return {
        ...state,
        navigation: {
          ...state.navigation,
          currentPage: action.payload.currentPage,
          // subPage: action.payload.subPage,
        },
      };

    default:
      return state;
  }
};

export default appReducer;
