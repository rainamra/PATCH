import { Ionicons } from "@expo/vector-icons";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import RangeSlider from "./RangeSlider";

const RightDrawerContent = (props) => {
  const AGE_MIN_DEFAULT = 4;
  const AGE_MAX_DEFAULT = 120;
  const DIST_MIN_DEFAULT = 1;
  const DIST_MAX_DEFAULT = 240;
  const drawerVerticalPadding = 20 * 2 + 12;
  const [ageMinValue, setAgeMinValue] = useState(AGE_MIN_DEFAULT);
  const [ageMaxValue, setAgeMaxValue] = useState(AGE_MAX_DEFAULT);
  const [distMinValue, setDistMinValue] = useState(DIST_MIN_DEFAULT);
  const [distMaxValue, setDistMaxValue] = useState(DIST_MAX_DEFAULT);
  const [drawerWidth, setDrawerWidth] = useState(false);

  return (
    <View
      style={{ flex: 1 }}
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout;
        setDrawerWidth(width);
      }}
    >
      {drawerWidth && (
        <DrawerContentScrollView {...props}>
          <View style={{ paddingLeft: 20, flexDirection: "row", marginBottom: 10, alignItems: "center", height: 32 }}>
            <Text style={{ color: "#728DF6" }}>Filters</Text>
          </View>
          <GestureHandlerRootView>
            <View style={styles.contentContainer}>
              <RangeSlider
                sliderWidth={drawerWidth - drawerVerticalPadding}
                min={AGE_MIN_DEFAULT}
                max={AGE_MAX_DEFAULT}
                enableDesc
                descText="Months"
                step={1}
                title="Age"
                onValueChange={(range) => {
                  setAgeMinValue(range.min);
                  setAgeMaxValue(range.max);
                }}
              />
            </View>
            <View style={styles.contentContainer}>
              <RangeSlider
                sliderWidth={drawerWidth - drawerVerticalPadding}
                min={DIST_MIN_DEFAULT}
                max={DIST_MAX_DEFAULT}
                step={1}
                title="Distance"
                enableDesc
                descText="Kilometers from you"
                onValueChange={(range) => {
                  setDistMinValue(range.min);
                  setDistMaxValue(range.max);
                }}
              />
            </View>
          </GestureHandlerRootView>
        </DrawerContentScrollView>
      )}
    </View>
  );
};

export default RightDrawerContent;

const styles = StyleSheet.create({
  contentContainer: {
    marginBottom: 20,
    // backgroundColor: "blue",
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flex: 1,
    justifyContent: "space-between",
  },
  text: {
    color: "black",
    fontSize: 20,
  },
  tableContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  table: {
    borderColor: "#EBECF2",
    borderWidth: 1,
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
  },
  colorBlack: { color: "black" },
});
