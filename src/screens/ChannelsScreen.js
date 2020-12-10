/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import Channel from '../Components/Channel';
import {ChannelsContainer, JoinChannel} from '../styles/Channels';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {selectUser} from '../redux/features/UserSlice';
import {FlatList} from 'react-native-gesture-handler';
const ChannelsScreen = ({navigation}) => {
  // const dispatch = useDispatch();
  const [channels, setChannels] = useState([]);
  const user = useSelector(selectUser);
  useEffect(() => {
    firestore()
      .collection('users')
      .doc(user.uid)
      .onSnapshot((snap) => setChannels(snap.data().channels));
  }, []);
  return (
    <ChannelsContainer>
      <JoinChannel onPress={() => navigation.navigate('Join')}>
        <Text>Join Channel</Text>
      </JoinChannel>
      <FlatList
        data={channels}
        keyExtractor={(item) => item.channelId}
        renderItem={({item}) => (
          <Channel
            channelId={item.channelId}
            channelName={item.channelName}
            navigate={() => navigation.navigate('Chat')}
          />
        )}
      />
      {/* <SidebarChannel
          key={1}
          channelId={"channelId"}
          channelName={"channelName"}
          navigate={() => navigation.navigate("Chat")}
        />
        <SidebarChannel
          key={2}
          channelId={"channelId"}
          channelName={"channelName1"}
          navigate={() => navigation.navigate("Chat")}
        />
        <SidebarChannel
          key={3}
          channelId={"channelId"}
          channelName={"channelName2"}
          navigate={() => navigation.navigate("Chat")}
        />
        <SidebarChannel
          key={4}
          channelId={"channelId"}
          channelName={"channelName2"}
          navigate={() => navigation.navigate("Chat")}
        />
        <SidebarChannel
          key={5}
          channelId={"channelId"}
          channelName={"channelName2"}
          navigate={() => navigation.navigate("Chat")}
        />
        <SidebarChannel
          key={6}
          channelId={"channelId"}
          channelName={"channelName2"}
          navigate={() => navigation.navigate("Chat")}
        />
        <SidebarChannel
          key={7}
          channelId={"channelId"}
          channelName={"channelName2"}
          navigate={() => navigation.navigate("Chat")}
        />
        <SidebarChannel
          key={8}
          channelId={"channelId"}
          channelName={"channelName2"}
          navigate={() => navigation.navigate("Chat")}
        />
        <SidebarChannel
          key={9}
          channelId={"channelId"}
          channelName={"channelName2"}
          navigate={() => navigation.navigate("Chat")}
        />
        <SidebarChannel
          key={10}
          channelId={"channelId"}
          channelName={"channelName2"}
          navigate={() => navigation.navigate("Chat")}
        />
        <SidebarChannel
          key={11}
          channelId={"channelId"}
          channelName={"channelName2"}
          navigate={() => navigation.navigate("Chat")}
        />
        <SidebarChannel
          key={12}
          channelId={"channelId"}
          channelName={"channelName2"}
          navigate={() => navigation.navigate("Chat")}
        /> */}
    </ChannelsContainer>
  );
};

export default ChannelsScreen;
