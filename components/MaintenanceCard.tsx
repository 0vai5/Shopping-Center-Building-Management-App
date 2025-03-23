import { icons } from "@/constants";
import React from "react";
import { View, Text, Dimensions, Image, TouchableOpacity } from "react-native";

interface MaintenanceCardProps {
  flat_id: number;
  flat_number: string;
  rooms: number;
  maintenance: number;
  owner_no: string;
  owner_name: string;
  slip_no: string;
  status: string;
}

const MaintenanceCard: React.FC<MaintenanceCardProps> = ({
  flat_id,
  flat_number,
  rooms,
  maintenance,
  owner_no,
  owner_name,
  slip_no,
  status,
}) => {
  const screenHeight = Dimensions.get("window").height;

  return (
    <View
      className={`bg-lessBlack p-5 mr-10 rounded-xl h-[${screenHeight * 0.4}]`}
    >
      <View className="flex justify-between gap-10 flex-row ">
        <View>
          <Text className="text-white font-ssemibold text-2xl">
            {flat_number}
          </Text>
          <Text className="text-gray-300 font-sregular text-lg">
            Slip No. {slip_no}
          </Text>
          <View
            className={`${
              status === "pending" ? "bg-red-600" : "bg-green-600"
            } flex justify-center items-center rounded-full px-3 py-1 mt-2`}
          >
            <Text className="text-white font-sbold text-xs uppercase">
              {status}
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
          <Text className="text-white font-smedium text-xl">{owner_name}</Text>
          <Text className="text-gray-300 font-sregular text-lg">
            {owner_no}
          </Text>
        </View>
        <View>
          <Text className="text-white font-sregular text-xl">
            {rooms} Rooms
          </Text>
          <Text className="text-gray-300 font-smedium text-lg">
            {maintenance * rooms} /-
          </Text>
        </View>
      </View>
    </View>
  );
};

export default MaintenanceCard;
