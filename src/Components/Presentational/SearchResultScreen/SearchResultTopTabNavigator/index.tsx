import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {
    FlatList,
    ScrollView,
    TouchableWithoutFeedback,
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

// Local Component;
import FeedItem from '~/Components/Presentational/SearchResultScreen/FeedItem';

const Container = Styled.View`
 flex: 1;
 background-color: #FFFFFF;
 padding-bottom: 40px;
`;

const FeedListTabContainer = Styled.View`
flex: 1;
background-color: #ffffff;
`;

const CollectionListTabContainer = Styled.View`
flex: 1;
background-color: #ffffff;
`;

interface Props {
    feedResultListData: any,
    collectionResultListData: any,
    navigation: any,
}

const SearchResultTopTabNavigator = ({feedResultListData, collectionResultListData, navigation}: Props) => {
    const SearchResultTab = createMaterialTopTabNavigator();

    const renderFeedItem = ({item, index}: any) => {
        return (
            <FeedItem
                  id={item.id}
                  profile_image={item.user.profileImg}
                  nickname={item.user.nickname}
                  createdAt={item.createdAt}
                  rating={item.starRate}
                  main_tag={item.mainTags.name}
                  sub_tag1={item.subTagOnes?item.subTagOnes.name:null}
                  sub_tag2={item.subTagTwos?item.subTagTwos.name:null}
                  like_count={item.likes}
                  comment_count={item.commentsCount}
                  reply_count={item.replysCount}
                  scrap_count={item.scrapsCount}
                  mediaFiles={item.mediaFiles}
                  image_count={item.mediaFiles.length}
                  location={item.address?item.address.address:null}
                  expense={item.expense?item.expense:null}
                  desArray={item.descriptions}
                  navigation={navigation}
                />
        )
    }

    function FeedListTab() {
        return (
            <FeedListTabContainer>
                <FlatList
                showsVerticalScrollIndicator={false}
                keyExtractor={(index: any) => index}
                data={feedResultListData}
                renderItem={renderFeedItem}/>
            </FeedListTabContainer>
        )
    }

    function CollectionListTab() {
        return (
            <CollectionListTabContainer>
            </CollectionListTabContainer>
        )
    }

    return (
        <Container>
            <SearchResultTab.Navigator
            initialRouteName="게시글"
            swipeEnabled={true}
            tabBarOptions={{
                indicatorStyle: {backgroundColor: '#000000', height: 2},
                labelStyle: {fontSize: 16, fontWeight: '600'}
            }}>
                <SearchResultTab.Screen name="게시글" component={FeedListTab}/>
                <SearchResultTab.Screen name="컬렉션" component={CollectionListTab}/>
            </SearchResultTab.Navigator>
        </Container>
    )
}

export default SearchResultTopTabNavigator;