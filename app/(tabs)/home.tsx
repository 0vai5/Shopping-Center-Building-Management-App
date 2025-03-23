import { View, ScrollView, FlatList, Image, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header, SummaryCard, MaintenanceList } from "@/components";
import { ProgressSummary } from "@/components";
import { useWindowDimensions } from "react-native";
const home = () => {
  const { height } = useWindowDimensions();

 

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
          <SummaryCard />
        </View>

        <View className="flex flex-row justify-between gap-2 w-full p-6">
          <View className="flex-1">
            <ProgressSummary title={"Maintenance Received"} progress={50} />
          </View>
          <View className="flex-1">
            <ProgressSummary title={"Expenses Cleared"} progress={0} />
          </View>
        </View>

        <View className="flex justify-center p-6">
          <Text className="text-white text-3xl font-ssemibold">
            Maintenance
          </Text>
        </View>
        <View>
          <MaintenanceList />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default home;
