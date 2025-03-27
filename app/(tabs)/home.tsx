import { View, ScrollView, FlatList, Image, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Header,
  SummaryCard,
  MaintenanceList,
  ExpensesList,
} from "@/components";
import { ProgressSummary } from "@/components";
import { useWindowDimensions } from "react-native";
import { StatsData } from "@/types";
const home = () => {
  const { height } = useWindowDimensions();
  const [stats, setStats] = useState<StatsData>({
    amount: 0,
    maintenanceReceived: 0,
    expensesCleared: 0,
  });

  // TODO: On the Backend we will be calculating all the maintennence amount gotten and also the %es of expenses and maintenance recieved and cleard getStats()

  useEffect(() => {
    const fetchStats = async () => {
      console.log("statsFetched");
    };

    fetchStats()
  }, []);

  return (
    <SafeAreaView className="bg-primary mb-10" style={{ height }}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 100,
        }}
      >
        <View>
          <Header />
        </View>
        <View>
          <SummaryCard amount={stats.amount} />
        </View>

        <View className="flex flex-row justify-between gap-2 w-full p-6">
          <View className="flex-1">
            <ProgressSummary title={"Maintenance Received"} progress={stats.maintenanceReceived} />
          </View>
          <View className="flex-1">
            <ProgressSummary title={"Expenses Cleared"} progress={stats.expensesCleared} />
          </View>
        </View>

        <View>
          <View className="flex justify-center p-6">
            <Text className="text-white text-3xl font-ssemibold">
              Maintenance
            </Text>
          </View>
          <MaintenanceList />
        </View>

        <View>
          <View className="flex justify-center p-6">
            <Text className="text-white text-3xl font-ssemibold">Expenses</Text>
          </View>
          <ExpensesList />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default home;
