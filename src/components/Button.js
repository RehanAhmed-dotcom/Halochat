import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Colors from '../styles';

const Button = ({title,onPress,Style,textstyle}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.buttonstyle,{...Style}]}>
      <Text style={[styles.titleText,{...textstyle}]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonstyle:{
    height:50,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:Colors.mainColor,
    width:'100%'
  },
  titleText:{
    color:Colors.white,
    fontSize:16,
    fontFamily:Colors.Medium
  }
});
