import React from 'react';
import Styled from 'styled-components/native';
import {
    FlatList
} from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Container = Styled.View`
 background-color: #ffffff;
`;

const HeaderContainer = Styled.View`
 padding-top: 20px
 padding-left: 16px;
 padding-right: 16px;
 padding-bottom: 8px;
 background-color: #ffffff;
`;

const AgeGroupText = Styled.Text`
 font-weight: 600;
 font-size: 18px;
 color: #333333;
`;

const PopularTagListContainer = Styled.View`
`;

const UnselectPopularTagItemContainer = Styled.View`
 height: ${wp('8%')};
 justify-content: center;
 align-items: center;
 padding-left: 14px;
 padding-right: 14px;
 border-width: 1px;
 border-color: #267DFF;
 border-radius: 4px;
 background-color: 
`;

const PopularTagByAgeGroup = () => {
    return (
        <Container>
            <HeaderContainer>
                <AgeGroupText>20대 인기 태그</AgeGroupText>
            </HeaderContainer>
            <PopularTagListContainer>
                
            </PopularTagListContainer>
        </Container>
    )
}

export default PopularTagByAgeGroup;