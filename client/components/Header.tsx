import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { icons } from "@/constants";
import { router } from "expo-router";
import { useGlobalContext } from "@/context/GlobalContext";

const Header = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();

  const handleLogout = async () => {
    // Add your logout logic here
   console.log("Logging out...");
    setUser(null);
    setIsLoggedIn(false);
    router.push("../(auth)/signin");
  };
  return (
    <View className="flex items-center flex-row px-4 py-7 justify-between">
      <View>
        <Text className="text-white font-ssemibold text-2xl">
          Hey There! 👋
        </Text>
        <Text className="font-ssemibold text-2xl text-secondary-saturated">
          {user?.name}{" "}
        </Text>
      </View>
      <View>
        <TouchableOpacity onPress={handleLogout}>
          <Image
            source={icons.logout}
            className="h-[24px]"
            resizeMode="contain"
            tintColor={"#f7bc63"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
