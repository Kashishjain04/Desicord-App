import React from "react";
import { Text } from "react-native";
import { useDispatch } from "react-redux";
import { setChannelInfo } from "../redux/features/AppSlice";
import { ChannelContainer, ChannelText } from "../styles/Channels";

const Channel = ({ channelId, channelName, navigate }) => {
  const dispatch = useDispatch();
  const setChannel = () => {
    dispatch(
      setChannelInfo({
        channelId,
        channelName,
      })
    );
    navigate();
  };
  return (
    <ChannelContainer onPress={setChannel}>
      <ChannelText>
        <Text style={{ fontSize: 30, padding: 8, color: "#ccc" }}>
          # {channelName}
        </Text>
      </ChannelText>
    </ChannelContainer>
  );
};

export default Channel;
