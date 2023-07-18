import { Nunito_500Medium, Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold, Nunito_900Black, useFonts } from "@expo-google-fonts/nunito";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useEffect } from "react";
import { StatusBar } from "react-native";
import "react-native-gesture-handler";
import { AuthProvider } from "./hooks/useAuth";
import StackNavigator from "./navigation/StackNavigator";
import { Provider } from "react-redux";
import { store, persister } from "./store/index";
import { PersistGate } from 'redux-persist/integration/react';
// import context from "./context";

export default function App() {
  let [fontsLoaded] = useFonts({
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
    Nunito_900Black,
  });

  StatusBar.setBarStyle("dark-content", true);

  // SplashScreen.preventAutoHideAsync();
  // setTimeout(SplashScreen.hideAsync, 2000);

  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // }

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <NavigationContainer onReady={onLayoutRootView}>
          <AuthProvider>
            <BottomSheetModalProvider>
              {/* <BottomSheetModalProvider> */}
              <StackNavigator />
            </BottomSheetModalProvider>
            {/* </BottomSheetModalProvider> */}
          </AuthProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
