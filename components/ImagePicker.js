import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  ActivityIndicator,
  Modal,
  Alert,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { Ionicons } from "@expo/vector-icons";

import Image from "react-native-image-progress";
import * as updateActions from "../store/actions/evalUpdate";
import * as detailsActions from "../store/actions/membersDetails";
import ImageView from "react-native-image-viewing";

import Colors from "../constants/Colors";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const ImgPicker = (props) => {
  const dispatch = useDispatch();

  const [pickedImage, setPickedImage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [zoom, setZoom] = useState();

  const images = [
    {
      uri: props.source,
    },
  ];

  const verifyPermissions = async () => {
    // (async () => {
    //   if (Platform.OS !== "web") {
    //     const { status } =
    //       (await ImagePicker.requestCameraRollPermissionsAsync()) &
    //       (await ImagePicker.getCameraRollPermissionsAsync());

    //     if (status !== "granted") {
    //       alert("Lo siento, necesitamos permiso para acceder a la cámara");
    //     }
    //   }
    // })();
    const result = await Permissions.askAsync(
      Permissions.CAMERA_ROLL,
      Permissions.CAMERA
    );
    if (result.status !== "granted") {
      Alert.alert(
        "¡Permisos insuficientes!",
        "Lo siento, necesitamos permiso para acceder a la cámara.",
        [{ text: "Listo" }]
      );
      return false;
    }
    return true;
  };

  useEffect(() => {
    setZoom(false);
  }, [setZoom]);

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
    setIsOpen(false);

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
    setIsOpen(false);

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
          if (title === "Imagen Frontal") {
            dispatch(detailsActions.deleteBaseFront());
          }
          if (title === "Imagen Lateral") {
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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 16, marginBottom: 5 }}>{props.title}</Text>
        <Text style={{ fontSize: 25, marginBottom: 5 }}>{props.emoji}</Text>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isOpen}
        onRequestClose={() => {
          setIsOpen(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={{
                ...styles.openButton,
                backgroundColor: Colors.noExBright,
              }}
              onPress={() => {
                takeImageHandler();
              }}
            >
              <View style={styles.modalButton}>
                <Ionicons name="ios-camera" size={24} color="black" />
                <Text style={styles.textStyle}>Cámara</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                ...styles.openButton,
                backgroundColor: Colors.noExBright,
              }}
              onPress={() => {
                selectImageHandler();
              }}
            >
              <View style={styles.modalButton}>
                <Ionicons name="md-photos" size={24} color="black" />
                <Text style={styles.textStyle}>Galería</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                ...styles.openButton,
                backgroundColor: Colors.noExBright,
              }}
              onPress={() => {
                setIsOpen(false);
              }}
            >
              <View style={styles.modalButton}>
                <Ionicons name="ios-close" size={24} color="black" />
                <Text style={styles.textStyle}>Cancelar</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={styles.imagePreview}
        onPress={() => {
          setZoom(true);
        }}
        disabled={props.source ? false : true}
        onLongPress={deleteImageHandler.bind(this, props.Eid, props.title)}
      >
        {!props.source ? (
          <View>
            <TouchableOpacity
              onPress={() => {
                setIsOpen(true);
              }}
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>Añade tu foto aqui.</Text>

              <View
                style={{
                  width: 35,
                  height: 30,

                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name={Platform.OS === "android" ? "md-add" : "ios-add"}
                  size={30}
                  color="black"
                />
              </View>
            </TouchableOpacity>
            <View
              style={{
                padding: 2,
                marginBottom: 5,
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                top: 100,
              }}
            >
              <Text style={{ fontSize: 10 }}>No Carga la foto?</Text>
              <TouchableOpacity onPress={props.refresh}>
                <Text style={{ fontSize: 12, color: "blue" }}>Refrescar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : zoom === false ? (
          <Image
            style={styles.image}
            source={props.source ? { uri: props.source } : null}
          />
        ) : (
          <ImageView
            images={images}
            imageIndex={0}
            visible={zoom}
            onRequestClose={() => setZoom(false)}
            FooterComponent={({ imageIndex }) => (
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 30,
                }}
                onPress={deleteImageHandler.bind(this, props.Eid, props.title)}
              >
                <Ionicons name="ios-trash" size={50} color="white" />
              </TouchableOpacity>
              // <ImageFooter imageIndex={imageIndex} imagesCount={images.length} />
            )}
          />
        )}
      </TouchableOpacity>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
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
    marginBottom: 5,
    marginTop: 5,
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 8,
  },
  modalButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 150,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default ImgPicker;
