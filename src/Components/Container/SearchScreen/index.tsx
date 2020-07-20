import React from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #ffffff;
`;


const HeaderBar = Styled.View`
 width: ${wp('100%')};
 height: ${hp('6.5%')};
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 background-color:#ffffff;
 padding-bottom: 7px;
`;

const HeaderLeftContainer = Styled.View`
 padding-top: 12px;
 padding-left: 16px;
 padding-bottom: 16px;
`;

const HeaderBackIcon = Styled.Image`
 width: ${wp('6.4%')};
 height: ${wp('6.4%')};
`;

const HeaderRightContainer = Styled.View`
padding-left: 10px;
padding-right: 16px;
justify-content: center;
`;

const HeaderSearchText = Styled.Text`
 color: #267DFF;
 font-weight: 500;
 font-size: 17px;
`;

const HeaderSearchContainer = Styled.View`
`;

const SearchInputContainer = Styled.View`
justify-content: center;
align-items: center;
width: ${wp('73%')};
height: 36px;
border-radius: 40px;
background-color: #F3F3F3;
flex-direction: row;
`;

const SearchInput = Styled.TextInput`
 width: ${wp('79%')};
 height: 36px;
 padding-left: ${wp('8%')};
 font-size: 16px;
`;


const SearchIcon = Styled.Image`
position: absolute;
left: 13px;
 width: ${wp('4%')};
 height: ${wp('4%')};
 tint-color: #C6C7CC
`;

interface Props {
    navigation: any,
}

const SearchScreen = ({navigation}: Props) => {
    return (
        <Container>
            <HeaderBar>
            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <HeaderLeftContainer>
                <HeaderBackIcon
                source={require('~/Assets/Images/HeaderBar/ic_back.png')}/>
            </HeaderLeftContainer>
            </TouchableWithoutFeedback>
            <HeaderSearchContainer>
                <SearchInputContainer>
                    <SearchInput
                    placeholder={"검색"}
                    placeholderTextColor={"C6C7CC"}
                    autoFocus={true}
                    />
                </SearchInputContainer>
            </HeaderSearchContainer>
            <HeaderRightContainer>
                <HeaderSearchText>검색</HeaderSearchText>
            </HeaderRightContainer>
            </HeaderBar>
        </Container>

    )
}

export default SearchScreen;