import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-native-paper';

import COLORS from 'styles/colors';
import styles from './styles';

const ButtonForm = ({ text, onPress, type, style }) => (
  <Button
    mode={type}
    color={COLORS.platinum}
    style={[styles.text, style && style, type === 'outlined' && styles.button]}
    onPress={() => onPress()}
  >
    {text}
  </Button>
);

ButtonForm.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  onPress: PropTypes.func,
  style: PropTypes.object,
};

export default ButtonForm;
