import { ScrollView, Text, TextInput, View } from "react-native";
import React from "react";
import { FormField } from "@/components";
import { SafeAreaView } from "react-native-safe-area-context";

const Signin = () => {
  return (
    <SafeAreaView className="h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className=" p-3 flex flex-col justify-center gap-0 h-full">
          <View>
            <Text className="text-3xl font-pbold">Signin</Text>
            <Text className="font-wsregular text-gray-500">
              Log in to get access to each and every aspect of Shopping Center
            </Text>
          </View>
          <View>
            <View>
              <FormField />
            </View>
            <View>
              <FormField />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signin;
