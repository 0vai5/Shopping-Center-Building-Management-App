import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { MaintenanceCardProps } from "@/types";
import { icons } from "@/constants";

const MaintenanceList = () => {
  const maintenanceSlip = [
    {
      flat_id: 1,
      flat_number: "SF-1",
      rooms: 2,
      maintenance: 300,
      owner_no: "03001234567",
      owner_name: "Ali",
      slip_no: "123456",
      status: "pending",
    },
    {
      flat_id: 2,
      flat_number: "SF-2",
      rooms: 2,
      maintenance: 300,
      owner_no: "03001234799",
      owner_name: "Ahmed",
      slip_no: "789101",
      status: "pending",
    },
    {
      flat_id: 3,
      flat_number: "SF-3",
      rooms: 2,
      maintenance: 300,
      owner_no: "03001234567",
      owner_name: "Amjad Bawa",
      slip_no: "123456",
      status: "paid",
    },
    {
      flat_id: 4,
      flat_number: "SF-4",
      rooms: 3,
      maintenance: 300,
      owner_no: "03001234567",
      owner_name: "Munaf Bakali",
      slip_no: "123456",
      status: "paid",
    },
    {
      flat_id: 5,
      flat_number: "SF-5",
      rooms: 2,
      maintenance: 300,
      owner_no: "03001234567",
      owner_name: "Rashida",
      slip_no: "123456",
      status: "pending",
    },
    {
      flat_id: 6,
      flat_number: "SF-6",
      rooms: 2,
      maintenance: 300,
      owner_no: "03001234567",
      owner_name: "xyz",
      slip_no: "123456",
      status: "pending",
    },
  ];

  return (
    <View className="flex justify-center items-center">
      <FlatList
        className="p-6 mr-3 gap-3"
        data={maintenanceSlip}
        numColumns={1}
        renderItem={(slip) => <MaintenanceCard item={slip.item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(slip) => slip.flat_id.toString()}
      />
    </View>
  );
};

const MaintenanceCard: React.FC<MaintenanceCardProps> = ({ item }) => {
  const screenHeight = Dimensions.get("window").height;
  return (
    <View
      className={`bg-lessBlack p-5 mr-10 rounded-xl h-[${screenHeight * 0.4}]`}
    >
      <View className="flex justify-between gap-10 flex-row ">
        <View>
          <Text className="text-white font-ssemibold text-2xl">
            {item.flat_number}
          </Text>
          <Text className="text-gray-300 font-sregular text-lg">
            Slip No. {item.slip_no}
          </Text>
          <View
            className={`${
              item.status === "pending" ? "bg-red-600" : "bg-green-600"
            } flex justify-center items-center rounded-full px-3 py-1 mt-2`}
          >
            <Text className="text-white font-sbold text-xs uppercase">
              {item.status}
            </Text>
          </View>
        </View>
        <View>
          <TouchableOpacity>
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
  );
};

export default MaintenanceList;
