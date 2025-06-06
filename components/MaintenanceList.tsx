import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import React, { useRef, useState } from "react";
import { dueObj, MaintenanceCardProps, MaintenanceSlip } from "@/types";
import { icons } from "@/constants";
import { CustomBottomSheetModal } from "@/components";
import { BottomSheetModal, BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet";
import { useGlobalContext } from "@/context/GlobalContext";
import { generateHTML } from "@/utils/htmlGenerator";
import { printToFileAsync } from "expo-print"; // Fixed import
import { shareAsync } from "expo-sharing";
import useAppwrite from "@/hooks/useAppwrite";
import { ActivityIndicator } from "react-native-paper";

// FIXME: Fix the Types after the Appwrite Integration
// FIXME: When the status is updated there should be somthing that changes the button color in the bottom sheet.

const MaintenanceList = ({ maintenanceSlips }: { maintenanceSlips: MaintenanceSlip[] }) => {
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
        renderItem={({ item }: { item: any }) => (
          <MaintenanceCard item={item} />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item: any) => item.$id.toString()}
      />
    </View>
  );
};

const MaintenanceCard: React.FC<MaintenanceCardProps> = ({ item }) => {
  const screenHeight = Dimensions.get("window").height;
  const cardHeight = screenHeight * 0.4;
  const [isLoading, setIsLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(item.status);
  const statusColor = item.status === "pending" ? "bg-red-600" : "bg-green-600";
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { setStatusUpdate, statusUpdate } = useGlobalContext();
  const { updateMaintenanceSlip } = useAppwrite();

  const status = item.status === "pending" ? "paid" : "pending";

  const dues = item.flat.dues ? JSON.parse(item.flat.dues) : [];
  const totalDues = dues.reduce((prev: number, due: dueObj) => prev + (due.maintenance || 0), 0);


  const handleSharing = async () => {
    try {
      const htmlContent = generateHTML({
        ...item,
        dues: dues,
      });

      const { uri } = await printToFileAsync({
        html: htmlContent,
        base64: false,
        height: Dimensions.get("window").height + 100,
      });

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
    setIsLoading(true);
    try {
      const response = await updateMaintenanceSlip(
        item.$id,
        status
      );

      if (response) {
        Alert.alert("Success", "Maintenance status updated successfully.");
        bottomSheetModalRef.current?.close();
      } else {
        Alert.alert("Error", "Failed to update maintenance status.");
      }
    } catch (error: any) {
      Alert.alert("Error occurred", error.message);
    } finally {
      setIsLoading(false);
      setStatusUpdate(!statusUpdate);
    }
  };
  return (
    <>
      <View className={`bg-lessBlack p-5 mr-10 rounded-xl h-[${cardHeight}]`}>
        <View className="flex justify-between gap-10 flex-row">
          <View>
            <View className="flex-row justify-start items-center gap-2">
              <Image
                source={icons.house}
                tintColor={"#f7bc63"}
                resizeMode="contain"
              />
              <Text className="text-white font-ssemibold text-xl relative">
                {item.flat.flatNumber}
              </Text>
            </View>
            <Text className="text-gray-300 font-sregular text-lg">
              Slip No. {item.slipNumber}
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
                tintColor={"#f7bc63"}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View className="w-[95%] mt-7 mx-auto border-b border-gray-700"></View>
        <View className="flex justify-between gap-10 flex-row mt-4">
          <View>
            <Text className="text-white font-smedium text-xl">
              {item.flat.ownerName}
            </Text>
            <View className="flex-row gap-2">
              <Image source={icons.phone} tintColor={"#f7bc63"} />
              <Text className="text-gray-300 font-sregular text-lg">
                {item.flat.ownerPhone || "N/A"}
              </Text>
            </View>
          </View>
          <View className="items-start">
            <View className="flex-row gap-2">
              <Image source={icons.rooms} tintColor={"#f7bc63"} />
              <Text className="text-white font-sregular text-xl">
                {item.flat.rooms}
              </Text>
            </View>
            <View className="flex-row gap-2">
              <Image
                source={icons.dollar}
                resizeMode="contain"
                tintColor={"#f7bc63"}
              />
              <Text className="text-gray-300 font-smedium text-lg">
                {item.flat.maintenance + totalDues} /-
              </Text>
            </View>
          </View>
        </View>
      </View>


      <CustomBottomSheetModal ref={bottomSheetModalRef}>
        <BottomSheetScrollView className="p-4">
          <Text className="text-white font-ssemibold text-2xl mb-4">
            Maintenance Details
          </Text>
          <View className="flex-row gap-10 justify-between items-center">
            <View>
              <View className="flex-row justify-start items-center gap-2">
                <Image
                  source={icons.house}
                  tintColor={"#f7bc63"}
                  resizeMode="contain"
                />
                <Text className="text-white font-ssemibold text-xl">
                  {item.flat.flatNumber}
                </Text>
              </View>
              <Text className="text-gray-300 font-sregular text-lg">
                Slip No. {item.slipNumber}
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
                  tintColor={"#f7bc63"}
                />
                <Text className="text-gray-300 font-smedium text-lg">
                  {item.flat.maintenance + (totalDues || 0)} /-
                </Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Image source={icons.rooms} tintColor={"#f7bc63"} />
                <Text className="text-white font-sregular text-xl">
                  {item.flat.rooms}
                </Text>
              </View>
            </View>
          </View>

          {dues.length > 0 && (
            <>
              <Text className="text-white font-ssemibold text-2xl mt-6 mb-4">
                Dues Details
              </Text>
              {dues.map((due: dueObj, index: number) => (
                <View key={index} className="flex-row bg-black p-2 rounded-sm justify-between mb-3">
                  <Text className="text-gray-300 font-sregular text-lg">
                    Month of {due.month}
                  </Text>
                  <Text className="text-gray-300 font-sregular text-lg">
                    {due.maintenance} /-
                  </Text>
                </View>
              ))}
            </>
          )}

          <Text className="text-white font-ssemibold text-2xl mt-6 mb-4">
            Update Maintenance Status
          </Text>

          <TouchableOpacity
            className={`${statusColor} px-3 py-4 rounded-lg mb-4 flex-row items-center justify-center gap-2`}
            onPress={handleStatusUpdate}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text className="text-white font-sbold text-lg capitalize">
                Mark as {status}
              </Text>
            )}
          </TouchableOpacity>

          {item.status === "paid" && (
              

          <TouchableOpacity
            className="bg-primary px-3 py-4 rounded-lg flex-row items-center justify-center gap-2"
            onPress={handleSharing}
          >
            <Text className="text-white font-sbold text-lg">Share Slip</Text>
          </TouchableOpacity>
          )}
        </BottomSheetScrollView>
      </CustomBottomSheetModal>

    </>
  );
};

export default MaintenanceList;
