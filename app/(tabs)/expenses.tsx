import {
  View,
  Text,
  ScrollView,
  useWindowDimensions,
  FlatList,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { CustomButton, ExpenseCard } from "@/components";

const expenses = () => {
  const { height } = useWindowDimensions();

  const expenses = [
    {
      expense_id: "1",
      expense: "WaterBoy",
      salary: 3000,
      name: "Malik Zaada",
    },
    {
      expense_id: "2",
      expense: "Sweeper",
      salary: 2200,
      name: "Abdullah",
    },
    {
      expense_id: "3",
      expense: "Electricity Bill",
      salary: 5000,
      name: "K.Electric",
    },
  ];

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
                <Text className="text-white font-ssemibold text-2xl">
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
              data={expenses}
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

export default expenses;
