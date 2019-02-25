import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

import HomeScreen from 'views/HomeScreen';
import LoginScreen from 'views/LoginScreen';

import { Consumer, AppProvider } from './src/store';

class App extends React.Component {
  componentWillReceiveProps(nextProps) {
    const { data } = this.props;
    console.log(nextProps.data, data);
  }

  render() {
    console.log(this.props);
    const { data } = this.props;
    return data.isLogged ? <HomeScreen /> : <LoginScreen />;
  }
}

export default React.forwardRef((props, ref) => (
  <AppProvider>
    <Consumer>
      {ctx => <App {...props} data={ctx} ref={ref} />}
    </Consumer>
  </AppProvider>
));

App.propTypes = {
  data: PropTypes.object,
};
