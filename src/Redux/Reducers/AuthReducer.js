import * as types from "../actionTypes";

const initialState = {
  user: {},
  token: "",
};

const authReduser = (state = initialState, action) => {
  switch (action.type) {
    case types.SAVE_USER_INFO_AND_TOKEN:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case types.UPDATE_USER_INFO:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default authReduser;
