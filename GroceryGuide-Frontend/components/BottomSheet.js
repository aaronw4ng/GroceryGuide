import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styled from "styled-components";
import Icon from "react-native-vector-icons/MaterialIcons";

const BottomSheet = ({
  header,
  subHeader,
  children,
  currentStage,
  setStage,
}) => (
  <BottomSheetContainer>
    <Header>{header}</Header>
    <SubHeader>{subHeader}</SubHeader>
    {children}
    <NavigationOptions>
      <NavigationIndicator activeStage={currentStage} />
      <NextButton onPress={() => setStage((currentStage) => currentStage + 1)}>
        <Icon name="arrow-forward" size={28} color={"#fff"} />
      </NextButton>
    </NavigationOptions>
  </BottomSheetContainer>
);

export default BottomSheet;

const NavigationIndicator = ({ activeStage }) => (
  <NavigationIndicatorContainer>
    {Array(4)
      .fill(null)
      .map((_, i) =>
        i === activeStage - 1 ? (
          <ActiveIndicator key={i} />
        ) : (
          <InactiveIndicator key={i} />
        )
      )}
  </NavigationIndicatorContainer>
);

const NavigationOptions = styled(View)`
  margin-top: 48px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

const NavigationIndicatorContainer = styled(View)`
  display: flex;
  flex-direction: row;
`;
const ActiveIndicator = styled(View)`
  width: 32px;
  height: 10px;
  background: #20bf6b;
  border-radius: 8px;
  margin-right: 12px;
`;
const InactiveIndicator = styled(View)`
  background: #c4c4c4;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  margin-right: 12px;
`;

const BottomSheetContainer = styled(View)`
  position: absolute;
  bottom: 0;
  left: 0;
  background: #ffffff;
  box-shadow: 0px -4px 12px rgba(0, 0, 0, 0.25);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 36px;
  width: 100%;
  z-index: 2;
`;

const Header = styled(Text)`
  font-size: 36px;
  line-height: 42px;
  margin-top: 16px;
  font-family: Rubik-Bold;
`;

const SubHeader = styled(Text)`
  margin-top: 20px;
  font-size: 18px;
  font-family: Rubik;
`;

const NextButton = styled(TouchableOpacity)`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background: #fa8231;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
`;
