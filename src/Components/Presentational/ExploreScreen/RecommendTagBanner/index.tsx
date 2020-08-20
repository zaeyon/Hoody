import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {View, FlatList, TouchableWithoutFeedback} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch} from 'react-redux';
import allActions from '~/action';
import Swiper from 'react-native-swiper';

const Container = Styled.View`
 width: ${wp('100%')};
 height: ${wp('50%')};
`;

const BannerImage = Styled.Image`
flex:1;
width: ${wp('91.4%')};
height: ${wp('50%')};
border-radius: 10px;
`;

const TagNameText = Styled.Text`
font-weight: bold;
font-size: 22px;
color: #ffffff;
`;

const TagDescripText = Styled.Text`
font-weight: 600;
font-size: 17px;
color: #ffffff;
opacity: 0.8;
`;

const TagFeedCountText = Styled.Text`
font-weight: 600;
`;

const BannerContainer = Styled.View`
 flex: 1;
 background-color: #ffffff;
 padding-left: 16px;
 padding-right: 16px;
 padding-bottom: 8px;
`;

interface Props {
    trendTagsListData: Array<object>,
    navigation: any,
}

const RecommendTagBanner = ({trendTagsListData, navigation}: Props) => {
    const dispatch = useDispatch();

    const searchToTrendTag = (item: object) => {
        var trendTag = [{
            item : {
                id: item.id,
                name: item.name,
                reviewNum: item.reviewNum,
                selected: false,
                starRate: item.starRate,
            },
            type : "태그"
        }]
        dispatch(allActions.userActions.setInputedKeywordList(trendTag));

        setTimeout(() => {
            navigation.navigate("SearchResultScreen", {
                requestType: "trendTag"
            });
        }, 10)
    }
    
    return (
        <Container>
            <Swiper paginationStyle={{bottom:-5}} dotStyle={{width:5, height:5}} activeDotStyle={{backgroundColor:'#56575C', width:5, height:5}}>
                {trendTagsListData.map((item, index) => {
                    return (
                    <TouchableWithoutFeedback onPress={() => searchToTrendTag(item)}>
                    <BannerContainer>
                    <BannerImage
                    source={{uri:item.coverImg}}/>
                    </BannerContainer>
                    </TouchableWithoutFeedback>
                    )
                })}
            </Swiper>
        </Container>
    )
}

export default RecommendTagBanner;