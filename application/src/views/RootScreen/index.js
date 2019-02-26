import React from 'react';
import PropTypes from 'prop-types';

import { withAppContext } from 'store';

import AuthNavigator from 'navigations/auth';
import RootNavigator from 'navigations/root';

const RootScreen = (props) => {
  const { data } = props;
  return data.isLogged ? <RootNavigator /> : <AuthNavigator />;
};

RootScreen.propTypes = {
  data: PropTypes.object,
};

export default withAppContext(RootScreen);
