import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import { CustomButton } from "@/components";

const index = () => {
  return (
    <>
      <SafeAreaView>
        <ScrollView
          contentContainerStyle={{
            height: "100%",
          }}
        >
          <View className="flex items-center justify-center gap-0 h-full">
            <View className="mb-0">
              <Image
                source={require("@/assets/images/saffaenterprises.png")}
                className="h-[275px]"
                resizeMode="contain"
              />
            </View>

            <View>
              <Text className="text-3xl font-bold text-center font-pbold">
                Welcome to {"\n"} Shopping Center Building App
              </Text>
            </View>

            <View>
              <Text className="text-center text-xl text-gray-400 font-medium">
                A simple app to manage your shopping center building
              </Text>
            </View>

            <View>
              <CustomButton
                title="Get Started"
                containerStyles="w-full mt-7"
                handlePress={() => {
                  router.push("./signin");
                }}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <StatusBar style="dark" />
    </>
  );
};

export default index;
