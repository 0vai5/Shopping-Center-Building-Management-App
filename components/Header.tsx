import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { icons } from "@/constants";
import { router } from "expo-router";
import { useGlobalContext } from "@/context/GlobalContext";
import useAppwrite from "@/hooks/useAppwrite";

const Header = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { logoutUser } = useAppwrite();

  const handleLogout = async () => {
    const response = await logoutUser();
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
          {user.name || "User"}
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
