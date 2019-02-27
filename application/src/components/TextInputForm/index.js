import React from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native-paper';

import COLORS from 'styles/colors';

const TextInputForm = ({ placeholder, value, handleChangeText }) => (
  <TextInput
    style={{ width: 300, backgroundColor: 'transparent', color: COLORS.isabeline }}
    placeholderColor={COLORS.isabeline}
    selectionColor={COLORS.isabeline}
    underlineColor={COLORS.isabeline}
    label={placeholder}
    value={value}
    onChangeText={e => handleChangeText(e)}
  />
);

TextInputForm.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  handleChangeText: PropTypes.func,
};

export default TextInputForm;
