import { createStackNavigator, createAppContainer } from 'react-navigation';

import LoginScreen from 'views/LoginScreen';
import RegisterScreen from 'views/RegisterScreen';
import IntroScreen from 'views/IntroScreen';

const AuthNavigator = createStackNavigator(
  {
    Home: {
      screen: LoginScreen,
    },
    Register: {
      screen: RegisterScreen,
    },
    Intro: {
      screen: IntroScreen,
    },
  },
  {
    headerMode: 'none',
    initialRouteName: 'Home',
  },
);

export default createAppContainer(AuthNavigator);
