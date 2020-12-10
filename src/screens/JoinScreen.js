import firestore from '@react-native-firebase/firestore';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import FormButton from '../Components/FormButton';
import FormInput from '../Components/FormInput';
import {setChannelInfo} from '../redux/features/AppSlice';
import {selectUser} from '../redux/features/UserSlice';
import messaging from '@react-native-firebase/messaging';

const JoinScreen = ({navigation}) => {
  const [channelId, setId] = useState('');
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const joinHandler = () => {
    if (channelId.length === 0) {
      return alert('Invalid Channel Name');
    }
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
            .catch(() => alert('Some error occurred'));
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
          return alert('Invalid channel Id');
        }
        navigation.navigate('Chat');
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Join a Channel</Text>
      <FormInput
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Channel Id"
        value={channelId}
        onChangeText={(val) => setId(val)}
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
