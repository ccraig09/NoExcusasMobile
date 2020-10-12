import React, { useState } from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import Image from "react-native-image-progress";
import * as updateActions from "../store/actions/evalUpdate";
import * as detailsActions from "../store/actions/membersDetails";

import Colors from "../constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";

const ImgPicker = (props) => {
  const dispatch = useDispatch();

  const [pickedImage, setPickedImage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(
      Permissions.CAMERA_ROLL,
      Permissions.CAMERA
    );
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant camera permissions to use this app.",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      // allowsEditing: true,
      // aspect: [16, 9],
      quality: 0.5,
    });

    props.onImageTaken(image.uri);
  };

  const selectImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    const image = await ImagePicker.launchImageLibraryAsync({
      // allowsEditing: true,
      // aspect: [16, 9],
      quality: 0.5,
    });

    props.onImageTaken(image.uri);
  };

  const deleteImageHandler = (Eid, title) => {
    // console.log("props for docId", props.docId);
    Alert.alert("¿Usted esta seguro?", "Quiere borrar esta foto?", [
      { text: "No", style: "default" },
      {
        text: "Si",
        style: "destructive",
        onPress: () => {
          if (title === "Base Frontal") {
            dispatch(detailsActions.deleteBaseFront());
          }
          if (title === "Base Lateral") {
            dispatch(detailsActions.deleteBaseLateral());
          }
          if (title === "Lateral") {
            dispatch(updateActions.deleteLateral(Eid));
          }
          if (title === "Frontal") {
            dispatch(updateActions.deleteFrontal(Eid));
          }

          props.onDelete();
        },
      },
    ]);
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!props.source ? (
          <Text>Añade tu foto aqui.</Text>
        ) : (
          <Image
            style={styles.image}
            source={props.source ? { uri: props.source } : null}
          />
        )}
      </View>
      <View
        style={{
          borderColor: Colors.noExprimary,
          borderRadius: 5,
          borderWidth: 2,
          padding: 2,
          marginBottom: 5,
        }}
      >
        <Text style={{ fontSize: 13 }}>No Carga la foto?</Text>
        <TouchableOpacity onPress={props.refresh}>
          <Text style={{ fontSize: 17, color: "blue" }}>Refrescar</Text>
        </TouchableOpacity>
      </View>
      <Text style={{ fontSize: 20 }}>{props.title}</Text>
      <Button
        title="Tomar Foto"
        color={Colors.noExprimary}
        onPress={takeImageHandler}
      />
      <Button
        title="Eligir Imagen"
        color={Colors.noExprimary}
        onPress={selectImageHandler}
      />

      {props.source ? (
        <Button
          title="Borrar Imagen"
          color={Colors.noExprimary}
          onPress={deleteImageHandler.bind(this, props.Eid, props.title)}
          // disabled={!props.source}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    width: "50%",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 5,
  },
  imagePreview: {
    width: "100%",
    height: 250,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default ImgPicker;
