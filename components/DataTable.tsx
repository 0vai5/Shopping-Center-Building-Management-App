import { View, Text } from "react-native";
import React, { useState } from "react";
import { DataTable as PaperDataTable } from "react-native-paper";

interface TransactionItem {
  id: string;
  title: string;
  credit: number;
  debit: number;
}

interface DataTableProps {
  data: TransactionItem[];
  openingBalance?: number;
}

const DataTable: React.FC<DataTableProps> = ({ data, openingBalance = 0 }) => {
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(7);

  const debitedAmount = data.reduce(
    (total: number, item: TransactionItem) => total + (item.debit || 0),
    0
  );
  const creditedAmount = data.reduce(
    (total: number, item: TransactionItem) => total + (item.credit || 0),
    0
  );

  const totalAmount = openingBalance + creditedAmount - debitedAmount;

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, data.length);

  return (
    <View className="mt-10 bg-lessBlack rounded-2xl p-5">
      <Text className="text-white font-sbold text-4xl">Summary</Text>
      <PaperDataTable className="p-2 w-full mt-5">
        <PaperDataTable.Header className="gap-2">
          <PaperDataTable.Title textStyle={{ color: 'white' }}>Title</PaperDataTable.Title>
          <PaperDataTable.Title numeric textStyle={{ color: 'white' }}>Credit</PaperDataTable.Title>
          <PaperDataTable.Title numeric textStyle={{ color: 'white' }}>Debit</PaperDataTable.Title>
        </PaperDataTable.Header>

        {data.length === 0 && (
          <PaperDataTable.Row>
            <PaperDataTable.Cell textStyle={{ color: 'white' }}>No data available</PaperDataTable.Cell>
          </PaperDataTable.Row>
        )}

        {/* Show opening balance as first row if provided */}
        {openingBalance > 0 && (
          <PaperDataTable.Row className="gap-2" key="opening-balance">
            <PaperDataTable.Cell textStyle={{ color: 'white', fontWeight: 'bold' }}>
              Opening Balance
            </PaperDataTable.Cell>
            <PaperDataTable.Cell numeric textStyle={{ color: 'white', fontWeight: 'bold' }}>
              {openingBalance}
            </PaperDataTable.Cell>
            <PaperDataTable.Cell numeric textStyle={{ color: 'white' }}>-</PaperDataTable.Cell>
          </PaperDataTable.Row>
        )}

        {data.slice(from, to).map((item: TransactionItem) => (
          <PaperDataTable.Row className="gap-2" key={item.id}>
            <PaperDataTable.Cell textStyle={{ color: 'white' }}>{item.title}</PaperDataTable.Cell>
            <PaperDataTable.Cell numeric textStyle={{ color: 'white' }}>
              {item.credit || "-"}
            </PaperDataTable.Cell>
            <PaperDataTable.Cell numeric textStyle={{ color: 'white' }}>
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
