import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

import { withAppContext } from 'store';

const HomeScreen = ({ data }) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>HomeScreen tétine!</Text>
  </View>
);

export default withAppContext(HomeScreen);

HomeScreen.propTypes = {
  data: PropTypes.object,
};
