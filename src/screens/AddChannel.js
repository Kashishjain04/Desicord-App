/* eslint-disable no-alert */
import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import FormButton from '../Components/FormButton';
import FormInput from '../Components/FormInput';
import {setChannelInfo} from '../redux/features/AppSlice';
import messaging from '@react-native-firebase/messaging';
import {selectUser} from '../redux/features/UserSlice';

const AddChannel = ({navigation}) => {
  const _isMounted = useRef(true);
  const [isLoading, setLoading] = useState(false);
  const [channelName, setName] = useState('');
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  // cleanup code
  useEffect(() => {
    return () => {
      _isMounted.current = false;
    };
  }, []);

  // onSubmit
  const addHandler = () => {
    if (channelName.length === 0) {
      return alert('Invalid Channel Name');
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
                .add({
                  channelName,
                  fcmTokens: [res],
                })
                .then((doc) => {
                  alert('Create channel successfully');
                  firestore()
                    .collection('users')
                    .doc(user.uid)
                    .update({
                      channels: firestore.FieldValue.arrayUnion({
                        channelId: doc.id,
                        channelName,
                      }),
                    });
                  dispatch(
                    setChannelInfo({
                      channelId: doc.id,
                      channelName,
                    }),
                  );
                  navigation.navigate('Chat');
                });
            })
            .catch(() => {
              _isMounted.current && setLoading(false);
              alert('Some error occurred');
            });
        } else {
          return alert(
            'Unable to create channel, please provide notifications permissions first.',
          );
        }
      });
    // firestore().collection("channels").add({
    //   channelName,
    // });
  };

  // Render
  return isLoading ? (
    <ActivityIndicator
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
      size={Platform.OS === 'android' ? 50 : 'large'}
      color="#999"
    />
  ) : (
    <View style={styles.container}>
      <Text style={styles.text}>Create a Channel</Text>
      <FormInput
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="#channelName..."
        value={channelName}
        onChangeText={(val) => _isMounted.current && setName(val)}
      />
      <FormButton onPress={addHandler} buttonTitle="Submit" />
    </View>
  );
};

export default AddChannel;

// Styles
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
