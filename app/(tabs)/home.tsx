import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "@/constants";
import { router } from "expo-router";

const home = () => {
  const handleLogout = async () => {
    // Add your logout logic here
    console.log("Logout button clicked");
    router.push("../(auth)/signin");
  };

  return (
    <SafeAreaView className="bg-primary">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="flex items-center flex-row px-4 py-7 justify-between">
          <View>
            <Text className="text-white font-ssemibold text-2xl">
              Hey There!{" "}
            </Text>
            <Text className="font-ssemibold text-2xl text-secondary-saturated">
              Muhammad Ovais{" "}
            </Text>
          </View>
          <View>
            <TouchableOpacity onPress={handleLogout}>
              <Image
                source={icons.logout}
                className="h-[24px]"
                resizeMode="contain"
                tintColor={"#4583FF"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default home;
