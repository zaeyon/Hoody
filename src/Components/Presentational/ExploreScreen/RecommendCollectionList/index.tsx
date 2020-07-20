import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import MainRecommendCollectionItem from '~/Components/Presentational/ExploreScreen/MainRecommendCollectionItem';
import SubRecommendCollectionItem from '~/Components/Presentational/ExploreScreen/SubRecommendCollectionItem';

const Container = Styled.View`
 background-color: #ffffff;
 flex:1;
`;

const HeaderContainer = Styled.View`
 padding-top: 20px;
 padding-left: 16px;
 padding-right: 16px;
 padding-bottom: 12px;
`;

const HeaderTitleText = Styled.Text`
 font-weight: 600;
 font-size: 18px;
 color: #1D1E1F;
`;

const MainRecommendCollectionContainer = Styled.View`
`;

const SubRecommendCollectionContainer = Styled.View`
 margin-top: 16px;
`;

const MainRecommendCollectionItemContainer = Styled.View`
`;

const SubRecommendCollectionItemContainer = Styled.View`
`;

const TEST_MAIN_RECOMMEND_COLLECTION_DATA = [
    {
        index: 1,
        coverImage: 'https://i.pinimg.com/564x/91/d0/27/91d027db14d4632fb134ac3686ed533a.jpg',
        name: '꽃구경',
        nickname: '나나'
    }, 
    {
        index: 2,
        coverImage: 'https://i.pinimg.com/564x/1e/c5/cf/1ec5cfe40a6ac6d18a551d6fbbcee181.jpg',
        name: '피크닉',
        nickname:'피크닉조아요'
    }
]

const TEST_SUB_RECOMMEND_COLLECTION_DATA = [
    {
        index: 1,
        coverImage: 'https://i.pinimg.com/564x/91/d0/27/91d027db14d4632fb134ac3686ed533a.jpg',
        name: '꽃구경',
        nickname: '나나'
    }, 
    {
        index: 2,
        coverImage: 'https://i.pinimg.com/564x/1e/c5/cf/1ec5cfe40a6ac6d18a551d6fbbcee181.jpg',
        name: '피크닉',
        nickname:'피크닉조아요'
    },
    {
        index: 3,
        coverImage: 'https://i.pinimg.com/564x/1e/c5/cf/1ec5cfe40a6ac6d18a551d6fbbcee181.jpg',
        name: '피크닉',
        nickname:'피크닉조아요'
    },
]

interface Props {
    navigation: any,
}

const RecommendCollectionList = ({navigation}: Props) => {

    const renderMainRecommendCollectionItem = ({item, index}: any) => {
        return (
        <MainRecommendCollectionItemContainer style={index !== 0 && styles.mainCollectionItem}>
            <MainRecommendCollectionItem
            coverImage={item.coverImage}
            name={item.name}
            nickname={item.nickname}
            navigation={navigation}
            />
        </MainRecommendCollectionItemContainer>
        )
    }

    const renderSubRecommendCollectionItem = ({item, index}: any) => {
        return (
            <SubRecommendCollectionItemContainer style={index !== 0 && styles.subCollectionItem}>
                <SubRecommendCollectionItem
                coverImage={item.coverImage}
                name={item.name}
                nickname={item.nickname}
                navigation={navigation}/>
            </SubRecommendCollectionItemContainer>
        )
    } 
    return (
        <Container>
            <HeaderContainer>
            <HeaderTitleText>추천 컬렉션</HeaderTitleText>
            </HeaderContainer>
            <MainRecommendCollectionContainer>
                <FlatList
                contentContainerStyle={{backgroundColor:'#ffffff',  justifyContent: 'center', alignItems:'center'}}
                horizontal={false}
                numColumns={2}
                data={TEST_MAIN_RECOMMEND_COLLECTION_DATA}
                renderItem={renderMainRecommendCollectionItem}/>
            </MainRecommendCollectionContainer>
            <SubRecommendCollectionContainer>
                <FlatList
                contentContainerStyle={{backgroundColor:'#ffffff',  justifyContent: 'center', alignItems:'center'}}
                horizontal={false}
                numColumns={3}
                data={TEST_SUB_RECOMMEND_COLLECTION_DATA}
                renderItem={renderSubRecommendCollectionItem}/>
            </SubRecommendCollectionContainer>
        </Container>
    )
}

const styles = StyleSheet.create({
   mainCollectionItem : {
       marginLeft: 15,
   },
   subCollectionItem : {
       marginLeft: 9.5
   }
})



export default RecommendCollectionList;