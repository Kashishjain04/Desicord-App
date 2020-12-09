import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import Octicons from 'react-native-vector-icons/Octicons';
import {windowHeight} from '../utils/Dimensions';

const FormInput = ({labelValue, placeholderText, iconType, ...props}) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.iconStyle}>
        <Octicons name={'broadcast'} size={40} color="#666" />
      </View>
      <TextInput
        style={styles.input}
        value={labelValue}
        numberOfLines={1}
        placeholderTextColor="#666"
        {...props}
      />
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  inputContainer: {
    height: windowHeight / 10,
    borderColor: '#ccc',
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 10,
  },
  iconStyle: {
    padding: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#ccc',
    borderRightWidth: 1,
    width: 70,
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 25,
    color: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
