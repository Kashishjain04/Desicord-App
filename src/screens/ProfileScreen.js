import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {selectUser} from '../redux/features/UserSlice';
import {ProfileName, ProfilePhoto} from '../styles/Profile';

const ProfileScreen = () => {
  const user = useSelector(selectUser);
  return (
    <View>
      <ProfilePhoto source={{uri: user.photoURL}} />
      <ProfileName>{user.displayName}</ProfileName>
    </View>
  );
};

export default ProfileScreen;
