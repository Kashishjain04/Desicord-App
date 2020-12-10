import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';
import {Keyboard, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import ChatInput from '../Components/ChatInput';
import Message from '../Components/Message';
import {selectChannelId} from '../redux/features/AppSlice';
import {ChatDate, MessageList} from '../styles/Chats';

const ChatScreen = () => {
  const chId = useSelector(selectChannelId);
  const [messages, setMessages] = useState([]);
  const [isMount, setMount] = useState(false);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    setMount(true);
    firestore()
      .collection('channels')
      .doc(chId)
      .collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot((snap) => setMessages(snap.docs.map((doc) => doc.data())));
  }, [chId]);

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

  return isMount === true ? (
    <View style={{display: "flex", justifyContent: "center"}}>
      <MessageList
      height={height}
        showsVerticalScrollIndicator={false}
        data={messages}
        keyExtractor={(item) => item.timestamp + item.user}
        renderItem={({item, index}) => {
          if (
            new Date(
              messages[index]?.timestamp?.toDate(),
            ).toLocaleDateString() !==
            new Date(
              messages[index - 1]?.timestamp?.toDate(),
            ).toLocaleDateString()
          ) {
            return (
              <>
                <ChatDate>
                  <Text style={{color: 'white'}}>
                    {new Date(
                      messages[index].timestamp?.toDate(),
                    ).toLocaleDateString()}
                  </Text>
                </ChatDate>
                <Message message={item} />
              </>
            );
          }
          return <Message message={item} />;
        }}
      />
      <ChatInput style={{}} />
    </View>
  ) : (
    <Text>Loading...</Text>
  );
};

export default ChatScreen;
