import {
  View,
  ScrollView,
  FlatList,
  Image,
  Text,
  RefreshControl,
  Alert,
} from "react-native";
import react, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Header,
  SummaryCard,
  MaintenanceList,
  ExpensesList,
} from "@/components";
import { ProgressSummary } from "@/components";
import { useWindowDimensions } from "react-native";
import { StatsData } from "@/types";
import { useGlobalContext } from "@/context/GlobalContext";
import axios from "axios";
import { Redirect } from "expo-router";
const home = () => {
  const { height } = useWindowDimensions();
  const { setStatusUpdate, statusUpdate } = useGlobalContext();
  const { isLoggedIn, user } = useGlobalContext();
  const [maintenanceSlips, setMaintenanceSlips] = useState<any>([]);
  const [expenseSlips, setExpenseSlips] = useState<any>([]);
  const [stats, setStats] = useState<StatsData | any>({
    expenseSlipsPaid: {
      paidDocuments: 0,
      percentagePaid: 0,
      totalDocuments: 0,
    },
    maintenanceSlipsPaid: {
      _id: null,
      paid: 0,
      percentagePaid: 0,
      total: 0,
    },
  });

  const month = new Date().toLocaleString("default", {
    month: "long",
  });
  const year = new Date().getFullYear();

  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = async () => {
   console.log("Fetching stats...");
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchStats();
    await fetchExpenseSlips();
    await fetchMaintenanceSlips();
    setRefreshing(false);
  };

  const fetchExpenseSlips = async () => {
  console.log("Fetching expense slips...");
  };
  const fetchMaintenanceSlips = async () => {
    console.log("Fetching maintenance slips...");
  };

  useEffect(() => {
    fetchStats();
    fetchExpenseSlips();
    fetchMaintenanceSlips();
  }, [statusUpdate]);

  if(!isLoggedIn && !user) {
    return <Redirect href={"../"} />
  }

  return (
    <SafeAreaView className="bg-primary mb-10" style={{ height }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 100,
        }}
      >
        <View>
          <Header />
        </View>
        <View>
          <SummaryCard amount={stats.maintenanceSlipsPaid.paid} month={`${month} ${year}`} />
        </View>

        <View className="flex flex-row justify-between gap-2 w-full p-6">
          <View className="flex-1">
            <ProgressSummary
              title={"Maintenance Received"}
              progress={stats.maintenanceSlipsPaid.percentagePaid}
            />
          </View>
          <View className="flex-1">
            <ProgressSummary
              title={"Expenses Cleared"}
              progress={stats.expenseSlipsPaid.percentagePaid}
            />
          </View>
        </View>

        <View>
          <View className="flex justify-center p-6">
            <Text className="text-white text-3xl font-ssemibold">
              Maintenance
            </Text>
          </View>
          <MaintenanceList maintenanceSlips={maintenanceSlips} />
        </View>

        <View>
          <View className="flex justify-center p-6">
            <Text className="text-white text-3xl font-ssemibold">Expenses</Text>
          </View>
          <ExpensesList expenseSlips={expenseSlips} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default home;
