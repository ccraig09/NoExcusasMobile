import * as React from "react";
import { DataTable } from "react-native-paper";
import styled from "styled-components";
import { Dimensions } from "react-native";

let screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const UpdateDT = (props) => {
  return (
    <DataContainer>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>{props.title1}</DataTable.Title>
          <DataTable.Title>{props.title2}</DataTable.Title>
          <DataTable.Title numeric>{props.metaTitle}</DataTable.Title>
        </DataTable.Header>
        <DataTable.Row>
          <DataTable.Cell>{props.update}</DataTable.Cell>
          <DataTable.Cell>{props.difference}</DataTable.Cell>
          <DataTable.Cell numeric>{props.Meta}</DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    </DataContainer>
  );
};

export default UpdateDT;

const DataContainer = styled.View`
  background: #ffc733;
  height: 65px;
  width: 150px;
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
  justify-content: center;
  padding-bottom: 3px;
  padding-top: 5px;
  align-self: center;
  /* padding: 15px; */
`;
