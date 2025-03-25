import {
  View,
  Text,
  ScrollView,
  useWindowDimensions,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomButton } from "@/components";
import { router } from "expo-router";
import { icons, flats as flatData } from "@/constants";
import { FlatCardProps } from "@/types";

const flats = () => {
  const { height } = useWindowDimensions();

  
  return (
    <SafeAreaView className="bg-primary" style={{ height }}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 100,
          paddingTop: 20,
          paddingHorizontal: 20,
        }}
      >
        <View className="mt-10">
          <View
            className={`h-[${
              height * 0.3
            }] bg-secondary-base w-full rounded-lg p-3 mt-5`}
          >
            <View className="flex justify-between flex-row items-center">
              <View>
                <Text className="text-white font-ssemibold text-2xl">
                  New flat constructed?
                </Text>
              </View>
              {/* TODO: This button will be responsible for opening a modal that will show a sheet that will have fields and a button to submit */}
              <View>
                <CustomButton
                  title="Add Flat"
                  textStyles="text-white"
                  width="150px"
                  handlePress={() => router.push("./addFlat")}
                />
              </View>
            </View>
          </View>
          <View>
            <Text className="text-white text-4xl font-ssemibold mt-4">
              Flats
            </Text>
          </View>

          <View className="flex justify-center items-center">
            <FlatList
              className="p-6 mr-3 gap-3 w-[100%]"
              data={flatData}
              renderItem={(flat) => <FlatCard item={flat.item} />}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(flat) => flat.flat_id.toString()}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const FlatCard: React.FC<FlatCardProps> = ({ item }) => {
  const screenHeight = Dimensions.get("window").height;
  return (
    <View
      className={`bg-lessBlack p-5 mr-10 rounded-xl h-[${screenHeight * 0.4}]`}
    >
      <View className="flex justify-between gap-10 flex-row ">
        <View>
          <Text className="text-white font-ssemibold text-2xl">
            {item.flat_number}
          </Text>
          <Text className="text-gray-400 font-medium text-lg">
            {item.rooms} Rooms
          </Text>
        </View>
        <View>
          {/* TODO: This image or to TouchableOpacity will be responsible for opening a modal that will show a sheet that will have multiple options like edit and delete */}
          <TouchableOpacity>
            <Image
              source={icons.menu}
              className="h-[24px]"
              tintColor={"#5889ec"}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View className="w-[95%] mt-7 mx-auto border-b border-gray-700"></View>
      <View className="flex justify-between gap-10 flex-row mt-4">
        <View>
          <Text className="text-gray-300 font-smedium text-lg">
            {item.owner_name}
          </Text>
          <Text className="text-gray-300 font-smedium text-lg">
            {item.owner_no}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default flats;
