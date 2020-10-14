import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import BottomSheet from "../../components/BottomSheet";
import styled from "styled-components";

const Step3 = ({ setStage, preferences, setPreferences }) => (
  <BottomSheet
    header="Time of day"
    subHeader="Any preference of time of day?"
    currentStage={3}
    setStage={setStage}
    children={
      <TimeOptions preferences={preferences} setPreferences={setPreferences} />
    }
  />
);

const TimeOptions = ({ preferences, setPreferences }) => (
  <View style={{ marginTop: 12 }}>
    <OptionButton
      active={preferences.desiredTime === "today"}
      onPress={() =>
        setPreferences((currentPref) => ({
          ...currentPref,
          desiredTime: "today",
        }))
      }
    >
      <Option active={preferences.desiredTime === "today"}>today</Option>
    </OptionButton>
    <OptionButton
      active={preferences.desiredTime === "tomorrow"}
      onPress={() =>
        setPreferences((pref) => ({ ...pref, desiredTime: "tomorrow" }))
      }
    >
      <Option active={preferences.desiredTime === "tomorrow"}>tomorrow</Option>
    </OptionButton>
    <OptionButton disabled>
      <Option>specific day</Option>
    </OptionButton>
  </View>
);

export default Step3;

const OptionButton = styled(TouchableOpacity)`
    border-radius: 10px;
    background: ${({ active }) => (active ? "#20BF6B" : "#FFFFFF")};
    border: ${({ active }) =>
      active ? "0px" : "1px solid rgba(170, 170, 170, 0.8"};
    width: 100%
    display: flex;
    justify-content: center;
    align-items:center;
    padding: 14px;
    margin-top: 16px;
`;
const Option = styled(Text)`
  color: ${({ active }) => (active ? "#FFFFFF" : "#000")};
  font-family: Rubik-Bold;
  text-align: center;
  font-size: 18px;
`;
