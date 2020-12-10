/* eslint-disable no-alert */
import firestore from '@react-native-firebase/firestore';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import FormButton from '../Components/FormButton';
import FormInput from '../Components/FormInput';
import {setChannelInfo} from '../redux/features/AppSlice';
import messaging from '@react-native-firebase/messaging';
import {selectUser} from '../redux/features/UserSlice';

const AddChannel = ({navigation}) => {
  const [channelName, setName] = useState('');
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const addHandler = () => {
    if (channelName.length === 0) {
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
            .catch(() => alert('Some error occurred'));
        }
      });
    // firestore().collection("channels").add({
    //   channelName,
    // });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create a Channel</Text>
      <FormInput
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="#channelName..."
        value={channelName}
        onChangeText={(val) => setName(val)}
      />
      <FormButton onPress={addHandler} buttonTitle="Submit" />
    </View>
  );
};

export default AddChannel;

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
