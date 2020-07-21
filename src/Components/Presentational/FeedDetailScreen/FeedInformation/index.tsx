import React from 'react';
import {TouchableWithoutFeedback} from 'react-native'
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Container = Styled.View`
background-color: #ffffff;
border-bottom-width: 0.6px;
border-color: #ECECEE;
padding-bottom: 17px;
`;

const ProfileInfoContainer = Styled.View`
 flex-direction: row;
padding-top: 6px;
padding-bottom: 8px;
padding-left: 16px;
padding-right: 16px;
align-items: center;
`;

const WriterProfileContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const ProfileImage = Styled.Image`
width: ${wp('6.9%')};
height: ${wp('6.9%')};
border-radius: 40px;
`;

const ProfileNicknameText = Styled.Text`
margin-left: 9px;
color: #1D1E1F;
font-size: 15px;
`;

const CreatedAtText = Styled.Text`
margin-left: 5px;
font-size: 15px;
color: #8E9199; 
`;

const TagListContainer = Styled.View`
padding-top: 8px;
padding-bottom: 8px;
padding-left: 16px;
padding-right: 16px;
`;

const MainTagText = Styled.Text`
 font-size: 22px;
 font-weight: 600;
 color: #267DFF;
 margin-right: 7px;
`;

const SubTagText = Styled.Text`
color: #8E9199;
font-size: 22px;
font-weight: 600;
`;

const RatingExpensePriceInfoContainer = Styled.View`
padding-top: 4px;
padding-bottom: 4px;
padding-left: 16px;
padding-right: 16px;
flex-direction: row;
`;

const RatingStarImage = Styled.Image`
 width: ${wp('4.2%')};
 height: ${wp('4.2%')};
`;

const RatingText = Styled.Text`
 margin-left: 3px;
 color: #56575C;
 font-size: 15px;
 font-weight: 500;
`;

const InfoHorizontalBorder = Styled.View`
 width: 1px;
 height: 15px;
 background-color: #ECECEE;
 margin-left: 8px;
 margin-right: 8px;
`;

const ExpensePriceText = Styled.Text`
color: #56575C;
font-size: 15px;
font-weight: 500;
`;

const LocationExpenseDateInfoContainer = Styled.View`
padding-top: 4px;
padding-left: 16px;
padding-right: 16px;
`;

const LocationText = Styled.Text`
font-size: 15px;
color: #8E9199;
`;

const ExpenseDateText = Styled.Text`
 font-size: 15px;
 color: #8E9199;
`;

interface Props {
    profileImage: string,
    profileNickname: string,
    createdAt: string,
    mainTag: string,
    subTag1: string,
    subTag2: string,
    rating: number,
    expensePrice: string,
    location: string,
    expenseDate: string,
    moveToWriterProfile: () => void,
}

const FeedInformation = ({profileImage, profileNickname, createdAt, mainTag, subTag1, subTag2, rating, expensePrice, location, expenseDate, moveToWriterProfile}: Props) => {
    return (
        <Container>
            <ProfileInfoContainer>
                <TouchableWithoutFeedback onPress={() => moveToWriterProfile()}>
                <WriterProfileContainer>
                <ProfileImage
                source={{uri: profileImage}}
                />
                <ProfileNicknameText>{profileNickname}</ProfileNicknameText>
                </WriterProfileContainer>
                </TouchableWithoutFeedback>
                <CreatedAtText>{createdAt}</CreatedAtText>
            </ProfileInfoContainer>
            <TagListContainer>
                <MainTagText>
                    {"#" + mainTag}
                    <SubTagText>
                        {" #" + subTag1}
                        <SubTagText>
                            {" #" + subTag2}
                        </SubTagText>
                    </SubTagText>
                </MainTagText>
            </TagListContainer>
            <RatingExpensePriceInfoContainer>
                <RatingStarImage
                source={require('~/Assets/Images/ic_newStar.png')}/>
                <RatingText>{rating}</RatingText>
                <InfoHorizontalBorder/>
                <ExpensePriceText>{expensePrice}</ExpensePriceText>
            </RatingExpensePriceInfoContainer>
            <LocationExpenseDateInfoContainer>
                <LocationText>
                    {location + " · "}
                    <ExpenseDateText>
                        {"소비날짜 " + expenseDate}
                    </ExpenseDateText>
                </LocationText>
            </LocationExpenseDateInfoContainer>
        </Container>
    )
}

export default FeedInformation;