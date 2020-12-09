import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import ChatInput from '../Components/ChatInput';
import Message from '../Components/Message';
import {selectChannelId} from '../redux/features/AppSlice';
import {ChatDate, MessageList} from '../styles/Chats';

const ChatScreen = () => {
  const chId = useSelector(selectChannelId);
  const [messages, setMessages] = useState([]);
  const [isMount, setMount] = useState(false);
  useEffect(() => {
    setMount(true);
    firestore()
      .collection('channels')
      .doc(chId)
      .collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot((snap) => setMessages(snap.docs.map((doc) => doc.data())));
  }, [chId]);
  return isMount === true ? (
    <View>
      <MessageList
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
