import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

const BasicInfoScroll = (props) => {
  return (
    <ScrollView
      style={{
        flexDirection: "row",
        padding: 20,
        paddingLeft: 12,
        marginRight: 10,
        marginTop: 5,
      }}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    >
      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
          width: 190,
        }}
        onPress={props.agePress}
      >
        <View>
          <Text style={styles.basicInfo}>EDAD</Text>
          <Text
            style={{
              fontFamily: "aliens",
              color: "grey",
              fontSize: 40,
              textAlign: "center",
            }}
          >
            {props.age}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
          width: 190,
        }}
        onPress={props.heightPress}
      >
        <View>
          <Text style={styles.basicInfo}>ALTURA</Text>
          <Text
            style={{
              fontFamily: "aliens",
              color: "#ffc733",
              fontSize: 40,
              textAlign: "center",
            }}
          >
            {props.height}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
          width: 190,
        }}
        onPress={props.weightPress}
      >
        <View>
          <Text style={styles.basicInfo}>PESO</Text>
          <Text
            style={{
              fontFamily: "aliens",
              color: "grey",
              fontSize: 40,
              textAlign: "center",
            }}
          >
            {props.weight}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
          width: 190,
        }}
        onPress={props.genderPress}
      >
        <View>
          <Text style={styles.basicInfo}>GÉNERO</Text>
          <Text
            style={{
              fontFamily: "aliens",
              color: "#ffc733",
              fontSize: 40,
              textAlign: "center",
            }}
          >
            {props.gender}
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  basicInfo: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 40,
    color: "#6C6C6C",
    fontStyle: "italic",
  },
});
export default BasicInfoScroll;
