import { View, Text, FlatList } from "react-native";
import React from "react";
import ExpenseCardHome from "./ExpenseCardHome";

const MaintenanceList = () => {

    // TODO: We will implement the expenses that are optional with a particular selection that for this month we map all here when it will be generated


  const expenseSlip = [
    {
      expense_id: "1",
      expense: "WaterBoy",
      salary: 3000,
      status: "pending",
      name: "Malik Zaada",
    },
    {
      expense_id: "2",
      expense: "Sweeper",
      salary: 2200,
      status: "pending",
      name: "Abdullah",
    },
    {
      expense_id: "3",
      expense: "Electricity Bill",
      salary: 5000,
      status: "pending",
      name: "K.Electric",
    },
  ];

  return (
    <View className="flex justify-center items-center">
      <FlatList
        className="p-6 mr-3 gap-3"
        data={expenseSlip}
        numColumns={1}
        renderItem={(expense) => (
          <ExpenseCardHome
            expense={expense.item.expense}
            salary={expense.item.salary}
            status={expense.item.status}
            name={expense.item.name}
            expense_id={expense.item.expense_id}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(expense) => expense.expense_id.toString()}
      />
    </View>
  );
};

export default MaintenanceList;
