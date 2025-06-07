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
  CustomButton,
} from "@/components";
import { ProgressSummary } from "@/components";
import { useWindowDimensions } from "react-native";
import { useGlobalContext } from "@/context/GlobalContext";
import { Redirect } from "expo-router";
import useAppwrite from "@/hooks/useAppwrite";
const home = () => {
  const { height } = useWindowDimensions();
  const { setStatusUpdate, statusUpdate } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);
  const { isLoggedIn, user } = useGlobalContext();
  const [maintenanceSlips, setMaintenanceSlips] = useState<any>([]);
  const { getExpenseSlips, getMaintenanceSlips, generateExpenseSlips, generateMaintenanceSlips, getStats } = useAppwrite();
  const [expenseSlips, setExpenseSlips] = useState<any>([]);
  const [buttonDisabled, setButtonDisabled] = useState([true, true]);
  const [stats, setStats] = useState<any | any>({
    expensePercentage: 0,
    maintenancePercentage: 0,
    totalMaintenanceReceived: 0
  });



  const month = new Date().toLocaleString("default", {
    month: "long",
  });
  const year = new Date().getFullYear();

  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = async () => {
    try {
      const response = await getStats();

      setStats(response);

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
      const response = await getExpenseSlips();
      setExpenseSlips(response);
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to fetch expense slips");
      console.error("Error fetching expense slips:", error.message);
    }
  };
  const fetchMaintenanceSlips = async () => {
    try {
      const response = await getMaintenanceSlips();
      setMaintenanceSlips(response);
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to fetch expense slips");
      console.error("Error fetching expense slips:", error);
    }
  };
  const handleMaintenanceSlipGeneration = async () => {
    try {
      setIsLoading(true);

      const response = await generateMaintenanceSlips();

      if (response) {
        Alert.alert("Success", "Maintenance slips generated successfully");
      }

      fetchMaintenanceSlips();
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to generate maintenance slips");
      console.error("Error generating maintenance slips:", error.message);
    } finally {
      setIsLoading(false);
      setStatusUpdate(!statusUpdate);
    }
  };
  const handleExpenseSlipGeneration = async () => {
    try {
      setIsLoading(true);

      const response = await generateExpenseSlips();

      if (response) {
        Alert.alert("Success", "Expense slips generated successfully");
      }


      fetchExpenseSlips();

    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to generate expense slips");
      console.error("Error generating expense slips:", error.message);
    } finally {
      setIsLoading(false);
      setStatusUpdate(!statusUpdate);
    }
  };

  const generationButtonDisabled = () => {
    const disableMaintenance = maintenanceSlips.length >= 11 ? false : true;
    const disableExpense = expenseSlips.length >= 3 ? false : true;

    setButtonDisabled([disableMaintenance, disableExpense]);
  };


  useEffect(() => {
    fetchStats();
    fetchExpenseSlips();
    fetchMaintenanceSlips();
    generationButtonDisabled();
  }, [statusUpdate]);

  useEffect(() => {
    generationButtonDisabled();
  }, [maintenanceSlips, expenseSlips]);


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
            amount={stats.totalMaintenanceReceived || 0}
            month={`${month} ${year}`}
          />
        </View>

        <View className="flex flex-row justify-between gap-2 w-full p-6">
          <View className="flex-1">
            <ProgressSummary
              title={"Maintenance Received"}
              progress={stats.maintenancePercentage}
            />
          </View>
          <View className="flex-1">
            <ProgressSummary
              title={"Expenses Cleared"}
              progress={stats.expensePercentage}
            />
          </View>
        </View>

        <View>
          <View className="flex justify-between flex-row p-6">
            <Text className="text-white text-3xl font-ssemibold">
              Maintenance
            </Text>
            <View>
              {buttonDisabled[0] && (
                <CustomButton
                  title="Generate"
                  textStyles="text-black"
                  handlePress={handleMaintenanceSlipGeneration}
                  containerStyles="bg-secondary-base"
                  loader={isLoading}
                  activityColor="black"
                  activeOpacity={0.8}
                />
              )}
            </View>
          </View>
          <MaintenanceList maintenanceSlips={maintenanceSlips} />
        </View>

        <View>
          <View className="flex justify-between flex-row p-6">
            <Text className="text-white text-3xl font-ssemibold">Expense</Text>
            <View>
              {buttonDisabled[1] && (
                <CustomButton
                  title="Generate"
                  textStyles="text-black"
                  handlePress={handleExpenseSlipGeneration}
                  containerStyles="bg-secondary-base"
                  loader={isLoading}
                  activityColor="black"
                  activeOpacity={0.8}
                />
              )}
            </View>
          </View>
          <ExpensesList expenseSlips={expenseSlips} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default home;
