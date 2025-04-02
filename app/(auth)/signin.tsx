import { Alert, Image, ScrollView, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { CustomButton, FormField } from "@/components";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Redirect, router } from "expo-router";
import { useGlobalContext } from "@/context/GlobalContext";
import useAppwrite from "@/hooks/useAppwrite";

const Signin = () => {
  const { isLoggedIn, isLoading, setIsLoggedIn, setUser } = useGlobalContext();
  const { loginUser, getCurrentUser } = useAppwrite();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  
  const handleLogin = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }
    
    setLoading(true);
    try {
      await loginUser(form.email, form.password);
      
      // After successful login, get the current user details
      const currentUser = await getCurrentUser();
      
      if (!currentUser) {
        throw new Error("Could not retrieve user information");
      }
      
      setIsLoggedIn(true);
      setUser(currentUser);
      
      Alert.alert("Success", "Signed in successfully");
      router.replace("../(tabs)/home");
      
    } catch (error: any) {
      Alert.alert(
        "Login Failed", 
        error.message || "An error occurred during login. Please check your credentials and try again."
      );
    } finally {
      setLoading(false);
    }
  };
  
  // If already logged in, redirect to home
  if (!isLoading && isLoggedIn) {
    return <Redirect href={"../(tabs)/home"} />
  }

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
