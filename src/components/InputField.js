import { StyleSheet, Text, View, TextInput } from 'react-native';
import React from 'react';
import Colors from '../styles';

const InputField = ({ 
  placeholder,
  value,
  placeholderTextColor,
  onChangeText,
  editable,
  Style 
}) => {
  return (
    <View>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={placeholderTextColor}
        editable={editable}
        style={[styles.textInpustyle,{...Style}]}
      />
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  textInpustyle:{
    height:50,
    width:'100%',
    fontFamily:Colors.Regular
  }
});
