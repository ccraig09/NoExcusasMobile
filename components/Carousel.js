import * as React from "react";
import { Text, View, SafeAreaView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { connect } from "react-redux";

import Carousel from "react-native-snap-carousel";
import Colors from "../constants/Colors";

function mapStateToProps(state) {
  return {
    loadedMemberDeets: state.memberdeets.details,
  };
}
class Carouselcom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      carouselItems: [
        {
          title: "IMC",
          text: this.props.loadedMemberDeets.BMI,
        },
        {
          title: "Grasa",
          text: this.props.loadedMemberDeets.Fat,
        },
        {
          title: "Músculo",
          text: this.props.loadedMemberDeets.Muscle,
        },
        {
          title: "KCAL",
          text: this.props.loadedMemberDeets.KCAL,
        },
        {
          title: "Metabolica",
          text: this.props.loadedMemberDeets.Metabolical,
        },
        {
          title: "Viseral",
          text: this.props.loadedMemberDeets.ViFat,
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
export default connect(mapStateToProps)(Carouselcom);
