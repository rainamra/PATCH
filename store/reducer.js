// third-party
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

// project imports
import rootReducer from "./slices/root";
import userPetReducer from "./slices/userPet";
import matchmakingReducer from "./slices/matchmaking";
import forumReducer from "./slices/forum";
import chatReducer from "./slices/chat";

const reducer = combineReducers({
  root: persistReducer(
    {
      key: "root",
      storage: AsyncStorage,
    },
    rootReducer
  ),
  forum: forumReducer,
  userpet: userPetReducer,
  matchmaking: matchmakingReducer,
  chat: chatReducer,
});

export default reducer;
