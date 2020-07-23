import React from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp, 
} from 'react-native-responsive-screen';

const Container = Styled.View`
 width: ${wp('100%')};
 height: ${wp('17%')};
 background-color: #ffffff;
 aling-items: center;
 padding-left: 16px;
 padding-right: 16px;
`;

const TabContainer = Styled.View`
 flex-direction: row;
 align-items: center;
 border-bottom-width: 0.6px;
 border-color: #ECECEE;
`;

const SettingTabIconImage = Styled.Image`
 width: ${wp('6.4%')};
 height: ${wp('6.4%')};
`;

const SettingTabLabelText = Styled.Text`
 font-size: 18px;
 color: #1D1E1F;
`;
 

