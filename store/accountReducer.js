// ==============================|| ACCOUNT REDUCER ||============================== //

const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  user: null,
  token: null,
  isLoading: false,
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTER": {
      const { user } = action.payload;
      return {
        ...state,
        user,
      };
    }
    case "LOGIN": {
      const { user, token } = action.payload;
      return {
        ...state,
        token,
        isLoggedIn: true,
        isInitialized: true,
        user,
      };
    }
    // case LOGOUT: {
    //     return {
    //         ...state,
    //         isInitialized: true,
    //         isLoggedIn: false,
    //         user: null
    //     };
    // }
    default: {
      return { ...state };
    }
  }
};

export default accountReducer;
