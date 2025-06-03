import {
  View,
  Text,
  ScrollView,
  useWindowDimensions,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
  RefreshControl,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomBottomSheetModal, CustomButton } from "@/components";
import { icons } from "@/constants";
import { FlatCardProps } from "@/types";
import {
  BottomSheetModal,
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import axios from "axios";

const flats = () => {
  const { height } = useWindowDimensions();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [creating, setCreating] = useState(false);
  const [flatData, setFlatData] = useState<any>([]);
  const [flatForm, setFlatForm] = useState({
    flat_number: "",
    rooms: "",
    owner_name: "",
    owner_phone: "",
  });
  const [refreshing, setRefreshing] = useState(false);

  const handleFlatCreation = async () => {
   try {
    if (
      !flatForm.flat_number ||
      !flatForm.rooms ||
      !flatForm.owner_name ||
      !flatForm.owner_phone
    ) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    setCreating(true);
    const { data } = await axios.post(
      `${process.env.EXPO_PUBLIC_SERVER_URL}/flats/create-flat`,
      flatForm
    );
    setCreating(false);
    Alert.alert("Success", "Flat created successfully");
    router.push("./(tabs)/flats");
    setFlatForm({
      flat_number: "",
      rooms: "",
      owner_name: "",
      owner_phone: "",
    });
    bottomSheetModalRef.current?.dismiss();
    fetchFlats();
   } catch (error: any) {
      setCreating(false);
      Alert.alert("Error", error.message || "Failed to create flat");
      console.error("Error creating flat:", error.message);
    }
  };
  const fetchFlats = async () => {
    try {
      const {data} =  await axios.get(
        `${process.env.EXPO_PUBLIC_SERVER_URL}/flats/flats`);
        setFlatData(data.data);

    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to fetch flats");
      console.error("Error fetching flats:", error.message);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchFlats();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchFlats();
  }, []);

  return (
    <>
      <SafeAreaView className="bg-primary" style={{ height }}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
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
                    containerStyles="bg-black"
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

            {flatData && flatData.length === 0 && (
              <Text className="text-secondary-saturated font-ssemibold text-xl">
                No Flats Found
              </Text>
            )}

            {/* FIXME: Fix the types after appwrite integration */}

            <View className="flex">
              <FlatList
                className="p-6 mr-3 gap-3 w-[100%]"
                data={flatData}
                renderItem={(flat) => <FlatCard item={flat.item} />}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(flat) => flat._id}
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
                onChangeText={(e) => setFlatForm({ ...flatForm, owner_name: e })}
              />
            </View>
            <View>
              <Text className="text-white font-ssemibold text-lg">
                Owner No.
              </Text>
              <BottomSheetTextInput
                className="px-2 py-3 border-secondary-saturated bg-white rounded-lg text-primary"
                value={flatForm.owner_phone}
                keyboardType="phone-pad"
                onChangeText={(e) => setFlatForm({ ...flatForm, owner_phone: e })}
              />
            </View>
            <View className="mt-5">
              <CustomButton
                title="Create Flat"
                textStyles="text-white"
                width="150px"
                loader={creating}
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
                tintColor={"#f7bc63"}
                resizeMode="contain"
              />
              <Text className="text-white font-ssemibold text-xl relative">
                {item.flat_number}
              </Text>
            </View>
            <View className="flex-row justify-bewteen items-center gap-2">
              <Image source={icons.rooms} tintColor={"#f7bc63"} />
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
                tintColor={"#f7bc63"}
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
                {item.owner_phone}
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
                  tintColor={"#f7bc63"}
                  resizeMode="contain"
                />
                <Text className="text-white font-ssemibold text-xl relative">
                  {item.flat_number}
                </Text>
              </View>
              <View className="flex-row items-center justify-center gap-2">
                <Image source={icons.rooms} tintColor={"#f7bc63"} />
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
                  {item.owner_phone}
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
