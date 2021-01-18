/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, Text} from 'react-native';
import Channel from '../Components/Channel';
import {ChannelsContainer, JoinChannel} from '../styles/Channels';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {selectUser} from '../redux/features/UserSlice';
import {FlatList} from 'react-native-gesture-handler';
import messaging from '@react-native-firebase/messaging';

const ChannelsScreen = ({navigation}) => {
  const _isMounted = useRef(true);

  const [isLoading, setLoading] = useState(true);
  const [channels, setChannels] = useState([]);
  const user = useSelector(selectUser);

  useEffect(() => {
    firestore()
      .collection('users')
      .doc(user.uid)
      .onSnapshot((snap) => {
        // set current user's channels
        _isMounted.current && setChannels(snap.data().channels);
        setLoading(false);
        // update device messaging token in channel db
        messaging()
          .hasPermission()
          .then((res) => {
            if (res > 0) {
              messaging()
                .getToken()
                .then((token) => {
                  snap.data().channels.forEach((channel) => {
                    firestore()
                      .collection('channels')
                      .doc(channel.channelId)
                      .update({
                        fcmTokens: firestore.FieldValue.arrayUnion(token),
                      });
                  });
                });
            }
          });
      });

    // Cleanup oncomponentWillUnmount
    return () => {
      _isMounted.current = false;
    };
  }, []);

  return isLoading ? (
    <ActivityIndicator
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
      size={Platform.OS === 'android' ? 50 : 'large'}
      color="#999"
    />
  ) : (
    <ChannelsContainer>
      <JoinChannel onPress={() => navigation.navigate('Join')}>
        <Text style={{fontSize: 17}}>Join Channel</Text>
      </JoinChannel>
      <FlatList
        data={channels}
        keyExtractor={(item) => item.channelId}
        renderItem={({item}) => (
          <Channel
            channelId={item.channelId}
            channelName={item.channelName}
            navigate={() => navigation.navigate('Chat')}
          />
        )}
      />
    </ChannelsContainer>
  );
};

export default ChannelsScreen;
