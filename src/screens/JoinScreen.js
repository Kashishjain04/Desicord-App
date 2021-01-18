import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import FormButton from '../Components/FormButton';
import FormInput from '../Components/FormInput';
import {setChannelInfo} from '../redux/features/AppSlice';
import {selectUser} from '../redux/features/UserSlice';
import messaging from '@react-native-firebase/messaging';

const JoinScreen = ({navigation}) => {
  const _isMounted = useRef(true);

  const [isLoading, setLoading] = useState(false);
  const [channelId, setId] = useState('');
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  // cleanup
  useEffect(() => {
    return () => {
      _isMounted.current = false;
    };
  }, []);

  const joinHandler = () => {
    if (channelId.length === 0) {
      return alert('Invalid Channel ID');
    }
    _isMounted.current && setLoading(true);
    messaging()
      .hasPermission()
      .then((result) => {
        if (result > 0) {
          messaging()
            .getToken()
            .then((res) => {
              firestore()
                .collection('channels')
                .doc(channelId)
                .update({fcmTokens: firestore.FieldValue.arrayUnion(res)});
            })
            .catch(() => {
              _isMounted.current && setLoading(false);
              alert('Some error occurred');
            });
        }
      });
    firestore()
      .collection('channels')
      .doc(channelId)
      .onSnapshot((snap) => {
        if (snap.exists) {
          firestore()
            .collection('users')
            .doc(user.uid)
            .update({
              channels: firestore.FieldValue.arrayUnion({
                channelId,
                channelName: snap.data().channelName,
              }),
            });
          dispatch(
            setChannelInfo({
              channelId,
              channelName: snap.data().channelName,
            }),
          );
        } else {
          _isMounted.current && setLoading(false);
          return alert('Invalid channel Id');
        }
        navigation.navigate('Chat');
      });
  };

  return isLoading ? (
    <ActivityIndicator
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
      size={Platform.OS === 'android' ? 50 : 'large'}
      color="#999"
    />
  ) : (
    <View style={styles.container}>
      <Text style={styles.text}>Join a Channel</Text>
      <FormInput
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Channel Id"
        value={channelId}
        onChangeText={(val) => _isMounted.current && setId(val)}
      />
      <FormButton onPress={joinHandler} buttonTitle="Submit" />
    </View>
  );
};

export default JoinScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
