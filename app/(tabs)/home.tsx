import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header, SummaryCard } from "@/components";
import { ProgressSummary } from "@/components";
const home = () => {
  return (
    <SafeAreaView className="bg-primary">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View>
          <Header />
        </View>
        <View>
          <SummaryCard />
        </View>

        <View className="flex flex-row justify-between w-full p-6">
          <View>
            <ProgressSummary title={"Maintenance Received"} progress={50} />
          </View>
          <View className="w-1/2">
            <ProgressSummary
              title={"Expenses Cleared"}
              progress={0}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default home;
