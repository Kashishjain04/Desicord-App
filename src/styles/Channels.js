import styled from "styled-components";

export const JoinChannel = styled.TouchableOpacity`
  margin: 10px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  background-color: #34b7f1;
  border-radius: 10px;
`;

export const ChannelsContainer = styled.View`
  ${Platform.OS === "android" && "margin-top: 20px"};
  display: flex;
  justify-content: center;
  flex: 1;
  overflow: hidden;
`;

export const ChannelContainer = styled.TouchableOpacity`
  margin: 10px 0;
  height: 50px;
  padding: 0 10px;
`;

export const ChannelText = styled.View`
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding-left: 15px;
  background-color: #2f3135;
`;
