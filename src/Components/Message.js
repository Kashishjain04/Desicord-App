import React from 'react';
import {Text} from 'react-native';
import {useSelector} from 'react-redux';
import {selectUser} from '../redux/features/UserSlice';
import {
  MessageContainer,
  MessageHeader,
  MessageInfo,
  MessageTimestamp,
} from '../styles/Chats';

const Message = ({message}) => {
  const user = useSelector(selectUser);
  const myMessage = message.user.email === user.email;
  return (
    <MessageContainer myMessage={myMessage}>
      <MessageInfo>
        <MessageHeader>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>
            {message.user.displayName}
          </Text>
          <MessageTimestamp>
            {new Date(message.timestamp?.toDate()).toLocaleTimeString()}
          </MessageTimestamp>
        </MessageHeader>
        <Text>{message.message}</Text>
      </MessageInfo>
    </MessageContainer>
  );
};

export default Message;
