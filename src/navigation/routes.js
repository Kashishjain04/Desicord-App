import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {selectUser} from '../redux/features/UserSlice';
import AppStack from './AppStack';
import AuthStack from './AuthStack';

const Routes = () => {
  const [user, setUser] = useState(null);
  const temp = useSelector(selectUser);
  useEffect(() => {
    setUser(temp);
  }, [temp]);
  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
