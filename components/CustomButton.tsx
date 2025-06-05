import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import { CustomButtonProps } from "@/types";

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  handlePress,
  textStyles,
  containerStyles,
  loader,
  width,
  activityColor = "white"
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`${containerStyles} w-[${width || "100%"}] py-4 px-10 rounded-lg `}
      disabled={loader}
    >
      <View className="flex flex-row-reverse gap-3 items-center justify-center">
        {loader && <ActivityIndicator color={activityColor} />}
        <Text className={`${textStyles} text-center font-smedium`}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
