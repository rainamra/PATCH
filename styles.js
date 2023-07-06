import { StyleSheet } from "react-native";

import { useFonts, Nunito_500Medium, Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold, Nunito_900Black } from "@expo-google-fonts/nunito";

const font = StyleSheet.create({
  medium: { fontFamily: "Nunito_500Medium" },
  semiBold: { fontFamily: "Nunito_600SemiBold" },
  bold: { fontFamily: "Nunito_700Bold" },
  extraBold: { fontFamily: "Nunito_800ExtraBold" },
  black: { fontFamily: "Nunito_900Black" },
  dark: {
    color: "#141312",
  },
  primary: {
    color: "#F0AE5E",
  },
  secondary: {
    color: "#F5E6B6",
  },
  brown: { color: "#9C5C2B" },
  pink: { color: "#E68578" },
  purple: { color: "#728DF6" },
  light: { color: "#FDFAF0" },
  h1: { fontSize: 32 },
  h2: { fontSize: 28 },
  h3: { fontSize: 24 },
  h4: { fontSize: 22 },
  h5: { fontSize: 18 },
  h6: { fontSize: 16 },
  p: { fontSize: 14 },
});

export { font };
