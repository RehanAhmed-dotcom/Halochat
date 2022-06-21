import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Chat from '../appscreens/Chat';
import {Platform, Image} from 'react-native';
import Profile from '../appscreens/Profile';
import Contact from '../appscreens/Contact';
import PersonIcon from 'react-native-vector-icons/Ionicons';
import ChatIcon from 'react-native-vector-icons/Ionicons';
import PersonIcon2 from 'react-native-vector-icons/Ionicons';
import Colors from '../styles';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      // tabBarOptions={
      //   (tabStyle = {
      //     justifyContent: 'center',
      //   })
      //   // showIcon: false
      // }
      // tabBarStyle={{paddingBottom: 0}}
      initialRouteName="Chat"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'Profile') {
            return (
              <PersonIcon2
                name={'ios-person-outline'}
                size={focused ? 30 : size}
                color={color}
              />
            );
          } else if (route.name === 'Chat') {
            return (
              <ChatIcon
                name={'chatbubbles-outline'}
                size={focused ? 30 : size}
                color={color}
              />
            );
          } else if (route.name === 'Contact') {
            return (
              <Image
                source={require('../assets/contacts.png')}
                style={{
                  width: focused ? 30 : size,
                  height: focused ? 30 : size,
                  tintColor: focused ? 'white' : '#ccc',
                }}
              />
              // <PersonIcon
              //   name={'person-circle-outline'}
              //   size={focused ? 30 : size}
              //   color={color}
              // />
            );
          }
        },
        tabBarActiveTintColor: Colors.white,
        tabBarStyle: {
          backgroundColor: Colors.mainColor,
          borderTopWidth: 0,
          // paddingBottom: 12,

          height: Platform.OS === 'android' ? 50 : 60,
          // shadowColor: '#000',
          // shadowOffset: {width: 0, height: 2},
          // shadowOpacity: 0.5,
          // shadowRadius: 2,
          elevation: 0,
        },
        tabBarInactiveTintColor: 'lightgrey',
        tabBarShowLabel: false,
      })}>
      <Tab.Screen
        name="Contact"
        component={Contact}
        options={{headerShown: false}}
      />
      <Tab.Screen name="Chat" component={Chat} options={{headerShown: false}} />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}
