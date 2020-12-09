import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  Card,
  Divider,
  Interaction,
  InteractionText,
  InteractionWrapper,
  PostImg,
  PostText,
  PostTime,
  UserImg,
  UserInfo,
  UserInfoText,
  UserName,
} from '../styles/FeedStyles';
// require("../../assets/users/user-1.jpg")

const PostCard = ({data}) => {
  return (
    <Card>
      <UserInfo>
        <UserImg source={data.userImg} />
        <UserInfoText>
          <UserName>{data.userName}</UserName>
          <PostTime>{data.postTime}</PostTime>
        </UserInfoText>
      </UserInfo>
      <PostText>{data.PostText}</PostText>
      {data.postImg !== 'none' ? (
        <PostImg source={data.postImg} />
      ) : (
        <Divider />
      )}
      <InteractionWrapper>
        <Interaction active={data.liked}>
          <FontAwesome
            name={data.liked ? 'heart' : 'heart-o'}
            color={data.liked ? '#2e64e5' : '#000'}
            size={25}
          />
          <InteractionText active={data.liked}>
            {data.likes} Likes
          </InteractionText>
        </Interaction>
        <Interaction>
          <FontAwesome name={'comment-o'} size={25} />
          <InteractionText>{data.comments} Comments</InteractionText>
        </Interaction>
      </InteractionWrapper>
    </Card>
  );
};

export default PostCard;
