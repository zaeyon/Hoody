import React, {useEffect, useState} from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {FlatList, SectionList, Picker, TouchableWithoutFeedback, StyleSheet, ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';
import {isIphoneX} from 'react-native-iphone-x-helper';

import ProfileListFeedItem from '~/Components/Presentational/ProfileScreen/ProfileListFeedItem';
import TileFeedItem from '~/Components/Presentational/TileFeedItem';
import FeedItem from '~/Components/Presentational/ProfileScreen/FeedItem';
import MemoizedFeedItem from '~/Components/Presentational/FeedListScreen/MemoizedFeedItem';

const UserFeedListContainer = Styled.View`
 width: ${wp('100%')};
 background-color: #ffffff;
`;

const ListTypeFeedContainer = Styled.View`
padding-bottom: ${isIphoneX() ? wp('12%') : wp('15%')};
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
flex-direction: row;
align-items: center;
`;

const SelectingMonthText = Styled.Text`
margin-left: 6px;
font-weight: bold;
font-size: 22px;
`;

const NoFeedContainer = Styled.View`
 width:${wp('100%')};
 padding-top: ${hp('17%')}px;
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

const LoadingContainer = Styled.View`
 align-items: center;
 margin-top: ${hp('20%')};
 width: ${wp('100%')};
 height: ${hp('100%')};
 background-color: #FFFFFF;
`;

const DropdownIcon = Styled.Image`
 width: ${wp('3.2%')};
 height: ${wp('3.2%')};
`;


const NoFeedEmoji = Styled.Image`
 width: ${wp('6.4%')};
 height: ${wp('6.4%')};
`;

const NoFeedMainText = Styled.Text`
margin-top: 8px;
font-weight: 600;
color: #1D1E1F;
font-size: 18px;

`;

const NoFeedSubText = Styled.Text`
margin-top: 5px;
font-size: 15px;
color: #56575C;
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
    feedListData: Array<object>,
    feedListDataByDate: Array<object>,
    currentSortType: string,
    onScrollPostList: () => void,
    requestNickname: string,
    openYearPicker: () => void,
    openMonthPicker: () => void,
    selectedYear: number,
    selectedMonth: number,
    userProfileInfo: object,
    loadingProfileFeedByList: boolean,
    loadingProfileFeedByDate: boolean,
  }

const ProfileFeedList = ({navigation, route, feedListData, currentSortType, onScrollPostList, feedListDataByDate, requestNickname, openYearPicker, openMonthPicker, selectedYear, selectedMonth, userProfileInfo, loadingProfileFeedByList, loadingProfileFeedByDate}: Props) => {

  const getCurrentYear = (date: Date) => {
    return date.getFullYear();
  }

  const getCurrentMonth = (date: Date) => {
    return date.getMonth();
  }
  
  const currentUser = useSelector((state) => state.currentUser);
  
    const renderProfileListFeedItem = ({item, index}) => {
        return (
          <MemoizedFeedItem
          id={item.id}
          profile_image={item.user.thumbnailImg}
          nickname={item.user.nickname}
          createdAt={item.createdAt}
          rating={item.starRate}
          main_tag={item.mainTags.name}
          sub_tag1={item.subTagOnes?item.subTagOnes.name:null}
          sub_tag2={item.subTagTwos?item.subTagTwos.name:null}
          like_count={item.likes}
          comment_count={item.commentsCount}
          reply_count={item.replysCount}
          scrap_count={0}
          mediaFiles={item.mediaFiles}
          image_count={item.mediaFiles.length}
          location={item.address?item.address.address:null}
          expense={item.expense?item.expense:null}
          desArray={item.descriptions ? item.descriptions : []}
          navigation={navigation}
          productArray={item.Products ? item.Products : []}
          userLike={item.Likers}
          userScrap={item.Scraps}/>
        )
    }

    const renderProfileTileFeedItem = ({item, index}) => {
      console.log("sectionItem item", item);
      return (
        <FlatList
        columnWrapperStyle={{justifyContent:'space-between', paddingRight: 15, marginVertical:6}}
        data={item}
        numColumns={2}
        renderItem={({item, index}) => {
          return (
            <TileFeedItem
            navigation={navigation}
            postId={item.id}
            product={item.Products}
            mainImage={item.mediaFiles[0] ? item.mediaFiles[0] : ""}
            mainTag={item.mainTags.name}
            rating={item.starRate}
            expense={item.expense}
            address={item.address ? item.address.address : ""}
            />
          )
        }}/>
      )
    }


    return (
        <UserFeedListContainer>
          {!feedListData[0] && !loadingProfileFeedByList && !loadingProfileFeedByDate && (
        <NoFeedContainer>
         <NoFeedEmoji
        source={require('~/Assets/Images/Emoji/emo_noFeed.png')}/>
        <NoFeedMainText>아직 게시글이 없네요.</NoFeedMainText>
        <NoFeedSubText>자신의 소비에 대해 이야기를 남겨보세요!</NoFeedSubText>
      </NoFeedContainer>
          )}
          {loadingProfileFeedByList && (
          <LoadingContainer>
            <ActivityIndicator/>
          </LoadingContainer>
          )}
         {(currentSortType === 'list') && feedListData[0] && !loadingProfileFeedByList && (
        <ListTypeFeedContainer>
        <FlatList
        scrollEnabled={false}
        scrollEventThrottle={5}
        data={currentUser.user.nickname === requestNickname ? currentUser.userAllFeeds : feedListData}
        renderItem={renderProfileListFeedItem}
        />
        </ListTypeFeedContainer>
         )}
         
        {(currentSortType === 'tile')  && feedListData[0] && (
        <TileTypeFeedContainer>
          <SelectingDateContainer>
          <TouchableWithoutFeedback onPress={() => openYearPicker()}>
          <YearSelectContainer>
            <SelectingYearText>{selectedYear + "년"}</SelectingYearText>
          </YearSelectContainer>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => openMonthPicker()}>
          <MonthSelectContainer>
            <SelectingMonthText>{selectedMonth + "월"}</SelectingMonthText>
            <DropdownIcon
                style={{marginLeft:5}}
                source={require('~/Assets/Images/Report/ic_dropdown.png')}/>
          </MonthSelectContainer>
          </TouchableWithoutFeedback>
          </SelectingDateContainer>
          {loadingProfileFeedByDate && (
          <LoadingContainer style={{marginTop:hp('15%')}}>
            <ActivityIndicator/>
          </LoadingContainer>
         )}
          <ExpenseDaySectionListContainer>
            {loadingProfileFeedByDate && (
              <LoadingContainer>
                <ActivityIndicator/>
              </LoadingContainer>
            )}
            {!loadingProfileFeedByDate && (
            <SectionList
            scrollEnabled={false}
            onScroll={onScrollPostList}
            sections={feedListDataByDate}
            renderItem={renderProfileTileFeedItem}
            renderSectionHeader={({ section: {title}}) => (
            <ExpenseDayText>{title+"일"}</ExpenseDayText>
            )}
          />
            )}
          </ExpenseDaySectionListContainer>
        </TileTypeFeedContainer>
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



export default ProfileFeedList;
