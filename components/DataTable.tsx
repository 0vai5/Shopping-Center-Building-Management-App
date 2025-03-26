import { View, Text } from "react-native";
import React, { useState } from "react";
import { DataTable as PaperDataTable } from "react-native-paper";

// TODO: Fix the types

interface DataTableProps {
  data: any;
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(7);

  const debitedAmount = data.reduce(
    (total: number, item: any) => total + item.debit,
    0
  );
  const creditedAmount = data.reduce(
    (total: number, item: any) => total + item.credit,
    0
  );

  const totalAmount = creditedAmount - debitedAmount;

  // TODO: Fix the types and also add the total opening balance

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, data.length);

  return (
    <View className="mt-10">
      <Text className="text-white font-sbold text-4xl">Summary</Text>
      <PaperDataTable className="p-2 w-full mt-5">
        <PaperDataTable.Header className="gap-2">
          <PaperDataTable.Title>Title</PaperDataTable.Title>
          <PaperDataTable.Title numeric>Credit</PaperDataTable.Title>
          <PaperDataTable.Title numeric>Debit</PaperDataTable.Title>
        </PaperDataTable.Header>

        {data.length === 0 && (
          <PaperDataTable.Row>
            <PaperDataTable.Cell>No data available</PaperDataTable.Cell>
          </PaperDataTable.Row>
        )}

        {data.slice(from, to).map((item: any) => (
          <PaperDataTable.Row className="gap-2" key={item.id}>
            <PaperDataTable.Cell>{item.title}</PaperDataTable.Cell>
            <PaperDataTable.Cell numeric>
              {item.credit || "-"}
            </PaperDataTable.Cell>
            <PaperDataTable.Cell numeric>
              {item.debit || "-"}
            </PaperDataTable.Cell>
          </PaperDataTable.Row>
        ))}

        <PaperDataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(data.length / itemsPerPage)}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1}-${to} of ${data.length}`}
          showFastPaginationControls
          numberOfItemsPerPage={itemsPerPage}
          accessibilityLabel={"Rows per page"}
        />
      </PaperDataTable>

      <View className="flex justify-between mt-10">
        <Text className="text-white font-ssemibold text-2xl">
          TOTAL: {totalAmount} /-
        </Text>
      </View>
    </View>
  );
};

export default DataTable;
