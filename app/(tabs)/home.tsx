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
import useAppwrite from "@/hooks/useAppwrite";
import { useGlobalContext } from "@/context/GlobalContext";
const home = () => {
  const { height } = useWindowDimensions();
  const { setStatusUpdate, statusUpdate } = useGlobalContext();
  const { getExpenseSlips, getMaintenancesSlips, getMonthlyStats } =
    useAppwrite();
  const [maintenanceSlips, setMaintenanceSlips] = useState<any>([]);
  const [expenseSlips, setExpenseSlips] = useState<any>([]);
  const [stats, setStats] = useState<StatsData | any>({
    total: 0,
    maintenancePaid: 0,
    expensesCleared: 0,
    openingAmount: 0,
    month: "",
  });
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = async () => {
    try {
      const response = await getMonthlyStats();
      if (response) {
        console.log(response, "response");
        setStats(response);
      } else {
        // Set default values if response is undefined
        setStats({
          total: 0,
          maintenancePaid: 0,
          expensesCleared: 0,
          openingAmount: 0,
          month: "",
        });
      }
      console.log("Hello");
    } catch (error: any) {
      Alert.alert("Error Occured", error.message);
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
      const response = await getExpenseSlips();

      setExpenseSlips(response);
    } catch (error) {
      Alert.alert("Error Occured", "Error Fetching Expense Slips");
    }
    console.log("Fetched Expense Slips");
  };
  const fetchMaintenanceSlips = async () => {
    try {
      const response = await getMaintenancesSlips();

      setMaintenanceSlips(response);
    } catch (error) {
      Alert.alert("Error Occured", "Error Fetching Maintenance Slips");
    }
    console.log("Fetched Maintenance Slips");
  };

  useEffect(() => {
    fetchExpenseSlips();
    fetchMaintenanceSlips();
    fetchStats();
  }, [statusUpdate]);

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
          <SummaryCard amount={stats.total} month={stats.month} />
        </View>

        <View className="flex flex-row justify-between gap-2 w-full p-6">
          <View className="flex-1">
            <ProgressSummary
              title={"Maintenance Received"}
              progress={stats.maintenancePaid}
            />
          </View>
          <View className="flex-1">
            <ProgressSummary
              title={"Expenses Cleared"}
              progress={stats.expensesCleared}
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
