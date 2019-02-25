import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

const AuthStack = createStackNavigator({
  Login: {
    screen: LoginScreen
  },
  Register: {
    screen: RegisterScreen
  },
  Intro: {
    screen: IntroScreen
  }
});

const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen
  }
});

const RootNavigator = createStackNavigator({
  HomeStack: {
    screen: HomeStack
  },
  AuthStack: {
    screen: AuthStack
  }
})

export default createAppContainer(RootNavigator);