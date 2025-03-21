import {
  View,
  Text,
  TextInput,
  Keyboard,
  Touchable,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";

import { KeyboardTypeOptions } from "react-native";
import { icons } from "../constants";

const FormField = ({
  title,
  keypad = "default",
  labelStyle,
  inputStyles,
  value,
  handleChange
}: {
  title?: string;
  keypad?: KeyboardTypeOptions;
  labelStyle?: string;
  inputStyles?: string;
  value: string;
  handleChange?: (e: any) => void;
}) => {
  const [showPassword, setShowPassword] = useState(true);
  return (
    <View className="mt-3">
      <Text className={`${labelStyle} text-black font-ssemibold`}>{title}</Text>
      <View
        className={`mt-1 border-2 px-3 py-2 rounded-md flex flex-row justify-between items-center  border-yellowishgreen-200 ${inputStyles}`}
      >
        <TextInput
          placeholder={title}
          keyboardType={keypad}
          secureTextEntry={showPassword && title === "Password"}
          value={value}
          onChangeText={handleChange}
        />
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
