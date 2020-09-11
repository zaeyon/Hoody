import React, {useEffect, useState} from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {FlatList, SectionList, Picker, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import Modal from 'react-native-modal'
import {isIphoneX} from 'react-native-iphone-x-helper';

import ProfileListFeedItem from '~/Components/Presentational/ProfileScreen/ProfileListFeedItem';
import ProfileTileFeedItem from '~/Components/Presentational/ProfileScreen/ProfileTileFeedItem';
import FeedItem from '~/Components/Presentational/ProfileScreen/FeedItem';
import MemoizedFeedItem from '~/Components/Presentational/FeedListScreen/MomoizedFeedItem';

const UserFeedListContainer = Styled.View`
 width: ${wp('100%')};
 background-color: #ffffff;
`;

const ListTypeFeedContainer = Styled.View`
padding-bottom: ${isIphoneX() ? wp('8%') : wp('11%')};
`;

const TileTypeFeedContainer = Styled.View`
`;

const YearSelectContainer = Styled.View`
`;

const SelectingYearText = Styled.Text`
font-weight: bold;
font-size: 22px;
`;

const MonthSelectContainer = Styled.View`
`;

const SelectingMonthText = Styled.Text`
margin-left: 6px;
font-weight: bold;
font-size: 22px;
`;

const NoFeedContainer = Styled.View`
 width:${wp('100%')};
 margin-top: 180px;
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

const SelectingDateContainer = Styled.View`
padding-top: 15px;
padding-left: 16px;
padding-bottom: 0px;
padding-right: 16px;
flex-direction: row;
`;

const YearPickerContainer = Styled.View`
border-top-left-radius: 10px;
border-top-right-radius: 10px;
 width:${wp('100%')};
 height: ${wp('60%')};
 background-color: #ffffff;
`;

const MonthPickerContainer = Styled.View`
border-top-left-radius: 10px;
border-top-right-radius: 10px;
 width:${wp('100%')};
 height: ${wp('60%')};
 background-color: #ffffff;
`;


const PickerHeaderContainer = Styled.View`
 border-width: 0.6px;
 border-color: #ECECEE;
 width: ${wp('100%')};
 height: ${wp('11.2%')};
 background-color: #FAFAFA;
 flex-direction: row;
 justify-content: flex-end;
 align-items: center;
 padding-left: 16px;
 position: absolute;
 top: 0;
`;

const PickerFinishContainer = Styled.View`
padding-top: 12px;
padding-bottom: 12px;
padding-right: 16px
`;

const PickerFinishText = Styled.Text`
 font-size: 16px;
 color: #267DFF;
`;

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


  interface Props {
    navigation: any,
    route: any,
    feedListData: Array<object>
  }

const SearchFeedList = ({navigation, route, feedListData}: Props) => {
 
  
  const currentUser = useSelector((state) => state.currentUser);
  
    const renderSearchFeedItem = ({item, index}: any) => {
        return (
          <MemoizedFeedItem
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
          mediaFiles={item.mediaFiles}
          image_count={item.mediaFiles.length}
          location={item.address?item.address.address:null}
          expense={item.expense?item.expense:null}
          desArray={item.descriptions}
          navigation={navigation}
          productArray={item.Products}
          userLike={item.Likers}
          userScrap={item.Scraps}/>
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
         {feedListData[0] && (
        <ListTypeFeedContainer>
        <FlatList
        scrollEnabled={false}
scrollEventThrottle={5}
        data={feedListData}
        renderItem={renderSearchFeedItem}
        />
        </ListTypeFeedContainer>
         )}
       </UserFeedListContainer>
    )
}

const styles = StyleSheet.create({
  modalView: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});



export default SearchFeedList;
