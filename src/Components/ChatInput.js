import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {selectChannelId, selectChannelName} from '../redux/features/AppSlice';
import {MessageInput, MessageInputContainer} from '../styles/Chats';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import {selectUser} from '../redux/features/UserSlice';

const ChatInput = () => {
  const _isMounted = useRef(true);
  const [message, setMessage] = useState('');
  const chName = useSelector(selectChannelName);
  const chId = useSelector(selectChannelId);
  const user = useSelector(selectUser);

  useEffect(() => {
    // works as componentWillUnmount
    return () => {
      _isMounted.current = false;
    };
  });

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

  return (
    <MessageInputContainer style={{backgroundColor: 'white', marginBottom: 10}}>
      <MessageInput
        onChangeText={(value) => {
          setMessage(value);
        }}
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
