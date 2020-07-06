import React, {useEffect, useState} from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Text, FlatList, SectionList, View} from 'react-native';

import ProfileListFeedItem from '~/Components/Presentational/ProfileScreen/ProfileListFeedItem';
import ProfileTileFeedItem from '~/Components/Presentational/ProfileScreen/ProfileTileFeedItem';


const UserFeedListContainer = Styled.View`
 width: ${wp('100%')};
 background-color: #ffffff;
 flex:1;
`;

const ListTypeFeedContainer = Styled.View`
flex:1;
`;

const TileTypeFeedContainer = Styled.View`
flex:1;
`;

const MonthSelectContainer = Styled.View`
padding: 15px 16px 0px 16px;
`;

const SelectingMonthText = Styled.Text`
font-weight: bold;
font-size: 22px;
`;

const ExpanseDayText = Styled.Text`
font-weight: 600;
color: #333333;
background-color: #ffffff;
font-size: 18px;
`;

const ExpanseDaySectionListContainer = Styled.View`
padding: 15px 16px ${hp('8.5%')}px 16px;
`;

  interface Props {
    navigation: any,
    route: any,
    feedList: Array<object>,
    currentSortType: string
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

const ProfileFeedList = ({navigation, route, feedList, currentSortType}: Props) => {

  useEffect(() => {
    console.log("currentSortTypezzz", currentSortType);
  })

    const renderProfileListFeedItem = ({item, index}) => {
        return (
            <ProfileListFeedItem
            id={item.id}
            profile_image={item.user.profileImg}
            nickname={item.user.nickname}
            createdAt={item.createdAt}
            rating={item.starRate}
            main_tag={item.mainTags.name}
            sub_tag1={item.subTagOnes.name}
            sub_tag2={item.subTagTwos.name}
            like_count={item.likes}
            comment_count={12}
            scrap_count={23}
            mediaFiles={item.mediaFiles}
            image_count={item.mediaFiles.length}
            location={item.address.address}
            expanse={item.expanse}
            desArray={item.descriptions}
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
        {(currentSortType === 'list') && (
        <ListTypeFeedContainer>
        <FlatList
        data={feedList}
        renderItem={renderProfileListFeedItem}/>
        </ListTypeFeedContainer>
        )}
        {(currentSortType === 'tile') && (
        <TileTypeFeedContainer>
          <MonthSelectContainer>
            <SelectingMonthText>7월</SelectingMonthText>
          </MonthSelectContainer>
          <ExpanseDaySectionListContainer>
          {/*
          <FlatList
          data={TEST_SECTION_DATA}
          keyExtractor={(item, index) => item+index}
          renderItem={renderProfileTileFeedItem}
          />
          */}
          <SectionList
          sections={TEST_SECTION_DATA}
          renderItem={renderProfileTileSectionItem}
          renderSectionHeader={({ section: {title}}) => (
            <ExpanseDayText>{title}</ExpanseDayText>
          )}
          />
          </ExpanseDaySectionListContainer>
        </TileTypeFeedContainer>
        )}
       </UserFeedListContainer>
    )
}

export default ProfileFeedList;
