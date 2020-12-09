import { Platform } from "react-native";
import styled from "styled-components";
import { windowHeight, windowWidth } from "../utils/Dimensions";

export const MessageList = styled.FlatList`
  ${Platform.OS === "android" && "margin-top: 20px"};
  overflow: hidden;
  height: ${Platform.OS === "android"
    ? windowHeight - 145
    : windowHeight - 150}px;
  display: flex;
  flex-direction: column;
`;

export const MessageContainer = styled.View`
  width: ${windowWidth / 1.25}px;
  background: ${(props) => (props.myMessage ? "#acdecd" : "#ccc")};
  padding: 20px 10px;
  margin: 5px 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 20px;
  ${(props) => props.myMessage && "align-self: flex-end;"};
`;

export const MessageInfo = styled.View`
  font-size: 20px;
`;

export const MessageHeader = styled.View`
  margin-top: -13px;
  margin-bottom: 10px;
  font-size: 20px;
  display: flex;
  flex-direction: row;
  width: ${windowWidth / 1.35}px;
`;

export const MessageTimestamp = styled.Text`
  color: gray;
  text-align: right;
  font-size: 12px;
  position: absolute;
  right: 0;
`;

export const MessageInputContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-radius: 10px;
  padding-horizontal: 10px;
  margin-horizontal: 10px;
`;
export const MessageInput = styled.TextInput`
  flex: 1;
  height: 40px;
  padding: 0 10px;
`;
export const ChatDate = styled.View`
  padding: 5px 10px;
  margin: 10px auto;
  color: white;
  border-radius: 10px;
  background-color: #34b7f1;
`;
