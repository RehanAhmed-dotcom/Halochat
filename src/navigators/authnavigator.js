// In App.js in a new project

import * as React from 'react';
import {View, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Loginscreen from '../autscreens/Loginscreen';
import Signupscreen from '../autscreens/Signupscreen';
import Forgetscreen from '../autscreens/Forgetscreen';
import Codescreen from '../autscreens/Codescreen';
import Resetscreen from '../autscreens/Resetscreen';
import Splash from '../appscreens/Splash';
import Terms from '../autscreens/Terms';

const Stack = createNativeStackNavigator();

function Auth() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Loginscreen"
        component={Loginscreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Signupscreen" component={Signupscreen} />
      <Stack.Screen name="Forgetscreen" component={Forgetscreen} />
      <Stack.Screen
        name="Codescreen"
        component={Codescreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Resetscreen" component={Resetscreen} />
      <Stack.Screen
        name="Terms"
        component={Terms}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default Auth;
