import { BottomSheetModal, BottomSheetBackdrop, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import React from "react";
import { StyleSheet, View } from "react-native";

const BottomSheet = ({ refBottomSheet, snapPoints, SheetContent, isOpen, toggleClose, customStyle }) => {
  const points = snapPoints;

  return (
    // <BottomSheetModalProvider>
    // <View style={styles.container}>
    <BottomSheetModal
      ref={refBottomSheet}
      index={1}
      snapPoints={points}
      backgroundStyle={[{ borderRadius: 25 }, customStyle]}
      onDismiss={toggleClose}
      backdropComponent={(props) => <BottomSheetBackdrop {...props} opacity={0.5} enableTouchThrough={false} appearsOnIndex={0} disappearsOnIndex={-1} style={[{ backgroundColor: "rgba(0, 0, 0, 1)" }, StyleSheet.absoluteFillObject]} />}
    >
      <View>
        <SheetContent />
      </View>
    </BottomSheetModal>
    // </View>
    // </BottomSheetModalProvider>
  );
};

export default BottomSheet;
