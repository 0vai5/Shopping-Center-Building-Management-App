import { View, Text, ScrollView, Dimensions, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { CustomButton, DataTable } from "@/components";


const summary = () => {
  const { height } = Dimensions.get("window");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [fromDate, setFromDate] = useState(new Date().toDateString());
  const [toDate, setToDate] = useState(new Date().toDateString());
  const [isToDatePickerVisible, setToDatePickerVisibility] = useState(false);


  const [summaryData, setSummaryData] = useState([]);

  const handleConfirmFromDate = (date: any) => {
    console.warn("A date has been picked: ", date);
    setFromDate(date.toDateString());
    setDatePickerVisibility(false);
  };

  const handleConfirmToDate = (date: any) => {
    console.warn("A date has been picked: ", date);
    setToDate(date.toDateString());
    setToDatePickerVisibility(false);
  };

  useEffect(()=> {
    searchHandler() 
  }, [])

  const searchHandler = () => {
    console.log("Searching for data");
  };

  const handleExport = () => {};


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
        <Text className="text-white font-sbold text-4xl">Summary</Text>
        <View className="flex justify-between mt-10">
          <Text className="text-white font-sbold text-xl">From</Text>
          <View className="flex justify-between items-center rounded-lg p-2 border-secondary-saturated border-2 w-full">
            <Text
              className="text-white font-sbold text-xl"
              onPress={() => setDatePickerVisibility(true)}
            >
              {fromDate}
            </Text>
          </View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            date={new Date()}
            onConfirm={handleConfirmFromDate}
            onCancel={() => setDatePickerVisibility(false)}
            display="inline"
            minimumDate={new Date(2025, 2, 26)} // March 26, 2025
            maximumDate={new Date()}
          />
        </View>
        <View className="flex justify-between mt-10">
          <Text className="text-white font-sbold text-xl">To</Text>
          <View className="flex justify-between items-center rounded-lg p-2 border-secondary-saturated border-2 w-full">
            <Text
              className="text-white font-sbold text-xl"
              onPress={() => setToDatePickerVisibility(true)}
            >
              {toDate}
            </Text>
          </View>
          <DateTimePickerModal
            isVisible={isToDatePickerVisible}
            mode="date"
            date={new Date()}
            onConfirm={handleConfirmToDate}
            onCancel={() => setToDatePickerVisibility(false)}
            display="inline"
            maximumDate={new Date(new Date())}
            minimumDate={new Date(2025, 2, 26)} // March 26, 2025
          />
        </View>
        <View className="mt-5">
          <CustomButton title="Search" textStyles="text-white" handlePress={searchHandler} width="w-full" />
        </View>

        <View className="mt-10">
          <CustomButton title="Export" handlePress={handleExport} textStyles="text-white" width="50%" />
        </View>

        <View>
          <DataTable data={summaryData} />
        </View>

        

      </ScrollView>
    </SafeAreaView>
  );
};

export default summary;
