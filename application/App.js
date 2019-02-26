import React from 'react';
import PropTypes from 'prop-types';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import AuthNavigator from 'navigations/auth';
import RootNavigator from 'navigations/root';

import COLORS from 'styles/colors';
import { Consumer, AppProvider } from './src/store';

const App = ({ data }) => (
  data.isLogged ? <RootNavigator /> : <AuthNavigator />
);

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    text: COLORS.isabeline,
    primary: COLORS.lightRed,
    placeholder: COLORS.lightRed,
    accent: COLORS.isabeline,
  },
};

export default React.forwardRef((props, ref) => (
  <PaperProvider theme={theme}>
    <AppProvider>
      <Consumer>
        {ctx => <App {...props} data={ctx} ref={ref} />}
      </Consumer>
    </AppProvider>
  </PaperProvider>
));

App.propTypes = {
  data: PropTypes.object,
};
