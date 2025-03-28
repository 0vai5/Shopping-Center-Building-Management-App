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
const home = () => {
  const { height } = useWindowDimensions();
  const { getExpenseSlips, getMaintenancesSlips, getMonthlyStats } =
    useAppwrite();
  const [maintenanceSlips, setMaintenanceSlips] = useState<any>([]);
  const [expenseSlips, setExpenseSlips] = useState<any>([]);
  const [stats, setStats] = useState<StatsData>({
    amount: 0,
    maintenanceReceived: 0,
    expensesCleared: 0,
  });
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = async () => {
    console.log("statsFetched");
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
  };
  const fetchMaintenanceSlips = async () => {
    try {
      const response = await getMaintenancesSlips();

      setMaintenanceSlips(response);
    } catch (error) {
      Alert.alert("Error Occured", "Error Fetching Maintenance Slips");
    }
  };

  useEffect(() => {
    fetchStats();
    fetchExpenseSlips();
    fetchMaintenanceSlips();
  }, []);

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
          <SummaryCard amount={stats.amount} />
        </View>

        <View className="flex flex-row justify-between gap-2 w-full p-6">
          <View className="flex-1">
            <ProgressSummary
              title={"Maintenance Received"}
              progress={stats.maintenanceReceived}
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
