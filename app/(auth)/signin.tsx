import { Alert, Image, ScrollView, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { CustomButton, FormField } from "@/components";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Redirect, router } from "expo-router";
import { useGlobalContext } from "@/context/GlobalContext";

const Signin = () => {
   const { isLoading, isLoggedIn } = useGlobalContext();
  
    
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);


    router.navigate("../(tabs)/home");

    setForm({
      email: "",
      password: "",
    });
  };

  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      router.push("../(tabs)/home");
    }
  }, [isLoading, isLoggedIn]);

  return (
    <>
      <SafeAreaView className="h-full bg-[#1C1C1E]">
        <ScrollView contentContainerStyle={{ height: "100%" }}>
          <View className=" p-3 flex flex-col justify-center gap-0 h-full">
            <View>
              <Text className="text-3xl font-sbold text-white">
                Log into account
              </Text>
              <Text className="font-sregular text-secondary-saturated mt-2">
                Log in to get access to each and every aspect of Shopping Center
              </Text>
            </View>
            <View>
              <View>
                <FormField
                  title="Email"
                  keypad="email-address"
                  value={form.email}
                  handleChange={(e) => setForm({ ...form, email: e })}
                />
              </View>
              <View>
                <FormField
                  title="Password"
                  keypad="default"
                  value={form.password}
                  handleChange={(e) => setForm({ ...form, password: e })}
                />
              </View>
              <CustomButton
                title="Login"
                containerStyles="mt-10 bg-secondary-base py-3 rounded-md"
                width="100%"
                textStyles="text-black font-ssemibold text-base"
                handlePress={handleLogin}
                loader={loading}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Signin;
