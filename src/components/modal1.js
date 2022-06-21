import React, {useEffect} from 'react';
import {Modal, Alert, ActivityIndicator, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../styles';
// import { Colors } from 'react-native/Libraries/NewAppScreen';
const myModal1 = showModal => {
  showModal && console.log('i awake after the transaction', showModal);
  // <Modal animationType="slide" transparent={true} visible={showModal}>
  return (
    showModal === true && (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            flex: 1,
            // height: hp(100),
            backgroundColor: '#00000088',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 200,
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            // position: 'absolute',
          }}>
          <View
            style={{
              height: 50,
              width: 50,
              // backgroundColor:"red",
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              borderRadius: 25,
            }}>
            <ActivityIndicator size="small" color={colors.mainColor} />
          </View>
        </View>
      </Modal>
    )
  );

  // </Modal>
};
export default myModal1;
