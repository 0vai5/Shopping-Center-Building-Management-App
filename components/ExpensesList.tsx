import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { icons, expenseSlips } from "@/constants";
import { ExpenseCardHomeProps } from "@/types";
import {
  BottomSheetModal,
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import CustomBottomSheetModal from "./CustomBottomSheetModal";
import useAppwrite from "@/hooks/useAppwrite";
import { useGlobalContext } from "@/context/GlobalContext";

// FIXME: Fix the Types after the Appwrite Integration
// FIXME: When the status is updated there should be somthing that changes the button color in the bottom sheet.

const ExpenseList = ({ expenseSlips }: { expenseSlips: any }) => {
  return (
    <View className="flex p-6">
      {expenseSlips.length === 0 && (
        <Text className="text-secondary-saturated font-ssemibold text-xl">
          No Expenses Found
        </Text>
      )}
      <FlatList
        className="p-6 mr-3 gap-3"
        data={expenseSlips}
        numColumns={1}
        renderItem={(expense) => <ExpenseCardHome item={expense.item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(expense) => expense.$id.toString()}
      />
    </View>
  );
};

const ExpenseCardHome: React.FC<ExpenseCardHomeProps> = ({ item }) => {
  const screenHeight = Dimensions.get("window").height;
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const cardHeight = screenHeight * 0.4;
  const statusColor = item.status === "pending" ? "bg-red-600" : "bg-green-600";
  const [variabeValue, setVariableValue] = useState("");
  const { setStatusUpdate, statusUpdate } = useGlobalContext();
  const { updateExpenseSlip } = useAppwrite();

  const handleStatusUpdate = async () => {
    try {
      if (item.variable) {
        const amount = parseInt(variabeValue);
        if (isNaN(amount) || amount <= 0) {
          Alert.alert("Invalid Amount", "Please enter a valid amount.");
          return;
        }
        const response = await updateExpenseSlip(item.$id, item.status, amount);
      } else {
        const response = await updateExpenseSlip(item.$id, item.status);

      }

    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again later.");
    } finally {
      setStatusUpdate(!statusUpdate);
    }
  };

  return (
    <>
      <View className={`bg-lessBlack p-5 mr-10 rounded-xl h-[${cardHeight}]`}>
        <View className="flex justify-between gap-10 flex-row">
          <View>
            <Text className="text-white font-ssemibold text-2xl">
              {item.expense}
            </Text>
            <Text className="text-gray-300 font-sregular text-l">
              {item.name}
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
          <View className="flex-row gap-2">
            <Image
              source={icons.dollar}
              resizeMode="contain"
              tintColor={"#5889ec"}
            />
            <Text className="text-gray-300 font-smedium text-lg">
              {item.amount || "Variable"} /-
            </Text>
          </View>
        </View>
      </View>

      <CustomBottomSheetModal ref={bottomSheetModalRef}>
        <BottomSheetView>
          <Text className="text-white font-ssemibold text-2xl mb-4">
            Expense Details
          </Text>
          <BottomSheetView className="p-6 mt-3">
            <Text className="text-gray-300 font-smedium text-lg">
              {item.expense}
            </Text>
            <Text className="text-gray-300 font-smedium text-lg">
              {item.name}
            </Text>

            {!item.variable && (
              <View className="flex-row gap-2">
                <Image
                  source={icons.dollar}
                  resizeMode="contain"
                  tintColor={"#5889ec"}
                />
                <Text className="text-gray-300 font-smedium text-lg">
                  {item.amount} /-
                </Text>
              </View>
            )}
          </BottomSheetView>
        </BottomSheetView>

        <BottomSheetView>
          <Text className="text-white font-ssemibold text-2xl mb-4">
            Update Expense Status
          </Text>
          {item.variable && (
            <BottomSheetTextInput
              className="px-2 py-3 bg-gray-400 rounded-lg text-white"
              value={variabeValue}
              keyboardType="numeric"
              placeholder="Enter the Amount"
              onChangeText={(e) => setVariableValue(e)}
            />
          )}
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
      </CustomBottomSheetModal>
    </>
  );
};

export default ExpenseList;
