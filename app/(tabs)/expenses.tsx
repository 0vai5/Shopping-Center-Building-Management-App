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
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { CustomBottomSheetModal, CustomButton } from "@/components";
import { icons } from "@/constants";
import { ExpenseCardProps } from "@/types";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {
  BottomSheetModal,
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

const expenses = () => {
  const { height } = useWindowDimensions();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [creating, setCreating] = useState(false);
  const [expenseForm, setExpenseForm] = useState({
    variable: false,
    expense: "",
    name: "",
    amount: "",
    thisMonth: false,
  });

  const [expenseData, setExpenseData] = useState<any | null>([]);

  const handleExpenseCreation = () => {
    setCreating(true);

    setTimeout(() => {
      setCreating(false);
      console.log("Expense Created", expenseForm);
      bottomSheetModalRef.current?.close();
    }, 3000);
    fetchExpenses()


  };
  const fetchExpenses = async () => {
    console.log("Hello Items expenses ....");
  };
  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <>
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
                <View>
                  <CustomButton
                    title="Add Expense"
                    textStyles="text-white"
                    width="150px"
                    handlePress={() => bottomSheetModalRef.current?.present()}
                  />
                </View>
              </View>
            </View>
            <View>
              <Text className="text-white text-4xl font-ssemibold mt-4">
                Expenses
              </Text>
            </View>

            {expenseData.length === 0 && (
              <Text className="text-secondary-saturated font-ssemibold text-xl">
                No Expenses Found
              </Text>
            )}

            {/* FIXME: Fix the types after appwrite integration */}

            <View className="flex">
              <FlatList
                className="p-6 mr-3 gap-3"
                data={expenseData}
                renderItem={(expense) => <ExpenseCard item={expense.item} />}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(expense) => expense.id.toString()}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      <CustomBottomSheetModal ref={bottomSheetModalRef}>
        <BottomSheetView className="p-5 gap-2">
          <Text className="text-white font-ssemibold text-2xl mb-4">
            Create Flat
          </Text>
          <View>
            <View className="mb-5">
              <Text className="text-white font-ssemibold text-lg">Expense</Text>
              <BottomSheetTextInput
                className="px-2 py-3 border-secondary-saturated bg-white rounded-lg text-primary"
                value={expenseForm.expense}
                onChangeText={(e) =>
                  setExpenseForm({ ...expenseForm, expense: e })
                }
              />
            </View>
            <View className="mb-5">
              <Text className="text-white font-ssemibold text-lg">Name</Text>
              <BottomSheetTextInput
                className="px-2 py-3 border-secondary-saturated bg-white rounded-lg text-primary"
                value={expenseForm.name}
                onChangeText={(e) =>
                  setExpenseForm({ ...expenseForm, name: e })
                }
              />
            </View>
            <View className="mb-5">
              <BouncyCheckbox
                size={25}
                fillColor="#5889ec"
                unFillColor="#FFFFFF"
                text="This Month Only"
                iconStyle={{ borderColor: "#5889ec" }}
                innerIconStyle={{ borderWidth: 2 }}
                textStyle={{
                  fontFamily: "JosefinSans-Regular",
                  textDecorationLine: "none",
                }}
                onPress={(isChecked: boolean) => {
                  setExpenseForm({ ...expenseForm, thisMonth: isChecked });
                }}
              />
            </View>
            <View className="mb-5">
              <BouncyCheckbox
                size={25}
                fillColor="#5889ec"
                unFillColor="#FFFFFF"
                text="Variable"
                iconStyle={{ borderColor: "#5889ec" }}
                innerIconStyle={{ borderWidth: 2 }}
                textStyle={{
                  fontFamily: "JosefinSans-Regular",
                  textDecorationLine: "none",
                }}
                onPress={(isChecked: boolean) => {
                  setExpenseForm({ ...expenseForm, variable: isChecked });
                }}
              />
            </View>
            {!expenseForm.variable && (
              <View className="mb-5">
                <Text className="text-white font-ssemibold text-lg">
                  Amount
                </Text>
                <BottomSheetTextInput
                  className="px-2 py-3 border-secondary-saturated bg-white rounded-lg text-primary"
                  value={expenseForm.amount}
                  keyboardType="numeric"
                  onChangeText={(e) =>
                    setExpenseForm({ ...expenseForm, amount: e })
                  }
                />
              </View>
            )}
            <View className="mt-5">
              <CustomButton
                title="Create Expense"
                textStyles="text-white"
                width="150px"
                handlePress={handleExpenseCreation}
                loader={creating}
              />
            </View>
          </View>
        </BottomSheetView>
      </CustomBottomSheetModal>
    </>
  );
};

const ExpenseCard: React.FC<ExpenseCardProps> = ({ item }) => {
  const screenHeight = Dimensions.get("window").height;
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const deleteHandler = () => {};
  return (
    <>
      <View
        className={`bg-lessBlack p-5 mr-10 rounded-xl h-[${
          screenHeight * 0.4
        }]`}
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
          <View>
            <Text className="text-gray-300 font-smedium text-lg">
              {item.amount || "Variable"} /-
            </Text>
          </View>
        </View>
      </View>

      <CustomBottomSheetModal ref={bottomSheetModalRef}>
        <BottomSheetView className="p-5">
          <Text className="text-white font-ssemibold text-2xl mb-4">
            Flat Details
          </Text>
          <View className="flex-row gap-10 justify-between items-center">
            <View className="flex-col items-start">
              <View className="flex-row justify-bewteen items-center gap-2">
                <Text className="text-white font-ssemibold text-xl relative">
                  {item.expense}
                </Text>
              </View>
              <View className="flex-row items-center justify-center gap-2">
                <Image source={icons.dollar} tintColor={"#5889ec"} />
                <Text className="text-white font-sregular text-xl">
                  {item.amount || "Variable"}
                </Text>
              </View>
            </View>
            <View className="items-start">
              <View className="flex-row gap-2">
                <Text className="text-gray-300 font-smedium text-lg">
                  {item.name}
                </Text>
              </View>
            </View>
          </View>
        </BottomSheetView>
      </CustomBottomSheetModal>
    </>
  );
};

export default expenses;
