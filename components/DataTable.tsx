import { View, Text } from "react-native";
import React, { useState } from "react";
import { DataTable as PaperDataTable } from "react-native-paper";



const DataTable: React.FC<any> = ({ data }) => {
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const {summary, total} = data


  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, summary.length);

  return (
    <View className="mt-10 bg-lessBlack rounded-2xl p-5">
      <Text className="text-white font-sbold text-4xl">Summary</Text>
      <PaperDataTable className="p-2 w-full mt-5">
        <PaperDataTable.Header className="gap-2">
          <PaperDataTable.Title textStyle={{ color: 'white' }}>Title</PaperDataTable.Title>
          <PaperDataTable.Title numeric textStyle={{ color: 'white' }}>Credit</PaperDataTable.Title>
          <PaperDataTable.Title numeric textStyle={{ color: 'white' }}>Debit</PaperDataTable.Title>
        </PaperDataTable.Header>

        {summary.length <= 0 && (
          <PaperDataTable.Row>
            <PaperDataTable.Cell textStyle={{ color: 'white' }}>No data available</PaperDataTable.Cell>
          </PaperDataTable.Row>
        )}

        {summary.map((item: any, index: number) => (
          <PaperDataTable.Row className="gap-2" key={index}>
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
          numberOfPages={Math.ceil(summary.length / itemsPerPage)}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1}-${to} of ${summary.length}`}
          showFastPaginationControls
          numberOfItemsPerPage={itemsPerPage}
          accessibilityLabel={"Rows per page"}
          
        />
      </PaperDataTable>

      <View className="flex justify-between mt-10">
        <Text className="text-white font-ssemibold text-2xl">
          TOTAL: {total} /-
        </Text>
      </View>
    </View>
  );
};

export default DataTable;
