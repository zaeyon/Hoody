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

import ProfileListFeedItem from '~/Components/Presentational/ProfileScreen/ProfileListFeedItem';
import ProfileTileFeedItem from '~/Components/Presentational/ProfileScreen/ProfileTileFeedItem';


const UserFeedListContainer = Styled.View`
 width: ${wp('100%')};
 background-color: #ffffff;
`;

const ListTypeFeedContainer = Styled.View`
padding-bottom: 40px;
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
 height: ${wp('50%')};
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
  interface Props {
    navigation: any,
    route: any,
    feedListData: Array<object>,
    feedListDataByDate: Array<object>,
    currentSortType: string,
    onScrollPostList: () => void,
    requestNickname: string,
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

  const YEAR_LIST = [
    2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000, 1999, 1998, 1997, 1996, 1995, 1994, 1993, 1992, 1991, 1990, 1989, 1988, 1987, 1986, 1985, 1984, 1983, 1982, 1981, 1980,
  ]

  const MONTH_LIST = [
    12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1
  ]

const ProfileFeedList = ({navigation, route, feedListData, currentSortType, onScrollPostList, feedListDataByDate, requestNickname}: Props) => {

  const getCurrentYear = (date: Date) => {
    return date.getFullYear();
  }

  const getCurrentMonth = (date: Date) => {
    return date.getMonth();
  }
  
  const currentUser = useSelector((state) => state.currentUser);
  const [visibleYearPicker, setVisibleYearPicker] = useState<boolean>(false);
  const [visibleMonthPicker, setVisibleMonthPicker] = useState<boolean>(false);
  const [selectedYear, setSelectedYear] = useState<number>(getCurrentYear(new Date()));
  const [changingYear, setChangingYear] = useState<number>(getCurrentYear(new Date()));
  const [selectedMonth, setSelectedMonth] = useState<number>(getCurrentMonth(new Date()));
  const [changingMonth, setChangingMonth] = useState<number>(getCurrentMonth(new Date()));

  useEffect(() => {
    console.log("ProfileFeedList feedListData", feedListData)
    console.log("ProfileFeedList feedListDataByDate@@", feedListDataByDate)


  }, [feedListData, feedListDataByDate])

  useEffect(() => {
    console.log("profileFeedList currentUser.feedListData", currentUser.userAllFeeds);
  }, [currentUser]);

  const openYearPicker = () => {
    setVisibleYearPicker(true);
  }

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
            like_count={item.likes}
            comment_count={item.commentsCount}
            reply_count={item.replysCount}
            scrap_count={item.Scraps.length}
            mediaFiles={item.mediaFiles}
            image_count={item.mediaFiles.length}
            location={item.address?item.address.address:null}
            expense={item.expense?item.expense:null}
            desArray={item.descriptions}
            navigation={navigation}
          />
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
            <ProfileTileFeedItem
            mainImage={item.mediaFiles[0] ? item.mediaFiles[0].url : null}
            mainTag={item.mainTags.name}
            rating={item.starRate}
            expense={item.expense ? item.expense +"원" : null}
            location={item.address ? item.address.address : null}
            />
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
            <SelectingYearText>2020년</SelectingYearText>
          </YearSelectContainer>
          </TouchableWithoutFeedback>
          <MonthSelectContainer>
            <SelectingMonthText>7월</SelectingMonthText>
          </MonthSelectContainer>
          </SelectingDateContainer>
          <ExpenseDaySectionListContainer>
          <SectionList
          scrollEnabled={false}
          onScroll={onScrollPostList}
          sections={feedListDataByDate}
          renderItem={renderProfileTileFeedItem}
          renderSectionHeader={({ section: {title}}) => (
            <ExpenseDayText>{title+"일"}</ExpenseDayText>
          )}
          />
          </ExpenseDaySectionListContainer>
        </TileTypeFeedContainer>
        )}
          <Modal
          isVisible={visibleYearPicker}
          onBackdropPress={() => setVisibleYearPicker(false)}
          backdropOpacity={0.25}
          style={styles.modalView}>
          
          <YearPickerContainer>
            <PickerHeaderContainer>
              <PickerFinishContainer>
                <PickerFinishText>완료</PickerFinishText>
              </PickerFinishContainer>
            </PickerHeaderContainer>
            <Picker
            style={{flex:1}}
            selectedValue={changingYear}
            onValueChange={(itemValue, itemIndex) => setChangingYear(itemValue)}>
            {YEAR_LIST.map((year) => {
              return (
                <Picker.Item label={year+"년"} value={year}/>
              )
            })}
            </Picker>
          </YearPickerContainer>
          </Modal>
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
