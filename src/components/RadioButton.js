import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

const Radio = () => {
  const [checked, setChecked] = useState(0);
  var gender = ['Male', 'Female'];
  return (
    <View>
      <View style={styles.btn}>
        {gender.map((gender, key) => {
          return (
            <View key={gender}>
              {checked == key ? (
                <TouchableOpacity style={styles.btn}>
                  <Image
                    style={styles.img}
                    source={require('../assets/dp.png')}
                  />
                  <Text>{gender}</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setChecked(key);
                  }}
                  style={styles.btn}>
                  <Image
                    style={styles.img}
                    source={require('../assets/Cloud_two_step_verification.png')}
                  />
                  <Text>{gender}</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </View>
      {/* <Text>{gender[checked]}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  radio: {
    flexDirection: 'row',
  },
  img: {
    height: 20,
    width: 20,
    marginHorizontal: 5,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Radio;
