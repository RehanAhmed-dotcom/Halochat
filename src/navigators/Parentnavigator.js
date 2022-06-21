// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Auth from './authnavigator';
import Tabs from './tabnavigator';
import {useDispatch, useSelector} from 'react-redux';
import Singlechatscreen from '../appscreens/Singlechatscreen';
import EditProfile from '../appscreens/Editprofile';
import UserProfile from '../appscreens/UserProfile';
import Splash from '../appscreens/Splash';
import {navigationRef} from '../config/NavigationService';
import Jitsi from '../appscreens/Jitsi';
const Stack = createNativeStackNavigator();

function ParentNav() {
  const {isLoggedIn} = useSelector(({USER}) => USER);
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Singlechatscreen"
          component={Singlechatscreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Jitsi"
          component={Jitsi}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UserProfile"
          component={UserProfile}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default ParentNav;
