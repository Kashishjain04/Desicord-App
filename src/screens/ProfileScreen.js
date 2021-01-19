import React, {useEffect, useRef} from 'react';
import {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {log} from 'react-native-reanimated';
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
    <View
      style={{
        flex: 0.5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ProfilePhoto
        source={{
          uri:
            'https://lh3.googleusercontent.com/a-/AOh14GhfgSuVig-RNSusuO5_kYuCKLZEBIbxvssam3e8ng=s96-c',
        }}
      />
      <ProfileName>{user.displayName}</ProfileName>
    </View>
  );
};

export default ProfileScreen;
