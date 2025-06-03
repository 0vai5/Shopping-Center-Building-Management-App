import { View, Image, TouchableOpacity } from "react-native";
import React, { forwardRef, useCallback } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { icons } from "@/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomBottomSheetModalProps } from "@/types";

const snapPoints = ["50%", "75%"];

const CustomBottomSheetModal = forwardRef<
  BottomSheetModal,
  CustomBottomSheetModalProps
>(({ children }, ref) => {
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={1}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );

  const handleClose = () => {
    if (ref && typeof ref !== "function" && ref.current) {
      ref.current.close();
    }
  };

  return (
    <SafeAreaView>
      <BottomSheetModal
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: "#2c2c2e" }}
        handleIndicatorStyle={{ backgroundColor: "white" }}
        ref={ref}
        index={2}
        snapPoints={snapPoints}
        enablePanDownToClose
      >
        <BottomSheetScrollView>
          <BottomSheetView className="px-6">
            <TouchableOpacity onPress={handleClose}>
              <Image source={icons.cross} className="self-end" />
            </TouchableOpacity>
          </BottomSheetView>
          <BottomSheetView className="p-8">{children}</BottomSheetView>
        </BottomSheetScrollView>
      </BottomSheetModal>
    </SafeAreaView>
  );
});

export default CustomBottomSheetModal;
