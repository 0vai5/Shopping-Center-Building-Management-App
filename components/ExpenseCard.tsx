import { View, Text, Dimensions, TouchableOpacity, Image } from "react-native";
import React from "react";
import { icons } from "@/constants";

interface ExpenseCardProps {
  expense_id: string;
  expense: string;
  salary: number;
  status: string;
  name: string;
}

const ExpenseCard: React.FC<ExpenseCardProps> = ({
  expense_id,
  expense,
  salary,
  status,
  name,
}) => {
  const screenHeight = Dimensions.get("window").height;

  return (
    <View
      className={`bg-lessBlack p-5 mr-10 rounded-xl h-[${screenHeight * 0.4}]`}
    >
      <View className="flex justify-between gap-10 flex-row ">
        <View>
          <Text className="text-white font-ssemibold text-2xl">{expense}</Text>
          <Text className="text-gray-300 font-sregular text-l">{name}</Text>
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
          <Text className="text-gray-300 font-smedium text-lg">
            {salary} /-
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ExpenseCard;
