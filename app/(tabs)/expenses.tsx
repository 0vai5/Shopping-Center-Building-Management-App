import {
  View,
  Text,
  ScrollView,
  useWindowDimensions,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { CustomButton } from "@/components";
import { icons, expenses as expenseData } from "@/constants";
import { ExpenseCardProps } from "@/types";

const expenses = () => {
  const { height } = useWindowDimensions();


  return (
    <SafeAreaView className="bg-primary" style={{ height }}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 100,
          paddingTop: 20,
          paddingHorizontal: 20,
        }}
      >
        <View className="mt-10">
          <View
            className={`h-[${
              height * 0.3
            }] bg-secondary-base w-full rounded-lg p-3 mt-5`}
          >
            <View className="flex justify-between flex-row items-center">
              <View>
                <Text className="text-white font-ssemibold text-xl">
                  New Expense?
                </Text>
              </View>
              {/* TODO: This button will be responsible for opening a modal that will show a sheet that will have fields and a button to submit */}
              <View>
                <CustomButton
                  title="Add Expense"
                  textStyles="text-white"
                  width="150px"
                  handlePress={() => router.push("./addFlat")}
                />
              </View>
            </View>
          </View>
          <View>
            <Text className="text-white text-4xl font-ssemibold mt-4">
              Expenses
            </Text>
          </View>

          <View className="flex justify-center items-center">
            <FlatList
              className="p-6 mr-3 gap-3"
              data={expenseData}
              numColumns={1}
              renderItem={(expense) => <ExpenseCard item={expense.item} />}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(expense) => expense.expense_id.toString()}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

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

export default expenses;
