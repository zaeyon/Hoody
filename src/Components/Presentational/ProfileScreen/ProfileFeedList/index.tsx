import React, {useEffect, useState} from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Text, FlatList, SectionList, View, Animated} from 'react-native';

import ProfileListFeedItem from '~/Components/Presentational/ProfileScreen/ProfileListFeedItem';
import ProfileTileFeedItem from '~/Components/Presentational/ProfileScreen/ProfileTileFeedItem';


const UserFeedListContainer = Styled.View`
 width: ${wp('100%')};
 background-color: #ffffff;
 padding-bottom: 40px;
`;

const ListTypeFeedContainer = Styled.View`

`;

const TileTypeFeedContainer = Styled.View`
`;

const MonthSelectContainer = Styled.View`
padding: 15px 16px 0px 16px;
`;

const SelectingMonthText = Styled.Text`
font-weight: bold;
font-size: 22px;
`;

const NoFeedContainer = Styled.View`
 width:${wp('100%')};
 margin-top: 200px;
 align-items: center;
`;

const NoFeedText = Styled.Text`
 font-size: 16px;
 color: #4B4B4B;
`;

const ExpenseDayText = Styled.Text`
font-weight: 600;
color: #333333;
background-color: #ffffff;
font-size: 18px;
`;

const ExpenseDaySectionListContainer = Styled.View`
padding: 15px 16px ${hp('8.5%')}px 16px;
`;

  interface Props {
    navigation: any,
    route: any,
    feedListData: Array<object>,
    currentSortType: string
    onScrollPostList: () => void,
    scrollOffsetY: any,
  }

  const TEST_SECTION_DATA = [
    {
      title: '30일',
      data: [['2']]
    },
    {
      title: '28일',
      data: [['1', '2', '3']]
    },
    {
      title: '20일',
      data: [['1', '2',' 3', '4']]
    },
    {
      title: '3일',
      data: [['1', '2']]
    }
  ]

const ProfileFeedList = ({navigation, route, feedListData, currentSortType, onScrollPostList, scrollOffsetY}: Props) => {

  useEffect(() => {
    console.log("ProfileFeedList feedListData", feedListData)

  }, [feedListData])

    const renderProfileListFeedItem = ({item, index}) => {
        return (
            <ProfileListFeedItem
            id={item.id}
            profile_image={item.user.profileImg}
            nickname={item.user.nickname}
            createdAt={item.createdAt}
            rating={item.starRate}
            main_tag={item.mainTags.name}
            sub_tag1={item.subTagOnes?item.subTagOnes.name:null}
            sub_tag2={item.subTagTwos?item.subTagTwos.name:null}
            like_count={item.Likers.length}
            comment_count={item.comments.length}
            scrap_count={item.Scraps.length}
            mediaFiles={item.mediaFiles}
            image_count={item.mediaFiles.length}
            location={item.address?item.address.address:null}
            expense={item.expense?item.expense:null}
            descripArray={item.descriptions}
            navigation={navigation}
          />
        )
    }

    const renderProfileTileFeedItem = ({item, index}) => {
      return (
        <FlatList
        data={item}
        numColumns={2}
        renderItem={({item, index}) => {
          return (
            <ProfileTileFeedItem/>
          )
        }}/>
      )
    }

    const renderProfileTileSectionItem = ({item, index}) => {
      console.log("sectionItem item", item);
      return (
        <FlatList
        columnWrapperStyle={{justifyContent:'space-between', paddingRight: 15, marginVertical:6}}
        data={item}
        numColumns={2}
        renderItem={({item, index}) => {
          return (
            <ProfileTileFeedItem/>
          )
        }}/>
      )
    }


    return (
        <UserFeedListContainer>
          {!feedListData[0] && (
        <NoFeedContainer>
        <NoFeedText>
          등록된 후기가 없어요.
        </NoFeedText>
      </NoFeedContainer>
          )}
         {(currentSortType === 'list') && feedListData[0] && (
        <ListTypeFeedContainer>
        <FlatList
        scrollEnabled={false}
scrollEventThrottle={5}
        data={feedListData}
        renderItem={renderProfileListFeedItem}
        />
        </ListTypeFeedContainer>
         )}
        {(currentSortType === 'tile')  && feedListData[0] && (
        <TileTypeFeedContainer>
          <MonthSelectContainer>
            <SelectingMonthText>7월</SelectingMonthText>
          </MonthSelectContainer>
          <ExpenseDaySectionListContainer>
          <SectionList
          scrollEnabled={false}
          onScroll={onScrollPostList}
          sections={TEST_SECTION_DATA}
          renderItem={renderProfileTileSectionItem}
          renderSectionHeader={({ section: {title}}) => (
            <ExpenseDayText>{title}</ExpenseDayText>
          )}
          />
          </ExpenseDaySectionListContainer>
        </TileTypeFeedContainer>
        )}
       </UserFeedListContainer>
    )
}

export default ProfileFeedList;
