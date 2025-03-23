import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import { CustomButton } from "@/components";

const index = () => {
  return (
    <>
      <SafeAreaView className="bg-primary">
        <ScrollView
          contentContainerStyle={{
            height: "100%",
          }}
          className="relative"
        >
          <View className="flex items-center justify-center h-full">
            <Image
              source={require("@/assets/images/building.png")}
              resizeMode="contain"
            />
          </View>

          <View className="absolute flex bg-primary/70 justify-end items-center pb-4  gap-0 w-full h-full">
            <View className="mb-0">
              <Image
                source={require("@/assets/images/building-logo-transparent.png")}
                className="h-[325px]"
                resizeMode="contain"
              />
            </View>

            <View className="w-full px-4">
              <Text className="text-3xl font-bold text-center text-secondary-base font-sbold">
                Welcome to {"\n"} Shopping Center Building App
              </Text>
            </View>

            <View className="w-full px-4">
              <Text className="text-center text-base text-gray-400 font-medium">
                A simple app to manage your shopping center building.
              </Text>
            </View>

            <View className="w-full px-4">
              <CustomButton
                width="w-full"
                title="Get Started"
                containerStyles="w-full mt-7"
                handlePress={() => {
                  router.navigate("./(auth)/signin");
                }}
                textStyles="text-white"
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      {/* <StatusBar style="dark" /> */}
    </>
  );
};

export default index;
