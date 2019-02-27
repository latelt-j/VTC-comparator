import { createStackNavigator, createAppContainer } from 'react-navigation';
import { fadeIn } from 'react-navigation-transitions';

import LoginScreen from 'views/LoginScreen';
import RegisterScreen from 'views/RegisterScreen';
import IntroScreen from 'views/IntroScreen';

import RootScreen from './root';

const AuthNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
    },
    Register: {
      screen: RegisterScreen,
    },
    Intro: {
      screen: IntroScreen,
    },
    Root: {
      screen: RootScreen,
    },
  },
  {
    headerMode: 'none',
    defaultNavigationOptions: {
      gesturesEnabled: false,
    },
    initialRouteName: 'Intro',
    transitionConfig: () => fadeIn(500),
  },
);

export default createAppContainer(AuthNavigator);
