import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { MaintenanceCardProps } from "@/types";
import { icons } from "@/constants";
import { CustomBottomSheetModal } from "@/components";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import useAppwrite from "@/hooks/useAppwrite";
import { useGlobalContext } from "@/context/GlobalContext";
import { generateHTML } from "@/utils/htmlGenerator";
import { printToFileAsync } from "expo-print"; // Fixed import
import { shareAsync } from "expo-sharing";

// FIXME: Fix the Types after the Appwrite Integration
// FIXME: When the status is updated there should be somthing that changes the button color in the bottom sheet.

const MaintenanceList = ({ maintenanceSlips }: { maintenanceSlips: any }) => {
  return (
    <View className="flex p-6">
      {maintenanceSlips && maintenanceSlips.length === 0 && (
        <Text className="text-secondary-saturated font-ssemibold text-xl">
          No Maintenance Slips Found
        </Text>
      )}

      <FlatList
        className="p-6 mr-3 gap-3"
        data={maintenanceSlips}
        numColumns={1}
        renderItem={({ item }) => <MaintenanceCard item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.$id.toString()}
      />
    </View>
  );
};

const MaintenanceCard: React.FC<MaintenanceCardProps> = ({ item }) => {
  const screenHeight = Dimensions.get("window").height;
  const cardHeight = screenHeight * 0.4;
  const statusColor = item.status === "pending" ? "bg-red-600" : "bg-green-600";
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { updateMaintenaceSlip } = useAppwrite();
  const { setStatusUpdate, statusUpdate } = useGlobalContext();

  const handleSharing = async () => {
    try {
      const htmlContent = generateHTML({
        ...item,
        dues: item.dues ? item.dues : [],
      });

      const { uri } = await printToFileAsync({
        html: htmlContent,
        base64: false,
        height: 450,
      });

      console.log("PDF generated at: ", uri);

      await shareAsync(uri, {
        UTI: "com.adobe.pdf",
        mimeType: "application/pdf",
        dialogTitle: "Share the maintenance slip",
      });
    } catch (error: any) {
      Alert.alert("Error Occured", error.message);
    }
  };

  const handleStatusUpdate = async () => {
    try {
      const response = await updateMaintenaceSlip(item.$id, item.status);
    } catch (error: any) {
      Alert.alert("Error occurred", error.message);
    } finally {
      setStatusUpdate(!statusUpdate);
    }
  };
  return (
    <>
      <View className={`bg-lessBlack p-5 mr-10 rounded-xl h-[${cardHeight}]`}>
        <View className="flex justify-between gap-10 flex-row">
          <View>
            <View className="flex-row justify-bewteen items-center gap-2">
              <Image
                source={icons.house}
                tintColor={"#5889ec"}
                resizeMode="contain"
              />
              <Text className="text-white font-ssemibold text-xl relative">
                {item.flatNumber}
              </Text>
            </View>
            <Text className="text-gray-300 font-sregular text-lg">
              Slip No. {item.slipNo}
            </Text>
            <Text className="text-gray-300 font-sregular text-lg">
              Month of {item.month}
            </Text>
            <View
              className={`${statusColor} flex items-center w-[100px] rounded-full px-3 py-1 mt-2`}
            >
              <Text className="text-white font-sbold text-xs uppercase">
                {item.status}
              </Text>
            </View>
          </View>
          <View>
            <TouchableOpacity
              className="mb-10"
              onPress={() => bottomSheetModalRef.current?.present()}
            >
              <Image
                source={icons.menu}
                className="h-[24px]"
                tintColor={"#5889ec"}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View className="w-[95%] mt-7 mx-auto border-b border-gray-700"></View>
        <View className="flex justify-between gap-10 flex-row mt-4">
          <View>
            <Text className="text-white font-smedium text-xl">
              {item.ownerName}
            </Text>
            <View className="flex-row justify-center items-center gap-2">
              <Image source={icons.phone} tintColor={"#72BF78"} />
              <Text className="text-gray-300 font-sregular text-lg">
                {item.ownerNo}
              </Text>
            </View>
          </View>
          <View className="items-start">
            <View className="flex-row items-center justify-center gap-2">
              <Image source={icons.rooms} tintColor={"#5889ec"} />
              <Text className="text-white font-sregular text-xl">
                {item.rooms}
              </Text>
            </View>
            <View className="flex-row gap-2">
              <Image
                source={icons.dollar}
                resizeMode="contain"
                tintColor={"#5889ec"}
              />
              <Text className="text-gray-300 font-smedium text-lg">
                {item.maintenance * item.rooms} /-
              </Text>
            </View>
          </View>
        </View>
      </View>

      <CustomBottomSheetModal ref={bottomSheetModalRef}>
        <BottomSheetView className="p-5">
          <Text className="text-white font-ssemibold text-2xl mb-4">
            Maintenance Details
          </Text>
          <View className="flex-row gap-10 justify-between items-center">
            <View>
              <View className="flex-row justify-bewteen items-center gap-2">
                <Image
                  source={icons.house}
                  tintColor={"#5889ec"}
                  resizeMode="contain"
                />
                <Text className="text-white font-ssemibold text-xl relative">
                  {item.flatNumber}
                </Text>
              </View>
              <Text className="text-gray-300 font-sregular text-lg">
                Slip No. {item.slipNo}
              </Text>
              <Text className="text-gray-300 font-sregular text-lg">
                Month of {item.month}
              </Text>
            </View>
            <View className="items-start">
              <View className="flex-row gap-2">
                <Image
                  source={icons.dollar}
                  resizeMode="contain"
                  tintColor={"#5889ec"}
                />
                <Text className="text-gray-300 font-smedium text-lg">
                  {item.maintenance * item.rooms} /-
                </Text>
              </View>
              <View className="flex-row items-center justify-center gap-2">
                <Image source={icons.rooms} tintColor={"#5889ec"} />
                <Text className="text-white font-sregular text-xl">
                  {item.rooms}
                </Text>
              </View>
            </View>
          </View>
        </BottomSheetView>

        <BottomSheetView className="p-5">
          <Text className="text-white font-ssemibold text-2xl mb-4">
            Update Maintenance Status
          </Text>
          <BottomSheetView className="p-6 mt-3">
            <TouchableOpacity
              className={`${statusColor} px-3 py-4 rounded-lg mb-4`}
              onPress={handleStatusUpdate}
            >
              <Text className="text-white text-center font-ssemibold text-xl">
                {item.status.toUpperCase()}
              </Text>
            </TouchableOpacity>
          </BottomSheetView>
        </BottomSheetView>

        {/* TODO: When the Button is Pressed a pdf will be generated of the maintenance slip and then sent to the recipient. */}

        {item.status === "paid" && (
          <BottomSheetView className="mt-10">
            <View className="flex justify-between items-center gap-3 flex-row">
              <TouchableOpacity
                onPress={handleSharing}
                className="px-3 py-3 bg-blue-600 rounded-lg flex-row gap-2 items-center"
              >
                <Image
                  source={icons.upload}
                  className="h-[24px] w-[24px]"
                  tintColor={"#ffffff"}
                />
                <Text className="text-center text-white font-sbold">
                  Share Image
                </Text>
              </TouchableOpacity>
            </View>
          </BottomSheetView>
        )}
      </CustomBottomSheetModal>
    </>
  );
};

export default MaintenanceList;
