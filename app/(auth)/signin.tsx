import { Alert, ScrollView, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { CustomButton, FormField } from "@/components";
import { SafeAreaView } from "react-native-safe-area-context";

const Signin = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    if(!form.email || !form.password) {
      Alert.alert("Error", "Please fill in all fields");
      return
    };
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);

    // TODO: Make Req to the server to login

    setForm({
      email: "",
      password: "",
    })

  };

  return (
    <SafeAreaView className="h-full bg-[#d6ddd6]">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className=" p-3 flex flex-col justify-center gap-0 h-full">
          <View>
            <Text className="text-3xl font-sbold">Log into account</Text>
            <Text className="font-sregular text-yellowishgreen-300">
              Log in to get access to each and every aspect of Shopping Center
            </Text>
          </View>
          <View>
            <View>
              <FormField
                title="Email"
                keypad="email-address"
                value={form.email}
                handleChange={(e) =>
                  setForm({ ...form, email: e })
                }
              />
            </View>
            <View>
              <FormField
                title="Password"
                keypad="default"
                value={form.password}
                handleChange={(e) =>
                  setForm({ ...form, password: e })
                }
              />
            </View>
            <CustomButton
              title="Login"
              containerStyles="mt-10 w-full bg-yellowishgreen-200"
              textStyles="text-black"
              handlePress={handleLogin}
              loader={loading}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signin;
