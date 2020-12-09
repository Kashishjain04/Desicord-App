import styled from "styled-components";
import { windowWidth } from "../utils/Dimensions";

export const ProfilePhoto = styled.Image`
  width: ${windowWidth}px;
  height: 200px;
  margin-bottom: 15px;
`;

export const ProfileName = styled.Text`
  font-size: 30px;
  font-weight: bold;
  margin: auto;
`;
