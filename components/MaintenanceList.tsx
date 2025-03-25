import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useMemo, useRef } from "react";
import { MaintenanceCardProps } from "@/types";
import { icons, maintenanceSlips } from "@/constants";
import { CustomBottomSheetModal } from "@/components";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { router } from "expo-router";

const MaintenanceList = () => {
  useEffect(() => {
    const fetchMaintenace = async () => {
      console.log("Hello Items Fetched ....");
    };

    fetchMaintenace();
  }, []);
  return (
    <View className="flex justify-center items-center">
      <FlatList
        className="p-6 mr-3 gap-3"
        data={maintenanceSlips}
        numColumns={1}
        renderItem={({ item }) => <MaintenanceCard item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.flat_id.toString()}
      />
    </View>
  );
};

const MaintenanceCard: React.FC<MaintenanceCardProps> = ({ item }) => {
  const screenHeight = Dimensions.get("window").height;
  const cardHeight = screenHeight * 0.4;
  const statusColor = item.status === "pending" ? "bg-red-600" : "bg-green-600";
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoint = useMemo(() => ["50%", "75%", "95%"], []);

  const handleStatusUpdate = () => {
    setTimeout(() => {
      console.log(`${item.flat_number} paid the maintenance.`);
    }, 3000);
  };
  return (
    <>
      <View className={`bg-lessBlack p-5 mr-10 rounded-xl h-[${cardHeight}]`}>
        <View className="flex justify-between gap-10 flex-row">
          <View>
            <Text className="text-white font-ssemibold text-2xl">
              {item.flat_number}
            </Text>
            <Text className="text-gray-300 font-sregular text-lg">
              Slip No. {item.slip_no}
            </Text>
            <View
              className={`${statusColor} flex justify-center items-center rounded-full px-3 py-1 mt-2`}
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
            <TouchableOpacity
              onPress={() => bottomSheetModalRef.current?.close()}
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
              {item.owner_name}
            </Text>
            <Text className="text-gray-300 font-sregular text-lg">
              {item.owner_no}
            </Text>
          </View>
          <View>
            <Text className="text-white font-sregular text-xl">
              {item.rooms} Rooms
            </Text>
            <Text className="text-gray-300 font-smedium text-lg">
              {item.maintenance * item.rooms} /-
            </Text>
          </View>
        </View>
      </View>

      <CustomBottomSheetModal ref={bottomSheetModalRef}>
        <BottomSheetView>
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
        {item.status === "paid" && (
          <BottomSheetView className="mt-10">
            <View className="flex justify-between items-center gap-3 flex-row">
              <TouchableOpacity className="px-3 py-3 bg-blue-600 rounded-lg flex-row gap-2 items-center">
                <Image
                  source={icons.upload}
                  className="h-[24px] w-[24px]"
                  tintColor={"#ffffff"}
                />
                <Text className="text-center text-white font-sbold">
                  Share Image
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="px-3 py-3 bg-green-600 rounded-lg flex-row gap-2 items-center">
                <Image
                  source={icons.download}
                  className="h-[24px] w-[24px]"
                  tintColor={"#ffffff"}
                />
                <Text className="text-center text-white font-sbold">
                  Download Image
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
