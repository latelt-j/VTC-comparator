import { createStackNavigator, createAppContainer } from 'react-navigation';

import HomeScreen from 'views/HomeScreen';

const RootNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
  },
  {
    headerMode: 'none',
    initialRouteName: 'Home',
  },
);

export default createAppContainer(RootNavigator);
