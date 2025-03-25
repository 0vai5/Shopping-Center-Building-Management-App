import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import { icons, expenseSlips } from "@/constants";
import { ExpenseCardHomeProps } from "@/types";

const ExpenseList = () => {
  // TODO: We will implement the expenses that are optional with a particular selection that for this month we map all here when it will be generated

 

  return (
    <View className="flex justify-center items-center">
      <FlatList
        className="p-6 mr-3 gap-3"
        data={expenseSlips}
        numColumns={1}
        renderItem={(expense) => <ExpenseCardHome item={expense.item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(expense) => expense.expense_id.toString()}
      />
    </View>
  );
};

const ExpenseCardHome: React.FC<ExpenseCardHomeProps> = ({ item }) => {
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
          <Text className="text-gray-300 font-smedium text-lg">
            {item.amount} /-
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ExpenseList;
