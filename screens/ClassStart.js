import React from "react";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { PlayIcon } from "../components/UI/icons";

import ClassStartItem from "../components/ClassStartItem";

const ClassStart = (props) => {
  const carclasses = useSelector((state) => state.products.cardioSelected);
  const strclasses = useSelector((state) => state.products.strengthSelected);
  const mixclasses = useSelector((state) => state.products.mixedSelected);
  const recclasses = useSelector((state) => state.products.recoverySelected);

  const classId = props.navigation.getParam("classId");
  const cardioStart = useSelector((state) =>
    state.products.cardioSelected.find((clas) => clas.id === classId)
  );
  const strengthStart = useSelector((state) =>
    state.products.strengthSelected.find((clas) => clas.id === classId)
  );
  const mixedStart = useSelector((state) =>
    state.products.mixedSelected.find((clas) => clas.id === classId)
  );
  const recoveryStart = useSelector((state) =>
    state.products.recoverySelected.find((clas) => clas.id === classId)
  );

  const coverImage = props.navigation.getParam("coverImage");
  const selectedImage = useSelector((state) =>
    state.products.cardioSelected.find((img) => img.image === coverImage)
  );
  if (classId === "c1") {
    return (
      <ClassStartItem
        image={cardioStart.image}
        title={cardioStart.title}
        subtitle={cardioStart.subtitle}
        time={cardioStart.time}
        difficulty={cardioStart.difficulty}
        logo={cardioStart.logo}
        video={cardioStart.videoURL}
        description={cardioStart.description}
        onVideoClick={() => {
          props.navigation.navigate("Video", {
            classId: cardioStart.id,
            classDescription: cardioStart.description,
            coverImage: cardioStart.image,
            classVideo: cardioStart.videoURL,
          });
        }}
      />
    );
  }
  if (classId === "c2") {
    return (
      <ClassStartItem
        image={cardioStart.image}
        title={cardioStart.title}
        subtitle={cardioStart.subtitle}
        time={cardioStart.time}
        difficulty={cardioStart.difficulty}
        logo={cardioStart.logo}
        video={cardioStart.videoURL}
        description={cardioStart.description}
        onVideoClick={() => {
          props.navigation.navigate("Video", {
            classId: cardioStart.id,
            classDescription: cardioStart.description,
            coverImage: cardioStart.image,
            classVideo: cardioStart.videoURL,
          });
        }}
      />
    );
  }
  if (classId === "c3") {
    return (
      <ClassStartItem
        image={cardioStart.image}
        title={cardioStart.title}
        subtitle={cardioStart.subtitle}
        time={cardioStart.time}
        difficulty={cardioStart.difficulty}
        logo={cardioStart.logo}
        video={cardioStart.videoURL}
        description={cardioStart.description}
        onVideoClick={() => {
          props.navigation.navigate("Video", {
            classId: cardioStart.id,
            classDescription: cardioStart.description,
            coverImage: cardioStart.image,
            classVideo: cardioStart.videoURL,
          });
        }}
      />
    );
  }
  if (classId === "s1") {
    return (
      <ClassStartItem
        image={strengthStart.image}
        title={strengthStart.title}
        subtitle={strengthStart.subtitle}
        time={strengthStart.time}
        difficulty={strengthStart.difficulty}
        logo={strengthStart.logo}
        video={strengthStart.videoURL}
        description={strengthStart.description}
        onVideoClick={() => {
          props.navigation.navigate("Video", {
            classId: strengthStart.id,
            classDescription: strengthStart.description,
            coverImage: strengthStart.image,
            classVideo: strengthStart.videoURL,
          });
        }}
      />
    );
  }
  if (classId === "s2") {
    return (
      <ClassStartItem
        image={strengthStart.image}
        title={strengthStart.title}
        subtitle={strengthStart.subtitle}
        time={strengthStart.time}
        difficulty={strengthStart.difficulty}
        logo={strengthStart.logo}
        video={strengthStart.videoURL}
        description={strengthStart.description}
        onVideoClick={() => {
          props.navigation.navigate("Video", {
            classId: strengthStart.id,
            classDescription: strengthStart.description,
            coverImage: strengthStart.image,
            classVideo: strengthStart.videoURL,
          });
        }}
      />
    );
  }
  if (classId === "s3") {
    return (
      <ClassStartItem
        image={strengthStart.image}
        title={strengthStart.title}
        subtitle={strengthStart.subtitle}
        time={strengthStart.time}
        difficulty={strengthStart.difficulty}
        logo={strengthStart.logo}
        video={strengthStart.videoURL}
        description={strengthStart.description}
        onVideoClick={() => {
          props.navigation.navigate("Video", {
            classId: strengthStart.id,
            classDescription: strengthStart.description,
            coverImage: strengthStart.image,
            classVideo: strengthStart.videoURL,
          });
        }}
      />
    );
  }
  if (classId === "m1") {
    return (
      <ClassStartItem
        image={mixedStart.image}
        title={mixedStart.title}
        subtitle={mixedStart.subtitle}
        time={mixedStart.time}
        difficulty={mixedStart.difficulty}
        logo={mixedStart.logo}
        video={mixedStart.videoURL}
        description={mixedStart.description}
        onVideoClick={() => {
          props.navigation.navigate("Video", {
            classId: mixedStart.id,
            classDescription: mixedStart.description,
            coverImage: mixedStart.image,
            classVideo: mixedStart.videoURL,
          });
        }}
      />
    );
  }
  if (classId === "m2") {
    return (
      <ClassStartItem
        image={mixedStart.image}
        title={mixedStart.title}
        subtitle={mixedStart.subtitle}
        time={mixedStart.time}
        difficulty={mixedStart.difficulty}
        logo={mixedStart.logo}
        video={mixedStart.videoURL}
        description={mixedStart.description}
        onVideoClick={() => {
          props.navigation.navigate("Video", {
            classId: mixedStart.id,
            classDescription: mixedStart.description,
            coverImage: mixedStart.image,
            classVideo: mixedStart.videoURL,
          });
        }}
      />
    );
  }
  if (classId === "m3") {
    return (
      <ClassStartItem
        image={mixedStart.image}
        title={mixedStart.title}
        subtitle={mixedStart.subtitle}
        time={mixedStart.time}
        difficulty={mixedStart.difficulty}
        logo={mixedStart.logo}
        video={mixedStart.videoURL}
        description={mixedStart.description}
        onVideoClick={() => {
          props.navigation.navigate("Video", {
            classId: mixedStart.id,
            classDescription: mixedStart.description,
            coverImage: mixedStart.image,
            classVideo: mixedStart.videoURL,
          });
        }}
      />
    );
  }
  if (classId === "r1") {
    return (
      <ClassStartItem
        image={recoveryStart.image}
        title={recoveryStart.title}
        subtitle={recoveryStart.subtitle}
        time={recoveryStart.time}
        difficulty={recoveryStart.difficulty}
        logo={recoveryStart.logo}
        video={recoveryStart.videoURL}
        description={recoveryStart.description}
        onVideoClick={() => {
          props.navigation.navigate("Video", {
            classId: recoveryStart.id,
            classDescription: recoveryStart.description,
            coverImage: recoveryStart.image,
            classVideo: recoveryStart.videoURL,
          });
        }}
      />
    );
  }
};

ClassStart.navigationOptions = {
  title: "Cardio",
  headerShown: false,
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  Cover: {
    height: 375,
  },
  Image: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  PlayWrapper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -40,
    marginLeft: -40,
  },
  PlayView: {
    width: 80,
    height: 80,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ClassStart;
