import React from "react";
import { Tabs } from "expo-router";
import { Image, ImageSourcePropType, Text, View } from "react-native";
import { icons } from "@/constants";

const TabIcon = ({
  color,
  title,
  focused,
  icon,
}: {
  color: string;
  title: string;
  focused: boolean;
  icon: ImageSourcePropType;
}) => {
  return (
    <View className="flex items-center justify-center">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className={`${focused && "transition-all transform " } w-6 h-6`}
      />
      {/* <Text
        className={`${focused ? "font-ssemibold" : "font-sregular"} text-sm`}
        style={{ color: color }}
      >
        {title}
      </Text> */}
    </View>
  );
};

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#4583FF",
        tabBarInactiveTintColor: "#FDFDFE",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#161616",
          borderTopColor: "#161616",
          borderTopWidth: 0,
          height: 90,
          paddingTop: 12,
        },
        tabBarVariant: "uikit"
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              color={color}
              title="Home"
              focused={focused}
              icon={icons.dashboard}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="flats"
        options={{
          title: "Flats",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              color={color}
              title="Flats"
              focused={focused}
              icon={icons.flats}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="summary"
        options={{
          title: "Summary",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              color={color}
              title="Summary"
              focused={focused}
              icon={icons.summary}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="expenses"
        options={{
          title: "Expenses",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              color={color}
              title="Expenses"
              focused={focused}
              icon={icons.expenses}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
