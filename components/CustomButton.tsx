import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const CustomButton = ({
  title,
  handlePress,
  textStyles,
  containerStyles,
}: {
  title: string;
  handlePress?: () => void;
  textStyles?: string;
  containerStyles?: string;
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`${containerStyles} bg-black w-[200px] py-4 px-10 rounded-lg `}
    >
      <View>
        <Text className={`${textStyles} text-center text-white font-pmedium`}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
