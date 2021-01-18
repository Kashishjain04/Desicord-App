import React, {useEffect, useRef} from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {selectUser} from '../redux/features/UserSlice';
import {ProfileName, ProfilePhoto} from '../styles/Profile';

const ProfileScreen = () => {
  const _isMounted = useRef(true);
  const user = useSelector(selectUser);

  // cleanup
  useEffect(() => {
    return () => {
      _isMounted.current = false;
    };
  });

  return (
    <View>
      <ProfilePhoto source={{uri: user.photoURL}} />
      <ProfileName>{user.displayName}</ProfileName>
    </View>
  );
};

export default ProfileScreen;
