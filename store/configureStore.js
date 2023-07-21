import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux';
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

const store = configureStore({
    reducer: reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false, immutableCheck: false })
});

const persister = persistStore(store);

const { dispatch } = store;

const useDispatch = () => useAppDispatch();
const useSelector = useAppSelector;

export { store, persister, dispatch, useSelector, useDispatch };
