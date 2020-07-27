import * as React from "react";
import { DataTable } from "react-native-paper";
import styled from "styled-components";
import { Dimensions } from "react-native";

let screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const BaseEvalDT = (props) => {
  return (
    <DataContainer>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title numeric>Ahora</DataTable.Title>
          <DataTable.Title numeric>{props.metaTitle}</DataTable.Title>
        </DataTable.Header>
        <DataTable.Row>
          <DataTable.Cell numeric>{props.current}</DataTable.Cell>
          <DataTable.Cell numeric>{props.Meta}</DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    </DataContainer>
  );
};

export default BaseEvalDT;

const DataContainer = styled.View`
  background: #dfdbdb;
  height: 80px;
  width: 150px;
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
  justify-content: center;
  align-self: center;
  /* padding: 15px; */
`;
