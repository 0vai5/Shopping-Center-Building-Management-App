import {
  View,
  Text,
  ScrollView,
  Dimensions,
  RefreshControl,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { CustomButton, DataTable } from "@/components";
import { generateTableHTML } from "@/utils/summaryHtmlGenerator.js";
import { printAsync, printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import useAppwrite from "@/hooks/useAppwrite";

const summary = () => {
  const { height } = Dimensions.get("window");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [fromDate, setFromDate] = useState(new Date(2025, 3, 1));
  const [toDate, setToDate] = useState(new Date());

  const [isToDatePickerVisible, setToDatePickerVisibility] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [summaryData, setSummaryData] = useState<any>({
    summary: [],
    total: 0,
  });
  const { getSummary } = useAppwrite()
  const [search, setSearch] = useState({
    fromDate: "",
    toDate: "",
  });

  const handleConfirmFromDate = (date: any) => {
    setSearch({ ...search, fromDate: date });
    setFromDate(date);
    setDatePickerVisibility(false);
  };

  const handleConfirmToDate = (date: any) => {
    setSearch({ ...search, toDate: date });

    setToDate(date);
    setToDatePickerVisibility(false);
  };

  useEffect(() => {
    searchHandler();
  }, []);

  const searchHandler = async () => {
    console.log("Searching for summary data...");
    console.log("From Date:", fromDate);
    console.log("To Date:", toDate);

    try {
      const response = await getSummary(fromDate.toISOString(), toDate.toISOString());
      console.log("Summary data fetched successfully:", response);
      setSummaryData(response || {
        summary: [],
        total: 0,
      });
    } catch (error: any) {
      console.error("Error fetching summary data:", error.message);
      Alert.alert("Error", "Failed to fetch summary data. Please try again later.");
    }

  };
  const onRefresh = async () => {
    setRefreshing(true);
    await searchHandler();
    setRefreshing(false);
  };

  const handleExport = async () => {
    const htmlContent = generateTableHTML(summaryData, fromDate.toDateString(), toDate.toDateString());
    const { uri } = await printToFileAsync({
      html: htmlContent,
      base64: false,
      height: 1000,
      width: 1000,
    });

    await shareAsync(uri, {
      dialogTitle: `Summary Report ${new Date().toDateString()}`,
      UTI: "com.adobe.pdf",
      mimeType: "application/pdf",
    });
  };

  return (
    <SafeAreaView className="bg-primary" style={{ height }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
              {fromDate.toDateString()}
            </Text>
          </View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            date={new Date(2025, 3, 1)}
            onConfirm={handleConfirmFromDate}
            onCancel={() => setDatePickerVisibility(false)}
            display="inline"
            minimumDate={new Date(2025, 3, 1)}
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
              {toDate.toDateString()}
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
            minimumDate={new Date(2025, 3, 1)} // April 3, 2025
          />
        </View>
        <View className="mt-5">
          <CustomButton
            title="Search"
            textStyles="text-white"
            handlePress={searchHandler}
            width="w-full"
            containerStyles="bg-secondary-saturated rounded-lg py-4 px-10"
          />
        </View>

        <View className="mt-10">
          <CustomButton
            title="Export"
            handlePress={handleExport}
            textStyles="text-white font-ssemibold"
            width="50%"
            containerStyles="bg-secondary-saturated rounded-lg py-4 px-10"
          />
        </View>

        <View>
          <DataTable data={summaryData} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default summary;
