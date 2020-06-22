import React from "react";
import {
  StatusBar,
  Dimensions,
  ScrollView,
  Platform,
  View,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
  Image,
  TouchableOpacity,
  Text,
  // Text,
} from "react-native";

import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { AsyncStorage } from "react-native";
// import AvatarProfile from "../components/AvatarProfile";
import { ProgressChart } from "react-native-chart-kit";
import { DataTable } from "react-native-paper";
import Colors from "../constants/Colors";
// import { TouchableOpacity } from "react-native-gesture-handler";
// import { addItem, getItems, getBCG } from "../components/Firebase";
// import { ListItem, Divider } from "react-native-elements";
// import { EvalBlock } from "../components/EvalBlock";

let screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
StatusBar.setHidden(true);

const ProfileScreen = (props) => {
  return (
    <RootView>
      <Container>
        <ScrollView>
          <Header>
            {/* {this.state.Bcg2 ? (
                    <Background source={{ uri: this.state.Bcg2 }} />
                  ) : null} */}
            <Background source={require("../assets/background-grass.jpg")} />
            {/* <Name>{this.props.name}</Name> */}
          </Header>
          <AvatarView>{/* <AvatarProfile /> */}</AvatarView>
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
              <TouchableOpacity
                onPress={() => props.navigation.navigate("Eval1")}
              >
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
          <Subtitle>{"User Info".toUpperCase()}</Subtitle>

          <UserContainer>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title numeric>Age</DataTable.Title>
                <DataTable.Title numeric>Height</DataTable.Title>
                <DataTable.Title numeric>Weight</DataTable.Title>
              </DataTable.Header>
              <DataTable.Row>
                {/* <DataTable.Cell numeric>{this.state.Age}</DataTable.Cell> */}
                <DataTable.Cell numeric>29</DataTable.Cell>
                <DataTable.Cell numeric>192</DataTable.Cell>
                <DataTable.Cell numeric>89</DataTable.Cell>
              </DataTable.Row>
            </DataTable>
          </UserContainer>

          {/* <TextInput
            style={styles.input}
            placeholder="Add Item"
            // value={this.state.currentItem}
            // onChangeText={(text) =>
            //   this.setState((prevState) => ({
            //     currentItem: (prevState.currentItem = text),
            //   }))
            // }
          /> */}
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>

          {/* <FlatList
                  data={this.state.itemList}
                  ItemSeparatorComponent={() => (
                    <Divider style={{ backgroundColor: "black" }} />
                  )}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => {
                    console.log(item);
                    return <ListItem title={item.age} onPress={() => {}} />;
                  }}
                /> */}

          {/* <View>
            {this.state.Bcg ? (
              <Image source={{ uri: this.state.Bcg }} style={styles.image} />
            ) : null}
          </View> */}

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

          <Subtitle>{"Base Results".toUpperCase()}</Subtitle>
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
    </RootView>
  );
};

ProfileScreen.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    paddingLeft: 16,
    fontSize: 16,
  },
  button: {
    margin: 10,
    width: 90,
    height: 50,
    backgroundColor: Colors.noExprimary,
    borderRadius: 10,
    elevation: 5,
    alignSelf: "center",
    justifyContent: "center",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  image: {
    width: 200,
    height: 200,
  },
});

const RootView = styled.View`
  background: black;
  flex: 1;
`;
const Container = styled.View`
  flex: 1;
  background-color: #f0f3f5;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const ItemContainer = styled.View`
  flex-direction: row;
`;

const DataContainer = styled.View`
  background: #dfdbdb;
  height: 375px;
  width: 350px;
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
  justify-content: center;
  align-self: center;
  padding: 15px;
`;
const UserContainer = styled.View`
  background: #dfdbdb;
  height: 95px;
  width: 270px;
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
  justify-content: center;
  align-self: center;
  padding: 10px;
  padding-right: 50px;
  margin-top: 15px;
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

const Header = styled.View`
  height: 200px;
  background: #3c4560;
`;
const Name = styled.Text`
  font-size: 30px;
  color: white;
  font-weight: bold;
  margin-top: 75px;

  align-self: center;
  position: absolute;
`;

// const Text = styled.Text`
//   font-size: 15px;
//   font-weight: 400;
//   position: absolute;
//   align-items: center;
//   justify-content: center;
// `;

const Background = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  width: ${screenWidth}px;
  height: 200px;
`;
const AvatarView = styled.View`
  width: 150px;
  height: 150px;
  border-radius: 75px;
  position: absolute;
  top: 120px;
  left: 38%;
  margin-left: -22px;
  z-index: 1;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
`;
const Subtitle = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 25px;
  margin-left: 20px;
  margin-top: 20px;
  text-transform: uppercase;
`;

const Content = styled.View`
  height: ${screenHeight}px;
  width: ${screenWidth}px;
  background: #f0f3f5;
  padding: 20px;
`;
export default ProfileScreen;
