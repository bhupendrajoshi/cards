import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { gray, green } from '../utils/colors';

export default function TextButton({ children, onPress, isDefault = false, disabled = false, style = {} }) {
  let btnStyles = isDefault 
    ? [styles.btn, styles.default, style] 
    : [styles.btn, styles.colored, style];

  if (disabled) {
    btnStyles.push(styles.disabled);
  }

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <Text style={btnStyles}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btn: {
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginTop: 10,
    marginLeft: 40,
    marginRight: 40,
    borderWidth: 1,
    borderRadius: 2,
  },
  default: {
    textAlign: 'center',
    borderColor: gray, 
  },
  colored: {
    textAlign: 'center',
    color: 'white',
    backgroundColor: green,
    borderColor: green, 
  },
  disabled: {
    opacity: 0.5
  }
})