import { View, Text } from "react-native";
import React from "react";
import ProgressBar from "react-native-progress/Bar";
import { ProgressSummaryProps } from "@/types";

const ProgressSummary: React.FC<ProgressSummaryProps> = ({
  title,
  progress,
}) => {
  return (
    <View className="flex w-full h-[25vh] justify-between bg-lessBlack p-5 rounded-2xl">
      <View className="w-full">
        <Text className="text-white font-ssemibold">{title}</Text>
        <Text className="text-gray-500">current Month</Text>
      </View>
      <View className="rounded-2xl w-full">
        <Text className="text-white font-smedium mb-3 text-3xl ">
          {progress}%
        </Text>
        <ProgressBar
          progress={(progress / 100)}
          width={null}
          height={7}
          borderRadius={7}
          unfilledColor={"#161616"}
          borderColor={"#161616"}
          color={"#f7bc63"}
          animated={true}
        />
      </View>
    </View>
  );
};

export default ProgressSummary;
