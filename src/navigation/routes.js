import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {useSelector} from 'react-redux';
import {selectUser} from '../redux/features/UserSlice';
import AppStack from './AppStack';
import AuthStack from './AuthStack';

const Routes = () => {
  const user = useSelector(selectUser);
  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
