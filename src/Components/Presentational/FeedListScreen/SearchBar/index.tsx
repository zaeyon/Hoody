import React, {useEffect, useState} from 'react';
import Styled from 'styled-components/native';
import {
    TouchableWithoutFeedback,
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const SearchBarContainer = Styled.View`
 align-items: center;
 justify-content: center;
 text-align: center;
 width: ${wp('83%')};
`;


const SearchBarInput = Styled.TextInput`
 margin-top: 3px;
 width: ${wp('83%')};
 height: ${hp('4.5%')};
 border-radius: 25px;
 background-color: #FFFFFF;
 justify-content: center;
 text-align: left;
 align-self: center;
 border-width: 1.5px;
 border-color: #23E5D2;
 padding-left: ${wp('8%')};
`;


const SearchIcon = Styled.Image`
flex:1;
 position: absolute;
 width: ${wp('5%')};
 height: ${wp('5%')};
 left: 0px;
 margin-left: 10px;
`;

const SearchTextContainer = Styled.View`
 width: ${wp('13%')};
 height: 40px;
 position: absolute;
 right: 5px;
 align-items: center;
 justify-content: center;
`;

const SearchText = Styled.Text`
 font-size: 13px;
 color: #000000;
`;

interface Props {
    onFocusSearch:Function
    changingSearchInput:Function
}

const SearchBar = ({onFocusSearch, changingSearchInput}: Props) => {
    return (
        <SearchBarContainer>
            <SearchBarInput
            autoCapitalize={false}
            placeholder="태그로 후기를 검색하세요."
            onFocus={() => onFocusSearch()}
            onChangeText={(text: string) => changingSearchInput(text)}
            />
            <SearchIcon
            source={require('~/Assets/Images/ic_searchh.png')}/>
        </SearchBarContainer>
    )
}

export default SearchBar;
