import { View, Text } from "react-native";
import React from "react";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

const SummaryCard = () => {
  const month = new Date().toLocaleString("default", { month: "long" });
  return (
    <View className="justify-between flex mx-5 rounded-xl bg-secondary-100 h-[25vh]">
      <View className="p-6">
        <Text className="text-black font-smedium">
          Total Earning for {month}
        </Text>
      </View>

      <View className="p-6 flex flex-row items-center">
        <Text className="text-black font-sbold text-5xl">10,000</Text>
        <Text className="text-black font-smedium self-end">Rs</Text>
      </View>

      <View className="w-[95%] mx-auto border-b border-b-gray-800"></View>

      <View className="flex justify-between items-center flex-row">
        <View className="p-6">
          <Text className="text-black font-smedium">Want a full summary?</Text>
        </View>

        <View className="p-6">
          <CustomButton
            title={"Take a Look"}
            textStyles="text-white"
            width="150px"
            handlePress={() => router.push("./summary")}
          />
        </View>
      </View>
    </View>
  );
};

export default SummaryCard;
