import firestore from '@react-native-firebase/firestore';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import FormButton from '../Components/FormButton';
import FormInput from '../Components/FormInput';
import {setChannelInfo} from '../redux/features/AppSlice';

const AddChannel = ({navigation}) => {
  const [channelName, setName] = useState('');
  const dispatch = useDispatch();
  const addHandler = () => {
    if (channelName.length === 0) {
      return alert('Invalid Channel Name');
    }
    firestore()
      .collection('channels')
      .add({
        channelName,
      })
      .then((doc) => {
        alert('Create channel successfully');
        dispatch(
          setChannelInfo({
            channelId: doc.id,
            channelName,
          }),
        );
        navigation.navigate('Chat');
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
    position: 'absolute',
    top: 60,
  },
});
