import React from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Container = Styled.View`
 width: ${wp('100%')};
 height: 50px;
 flex-direction: row;
 justify-content: space-between;
`;

const TagNameText = Styled.Text`
 font-weight: 500;
 font-size: 16px;
 color: #333333;
`;

const TagReviewCount = Styled.Text`
 font-size: 15px;
 color: #b9b9b9;
`;

const TagContainer = Styled.View`
padding: 10px 20px 10px 20px;
`;

const RemoveContainer = Styled.View`
padding: 10px 20px 10px 20px;
`;

const RemoveIcon = Styled.Image`
width: ${wp('4.3%')};
height: ${wp('4.3%')};
`;



const LatelySearchItem = ({item, index}) => {
    return (
    <Container>
        <TagContainer>
        <TagNameText>{"#" + item.name}</TagNameText>
        <TagReviewCount>{item.count + "개"}</TagReviewCount>
        </TagContainer>
        <RemoveContainer>
            <RemoveIcon
            source={require('~/Assets/Images/ic_recordRemove.png')}/>
        </RemoveContainer>
    </Container>
    )
}

export default LatelySearchItem;