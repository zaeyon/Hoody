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



const TagAutoCompleteItem = ({item, index}) => {
    return (
    <Container>
        <TagContainer>
        <TagNameText>{"#" + item.name}</TagNameText>
        <TagReviewCount>{item.count + "개"}</TagReviewCount>
        </TagContainer>
    </Container>
    )
}

export default TagAutoCompleteItem;



