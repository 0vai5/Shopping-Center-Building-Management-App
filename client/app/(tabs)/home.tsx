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
import { Redirect } from "expo-router";
const home = () => {
  const { height } = useWindowDimensions();
  const { setStatusUpdate, statusUpdate } = useGlobalContext();
  const { isLoggedIn, user } = useGlobalContext();
  const [maintenanceSlips, setMaintenanceSlips] = useState<any>([]);
  const [expenseSlips, setExpenseSlips] = useState<any>([]);
  const [stats, setStats] = useState<StatsData | any>({
    expenseSlipsPaid: {
      total: 0,
      percentagePaid: 0,
      paid: 0,
      amountPaid: 0,
    },
    maintenanceSlipsPaid: {
      _id: null,
      totalDocuements: 0,
      percentagePaid: 0,
      paidDocuments: 0,
    },
  });

  const month = new Date().toLocaleString("default", {
    month: "long",
  });
  const year = new Date().getFullYear();

  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = async () => {
    try {
      console.log("Fetching stats...");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to fetch stats");
      console.error("Error fetching stats:", error.message);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchStats();
    await fetchExpenseSlips();
    await fetchMaintenanceSlips();
    setRefreshing(false);
  };

  const fetchExpenseSlips = async () => {
    try {
      console.log("Fetching expense slips...");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to fetch expense slips");
      console.error("Error fetching expense slips:", error.message);
    }
  };
  const fetchMaintenanceSlips = async () => {
    try {
      console.log("Fetching maintenance slips...");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to fetch expense slips");
      console.error("Error fetching expense slips:", error);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchExpenseSlips();
    fetchMaintenanceSlips();
  }, [statusUpdate]);

  if (!isLoggedIn && !user) {
    return <Redirect href={"../"} />;
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
          <SummaryCard
            amount={stats.maintenanceSlipsPaid.amountPaid || 0}
            month={`${month} ${year}`}
          />
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
