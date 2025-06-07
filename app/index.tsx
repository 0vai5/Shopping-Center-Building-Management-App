import { View, Text, ScrollView, Image } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, router } from "expo-router";
import { CustomButton } from "@/components";
import { useGlobalContext } from "@/context/GlobalContext";

const index: React.FC = () => {
  const { isLoggedIn, isLoading } = useGlobalContext();


  if(!isLoading && isLoggedIn) {
    return <Redirect href={"./(tabs)/home"} />
  }

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

          <View className="absolute flex bg-primary/70 justify-end items-center pb-4 gap-0 w-full h-full">
            <View className="mb-0">
              <Image
                source={require("@/assets/images/Building-Logo.png")}
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
                containerStyles="w-full mt-7 bg-primary"
                handlePress={() => {
                  router.push("./(auth)/signin");
                }}
                textStyles="text-white"
                activeOpacity={0.8}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default index;
