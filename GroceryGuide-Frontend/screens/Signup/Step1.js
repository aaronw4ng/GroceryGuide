import React from "react";
import BottomSheet from "../../components/BottomSheet";

const Step1 = ({ setStage }) => (
  <BottomSheet
    header="Welcome!"
    subHeader="Help us find the safest grocery store for you by answering a few quick questions"
    currentStage={1}
    setStage={setStage}
  />
);

export default Step1;
