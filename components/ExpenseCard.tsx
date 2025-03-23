import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import React from "react";
import { icons } from "@/constants";

interface ExpenseCardProps {
  item: any;
}

const ExpenseCard: React.FC<ExpenseCardProps> = ({ item }) => {
  const screenHeight = Dimensions.get("window").height;
  return (
    <View
      className={`bg-lessBlack p-5 mr-10 rounded-xl h-[${screenHeight * 0.4}]`}
    >
      <View className="flex justify-between gap-10 flex-row ">
        <View>
          <Text className="text-white font-ssemibold text-2xl">
            {item.expense}
          </Text>
          <Text className="text-gray-300 font-sregular text-l">
            {item.name}
          </Text>
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
          <Text className="text-gray-300 font-smedium text-lg">
            {item.salary} /-
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ExpenseCard;
