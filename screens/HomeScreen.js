import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert,
  AsyncStorage,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Avatar } from "react-native-elements";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import ClassItem from "../components/ClassItem";
import CardioBlock from "../components/CardioBlock";
import Colors from "../constants/Colors";
import * as detailsActions from "../store/actions/membersDetails";
import NotificationButton from "../components/UI/NotificationButton";
import { TouchableOpacity } from "react-native-gesture-handler";

const currentHour = new Date().getHours();

const greetingMessage =
  currentHour >= 4 && currentHour < 12 // after 4:00AM and before 12:00PM
    ? "Buenos Días "
    : currentHour >= 12 && currentHour <= 17 // after 12:00PM and before 6:00pm
    ? "Buenas Tardes"
    : currentHour > 17 || currentHour < 4 // after 5:59pm or before 4:00AM (to accommodate night owls)
    ? "Buenas Noches" // if for some reason the calculation didn't work
    : "Bienvenido";

const HomeScreen = (props) => {
  const classes = useSelector((state) => state.products.availableClasses);
  const loadedMemberDeets = useSelector((state) => state.memberdeets.details);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState();

  // const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [error, setError] = useState();

  useEffect(() => {
    setIsLoading(true);

    loadDetails().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadDetails]);

  const loadDetails = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(detailsActions.fetchMemberDetails());
      AsyncStorage.getItem("userData").then((value) => {
        const data = JSON.parse(value);
        setUserPhoto(data.avatar);
      });
      //   AsyncStorage.getItem("resData").then((value) => {
      //     const data = JSON.parse(value);
      //     console.log("resData should be and is ", data);

      //     setFirstName(data.loadedDetails.FirstName);
      //     setLastName(data.loadedDetails.LastName);
      //   });
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setError, setIsRefreshing]);

  // const user = AsyncStorage.getItem("userId");
  // if (!user) {
  //   console.log(user);
  //   return (
  //     <View style={styles.centered}>
  //       <ActivityIndicator size="large" color={Colors.noExprimary} />
  //     </View>
  //   );
  // }
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.noExprimary} />
        <Text>Cargando detalles del usuario</Text>
      </View>
    );
  }

  return (
    <View style={styles.RootView}>
      <View style={styles.Container}>
        <SafeAreaView>
          <View
            style={{
              width: "100%",
              marginTop: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              paddingRight: 10,
              paddingLeft: 20,
            }}
          >
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Avatar
                rounded
                size="large"
                // style={{ padding: 0 }}
                source={{
                  uri: userPhoto,
                }}
                showEditButton={true}
              />
              <View style={styles.displayName}>
                <Text style={styles.subtitle}>{greetingMessage}, </Text>
                {/* <View style={{ flexDirection: "row" }}> */}
                <Text style={styles.hello}>{loadedMemberDeets.FirstName}</Text>
              </View>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <TouchableOpacity onPress={() => {}}>
                <NotificationButton />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView>
            <View style={styles.TitleBar}></View>
            <Subtitle>{"Entrenamientos".toUpperCase()}</Subtitle>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={classes}
              renderItem={(itemData) => (
                <ClassItem
                  image={itemData.item.imageUrl}
                  title={itemData.item.title}
                  price={itemData.item.price}
                  logo={itemData.item.logo}
                  caption={itemData.item.caption}
                  subtitle={itemData.item.subtitle}
                  image={itemData.item.image}
                  onClassClick={() => {
                    props.navigation.navigate("Section", {
                      classId: itemData.item.id,
                      classTitle: itemData.item.title,
                    });
                  }}
                />
              )}
            />
            {/* <CardioBlock /> */}
            <Subtitle>{"Deportes".toUpperCase()}</Subtitle>

            {/* <CardioBlock /> */}
            <View>
              <Text>This is the new HomeScreen</Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </View>
  );
};

HomeScreen.navigationOptions = (navData) => {
  return {
    headerShown: false,
  };
};

const Subtitle = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 15px;
  margin-left: 20px;
  margin-top: 20px;
  text-transform: uppercase;
`;
const CardsContainer = styled.View`
  flex-direction: row;
  padding-left: 10px;
`;

const styles = StyleSheet.create({
  RootView: {
    backgroundColor: "black",
    flex: 1,
  },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  Container: {
    flex: 1,
    backgroundColor: "#f0f3f5",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  TitleBar: {
    width: "100%",
    marginTop: 10,
    paddingLeft: 80,
  },
  classRow: {
    flexDirection: "row",
    padding: 20,
    paddingLeft: 12,
    paddingTop: 30,
  },
  displayName: {
    marginBottom: 25,
    alignItems: "flex-start",
    marginTop: 20,
    marginLeft: 10,
  },
  hello: {
    fontWeight: "bold",
    color: "#3c4560",
    fontSize: 20,
  },
  subtitle: {
    color: "#b8bece",
    fontWeight: "500",
    fontSize: 16,
  },
});

export default HomeScreen;
