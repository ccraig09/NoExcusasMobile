import React, { useState, useCallback, useReducer, useEffect } from "react";
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
  ActivityIndicator,
  Image,
  Modal,
  TouchableOpacity,
  Text,
  Alert,
  // Text,
} from "react-native";

import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import Input from "../components/UI/Input";
import HeaderButton from "../components/UI/HeaderButton";

import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { AsyncStorage } from "react-native";
// import AvatarProfile from "../components/AvatarProfile";
import { ProgressChart } from "react-native-chart-kit";
import { DataTable } from "react-native-paper";
import Colors from "../constants/Colors";
import * as detailsActions from "../store/actions/membersDetails";
// import { TouchableOpacity } from "react-native-gesture-handler";
// import { addItem, getItems, getBCG } from "../components/Firebase";
// import { ListItem, Divider } from "react-native-elements";
// import { EvalBlock } from "../components/EvalBlock";

let screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
StatusBar.setHidden(true);

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === "FORM_INPUT_UPDATE") {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const ProfileScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const [modalVisible, setModalVisible] = useState(false);

  const editMember = useSelector((state) => state.memberdeets.details);
  // const [fName, setFName] = useState(editMember.fName);
  // const [lName, setlName] = useState(editMember.lName);

  const dispatch = useDispatch();
  // const sendMemberDetailsHandler = async () => {
  //   setIsLoading(true);
  //   await dispatch(detailsActions.addMemberDetails(cartItems, cartTotalAmount));
  //   setIsLoading(false);
  // };
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      fName: "",
      lName: "",
      // imageUrl: editMember ? editMember.imageUrl : "",
      // description: editMember ? editMember.description : "",
      // price: "",
    },
    inputValidities: {
      fName: false,
      lName: false,
      // imageUrl: editMember ? true : false,
      // description: editMember ? true : false,
      // price: editMember ? true : false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert("An error occured!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong input!", "Please check the errors in the form.", [
        { text: "Okay" },
      ]);
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      if (editMember) {
        await dispatch(
          detailsActions.addMemberDetails(
            formState.inputValues.fName,
            formState.inputValues.lName
          )
        );
      }
      // } else {
      //   await dispatch(
      //     detailsActions.addMemberDetails(formState.inputValues.fName)
      //   );
      // }
      // props.navigation.goBack();
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
    setModalVisible(!modalVisible);
  }, [dispatch, formState]);

  // useEffect(() => {
  //   props.navigation.setParams({ submit: submitHandler });
  // }, [submitHandler]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  // const updateDetailsHandler = useCallback(async () => {
  //   // if (!formState.formIsValid) {
  //   //   Alert.alert("Wrong input!", "Please check the errors in the form.", [
  //   //     { text: "Okay" },
  //   //   ]);
  //   //   return;
  //   // }
  //   // setError(null);
  //   // setIsLoading(true);
  //   try {
  //     await dispatch(detailsActions.addMemberDetails(fName, lName));
  //     // await dispatch(detailsActions.addMemberDetails(lName));
  //   } catch (err) {
  //     setError(err.message);
  //   }
  //   // setIsLoading(false);
  //   setModalVisible(!modalVisible);
  //   // console.log(fName);
  // }, [dispatch, fName, lName]);

  const age = "carl";
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.noExprimary} />
      </View>
    );
  }
  return (
    <RootView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>edit info!</Text>
            <ScrollView>
              <View style={styles.form}>
                <Input
                  id="fName"
                  label="Nombre"
                  errorText="Entra un nombre valido por favor!"
                  keyboardType="default"
                  autoCapitalize="sentences"
                  autoCorrect
                  returnKeyType="next"
                  onInputChange={inputChangeHandler}
                  initialValue={""}
                  initiallyValid={!!editMember}
                  required
                />
                <Input
                  id="lName"
                  label="Apellido"
                  errorText="Entra un apellido valido por favor!"
                  keyboardType="default"
                  autoCapitalize="sentences"
                  autoCorrect
                  returnKeyType="next"
                  onInputChange={inputChangeHandler}
                  initialValue={""}
                  initiallyValid={!!editMember}
                  required
                />
                {/* <TextInput
                  style={styles.input}
                  value={lName}
                  onChangeText={(text) => setlName(text)}
                /> */}
                {/* <Input
                  id="fName"
                  label="Nombre"
                  errorText="Entra un nombre valido por favor!"
                  keyboardType="default"
                  autoCapitalize="sentences"
                  autoCorrect
                  returnKeyType="next"
                  onInputChange={inputChangeHandler}
                  initialValue={""}
                  // initiallyValid={!!editMember}
                  required
                /> */}
                {/* <Input
                  id="imageUrl"
                  label="Image Url"
                  errorText="Please enter a valid image url!"
                  keyboardType="default"
                  returnKeyType="next"
                  onInputChange={inputChangeHandler}
                  initialValue={editMember ? editMember.imageUrl : ""}
                  initiallyValid={!!editMember}
                  required
                />
                {editMember ? null : (
                  <Input
                    id="price"
                    label="Price"
                    errorText="Please enter a valid price!"
                    keyboardType="decimal-pad"
                    returnKeyType="next"
                    onInputChange={inputChangeHandler}
                    required
                    min={0.1}
                  />
                )}
                <Input
                  id="description"
                  label="Description"
                  errorText="Please enter a valid description!"
                  keyboardType="default"
                  autoCapitalize="sentences"
                  autoCorrect
                  multiline
                  numberOfLines={3}
                  onInputChange={inputChangeHandler}
                  initialValue={editMember ? editMember.description : ""}
                  initiallyValid={!!editMember}
                  required
                  minLength={5}
                /> */}
              </View>
            </ScrollView>

            <TouchableOpacity
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={submitHandler}
            >
              <Text style={styles.textStyle}>save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
          <View style={styles.edit}>
            <Subtitle>{"User Info".toUpperCase()}</Subtitle>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
              }}
            >
              <Text style={styles.textStyle}>Edit Profile</Text>
            </TouchableOpacity>
          </View>

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
// ProfileScreen.navigationOptions = (navData) => {
//   const submitFn = navData.navigation.getParam("submit");
//   return {
//     headerShown: false,
//     // title: navData.navigation.getParam("productId")
//     //   ? "Edit Product"
//     //   : "Add Product",
//     headerRight: () => (
//       <HeaderButtons HeaderButtonComponent={HeaderButton}>
//         <Item
//           title="Save"
//           iconName={
//             Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
//           }
//           onPress={submitFn}
//         />
//       </HeaderButtons>
//     ),
//   };
// };
ProfileScreen.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  // input: {
  //   flex: 1,
  //   paddingLeft: 16,
  //   fontSize: 16,
  // },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "80%",
    margin: 20,
    backgroundColor: "#E8E8E8",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  edit: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  textStyle: {
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
    marginRight: 10,
  },
  form: {
    margin: 20,
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
