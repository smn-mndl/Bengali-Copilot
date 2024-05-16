import { loginUser, registerUsers } from "../../api/api-creator";

export const setServiceLoader = (loading) => ({
  type: "SET_SERVICE_LOADER",
  payload: loading,
});

export const setPageToastAction = async (
  dispatch,
  toast = { show: false, toastType: null, toastMsg: null }
) => {
  if (toast.show) {
    setTimeout(() => setPageToastAction(dispatch), 3000);
  }
  return dispatch({
    type: "SET_PAGE_TOAST_MISC_ACTION",
    payload: toast,
  });
};

export const goToPagesAction = async (dispatch, currentPage, subPage) => {
  return dispatch({
    type: "PAGE_CLICK_ACTION",
    payload: { currentPage, subPage },
  });
};

export const userRegisterAction = async (
  dispatch,
  payload,
  setShowRegisterModal
) => {
  dispatch(setServiceLoader(true));
  const reponse = await registerUsers(payload);
  dispatch(setServiceLoader(false));
  if (reponse.data.result.isValid) {
    setShowRegisterModal(true);
    return dispatch({
      type: "SET_REGISTER_DETAILS_ACTION",
      payload: {
        isLoggedIn: reponse.data.result.isValid,
        userDtls: { email: payload.email, name: payload.name },
      },
    });
  }

};

export const setUserDetailsAction = async (dispatch, userDtls) => {
  return dispatch({
    type: "SET_USER_DETAILS_ACTION",
    payload: userDtls,
  });
};

export const userLoginStatusAction = async (dispatch, loginStatus) => {
  return dispatch({
    type: "SET_USER_LOGIN_STATUS_ACTION",
    payload: loginStatus,
  });
};

export const userLoginAction = async (
  dispatch,
  payload,
  navigate
) => {
  dispatch(setServiceLoader(true));
  const userDtls = await loginUser(payload);
  dispatch(setServiceLoader(false));
  const isValid = userDtls.data.result['isValid'] ? true : false;
  const validOjbj = {isLoggedIn: isValid, userDtls: userDtls.data.result['userDetails']}
  userLoginStatusAction(dispatch, validOjbj);
  if (isValid) {
    setPageToastAction(dispatch, {
      show: true,
      toastType: "success",
      toastMsg: "Logged In!",
    });
    goToPagesAction(dispatch, "HomePage", "");
    navigate("/");

    // setUserDetailsAction(dispatch, userDtls.data);
  } else {
    setPageToastAction(dispatch, {
      show: true,
      toastType: "error",
      toastMsg: "Please provide valid user details!",
    });
  }
};


