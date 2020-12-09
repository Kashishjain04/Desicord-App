import React from 'react';
import {Text, View} from 'react-native';
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
      {/* <Avatar src={message.user.photo} /> */}
      {/* <Avatar
        size={50}
        rounded
        source={{
          uri:
            "https://lh3.googleusercontent.com/a-/AOh14GhfgSuVig-RNSusuO5_kYuCKLZEBIbxvssam3e8ng=s96-c",
        }}
      /> */}
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
