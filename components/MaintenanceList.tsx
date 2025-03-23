import { View, Text, FlatList } from "react-native";
import React from "react";
import MaintenanceCard from "./MaintenanceCard";

const MaintenanceList = () => {
  const maintenanceSlip = [
    {
      flat_id: 1,
      flat_number: "SF-1",
      rooms: 2,
      maintenance: 300,
      owner_no: "03001234567",
      owner_name: "Ali",
      slip_no: "123456",
      status: "pending",
    },
    {
      flat_id: 2,
      flat_number: "SF-2",
      rooms: 2,
      maintenance: 300,
      owner_no: "03001234799",
      owner_name: "Ahmed",
      slip_no: "789101",
      status: "pending",
    },
    {
      flat_id: 3,
      flat_number: "SF-3",
      rooms: 2,
      maintenance: 300,
      owner_no: "03001234567",
      owner_name: "Amjad Bawa",
      slip_no: "123456",
      status: "paid",
    },
    {
      flat_id: 4,
      flat_number: "SF-4",
      rooms: 3,
      maintenance: 300,
      owner_no: "03001234567",
      owner_name: "Munaf Bakali",
      slip_no: "123456",
      status: "paid",
    },
    {
      flat_id: 5,
      flat_number: "SF-5",
      rooms: 2,
      maintenance: 300,
      owner_no: "03001234567",
      owner_name: "Rashida",
      slip_no: "123456",
      status: "pending",
    },
    {
      flat_id: 6,
      flat_number: "SF-6",
      rooms: 2,
      maintenance: 300,
      owner_no: "03001234567",
      owner_name: "xyz",
      slip_no: "123456",
      status: "pending",
    },
  ];

  return (
    <View className="flex justify-center items-center">
      <FlatList
        className="p-6 mr-3 gap-3"
        data={maintenanceSlip}
        numColumns={1}
        renderItem={(slip) => (
          <MaintenanceCard
            flat_id={slip.item.flat_id}
            flat_number={slip.item.flat_number}
            rooms={slip.item.rooms}
            maintenance={slip.item.maintenance}
            owner_no={slip.item.owner_no}
            owner_name={slip.item.owner_name}
            slip_no={slip.item.slip_no}
            status={slip.item.status}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(slip) => slip.flat_id.toString()}
      />
    </View>
  );
};

export default MaintenanceList;
