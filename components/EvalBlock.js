import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import styled from "styled-components";

const { navigate } = this.props.navigation;

export const EvalBlock = () => {
  return (
    <ScrollView
      style={{
        flexDirection: "row",
        padding: 20,
        paddingLeft: 12,
        paddingTop: 30,
        marginTop: 40,
      }}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    >
      {/* {evals.map((evalinfo, index) => ( */}
      {/* key={index} text={evalinfo.text}  */}
      <ItemContainer>
        <TouchableOpacity onPress={() => navigate("Eval1")}>
          <Item>
            <Text>Eval 1</Text>
          </Item>
        </TouchableOpacity>

        <Item>
          <Text>Eval 2</Text>
        </Item>
        <Item>
          <Text>Eval 3</Text>
        </Item>
        <Item>
          <Text>Eval 4</Text>
        </Item>
        <Item>
          <Text>Eval 5</Text>
        </Item>
        <Item>
          <Text>Eval 6</Text>
        </Item>
      </ItemContainer>
    </ScrollView>
  );
};

export default EvalBlock;

const ItemContainer = styled.View`
  flex-direction: row;
`;
const Item = styled.View`
  background: #ffc733;
  height: 60px;
  width: 90px;
  padding: 12px 16px 12px;
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
  align-items: center;
  justify-content: center;
  margin: 0 8px;
`;
const Text = styled.Text`
  font-size: 15px;
  font-weight: 400;
  position: absolute;
  align-items: center;
  justify-content: center;
`;
