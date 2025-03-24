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
import { icons } from "@/constants";
import { FlatCardProps } from "@/types";

const flats = () => {
  const { height } = useWindowDimensions();

  const flats = [
    {
      flat_id: "1",
      flat_number: "SF-1",
      rooms: 2,
      owner_name: "Zohra",
      owner_no: "03001234567",
    },
    {
      flat_id: "2",
      flat_number: "SF-2",
      rooms: 2,
      owner_name: "Sohail",
      owner_no: "03001234567",
    },
    {
      flat_id: "3",
      flat_number: "SF-3",
      rooms: 2,
      owner_name: "Amjad Bawa",
      owner_no: "03001234567",
    },
    {
      flat_id: "4",
      flat_number: "SF-4",
      rooms: 3,
      owner_name: "Munaf Bakali",
      owner_no: "03001234567",
    },
    {
      flat_id: "5",
      flat_number: "SF-5",
      rooms: 2,
      owner_name: "Rashida",
      owner_no: "03001234567",
    },
    {
      flat_id: "6",
      flat_number: "SF-6",
      rooms: 2,
      owner_name: "Shumaila",
      owner_no: "03001234567",
    },
    {
      flat_id: "7",
      flat_number: "SF-7",
      rooms: 2,
      owner_name: "Salman Galani",
      owner_no: "03001234567",
    },
    {
      flat_id: "8",
      flat_number: "SF-8",
      rooms: 2,
      owner_name: "Asim Bakali",
      owner_no: "03001234567",
    },
    {
      flat_id: "9",
      flat_number: "SF-9",
      rooms: 3,
      owner_name: "Moin Ibrahim",
      owner_no: "03001234567",
    },
    {
      flat_id: "10",
      flat_number: "SF-10",
      rooms: 2,
      owner_name: "Waseem Haroon",
      owner_no: "03001234567",
    },
    {
      flat_id: "11",
      flat_number: "SF-11 & SF-12",
      rooms: 4,
      owner_name: "Maroof Dadani",
      owner_no: "03001234567",
    },
  ];

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
              data={flats}
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
