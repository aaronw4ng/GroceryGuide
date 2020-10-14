import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styled from "styled-components";
import BottomBar from "./BottomBar";
import Icon from "react-native-vector-icons/MaterialIcons";

const HomeBottomSheet = ({ children }) => (
  <BottomSheetContainer>
    <View>{children}</View>
    <View style={{ width: "100%", zIndex: 3 }}>
      <BottomBar />
    </View>
  </BottomSheetContainer>
);

export default HomeBottomSheet;

const BottomSheetContainer = styled(View)`
  position: absolute;
  bottom: 0;
  left: 0;
  background: #ffffff;
  box-shadow: 0px -4px 12px rgba(0, 0, 0, 0.25);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  width: 100%;
  z-index: 2;
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
