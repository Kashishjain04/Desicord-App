import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={HomeScreen}
        options={{
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: '#2e64e5',
            fontSize: 18,
          },
          headerStyle: {
            shadowColor: '#fff',
            elevation: 0,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
