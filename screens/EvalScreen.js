import React from "react";
import {
  StatusBar,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Platform,
  StyleSheet,
  View,
  Text,
} from "react-native";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
// import { connect } from "react-redux";
// import { AsyncStorage } from "react-native";
// import AvatarProfile from "../components/AvatarProfile";
// import ModalLogin from "../components/ModalLogin";
// import Evals from "../components/Evals";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
} from "react-native-chart-kit";
import { DataTable } from "react-native-paper";

let screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
StatusBar.setHidden(true);

function mapStateToProps(state) {
  return { action: state.action, name: state.name };
}

class Eval1Screen extends React.Component {
  static navigationOptions = {
    // title: "Eval1Screen",
    headerShown: false,
  };

  render() {
    return (
      <RootView>
        <Container>
          <ScrollView>
            <View style={styles.titleBar}>
              <Text style={styles.evalTitle}>Eval "#"</Text>
              <Text>"Date Picker"</Text>
            </View>
            <Subtitle>Progress Chart</Subtitle>
            <ProgressChart
              data={{
                data: [0.9, 0.6, 0.8, 0.6, 0.6, 0.8],
              }}
              width={screenWidth}
              height={285}
              chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffc733",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              style={{
                alignSelf: "center",
                borderRadius: 26,
                marginLeft: 20,
                marginRight: 10,
              }}
            />
            <Subtitle>Resultados</Subtitle>
            <Content>
              <DataContainer>
                <DataTable>
                  <DataTable.Header>
                    <DataTable.Title>Composition</DataTable.Title>
                    <DataTable.Title numeric>Current</DataTable.Title>
                    <DataTable.Title numeric>Goal</DataTable.Title>
                  </DataTable.Header>
                  <DataTable.Row>
                    <DataTable.Cell>BMI</DataTable.Cell>
                    <DataTable.Cell numeric>7.8</DataTable.Cell>
                    <DataTable.Cell numeric>6.0</DataTable.Cell>
                  </DataTable.Row>

                  <DataTable.Row>
                    <DataTable.Cell>Fat</DataTable.Cell>
                    <DataTable.Cell numeric>25</DataTable.Cell>
                    <DataTable.Cell numeric>32</DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell>Muscle</DataTable.Cell>
                    <DataTable.Cell numeric>7.8</DataTable.Cell>
                    <DataTable.Cell numeric>6.0</DataTable.Cell>
                  </DataTable.Row>

                  <DataTable.Row>
                    <DataTable.Cell>KCAL</DataTable.Cell>
                    <DataTable.Cell numeric>25</DataTable.Cell>
                    <DataTable.Cell numeric>32</DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell>Metabolical Age</DataTable.Cell>
                    <DataTable.Cell numeric>7.8</DataTable.Cell>
                    <DataTable.Cell numeric>6.0</DataTable.Cell>
                  </DataTable.Row>

                  <DataTable.Row>
                    <DataTable.Cell>Viceral Fat</DataTable.Cell>
                    <DataTable.Cell numeric>25</DataTable.Cell>
                    <DataTable.Cell numeric>32</DataTable.Cell>
                  </DataTable.Row>
                </DataTable>
              </DataContainer>
            </Content>
          </ScrollView>
        </Container>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.goBack();
          }}
          style={{ position: "absolute", top: 20, right: 20 }}
        >
          <CloseView>
            <Ionicons
              name="ios-close"
              size={36}
              color="#4775f2"
              style={{ marginTop: -2 }}
            />
          </CloseView>
        </TouchableOpacity>
      </RootView>
    );
  }
}

export default Eval1Screen;

const styles = StyleSheet.create({
  evalTitle: {
    color: "black",
    fontWeight: "600",
    fontSize: 25,
    marginLeft: 20,
    marginTop: 55,
    marginBottom: 20,
    textTransform: "uppercase",
  },
  titleBar: {
    flexDirection: "row",
    width: "100%",
    marginTop: 50,
    justifyContent: "space-between",
    alignItems: "center",
  },
});

const RootView = styled.View`
  background: black;
  /* margin-top: 80px; */
  flex: 1;
`;
const Container = styled.View`
  flex: 1;
  background-color: #f0f3f5;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const Subtitle = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 25px;
  margin-left: 20px;
  margin-top: 55px;
  margin-bottom: 20px;
  text-transform: uppercase;
`;

const Content = styled.View`
  height: ${screenHeight}px;
  width: ${screenWidth}px;
  background: #f0f3f5;
  margin: -15px;
  padding: 50px;
`;
const DataContainer = styled.View`
  background: #fcc454;
  height: 375px;
  width: 350px;
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
  justify-content: center;
  align-self: center;
  padding: 15px;
`;

const CloseView = styled.View`
  width: 32px;
  height: 32px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  justify-content: center;
  align-items: center;
`;
