import React, { Component } from "react";
import * as Font from "expo-font";
import { StyleSheet, Text, View } from "react-native";
import Signup from "./screens/Signup";
import Home from "./screens/Home";

export default class App extends Component {
  state = { fontLoaded: false };
  async componentDidMount() {
    await Font.loadAsync({
      Rubik: require("./assets/typefaces/Rubik-Regular.ttf"),
      "Rubik-Bold": require("./assets/typefaces/Rubik-Bold.ttf"),
      "Rubik-Light": require("./assets/typefaces/Rubik-Light.ttf"),
    });
    this.setState({ fontLoaded: true });
  }
  render() {
    if (!this.state.fontLoaded)
      return (
        <View>
          <Text>LOADING</Text>
        </View>
      );
    return (
      <View style={styles.container}>
        <Home />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
