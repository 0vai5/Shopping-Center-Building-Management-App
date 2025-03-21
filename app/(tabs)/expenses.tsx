import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const expenses = () => {
  return (
    <SafeAreaView className="bg-primary">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <Text>Expenses</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default expenses;
