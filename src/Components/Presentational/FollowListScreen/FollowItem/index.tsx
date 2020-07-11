import React from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const FollowItemContainer = Styled.View`
 width: ${wp('100%')};
 height: ${wp('22%')};
 background-color: #ffffff;
 flex-direction: row;
 flex: 1;
 border-bottom-width: 0.6px;
 border-color: #eeeeee;
`;

const ProfileImageContainer = Styled.View`
padding-top: 14px;
padding-left: 16px;
`;

const ProfileImage = Styled.Image`
 border-radius: 100px;
 width: ${wp('13.3%')};
 height: ${wp('13.3%')};
 border-width: 0.5px;
 border-color: #f4f4f7;
`;

const IntroductionContainer = Styled.View`
flex: 1;
`;

const IntroTopContainer = Styled.View`
padding-top: 14px;
padding-left: 10px;
padding-right: 16px;
flex-direction: row;
justify-content: space-between;
`;

const NicknameText = Styled.Text`
 font-weight: 500;
 font-size: 16px;
 color: #333333;
`;

const FeedCountText = Styled.Text`
 margin-top: 3px;
 font-size: 14px;
 color: #cccccc;
`;

const NicknameFeedCountContainer = Styled.View`
flex-direction: column;
`;

const FollowButtonContainer = Styled.View`
`;

const FollowButton = Styled.View`
 width: ${wp('22%')};
 height: ${wp('8.4%')};
 background-color: #ffffff;
 border-radius: 20px;
 border-width: 1px;
 border-color: #77A7F1;
 justify-content: center;
 align-items: center;
`;

const FollowText = Styled.Text`
 font-size: 15px;
 color: #3384FF;
 font-weight: 500;
`;

const FollowingButton = Styled.View`
 width: ${wp('22%')};
 height: ${wp('8.4%')};
 background-color: #3384FF;
 border-radius: 20px;
 border-width: 1px;
 border-color: #77A7F1;
 justify-content: center;
 align-items: center;
`;

const FollowingText = Styled.Text`
font-size: 15px;
 color: #ffffff;
 font-weight: 500;
`;

const DescripContainer = Styled.View`
 padding-top: 5px;
 padding-bottom: 8px;
 padding-left: 10px;
 padding-right: 16px;
`;

const DescripText = Styled.Text`
 font-size: 14px;
 color: #50555C;
`;

interface Props {
    profileImageUri: string,
    nickname: string,
    feedCount: number,
    description: string,
    followState: boolean,
}

const FollowItem = ({profileImageUri, nickname, feedCount, description, followState}: Props) => {
    return (
        <FollowItemContainer>
            <ProfileImageContainer>
                <ProfileImage
                source={{uri:profileImageUri}}/>
            </ProfileImageContainer>
            <IntroductionContainer>
                <IntroTopContainer>
                <NicknameFeedCountContainer>
                <NicknameText>{nickname}</NicknameText>
                <FeedCountText>{"게시물 "+feedCount+"개"}</FeedCountText>
                </NicknameFeedCountContainer>
                <FollowButtonContainer>
                    {followState === false && (
                        <FollowButton>
                            <FollowText>팔로우</FollowText>
                        </FollowButton>
                    )}
                    {followState === true && (
                        <FollowingButton>
                            <FollowingText>팔로잉</FollowingText>
                        </FollowingButton>
                    )}
                </FollowButtonContainer>
                </IntroTopContainer>
                <DescripContainer>
                    <DescripText>{description}</DescripText>
                </DescripContainer>
            </IntroductionContainer>
        </FollowItemContainer>
    )
}

export default FollowItem;

