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
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomBottomSheetModal, CustomButton } from "@/components";
import { router } from "expo-router";
import { icons, flats as flatData } from "@/constants";
import { FlatCardProps } from "@/types";
import {
  BottomSheetModal,
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

const flats = () => {
  const { height } = useWindowDimensions();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [flatForm, setFlatForm] = useState({
    flat_number: "",
    rooms: "",
    owner_name: "",
    owner_no: "",
  });

  const handleFlatCreation = () => {
    console.log("Flat Form", flatForm);
    bottomSheetModalRef.current?.dismiss();
    router.push("./flats");
  }

  return (
    <>
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
                  <Text className="text-white font-ssemibold text-xl">
                    New flat constructed?
                  </Text>
                </View>
                <View>
                  <CustomButton
                    title="Add Flat"
                    textStyles="text-white"
                    width="150px"
                    handlePress={() => bottomSheetModalRef.current?.present()}
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

      <CustomBottomSheetModal ref={bottomSheetModalRef}>
        <BottomSheetView className="p-5">
          <Text className="text-white font-ssemibold text-2xl mb-4">
            Create Flat
          </Text>
          <View>
            <View>
              <Text className="text-white font-ssemibold text-lg">
                Flat Number
              </Text>
              <BottomSheetTextInput
                className="px-2 py-3 border-secondary-saturated bg-white rounded-lg text-primary"
                value={flatForm.flat_number}
                onChangeText={(e) =>
                  setFlatForm({ ...flatForm, flat_number: e })
                }
              />
            </View>
            <View>
              <Text className="text-white font-ssemibold text-lg">Rooms</Text>
              <BottomSheetTextInput
                className="px-2 py-3 border-secondary-saturated bg-white rounded-lg text-primary"
                value={flatForm.rooms}
                keyboardType="numeric"
                onChangeText={(e) => setFlatForm({ ...flatForm, rooms: e })}
              />
            </View>
            <View>
              <Text className="text-white font-ssemibold text-lg">
                Owner Name
              </Text>
              <BottomSheetTextInput
                className="px-2 py-3 border-secondary-saturated bg-white rounded-lg text-primary"
                value={flatForm.owner_name}
                onChangeText={(e) =>
                  setFlatForm({ ...flatForm, owner_name: e })
                }
              />
            </View>
            <View>
              <Text className="text-white font-ssemibold text-lg">
                Owner No.
              </Text>
              <BottomSheetTextInput
                className="px-2 py-3 border-secondary-saturated bg-white rounded-lg text-primary"
                value={flatForm.owner_no}
                keyboardType="phone-pad"
                onChangeText={(e) => setFlatForm({ ...flatForm, owner_no: e })}
              />
            </View>
            <View className="mt-5">
              <CustomButton
                title="Create Flat"
                textStyles="text-white"
                width="150px"
                handlePress={handleFlatCreation}
              />
            </View>
          </View>
        </BottomSheetView>
      </CustomBottomSheetModal>
    </>
  );
};

const FlatCard: React.FC<FlatCardProps> = ({ item }) => {
  const screenHeight = Dimensions.get("window").height;
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  return (
    <>
      <View
        className={`bg-lessBlack p-5 mr-10 rounded-xl h-[${
          screenHeight * 0.4
        }]`}
      >
        <View className="flex justify-between gap-10 flex-row ">
          <View>
            <View className="flex-row justify-bewteen items-center gap-2">
              <Image
                source={icons.house}
                tintColor={"#5889ec"}
                resizeMode="contain"
              />
              <Text className="text-white font-ssemibold text-xl relative">
                {item.flat_number}
              </Text>
            </View>
            <View className="flex-row justify-bewteen items-center gap-2">
              <Image source={icons.rooms} tintColor={"#5889ec"} />
              <Text className="text-gray-400 font-medium text-lg relative top-1">
                {item.rooms}
              </Text>
            </View>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => bottomSheetModalRef.current?.present()}
            >
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
            <View className="flex-row justify-center items-center gap-2">
              <Image source={icons.phone} tintColor={"#72BF78"} />
              <Text className="text-gray-300 font-sregular text-lg">
                {item.owner_no}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <CustomBottomSheetModal ref={bottomSheetModalRef}>
        <BottomSheetView className="p-5">
          <Text className="text-white font-ssemibold text-2xl mb-4">
            Flat Details
          </Text>
          <View className="flex-row gap-10 justify-between items-center">
            <View className="flex-col items-start">
              <View className="flex-row justify-bewteen items-center gap-2">
                <Image
                  source={icons.house}
                  tintColor={"#5889ec"}
                  resizeMode="contain"
                />
                <Text className="text-white font-ssemibold text-xl relative">
                  {item.flat_number}
                </Text>
              </View>
              <View className="flex-row items-center justify-center gap-2">
                <Image source={icons.rooms} tintColor={"#5889ec"} />
                <Text className="text-white font-sregular text-xl">
                  {item.rooms}
                </Text>
              </View>
            </View>
            <View className="items-start">
              <View className="flex-row gap-2">
                <Text className="text-gray-300 font-smedium text-lg">
                  {item.owner_name}
                </Text>
              </View>
              <View className="flex-row justify-bewteen items-center gap-2">
                <Image
                  source={icons.phone}
                  tintColor={"#72BF78"}
                  resizeMode="contain"
                />
                <Text className="text-white font-ssemibold text-xl relative">
                  {item.owner_no}
                </Text>
              </View>
            </View>
          </View>
        </BottomSheetView>
      </CustomBottomSheetModal>
    </>
  );
};

export default flats;
