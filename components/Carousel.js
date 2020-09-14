import * as React from "react";
import { Text, View, SafeAreaView } from "react-native";

import Carousel from "react-native-snap-carousel";
import Colors from "../constants/Colors";

export default class Carouselcom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      carouselItems: [
        {
          title: "IMC",
          text: "Gorda",
        },
        {
          title: "GRasa",
          text: "Dio mio",
        },
        {
          title: "Item 3",
          text: "Text 3",
        },
        {
          title: "Item 4",
          text: "Text 4",
        },
        {
          title: "Item 5",
          text: "Text 5",
        },
      ],
    };
  }

  _renderItem({ item, index }) {
    return (
      <View
        style={{
          backgroundColor: "#F1BA35",
          borderRadius: 10,
          height: 350,
          padding: 50,
          marginLeft: 20,
          marginRight: 10,
        }}
      >
        <Text style={{ fontSize: 30 }}>{item.title}</Text>
        <Text>{item.text}</Text>
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, paddingTop: 50 }}>
        <View
          style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}
        >
          <Carousel
            layout={"default"}
            ref={(ref) => (this.carousel = ref)}
            data={this.state.carouselItems}
            sliderWidth={300}
            loop={true}
            itemWidth={300}
            renderItem={this._renderItem}
            onSnapToItem={(index) => this.setState({ activeIndex: index })}
          />
        </View>
      </SafeAreaView>
    );
  }
}
