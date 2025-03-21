import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";

const CustomButton = ({
  title,
  handlePress,
  textStyles,
  containerStyles,
  loader,
}: {
  title: string;
  handlePress?: () => void;
  textStyles?: string;
  containerStyles?: string;
  loader?: boolean;
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`${containerStyles} bg-black w-[200px] py-4 px-10 rounded-lg `}
      disabled={loader}
    >
      <View className="flex flex-row-reverse gap-3 items-center justify-center">
        {loader && <ActivityIndicator color="black" />}
        <Text className={`${textStyles} text-center font-smedium`}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
