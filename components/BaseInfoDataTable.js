import * as React from "react";
import { DataTable } from "react-native-paper";
import styled from "styled-components";

const BaseInfoDT = (props) => {
  return (
    <UserContainer>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title numeric>Edad</DataTable.Title>
          <DataTable.Title numeric>Altura</DataTable.Title>
          <DataTable.Title numeric>Peso</DataTable.Title>
          <DataTable.Title numeric>Género</DataTable.Title>
        </DataTable.Header>
        <DataTable.Row>
          <DataTable.Cell numeric>{props.age}</DataTable.Cell>
          <DataTable.Cell numeric>{props.height}</DataTable.Cell>
          <DataTable.Cell numeric>{props.weight}</DataTable.Cell>
          <DataTable.Cell numeric>{props.gender}</DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    </UserContainer>
  );
};

export default BaseInfoDT;

const UserContainer = styled.View`
  background: #dfdbdb;
  height: 95px;
  width: 360px;
  margin-right: 10px;
  margin-left: 10px;
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
  justify-content: center;
  align-self: center;
  padding: 10px;
  padding-right: 50px;
  margin-top: 15px;
`;
