import React from "react";
import styled from "styled-components";
import { ScrollView } from "react-native";

const Card = (props) => (
  <ScrollView
    horizontal={true}
    style={{ paddingBottom: 30 }}
    showsHorizontalScrollIndicator={false}
  >
    {cards.map((card, index) => (
      <Container key={index} style={{ elevation: 10 }}>
        <Cover>
          <Image source={card.image} />
          <Title>{card.title}</Title>
        </Cover>

        <Content>
          <Logo source={card.logo} />
          <Wrapper>
            <Caption>{card.caption}</Caption>
            <Subtitle>{card.subtitle}</Subtitle>
          </Wrapper>
        </Content>
      </Container>
    ))}
  </ScrollView>
);

export default Card;

const Content = styled.View`
  padding-left: 20px;
  flex-direction: row;
  align-items: center;
  height: 80px;
`;

const Logo = styled.Image`
  width: 44px;
  height: 44px;
`;

const Caption = styled.Text`
  color: #3c4560;
  font-size: 20px;
  font-weight: 600;
`;

const Subtitle = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 15px;
  text-transform: uppercase;
  margin-top: 4px;
`;

const Wrapper = styled.View`
  margin-left: 10px;
`;

const Container = styled.View`
  background: white;
  width: 315px;
  height: 280px;
  border-radius: 14px;
  margin: 20px 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
`;

const Cover = styled.View`
  width: 100%;
  height: 200px;
  border-top-right-radius: 14px;
  border-top-left-radius: 14px;
  overflow: hidden;
`;

const Image = styled.Image`
  width: 100%;
  height: 400px;
  position: absolute;
  top: 0;
  left: 0;
`;

const Title = styled.Text`
  color: white;
  font-size: 24px;
  font-weight: bold;
  margin-top: 20px;
  margin-left: 20px;
  width: 190px;
`;

const cards = [
  {
    title: "Cardio",
    image: require("../assets/cardioIMG.png"),
    subtitle: "React Native",
    caption: "1 of 12 sections",
    logo: require("../assets/logo-react.png"),
  },
];
