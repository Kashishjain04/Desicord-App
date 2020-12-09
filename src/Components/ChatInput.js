import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {selectChannelId, selectChannelName} from '../redux/features/AppSlice';
import {MessageInput, MessageInputContainer} from '../styles/Chats';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import {selectUser} from '../redux/features/UserSlice';
import {Keyboard, Platform} from 'react-native';

const ChatInput = () => {
  const [message, setMessage] = useState('');
  const chName = useSelector(selectChannelName);
  const chId = useSelector(selectChannelId);
  const user = useSelector(selectUser);
  const [height, setHeight] = useState(0);
  const sendHandler = () => {
    if (message.length === 0) {
      return alert('Invalid message');
    }
    firestore().collection('channels').doc(chId).collection('messages').add({
      message,
      timestamp: firestore.FieldValue.serverTimestamp(),
      user,
    });
    setMessage('');
  };
  Keyboard.addListener('keyboardDidShow', (e) => {
    setHeight(
      Platform.OS === 'android'
        ? e.endCoordinates.height + 10
        : e.endCoordinates.height - 15,
    );
  });
  Keyboard.addListener('keyboardDidHide', (e) => {
    setHeight(0);
  });
  return (
    <MessageInputContainer
      style={{backgroundColor: 'white', marginTop: height * -1}}>
      <MessageInput
        onChangeText={(value) => setMessage(value)}
        value={message}
        autoCorrect={false}
        autoCapitalize="none"
        placeholder={'Message #' + chName}
      />
      <FontAwesome
        onPress={sendHandler}
        name={'send-o'}
        size={25}
        color="black"
      />
    </MessageInputContainer>
  );
};

export default ChatInput;
