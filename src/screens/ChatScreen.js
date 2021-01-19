import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, Keyboard, Platform, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import ChatInput from '../Components/ChatInput';
import Message from '../Components/Message';
import {selectChannelId} from '../redux/features/AppSlice';
import {ChatDate, MessageList} from '../styles/Chats';

const ChatScreen = () => {
  const _isMounted = useRef(true);

  const flatlist = useRef(null);
  const [isLoading, setLoading] = useState(true);
  const chId = useSelector(selectChannelId);
  const [messages, setMessages] = useState([]);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    firestore()
      .collection('channels')
      .doc(chId)
      .collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot((snap) => {
        setMessages(snap.docs.map((doc) => doc.data()));
        _isMounted.current && setLoading(false);
      });

    // cleanup
    return () => {
      _isMounted.current = false;
    };
  }, [chId]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp).getDate();
    const month = new Date(timestamp).getMonth();
    const year = new Date(timestamp).getFullYear();
    return `${date}/${month + 1}/${year}`;
  };

  Keyboard.addListener('keyboardDidShow', (e) => {
    _isMounted.current &&
      setHeight(
        Platform.OS === 'android'
          ? e.endCoordinates.height + 10
          : e.endCoordinates.height - 15,
      );
  });
  Keyboard.addListener('keyboardDidHide', (e) => {
    _isMounted.current && setHeight(0);
  });

  return isLoading ? (
    <ActivityIndicator
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
      size={Platform.OS === 'android' ? 50 : 'large'}
      color="#999"
    />
  ) : (
    <View style={{display: 'flex', justifyContent: 'center'}}>
      <MessageList
        height={height}
        showsVerticalScrollIndicator={false}
        data={messages}
        ref={flatlist}
        onContentSizeChange={() => flatlist.current.scrollToEnd()}
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
                    {formatDate(messages[index].timestamp?.toDate())}
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
  );
};

export default ChatScreen;
