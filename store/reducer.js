// third-party
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

// project imports
import rootReducer from "./slices/root";
import userPetReducer from "./slices/userPet";

const reducer = combineReducers({
  root: persistReducer(
    {
      key: "root",
      storage: AsyncStorage,
    },
    rootReducer
  ),
  userpet: userPetReducer,
});

export default reducer;
