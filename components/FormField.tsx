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

import { icons } from "../constants";
import { FormFieldProps } from "@/types";

const FormField: React.FC<FormFieldProps> = ({
  title,
  keypad = "default",
  labelStyle,
  inputStyles,
  value,
  handleChange,
  handler
}) => {
  const [showPassword, setShowPassword] = useState(true);
  return (
    <View className="mt-3">
      <Text className={`${labelStyle} text-white font-ssemibold`}>{title}</Text>
      <View
        className={`mt-1 border-2 px-3 py-2 rounded-md flex flex-row justify-between items-center  border-secondary-100 ${inputStyles}`}
      >
        <TextInput
          keyboardType={keypad}
          autoCapitalize="none"
          className="text-white flex-1 p-2"
          secureTextEntry={showPassword && title === "Password"}
          value={value}
          onChangeText={handleChange}
          returnKeyType="done"
          onSubmitEditing={handler}
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
