import React, {useEffect, useState, useLayoutEffect} from 'react';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FlatList, TouchableWithoutFeedback, Keyboard, Alert, View, SegmentedControlIOSComponent, Platform, StyleSheet, Text, KeyboardAvoidingView, ScrollView} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';

import UploadHeader from '~/Components/Presentational/UploadScreen/UploadHeader';
import { BaseRouter } from '@react-navigation/native';
import PostUpload from '~/Route/Post/Upload';
import ProductItem from '~/Components/Presentational/UploadScreen/ProductItem';
import SearchProductUrl from '~/Route/Post/POSTProductUrl';

const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #ffffff;
`;

const BottomBar = Styled.View`
width: ${wp('100%')};
height: ${hp('7.5%')};
padding: 10px;
flex-direction: row;
align-items: center;
border-top-width: 0.3px;
border-color: #c3c3c3;
`;

const HeaderContainer = Styled.View`
 width: ${wp('100%')};
 height: ${hp('10%')};
 flex-direction: row;
 align-items: center;
 justify-content:space-between;
 border-color: #c3c3c3;
`;


const HeaderBorder = Styled.View`
 width: ${wp('100%')};
 height: 0.3px;
 background-color: #c3c3c3;
`;


const LeftContainer = Styled.View`
background-color: #ffffff;
height: ${hp('10%')};
flex: 1;
align-items: center;
margin-top: 40px;
`;

const CenterContainer = Styled.View`
justify-content: center;
align-items: center;
height: ${hp('10%')};
flex: 7;
margin-top: 10px;
`;

const RightContainer = Styled.View`
align-items: center;
background-color: #ffffff;
height: ${hp('10%')};
margin-top: 40px;
flex: 1;
`;

const MainTagText = Styled.Text`
 font-size: 16px;
 margin-left: 6px;
`;

const RatingContainer = Styled.View`
 flex-direction: row;
`;

const RatingStarImage = Styled.Image`
 margin-left: -2px;
 width: 25px;
 height: 25px;
`;

const HalfRatingStarImage = Styled.Image`
 margin-left: 2px;
margin-right: 2px;
margin-top: 3px;
width: 18px;
height: 18px;
tint-color: #23E5D2;
`;

const BackButton = Styled.Image`
width: 11px;
height: 19px;
`;

const ButtonText = Styled.Text`
 font-size: 16px;
 color: #338EFC;
`;

const LocationPriceContainer = Styled.View`
 margin-top: 5px;
 flex-direction: row;
 justify-content: center;
 margin-bottom: 12px;
`;

const LocationContainer = Styled.View`
 flex-direction: row;
 justify-content: center;
 align-items: center;
`;

const LocationIcon = Styled.Image`
 width: 15px;
 height: 14px;
 tint-color: #707070;
`;

const LocationText = Styled.Text`
 font-size: 12px;
 margin-left: 4px;
 color: #707070;
`;

const ExpenseContainer = Styled.View`
 flex-direction: row;
 justify-content: center;
 align-items: center;
`;

const ExpenseIcon = Styled.Image`
margin-left: 10px;
 width: 16px;
 height: 15px;
 tint-color: #707070;
`;

const ExpenseText = Styled.Text`
 margin-left: 4px;
 font-size: 12px;
 color: #707070;
 font-weight: normal;
`;


const BodyContainer = Styled.View`
margin-top: 5px;
border-color: #eeeeee;
`;

const FooterContainer = Styled.View`
position: absolute;
bottom: 0;
background-color: #ffffff;
`;

const DescriptionInput = Styled.TextInput`
font-size: 13px;
`;

const DescriptionInputContainer = Styled.View`
padding: 5px 15px 15px 15px;
`;

const CameraButton = Styled.Image`
 margin-left: 15px;
 width: ${wp('8%')};
 height:${wp('6.2%')};
 tint-color: #707070;
`;

const LocationButton = Styled.Image`
margin-left: 30px;
 width: ${wp('6.5%')};
 height:${wp('6.5%')};
 tint-color: #707070;
`;

const LinkButton = Styled.Image`
margin-left: 30px;
 width: ${wp('6.0%')};
 height:${wp('6.0%')};
 tint-color: #707070;
`;

const TextParagraphContainer = Styled.View`
 border-top-width: 0.2px;
 border-color: #eeeeee;
 flex-direction: row;
 justify-content: space-between;
 align-items: center;
 background-color: #ffffff;
`;

const LastTextParagraphContainer = Styled.View`
 border-top-width: 0.2px;
 border-bottom-width: 0.2px;
 border-color: #eeeeee;
 flex-direction: row;
 justify-content: space-between;
 align-items: center;
 background-color: #ffffff;
`;

const DescriptionText = Styled.Text`
 font-size: 12px;
`;

const ImageParagraphContainer = Styled.View`
 border-top-width: 0.2px;
 border-color: #eeeeee;
 flex-direction: row;
 justify-content: space-between;
 align-items:center;
 background-color: #ffffff;
`;


const LastImageParagraphContainer = Styled.View`
 border-top-width: 0.2px;
 border-bottom-width: 0.2px;
 border-color: #eeeeee;
 flex-direction: row;
 justify-content: space-between;
 align-items:center;
 background-color: #ffffff;
`;


const ProductParagraphContainer = Styled.View`
 border-top-width: 0.2px;
 border-color: #eeeeee;
 flex-direction: row;
 justify-content: space-between;
 align-items:center;
 background-color: #ffffff;
`;


const LastProductParagraphContainer = Styled.View`
 border-top-width: 0.2px;
 border-bottom-width: 0.2px;
 border-color: #eeeeee;
 flex-direction: row;
 justify-content: space-between;
 align-items:center;
 background-color: #ffffff;
`;

const InsertedImage = Styled.Image`
 width: ${wp('25%')};
 height: ${wp('25%')};
`;

const ParagraphIcon = Styled.Image`
 width: 25px;
 height: 25px;
 margin-left: 15px;
 tint-color: #707070;
`;

const ParagraphIconContainer = Styled.View`
flex: 0.4;
justify-content: center;
align-items: center;
padding-top: 12px;
padding-bottom: 12px;
padding-right: 10px;
`;

const ParagraphContentContainer = Styled.View`
padding: 15px;
justify-content: center;
flex: 2.5;
`;

const EmptyContentContainer = Styled.View`
height: 100px;
`;



const AddProductContainer = Styled.View`
flex-direction: column;
justify-content: center;
align-items: center;
padding: 20px 20px 20px 20px;
width:${wp('100%')};
`;

const AddProductInputContainer = Styled.View`
width:${wp('100%')};
flex-direction: row;
justify-content: center;
align-items: center;
`;


const LinkButton2 = Styled.Image`
 width: ${wp('5.0%')};
 height:${wp('5.0%')};
 tint-color: #707070;
`;

const AddProductInput = Styled.TextInput`
margin-left: 5px;
font-size: 15px;
text-align: left;
width: ${wp('70%')};
padding-bottom: 5px;
padding-left: 5px;
border-bottom-width: 0.3px;
border-color: #c3c3c3;
`;

const AddProductSearchText = Styled.Text`
margin-left: 5px;
font-size: 16px;
color: #338EFC;
`;

const SearchProductResultContainer = Styled.View`
 width:${wp('100%')};
 margin-top: 10px;
 align-items: center;
`;

const ProductResultItemContainer = Styled.View`
 align-items: center;
 flex-direction: row;
`;

const ProductRegisterContainer = Styled.View`
 height: ${hp('10%')};
 padding-left: 10px;
 align-items: center;
 justify-content: center;
`;

const ProductRegisterText= Styled.Text`
 color: #338EFC;
 font-size: 18px;
`;


interface Props {
  navigation:any,
  route:any
}

const UploadScreen = ({navigation, route}:Props) => {
  return (
    <Container></Container>
  )
};

const styles = StyleSheet.create({
  shadow: { 
    
     },
})

export default UploadScreen;
