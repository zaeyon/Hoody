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

interface Props {
    navigation: any,
    recommendMainCollectionListData: Array<object>,
    recommendSubCollectionListData: Array<object>,
}

const RecommendCollectionList = ({navigation, recommendMainCollectionListData, recommendSubCollectionListData}: Props) => {
    const renderMainRecommendCollectionItem = ({item, index}: any) => {
        return (
        <MainRecommendCollectionItemContainer style={index !== 0 && styles.mainCollectionItem}>
            <MainRecommendCollectionItem
            collectionId={item.id}
            coverImage={item.thumbnailImg ? item.thumbnailImg : ""}
            name={item.name}
            nickname={item.user?.nickname}
            navigation={navigation}
            />
        </MainRecommendCollectionItemContainer>
        )
    }

    const renderSubRecommendCollectionItem = ({item, index}: any) => {
        return (
            <SubRecommendCollectionItemContainer style={index%3 !== 0 && styles.subCollectionItem}>
                <SubRecommendCollectionItem
                collectionId={item.id}
                coverImage={item.coverImg ? item.coverImg : ""}
                name={item.name}
                nickname={item.user.nickname}
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
                data={recommendMainCollectionListData}
                renderItem={renderMainRecommendCollectionItem}/>
            </MainRecommendCollectionContainer>
            <SubRecommendCollectionContainer>
                <FlatList
                contentContainerStyle={{backgroundColor:'#ffffff',  justifyContent: 'center', paddingLeft: 16}}
                columnWrapperStyle={{marginTop: 3}}
                horizontal={false}
                numColumns={3}
                data={recommendSubCollectionListData}
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