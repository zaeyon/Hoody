import React, {useState, useEffect} from 'react';
import {TouchableWithoutFeedback, FlatList, StyleSheet, Dimensions} from 'react-native';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {useSelector, useDispatch} from 'react-redux';
import allActions from '~/action';

// Import Local Component
import SearchResultTopTabNavigator from '~/Components/Presentational/SearchResultScreen/SearchResultTopTabNavigator';
import SearchResultTabBar from '~/Components/Presentational/SearchResultScreen/SearchResultTabBar';
import MemoizedFeedItem from '~/Components/Presentational/SearchResultScreen/MemoizedFeedItem';
import CollectionItem from '~/Components/Presentational/SearchResultScreen/CollectionItem';
import SearchFeedList from '~/Components/Presentational/SearchResultScreen/SearchFeedList';
import ScrollableTabView from '~/Components/Presentational/SearchResultScreen/rn-collapsing-tab-bar';

// Route
import GETSearchResult from '~/Route/Search/GETSearchResult';
import POSTFollowTag from '~/Route/Tag/POSTFollowTag';
import DELETEUnfollowTag from '~/Route/Tag/DELETEUnfollowTag';

const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #ffffff;
`;


const HeaderBar = Styled.View`
 width: ${wp('100%')};
 height: ${wp('11.7%')};
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 background-color:#ffffff;
 padding-bottom: 7px;
`;

const HeaderLeftContainer = Styled.View`
 padding-top: 12px;
 padding-left: 16px;
 padding-bottom: 16px;
 padding-right: 16px;
 background-color: #ffffff;
`;

const HeaderBackIcon = Styled.Image`
 width: ${wp('6.4%')};
 height: ${wp('6.4%')};
`;

const HeaderTitleContainer = Styled.View`
 background-color: #707070;
`;

const HeaderTitleText = Styled.Text`
 font-size: 18px;
 font-weight: 600;
 color: #1D1E1F;
`;

const HeaderRightContainer = Styled.View`
padding-left: 16px;
padding-right: 16px;
padding-top: 12px;
padding-bottom: 16px;
background-color: #ffffff;
`;

const HeaderFilterIcon = Styled.Image`
 width: ${wp('6.4%')};
 height: ${wp('6.4%')};
`;

const KeywordItemListContainer = Styled.View`
 padding-top: 2px;
 padding-bottom: 2px;
 align-items: center;
 flex-direction: row;
 background-color: #ffffff;
`;

const KeywordItemBackground = Styled.View`
 margin-left: 8px;
 border-radius: 7px;
 border-width: 1px;
 border-color: #ECECEE;
 flex-direction: row;
`;

const KeywordItemContainer = Styled.View`
padding-left: 12px;
padding-top: 8px;
padding-bottom: 8px;
padding-right: 10px;
align-items: center;
flex-direction: row;
background-color: #ffffff;
`;

const KeywordProfileContainer = Styled.View`
padding-left: 12px;
padding-top: 4px;
padding-right: 10px;
padding-bottom: 4px;
align-items: center;
flex-direction: row;
`;


const KeywordItemProfileImage = Styled.Image`
width: ${wp('6.4%')};
height: ${wp('6.4%')};
border-radius: 100px;
border-width: 0.6px;
border-color: #F4F4F7;
`;

const KeywordItemText = Styled.Text`
color: #1D1E1F;
font-size: 15px;
font-weight: 500;
`;

const RemoveKeywordItemContainer = Styled.View`
align-items: center;
justify-content: center;
padding-left: 0px;
padding-right: 12px;
`;

const RemoveKeywordIcon = Styled.Image`
 width: ${wp('4.26%')};
 height: ${wp('4.26%')};
`;

const FilterModalContainer = Styled.View`
 width: ${wp('100%')};
 height: ${wp('59%')};
 background-color: #FFFFFF;
 border-top-left-radius: 14px;
 border-top-right-radius: 14px;
`;


const ModalHeaderContainer = Styled.View`
 padding-top: 4px;
 width: ${wp('100%')};
 padding-bottom: 22px;
 align-items: center;
`;

const ModalToggleButton = Styled.View`
 width: ${wp('11.7%')};
 height: ${wp('1.4%')};
 background-color: #F4F4F7;
 border-radius: 5px;
`;

const ModalTitleContainer = Styled.View`
padding-top: 8px;
padding-left: 16px;
padding-right: 16px;
padding-bottom: 10px;
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

const ModalTitleText = Styled.Text`
font-weight: 600;
font-size: 16px;
color: #1D1E1F;
`;

const ModalApplyText = Styled.Text`
font-size: 16px;
color: #267DFF;
`;

const ModalTabContainer = Styled.View`
height: ${wp('12.5%')};
width: ${wp('100%')};
padding-left: 8px;
padding-right: 16px;
background-color: #ffffff;
justify-content: center;
`;

const ModalTabInfoContainer = Styled.View`
height: ${wp('12.5%')};
flex-direction: row;
align-items: center;
justify-content: space-between;
border-bottom-width: 0.6px;
border-color: #ECECEE;
background-color: #ffffff;
`;

const ModalTabLabelText = Styled.Text`
font-size: 16px;
color: #1D1E1F;
`;

const SearchResultListContainer = Styled.View`
 flex: 1;
 background-color: #ffffff;
`;

const FeedListTabContainer = Styled.View`
 background-color: #ffffff;
`;

const CollectionListTabContainer = Styled.View`
 background-color: #ffffff;
 padding-top: 3px;
`;

const SingleKeywordContainer = Styled.View`
 padding-top: 12px;
 padding-bottom: 12px;
 padding-left: 16px;
 padding-right: 16px;
 flex-direction: row;
 justify-content: space-between;
 align-items: center;
`;

const SingleKeywordItemContainer = Styled.View`
`;

const SingleKeywordInfoContainer = Styled.View`
 flex-direction: row;
 align-items: center;
`;

const SingleKeywordImage = Styled.Image`
 border-radius: 100px;
 width: ${wp('13.3%')};
 height: ${wp('13.3%')};
`;

const SingleKeywordTextContainer = Styled.View`
 width: ${wp('56%')};
 margin-left: 10px;
`;

const SingleKeywordFeedCountText = Styled.Text`
 font-weight: 500;
 font-size: 16px;
 color: #1D1E1F;
`;

const SingleKeywordDescripText = Styled.Text`
 margin-top: 3px;
 font-size: 15px;
 color: #8E9199;
`;

const SingleKeywordFollowButton = Styled.View`
width: ${wp('17%')};
height: ${wp('8.5%')};
background-color: #267DFF;
border-radius: 8px;
align-items: center;
justify-content: center;
`;

const SingleKeywordFollowText = Styled.Text`
font-weight: 500;
font-size: 14px;
color: #FFFFFF;
`;


const SingleKeywordFollowingButton = Styled.View`
width: ${wp('17%')}
height: ${wp('8.5%')};
border-radius: 8px;
background-color: #ffffff;
justify-content: center;
align-items: center;
border-width: 1px;
border-color: #77A7F1;
`;

const SingleKeywordFollowingText = Styled.Text`
 font-size: 14px;
 font-weight: 500;
 color: #77A7F1;
`;

const NoSearchResultContainer = Styled.View`
 width: ${wp('100%')};
 height: ${hp('50%')};
 align-items: center;
 justify-content: center;
 background-color: #ffffff;
`;

const NoSearchResultText = Styled.Text`
 font-size: 15px;
 color: #56575C;
`;

const TEST_FEED_DATA = [
    {
      id: 1,
      user : {
        profileImg: 'https://t1.daumcdn.net/thumb/R600x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fqna%2Fimage%2F1542632018000000528',
        nickname: '테스트닉네임'
      },
      createAt: '2020-05-22',
      starRate: 2.5,
      scrapsCount: 12,
      commentsCount: 21,
      replysCount: 12,
      likes: 111,
      mainTags : {
        name: '메인태그'
      },
      subTagOnes: {
        name: '서브태그1'
      },
      subTagTwos: {
        name: '서브태그2'
      },
      address : {
        address: '블루문 스터디 카페'
      },
      expense: 2000,
      descriptions: [
        {
          description: "이번 남자친구가 선물해준 키엘 수분 크림을 사용해 봤는데 너무 좋은거 같아요 이번에 남자 ..."
        },
        {
          description: "내용2"
        }
      ],
      mediaFiles: [
        {
          type: 'image',
          url: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2Fb8lOJh%2FbtqBtL2bmwP%2FkUzXrFiEIRfFUKWowimMRk%2Fimg.jpg'
        },
        {
          type: 'image',
          url: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FJUreB%2FbtqCpQUtIUD%2Ff2rOUTYmBhgNc4rDxbreU0%2Fimg.jpg'
        }
      ],
      paragraphData: [
        {
          type:"description",
          description: "내용1"
        },
        {
          type:"image",
          url: 'https://img1.daumcdn.net/thumb/R720x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fliveboard%2Fdailylife%2F6d8abd51eb3644958240a9ca6ddf28bd.JPG',
        },
        {
          type:"description",
          description: "내용2"
        },
        {
          type: 'image',
          url: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2Fb8lOJh%2FbtqBtL2bmwP%2FkUzXrFiEIRfFUKWowimMRk%2Fimg.jpg'
        }
      ]
    },
    {
      id: 2,
      user : {
        profileImg: 'https://t1.daumcdn.net/thumb/R600x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fqna%2Fimage%2F1542632018000000528',
        nickname: '하하'
      },
      createAt: '2020-06-22',
      starRate: 4,
      scrapsCount: 12,
      commentsCount: 21,
      replysCount: 12,
      likes: 111,
      mainTags : {
        name: '스타벅스'
      },
      subTagOnes: {
        name: '아이스아메리카노'
      },
      subTagTwos: {
        name: '아아'
      },
      likes: 233,
      address : {
        address: '범계역 스타벅스'
      },
      expense: 2000,
      descriptions: [
        {
          description: "범계역 스타벅스에서 BLT 샌드위치를 먹었다."
        },
        {
          description: "ㅎ"
        }
      ],
      mediaFiles: [
        {
          type: 'image',
          url: 'https://img1.daumcdn.net/thumb/R720x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fliveboard%2Fdailylife%2F6d8abd51eb3644958240a9ca6ddf28bd.JPG'
        }
      ],
      paragraphData: [
        {
          type:"description",
          description: "내용1"
        },
        {
          type:"image",
          url: 'https://img1.daumcdn.net/thumb/R720x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fliveboard%2Fdailylife%2F6d8abd51eb3644958240a9ca6ddf28bd.JPG',
        },
        {
          type:"description",
          description: "내용2"
        }
      ]
    },
    {
      id: 3,
      user : {
        profileImg: 'https://t1.daumcdn.net/thumb/R600x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fqna%2Fimage%2F1542632018000000528',
        nickname: '테스트닉네임'
      },
      createAt: '2020-05-22',
      starRate: 2.5,
      scrapsCount: 12,
      commentsCount: 21,
      replysCount: 12,
      likes: 111,
      mainTags : {
        name: '메인태그'
      },
      subTagOnes: {
        name: '서브태그1'
      },
      subTagTwos: {
        name: '서브태그2'
      },
      likes: 233,
      address : {
        address: '블루문 스터디 카페'
      },
      expense: 2000,
      descriptions: [
        {
          description: "이번 남자친구가 선물해준 키엘 수분 크림을 사용해 봤는데 너무 좋은거 같아요 이번에 남자 ..."
        },
        {
          description: "내용2"
        }
      ],
      mediaFiles: [
        {
          type: 'image',
          url: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2Fb8lOJh%2FbtqBtL2bmwP%2FkUzXrFiEIRfFUKWowimMRk%2Fimg.jpg'
        },
        {
          type: 'image',
          url: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FJUreB%2FbtqCpQUtIUD%2Ff2rOUTYmBhgNc4rDxbreU0%2Fimg.jpg'
        },
        {
          type: 'image',
          url: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FJUreB%2FbtqCpQUtIUD%2Ff2rOUTYmBhgNc4rDxbreU0%2Fimg.jpg'
        }
      ],
      paragraphData: [
        {
          type:"description",
          description: "내용1"
        },
        {
          type:"image",
          url: 'https://img1.daumcdn.net/thumb/R720x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fliveboard%2Fdailylife%2F6d8abd51eb3644958240a9ca6ddf28bd.JPG',
        },
        {
          type:"description",
          description: "내용2"
        },
        {
          type: 'image',
          url: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2Fb8lOJh%2FbtqBtL2bmwP%2FkUzXrFiEIRfFUKWowimMRk%2Fimg.jpg'
        }
      ]
    },
  ];

const TEST_COLLECTION_DATA = [
  {
    "id": 1,
    "name": "컬렉션테스트",
    "coverImg": 'https://usercontents-c.styleshare.io/images/24756885/640x640',
    "description": "컬렉션설명",
    "like": 0,
    "createdAt": "2020-07-10T05:47:43.000Z",
    "Posts": [
      {
        "id": 1,
        "spendDate": "2020-07-05",
        "likes": 0,
        "expense": null,
        "starRate": 0,
        "createdAt": "2020-07-05T09:09:38.000Z",
        "user": {
          "id": "2b00ed60-be9f-11ea-b113-99f6f65adc3f",
          "nickname": "jiwon11",
          "profileImg": "https://s.gravatar.com/avatar/2770f6d3995b48fffe01fe6b5c368adf?s=80&r=x&d=mp"
        },
        "mainTags": {
          "id": 1,
          "name": "테스트"
        },
        "subTagOnes": {
          "id": 2,
          "name": "포스트맨"
        },
        "subTagTwos": {
          "id": 3,
          "name": "nodejs"
        },
        "address": {
          "id": 1,
          "address": "서울시 성북구 성북동 116-1",
          "geographLong": 37.5936,
          "geographLat": 126.998,
          "region": "서울특별시 성북구"
        },
        "collectionPost": {
          "index": 1,
          "createdAt": "2020-07-10T05:48:29.000Z",
          "updatedAt": "2020-07-10T05:48:29.000Z",
          "collectionId": 1,
          "postId": 1
        },
        "mediaFiles": [
          {
            "id": 1,
            "filename": "original/1593940177599Group274.png",
            "size": 650574,
            "mimetype": "image/png",
            "index": 2,
            "url": "https://d37gdtxv8z76fx.cloudfront.net/original/1593940177599Group274.png"
          }
        ]
      },
      {
        "id": 2,
        "spendDate": "2020-07-06",
        "likes": 0,
        "expense": null,
        "starRate": 3.5,
        "createdAt": "2020-07-06T09:22:52.000Z",
        "user": {
          "id": "2b00ed60-be9f-11ea-b113-99f6f65adc3f",
          "nickname": "jiwon11",
          "profileImg": "https://s.gravatar.com/avatar/2770f6d3995b48fffe01fe6b5c368adf?s=80&r=x&d=mp"
        },
        "mainTags": {
          "id": 4,
          "name": "test"
        },
        "subTagOnes": {
          "id": 5,
          "name": "hello"
        },
        "subTagTwos": {
          "id": 6,
          "name": "world"
        },
        "address": {
          "id": 2,
          "address": "서울특별시 중구 을지로3가",
          "geographLong": 37.5658,
          "geographLat": 126.991,
          "region": "서울특별시 중구"
        },
        "collectionPost": {
          "index": 2,
          "createdAt": "2020-07-10T05:48:29.000Z",
          "updatedAt": "2020-07-10T05:48:29.000Z",
          "collectionId": 1,
          "postId": 2
        },
        "mediaFiles": [
          {
            "id": 3,
            "filename": "original/15940273704021591866431268IMG_1014.jpg",
            "size": 1183759,
            "mimetype": "image/jpeg",
            "index": 2,
            "url": "https://d37gdtxv8z76fx.cloudfront.net/original/15940273704021591866431268IMG_1014.jpg"
          }
        ]
      }
    ]
  },
  {
    "id": 1,
    "name": "컬렉션테스트",
    "coverImg": 'https://usercontents-c.styleshare.io/images/24756885/640x640',
    "description": "컬렉션설명",
    "like": 0,
    "createdAt": "2020-07-10T05:47:43.000Z",
    "Posts": [
      {
        "id": 1,
        "spendDate": "2020-07-05",
        "likes": 0,
        "expense": null,
        "starRate": 0,
        "createdAt": "2020-07-05T09:09:38.000Z",
        "user": {
          "id": "2b00ed60-be9f-11ea-b113-99f6f65adc3f",
          "nickname": "jiwon11",
          "profileImg": "https://s.gravatar.com/avatar/2770f6d3995b48fffe01fe6b5c368adf?s=80&r=x&d=mp"
        },
        "mainTags": {
          "id": 1,
          "name": "테스트"
        },
        "subTagOnes": {
          "id": 2,
          "name": "포스트맨"
        },
        "subTagTwos": {
          "id": 3,
          "name": "nodejs"
        },
        "address": {
          "id": 1,
          "address": "서울시 성북구 성북동 116-1",
          "geographLong": 37.5936,
          "geographLat": 126.998,
          "region": "서울특별시 성북구"
        },
        "collectionPost": {
          "index": 1,
          "createdAt": "2020-07-10T05:48:29.000Z",
          "updatedAt": "2020-07-10T05:48:29.000Z",
          "collectionId": 1,
          "postId": 1
        },
        "mediaFiles": [
          {
            "id": 1,
            "filename": "original/1593940177599Group274.png",
            "size": 650574,
            "mimetype": "image/png",
            "index": 2,
            "url": "https://d37gdtxv8z76fx.cloudfront.net/original/1593940177599Group274.png"
          }
        ]
      },
      {
        "id": 2,
        "spendDate": "2020-07-06",
        "likes": 0,
        "expense": null,
        "starRate": 3.5,
        "createdAt": "2020-07-06T09:22:52.000Z",
        "user": {
          "id": "2b00ed60-be9f-11ea-b113-99f6f65adc3f",
          "nickname": "jiwon11",
          "profileImg": "https://s.gravatar.com/avatar/2770f6d3995b48fffe01fe6b5c368adf?s=80&r=x&d=mp"
        },
        "mainTags": {
          "id": 4,
          "name": "test"
        },
        "subTagOnes": {
          "id": 5,
          "name": "hello"
        },
        "subTagTwos": {
          "id": 6,
          "name": "world"
        },
        "address": {
          "id": 2,
          "address": "서울특별시 중구 을지로3가",
          "geographLong": 37.5658,
          "geographLat": 126.991,
          "region": "서울특별시 중구"
        },
        "collectionPost": {
          "index": 2,
          "createdAt": "2020-07-10T05:48:29.000Z",
          "updatedAt": "2020-07-10T05:48:29.000Z",
          "collectionId": 1,
          "postId": 2
        },
        "mediaFiles": [
          {
            "id": 3,
            "filename": "original/15940273704021591866431268IMG_1014.jpg",
            "size": 1183759,
            "mimetype": "image/jpeg",
            "index": 2,
            "url": "https://d37gdtxv8z76fx.cloudfront.net/original/15940273704021591866431268IMG_1014.jpg"
          }
        ]
      }
    ]
  },
  {
    "id": 1,
    "name": "컬렉션테스트",
    "coverImg": 'https://usercontents-c.styleshare.io/images/24756885/640x640',
    "description": "컬렉션설명",
    "like": 0,
    "createdAt": "2020-07-10T05:47:43.000Z",
    "Posts": [
      {
        "id": 1,
        "spendDate": "2020-07-05",
        "likes": 0,
        "expense": null,
        "starRate": 0,
        "createdAt": "2020-07-05T09:09:38.000Z",
        "user": {
          "id": "2b00ed60-be9f-11ea-b113-99f6f65adc3f",
          "nickname": "jiwon11",
          "profileImg": "https://s.gravatar.com/avatar/2770f6d3995b48fffe01fe6b5c368adf?s=80&r=x&d=mp"
        },
        "mainTags": {
          "id": 1,
          "name": "테스트"
        },
        "subTagOnes": {
          "id": 2,
          "name": "포스트맨"
        },
        "subTagTwos": {
          "id": 3,
          "name": "nodejs"
        },
        "address": {
          "id": 1,
          "address": "서울시 성북구 성북동 116-1",
          "geographLong": 37.5936,
          "geographLat": 126.998,
          "region": "서울특별시 성북구"
        },
        "collectionPost": {
          "index": 1,
          "createdAt": "2020-07-10T05:48:29.000Z",
          "updatedAt": "2020-07-10T05:48:29.000Z",
          "collectionId": 1,
          "postId": 1
        },
        "mediaFiles": [
          {
            "id": 1,
            "filename": "original/1593940177599Group274.png",
            "size": 650574,
            "mimetype": "image/png",
            "index": 2,
            "url": "https://d37gdtxv8z76fx.cloudfront.net/original/1593940177599Group274.png"
          }
        ]
      },
      {
        "id": 2,
        "spendDate": "2020-07-06",
        "likes": 0,
        "expense": null,
        "starRate": 3.5,
        "createdAt": "2020-07-06T09:22:52.000Z",
        "user": {
          "id": "2b00ed60-be9f-11ea-b113-99f6f65adc3f",
          "nickname": "jiwon11",
          "profileImg": "https://s.gravatar.com/avatar/2770f6d3995b48fffe01fe6b5c368adf?s=80&r=x&d=mp"
        },
        "mainTags": {
          "id": 4,
          "name": "test"
        },
        "subTagOnes": {
          "id": 5,
          "name": "hello"
        },
        "subTagTwos": {
          "id": 6,
          "name": "world"
        },
        "address": {
          "id": 2,
          "address": "서울특별시 중구 을지로3가",
          "geographLong": 37.5658,
          "geographLat": 126.991,
          "region": "서울특별시 중구"
        },
        "collectionPost": {
          "index": 2,
          "createdAt": "2020-07-10T05:48:29.000Z",
          "updatedAt": "2020-07-10T05:48:29.000Z",
          "collectionId": 1,
          "postId": 2
        },
        "mediaFiles": [
          {
            "id": 3,
            "filename": "original/15940273704021591866431268IMG_1014.jpg",
            "size": 1183759,
            "mimetype": "image/jpeg",
            "index": 2,
            "url": "https://d37gdtxv8z76fx.cloudfront.net/original/15940273704021591866431268IMG_1014.jpg"
          }
        ]
      }
    ]
  },{
    "id": 1,
    "name": "컬렉션테스트",
    "coverImg": 'https://usercontents-c.styleshare.io/images/24756885/640x640',
    "description": "컬렉션설명",
    "like": 0,
    "createdAt": "2020-07-10T05:47:43.000Z",
    "Posts": [
      {
        "id": 1,
        "spendDate": "2020-07-05",
        "likes": 0,
        "expense": null,
        "starRate": 0,
        "createdAt": "2020-07-05T09:09:38.000Z",
        "user": {
          "id": "2b00ed60-be9f-11ea-b113-99f6f65adc3f",
          "nickname": "jiwon11",
          "profileImg": "https://s.gravatar.com/avatar/2770f6d3995b48fffe01fe6b5c368adf?s=80&r=x&d=mp"
        },
        "mainTags": {
          "id": 1,
          "name": "테스트"
        },
        "subTagOnes": {
          "id": 2,
          "name": "포스트맨"
        },
        "subTagTwos": {
          "id": 3,
          "name": "nodejs"
        },
        "address": {
          "id": 1,
          "address": "서울시 성북구 성북동 116-1",
          "geographLong": 37.5936,
          "geographLat": 126.998,
          "region": "서울특별시 성북구"
        },
        "collectionPost": {
          "index": 1,
          "createdAt": "2020-07-10T05:48:29.000Z",
          "updatedAt": "2020-07-10T05:48:29.000Z",
          "collectionId": 1,
          "postId": 1
        },
        "mediaFiles": [
          {
            "id": 1,
            "filename": "original/1593940177599Group274.png",
            "size": 650574,
            "mimetype": "image/png",
            "index": 2,
            "url": "https://d37gdtxv8z76fx.cloudfront.net/original/1593940177599Group274.png"
          }
        ]
      },
      {
        "id": 2,
        "spendDate": "2020-07-06",
        "likes": 0,
        "expense": null,
        "starRate": 3.5,
        "createdAt": "2020-07-06T09:22:52.000Z",
        "user": {
          "id": "2b00ed60-be9f-11ea-b113-99f6f65adc3f",
          "nickname": "jiwon11",
          "profileImg": "https://s.gravatar.com/avatar/2770f6d3995b48fffe01fe6b5c368adf?s=80&r=x&d=mp"
        },
        "mainTags": {
          "id": 4,
          "name": "test"
        },
        "subTagOnes": {
          "id": 5,
          "name": "hello"
        },
        "subTagTwos": {
          "id": 6,
          "name": "world"
        },
        "address": {
          "id": 2,
          "address": "서울특별시 중구 을지로3가",
          "geographLong": 37.5658,
          "geographLat": 126.991,
          "region": "서울특별시 중구"
        },
        "collectionPost": {
          "index": 2,
          "createdAt": "2020-07-10T05:48:29.000Z",
          "updatedAt": "2020-07-10T05:48:29.000Z",
          "collectionId": 1,
          "postId": 2
        },
        "mediaFiles": [
          {
            "id": 3,
            "filename": "original/15940273704021591866431268IMG_1014.jpg",
            "size": 1183759,
            "mimetype": "image/jpeg",
            "index": 2,
            "url": "https://d37gdtxv8z76fx.cloudfront.net/original/15940273704021591866431268IMG_1014.jpg"
          }
        ]
      }
    ]
  },{
    "id": 1,
    "name": "컬렉션테스트",
    "coverImg": 'https://usercontents-c.styleshare.io/images/24756885/640x640',
    "description": "컬렉션설명",
    "like": 0,
    "createdAt": "2020-07-10T05:47:43.000Z",
    "Posts": [
      {
        "id": 1,
        "spendDate": "2020-07-05",
        "likes": 0,
        "expense": null,
        "starRate": 0,
        "createdAt": "2020-07-05T09:09:38.000Z",
        "user": {
          "id": "2b00ed60-be9f-11ea-b113-99f6f65adc3f",
          "nickname": "jiwon11",
          "profileImg": "https://s.gravatar.com/avatar/2770f6d3995b48fffe01fe6b5c368adf?s=80&r=x&d=mp"
        },
        "mainTags": {
          "id": 1,
          "name": "테스트"
        },
        "subTagOnes": {
          "id": 2,
          "name": "포스트맨"
        },
        "subTagTwos": {
          "id": 3,
          "name": "nodejs"
        },
        "address": {
          "id": 1,
          "address": "서울시 성북구 성북동 116-1",
          "geographLong": 37.5936,
          "geographLat": 126.998,
          "region": "서울특별시 성북구"
        },
        "collectionPost": {
          "index": 1,
          "createdAt": "2020-07-10T05:48:29.000Z",
          "updatedAt": "2020-07-10T05:48:29.000Z",
          "collectionId": 1,
          "postId": 1
        },
        "mediaFiles": [
          {
            "id": 1,
            "filename": "original/1593940177599Group274.png",
            "size": 650574,
            "mimetype": "image/png",
            "index": 2,
            "url": "https://d37gdtxv8z76fx.cloudfront.net/original/1593940177599Group274.png"
          }
        ]
      },
      {
        "id": 2,
        "spendDate": "2020-07-06",
        "likes": 0,
        "expense": null,
        "starRate": 3.5,
        "createdAt": "2020-07-06T09:22:52.000Z",
        "user": {
          "id": "2b00ed60-be9f-11ea-b113-99f6f65adc3f",
          "nickname": "jiwon11",
          "profileImg": "https://s.gravatar.com/avatar/2770f6d3995b48fffe01fe6b5c368adf?s=80&r=x&d=mp"
        },
        "mainTags": {
          "id": 4,
          "name": "test"
        },
        "subTagOnes": {
          "id": 5,
          "name": "hello"
        },
        "subTagTwos": {
          "id": 6,
          "name": "world"
        },
        "address": {
          "id": 2,
          "address": "서울특별시 중구 을지로3가",
          "geographLong": 37.5658,
          "geographLat": 126.991,
          "region": "서울특별시 중구"
        },
        "collectionPost": {
          "index": 2,
          "createdAt": "2020-07-10T05:48:29.000Z",
          "updatedAt": "2020-07-10T05:48:29.000Z",
          "collectionId": 1,
          "postId": 2
        },
        "mediaFiles": [
          {
            "id": 3,
            "filename": "original/15940273704021591866431268IMG_1014.jpg",
            "size": 1183759,
            "mimetype": "image/jpeg",
            "index": 2,
            "url": "https://d37gdtxv8z76fx.cloudfront.net/original/15940273704021591866431268IMG_1014.jpg"
          }
        ]
      }
    ]
  },{
    "id": 1,
    "name": "컬렉션테스트",
    "coverImg": 'https://usercontents-c.styleshare.io/images/24756885/640x640',
    "description": "컬렉션설명",
    "like": 0,
    "createdAt": "2020-07-10T05:47:43.000Z",
    "Posts": [
      {
        "id": 1,
        "spendDate": "2020-07-05",
        "likes": 0,
        "expense": null,
        "starRate": 0,
        "createdAt": "2020-07-05T09:09:38.000Z",
        "user": {
          "id": "2b00ed60-be9f-11ea-b113-99f6f65adc3f",
          "nickname": "jiwon11",
          "profileImg": "https://s.gravatar.com/avatar/2770f6d3995b48fffe01fe6b5c368adf?s=80&r=x&d=mp"
        },
        "mainTags": {
          "id": 1,
          "name": "테스트"
        },
        "subTagOnes": {
          "id": 2,
          "name": "포스트맨"
        },
        "subTagTwos": {
          "id": 3,
          "name": "nodejs"
        },
        "address": {
          "id": 1,
          "address": "서울시 성북구 성북동 116-1",
          "geographLong": 37.5936,
          "geographLat": 126.998,
          "region": "서울특별시 성북구"
        },
        "collectionPost": {
          "index": 1,
          "createdAt": "2020-07-10T05:48:29.000Z",
          "updatedAt": "2020-07-10T05:48:29.000Z",
          "collectionId": 1,
          "postId": 1
        },
        "mediaFiles": [
          {
            "id": 1,
            "filename": "original/1593940177599Group274.png",
            "size": 650574,
            "mimetype": "image/png",
            "index": 2,
            "url": "https://d37gdtxv8z76fx.cloudfront.net/original/1593940177599Group274.png"
          }
        ]
      },
      {
        "id": 2,
        "spendDate": "2020-07-06",
        "likes": 0,
        "expense": null,
        "starRate": 3.5,
        "createdAt": "2020-07-06T09:22:52.000Z",
        "user": {
          "id": "2b00ed60-be9f-11ea-b113-99f6f65adc3f",
          "nickname": "jiwon11",
          "profileImg": "https://s.gravatar.com/avatar/2770f6d3995b48fffe01fe6b5c368adf?s=80&r=x&d=mp"
        },
        "mainTags": {
          "id": 4,
          "name": "test"
        },
        "subTagOnes": {
          "id": 5,
          "name": "hello"
        },
        "subTagTwos": {
          "id": 6,
          "name": "world"
        },
        "address": {
          "id": 2,
          "address": "서울특별시 중구 을지로3가",
          "geographLong": 37.5658,
          "geographLat": 126.991,
          "region": "서울특별시 중구"
        },
        "collectionPost": {
          "index": 2,
          "createdAt": "2020-07-10T05:48:29.000Z",
          "updatedAt": "2020-07-10T05:48:29.000Z",
          "collectionId": 1,
          "postId": 2
        },
        "mediaFiles": [
          {
            "id": 3,
            "filename": "original/15940273704021591866431268IMG_1014.jpg",
            "size": 1183759,
            "mimetype": "image/jpeg",
            "index": 2,
            "url": "https://d37gdtxv8z76fx.cloudfront.net/original/15940273704021591866431268IMG_1014.jpg"
          }
        ]
      }
    ]
  },{
    "id": 1,
    "name": "컬렉션테스트",
    "coverImg": 'https://usercontents-c.styleshare.io/images/24756885/640x640',
    "description": "컬렉션설명",
    "like": 0,
    "createdAt": "2020-07-10T05:47:43.000Z",
    "Posts": [
      {
        "id": 1,
        "spendDate": "2020-07-05",
        "likes": 0,
        "expense": null,
        "starRate": 0,
        "createdAt": "2020-07-05T09:09:38.000Z",
        "user": {
          "id": "2b00ed60-be9f-11ea-b113-99f6f65adc3f",
          "nickname": "jiwon11",
          "profileImg": "https://s.gravatar.com/avatar/2770f6d3995b48fffe01fe6b5c368adf?s=80&r=x&d=mp"
        },
        "mainTags": {
          "id": 1,
          "name": "테스트"
        },
        "subTagOnes": {
          "id": 2,
          "name": "포스트맨"
        },
        "subTagTwos": {
          "id": 3,
          "name": "nodejs"
        },
        "address": {
          "id": 1,
          "address": "서울시 성북구 성북동 116-1",
          "geographLong": 37.5936,
          "geographLat": 126.998,
          "region": "서울특별시 성북구"
        },
        "collectionPost": {
          "index": 1,
          "createdAt": "2020-07-10T05:48:29.000Z",
          "updatedAt": "2020-07-10T05:48:29.000Z",
          "collectionId": 1,
          "postId": 1
        },
        "mediaFiles": [
          {
            "id": 1,
            "filename": "original/1593940177599Group274.png",
            "size": 650574,
            "mimetype": "image/png",
            "index": 2,
            "url": "https://d37gdtxv8z76fx.cloudfront.net/original/1593940177599Group274.png"
          }
        ]
      },
      {
        "id": 2,
        "spendDate": "2020-07-06",
        "likes": 0,
        "expense": null,
        "starRate": 3.5,
        "createdAt": "2020-07-06T09:22:52.000Z",
        "user": {
          "id": "2b00ed60-be9f-11ea-b113-99f6f65adc3f",
          "nickname": "jiwon11",
          "profileImg": "https://s.gravatar.com/avatar/2770f6d3995b48fffe01fe6b5c368adf?s=80&r=x&d=mp"
        },
        "mainTags": {
          "id": 4,
          "name": "test"
        },
        "subTagOnes": {
          "id": 5,
          "name": "hello"
        },
        "subTagTwos": {
          "id": 6,
          "name": "world"
        },
        "address": {
          "id": 2,
          "address": "서울특별시 중구 을지로3가",
          "geographLong": 37.5658,
          "geographLat": 126.991,
          "region": "서울특별시 중구"
        },
        "collectionPost": {
          "index": 2,
          "createdAt": "2020-07-10T05:48:29.000Z",
          "updatedAt": "2020-07-10T05:48:29.000Z",
          "collectionId": 1,
          "postId": 2
        },
        "mediaFiles": [
          {
            "id": 3,
            "filename": "original/15940273704021591866431268IMG_1014.jpg",
            "size": 1183759,
            "mimetype": "image/jpeg",
            "index": 2,
            "url": "https://d37gdtxv8z76fx.cloudfront.net/original/15940273704021591866431268IMG_1014.jpg"
          }
        ]
      }
    ]
  }
]


  const containerHeight = Dimensions.get("window").height;
  

interface Props {
    navigation: any,
    route: any,
}

var offset = 0;
var limit = 20;

const SearchResultScreen = ({navigation, route}: Props) => {
    const [keywordList, setKeywordList] = useState<Array<object>>([]);
    const [filterModalVisible, setFilterModalVisible] = useState<boolean>(false);
    const [selectedRadioIndex, setSelectedRadioIndex] = useState<number>(0);
    const [feedListTabHeight, setFeedListTabHeight] = useState<number>(containerHeight);
    const [collectionListTabHeight, setCollectionListTabHeight] = useState<number>(containerHeight);
    const [searchResultFeedListData, setSearchResultFeedListData] = useState<Array<object>>([]);
    const [searchResultCollectionListData, setSearchResultCollectionListData] = useState<Array<object>>([]);
    const [singleKeyword, setSingleKeyword] = useState<boolean>(false);
    const [selectedOrder, setSelectedOrder] = useState<string>("createdAt");
    const [selectedType, setSelectedType] = useState<string>("post");
    const [searchQuery, setSearchQuery] = useState<string>("");

    const [currentUserFollowing, setCurrentUserFollowing] = useState<boolean>(false);
    const [noSearchFeedList, setNoSearchFeedList] = useState<boolean>(false);
    const [noSearchCollectionList, setNoSearchCollectionList] = useState<boolean>(false);

    const [noMoreSearchFeedData, setNoMoreSearchFeedData] = useState<boolean>(false);
    const [noMoreSearchCollectionData, setNoMoreSearchCollectionData] = useState<boolean>(false);

    const [refreshingSearchData, setRefreshingSearchData] = useState<boolean>(false);
    
    const currentUser = useSelector((state: any) => state.currentUser);
    const dispatch = useDispatch();

    var radio_props = [
      {label: '인기순', value: 0 },
      {label: '최신순', value: 1}
    ];

    var query = "";

    useEffect(() => {
      if(currentUser?.inputedKeywordList) {
        console.log("currentUser.inputedKeywordList", currentUser.inputedKeywordList);
        if(currentUser.inputedKeywordList.length === 1) {
          if(currentUser.inputedKeywordList[0].type === "계정") {
            if(currentUser.user.nickname === currentUser.inputedKeywordList[0].item.nickname) {
              navigation.navigate("Profile");
            } else {
              navigation.navigate("AnotherUserProfileStack", {
                screen: 'AnotherUserProfileScreen',
                params: {requestedUserNickname: currentUser.inputedKeywordList[0].item.nickname, requestScreen: "SearchResultScreen"}
            }) 
            }
          } else {
            setSingleKeyword(true);
          }
        }
        currentUser.inputedKeywordList.forEach((keyword: any, index: number) => {
          if(keyword.type === "태그") {
            if(index === currentUser.inputedKeywordList.length-1) {
              query = query + "tag:" + keyword.item.name  
            } else {
              query = query + "tag:" + keyword.item.name + ","
            }
          } else if(keyword.type === "계정") {
            if(index === currentUser.inputedKeywordList.length-1) {
              query = query + "user:" + keyword.item.nickname
            } else {
              query = query + "user:" + keyword.item.nickname + ","
            } 
          } else if(keyword.type === "장소") {
            if(index === currentUser.inputedKeywordList.length-1) {
              query = query + "address:" + keyword.item.address
            } else {
              query = query + "address:" + keyword.item.address + ","
            }
          }

          setTimeout(() => {
            setSearchQuery(query);
            keywordSearchFeedList(query, "createdAt", 0, 20);
            keywordSearchCollectionList(query, "createdAt", 0, 20);
          })
        })
      }

    }, [])

    const keywordSearchFeedList = (query: string, order: string, offset: number, limit: number) => {
      GETSearchResult("post", query, order, offset, limit)
            .then(function(response) {
            console.log("GETSearchResult response", response);
            setSearchResultFeedListData(response.data);
            setRefreshingSearchData(false);
            if(response.data.length == 0) {
              setNoSearchFeedList(true);
            } else {
              setNoSearchFeedList(false);
            }
            var tmpKeywordList = currentUser?.inputedKeywordList;
            if(currentUser?.inputedKeywordList.length === 1) {
              if(currentUser.inputedKeywordList[0]?.type === "태그") {
                if(response.tagFollowing[currentUser.inputedKeywordList[0]?.item.name]) {
                  console.log("태그 팔로우됌")
                  setCurrentUserFollowing(true)
                } else {
                  setCurrentUserFollowing(false)
                } 
              } else if(currentUser.inputedKeywordList[0]?.type === "계정") {
                if(response.tagFollowing[currentUser.inputedKeywordList[0]?.item.nickname]) {
                  setCurrentUserFollowing(true)
                } else {
                  setCurrentUserFollowing(false)
                }
              }
            }
            //dispatch(allActions.userActions.setInputedKeywordList(tmpKeywordList));
            })
            .catch(function(error) {
            console.log("GETSearchResult error", error);
      })
    }

    const keywordSearchCollectionList = (query: string, order: string, offset: number, limit: number) => {
      GETSearchResult("collection", query, order, offset, limit)
      .then(function(response) {
        console.log("GETSearch Collection response", response);
        setSearchResultCollectionListData(response.data);
        if(response.data.length == 0) {
          setNoSearchCollectionList(true);
        } else {
          setNoSearchCollectionList(false);
        }
        
      })
      .catch(function(error) {
        console.log("GETSearch Collection error", error);
      })
    }

    const showFilterModal = () => {
        setFilterModalVisible(true);
    }

    const onPressRadioButton = (i: number) => {
        setSelectedRadioIndex(i)
        console.log("selectedRadioIndex", i);
    }

    const applySearchFilter = () => {
        setFilterModalVisible(false);
        if(selectedRadioIndex == 0 && selectedOrder === "createdAt") {
          setSelectedOrder("popular");
          setTimeout(() => {
          keywordSearchFeedList(searchQuery ,selectedType, "popular", 0, 20);
          }, 10)
        } else if(selectedRadioIndex == 1 && selectedOrder === "popular") {
          setSelectedOrder("createdAt")
          setTimeout(() => {
            keywordSearchFeedList(searchQuery ,selectedType, "createdAt", 0, 20);
          }, 10)
        }
    }

    const measureFeedListTab = (event) => {
        setFeedListTabHeight(event.nativeEvent.layout.height);
    }

    const measureCollectionListTab = (event) => {
        setCollectionListTabHeight(event.nativeEvent.layout.height);
    }

    const removeKeywordItem = (index:number) => {
        var removedKeywordList = currentUser.inputedKeywordList;
        removedKeywordList.splice(index, 1);
        dispatch(allActions.userActions.setInputedKeywordList(removedKeywordList));
    }

    const followKeyword = () => {
      setCurrentUserFollowing(true)
      POSTFollowTag(currentUser.inputedKeywordList[0]?.item.id)
      .then(function(response) {
        console.log("followKeyword response", response);
      })
      .catch(function(error) {
        console.log("followKeyword error", error);
      })
    }

    const unfollowKeyword = () => {
      setCurrentUserFollowing(false);
      DELETEUnfollowTag(currentUser.inputedKeywordList[0]?.item.id)
      .then(function(response) {
        console.log("unfollowKeyword response", response);
      })
      .catch(function(error) {
        console.log("unfollowKeyword error", error);
      })

    }

    const selectKeywordListItem = (index: number) => {
      console.log("index", index);
      var tmpKeywordList = currentUser.inputedKeywordList;
      var selectedSingleKeywordList = tmpKeywordList.splice(index, 1);
      dispatch(allActions.userActions.setInputedKeywordList(selectedSingleKeywordList));
      console.log("selectedSingleKeywordList", selectedSingleKeywordList);
      console.log("currentUser.inputedKeywordList", currentUser.inputedKeywordList);
    }

    const selectProfileKeywordListItem = (index: number, item: object) => {
      navigation.navigate("AnotherUserProfileStack", {
        screen: 'AnotherUserProfileScreen',
        params: {requestedUserNickname: item.item.nickname}
      })
      
    }

    const navigateGoBack = () => {
      navigation.goBack();
      setTimeout(() => {
        if(route.params?.requestType === "trendTag") {
          dispatch(allActions.userActions.setInputedKeywordList([]))
        }
      })
    }

    const onRefreshSearchFeedData = () => {
      offset = 0;
      limit = 20;
      var order = "createdAt";

      setRefreshingSearchData(true);
      setNoMoreSearchFeedData(false);

      setTimeout(() => {
        keywordSearchFeedList(searchQuery, order, offset, limit);
      }, 10);
    }

    const loadMoreSearchFeedData = () => {
      if(noMoreSearchFeedData) {
        return
      } else {
      console.log("검색 결과 무한 스크롤");
  
      offset = offset + 20;
      limit = limit + 20;

      console.log("offset", offset);
      console.log("limit", limit);

      var order = "createdAt"

      setTimeout(() => {
        GETSearchResult("post", searchQuery, order, offset, limit)
              .then(function(response) {
              console.log("GETSearchResult response", response);
              if(response.data.length === 0) {
                setNoMoreSearchFeedData(true);
              } else {
              setSearchResultFeedListData(searchResultFeedListData.concat(response.data));
              //dispatch(allActions.userActions.setInputedKeywordList(tmpKeywordList));
              }
              })
              .catch(function(error) {
              console.log("GETSearchResult error", error);
        })
      }, 50)

      }
      
    }

    const keywordListContainer = () => {
      
      if(!singleKeyword) {
        return (
          <KeywordItemListContainer>
              <FlatList
              showsHorizontalScrollIndicator={false}
              keyboardShouldPersistTaps={"handled"}
              horizontal={true}
              data={currentUser.inputedKeywordList}
              renderItem={renderKeywordItem}
              />
          </KeywordItemListContainer>    
      )
      } else {
        return (
          <SingleKeywordItemContainer>
            {currentUser.inputedKeywordList[0]?.type === "태그" && (
              <SingleKeywordContainer>
                <SingleKeywordInfoContainer>
              <SingleKeywordImage
              source={require('~/Assets/Images/SearchResult/ic_tagImage.png')}/>
              <SingleKeywordTextContainer>
              <SingleKeywordFeedCountText>{((currentUser.inputedKeywordList[0]?.item.reviewNum != undefined) ? currentUser.inputedKeywordList[0]?.item.reviewNum : "0")  + "개의 게시물"}</SingleKeywordFeedCountText>
                <SingleKeywordDescripText>{currentUserFollowing ? "이미 팔로우하신 태그입니다." : "#" + currentUser.inputedKeywordList[0]?.item.name + "를(을) 팔로우하고 소식을 받아보세요."}</SingleKeywordDescripText>
              </SingleKeywordTextContainer>
              </SingleKeywordInfoContainer>
              {currentUserFollowing && (
              <TouchableWithoutFeedback onPress={() => unfollowKeyword()}>
                <SingleKeywordFollowingButton>
                  <SingleKeywordFollowingText>팔로잉</SingleKeywordFollowingText>
                </SingleKeywordFollowingButton>
                </TouchableWithoutFeedback>
              )}
              {!currentUserFollowing && (
              <TouchableWithoutFeedback onPress={() => followKeyword()}>
              <SingleKeywordFollowButton>
              <SingleKeywordFollowText>팔로우</SingleKeywordFollowText>
            </SingleKeywordFollowButton>
            </TouchableWithoutFeedback>
              )}
              </SingleKeywordContainer>
            )}
            {currentUser.inputedKeywordList[0]?.type === "장소" && (
              <SingleKeywordContainer>
                <SingleKeywordInfoContainer>
              <SingleKeywordImage
              source={require('~/Assets/Images/SearchResult/ic_placeImage.png')}/>
              <SingleKeywordTextContainer>
                <SingleKeywordFeedCountText>{(currentUser.inputedKeywordList[0]?.item.reviewNum != undefined) ? currentUser.inputedKeywordList[0]?.item.reviewNum : "0"  + "개의 게시물"}</SingleKeywordFeedCountText>
                <SingleKeywordDescripText>{currentUser.inputedKeywordList[0]?.item.address}</SingleKeywordDescripText>
              </SingleKeywordTextContainer>
              </SingleKeywordInfoContainer>
              </SingleKeywordContainer>
            )}
          </SingleKeywordItemContainer>
        )
      }
    }

    const renderKeywordItem = ({item, index}: any) => {
        if(item.type == "태그") {
            return (
                <KeywordItemBackground style={(index === 0 && styles.firstKeyword) || (index === keywordList.length -1 && styles.lastKeyword)}>
                <TouchableWithoutFeedback onPress={() => selectKeywordListItem(index)}>
                <KeywordItemContainer>
                    <KeywordItemText>{"#" + item.item.name}</KeywordItemText>
                </KeywordItemContainer>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => removeKeywordItem(index)}>
                <RemoveKeywordItemContainer>
                    <RemoveKeywordIcon
                    source={require('~/Assets/Images/SearchResult/ic_remove.png')}/>
                </RemoveKeywordItemContainer>
                </TouchableWithoutFeedback>
            </KeywordItemBackground>
            )
        } else if(item.type == "계정") {
            return (
                <KeywordItemBackground style={(index === 0 && styles.firstKeyword) || (index === keywordList.length -1 && styles.lastKeyword)}> 
                <TouchableWithoutFeedback onPress={() => selectProfileKeywordListItem(index, item)}>
                <KeywordProfileContainer>
                    <KeywordItemProfileImage
                    source={{uri:item.item.profileImg}}/>
                    <KeywordItemText
                    style={{marginLeft: 6}}
                    >{item.item.nickname}</KeywordItemText>
                </KeywordProfileContainer>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => removeKeywordItem(index)}>
                <RemoveKeywordItemContainer>
                    <RemoveKeywordIcon
                    source={require('~/Assets/Images/SearchResult/ic_remove.png')}/>
                </RemoveKeywordItemContainer>
                </TouchableWithoutFeedback>
            </KeywordItemBackground>
            )
        } else if(item.type == "장소") {
            return (
                <KeywordItemBackground style={(index === 0 && styles.firstKeyword) || (index === keywordList.length -1 && styles.lastKeyword)}>
                <TouchableWithoutFeedback onPress={() => selectKeywordListItem(index)}>
                <KeywordItemContainer>
                    <KeywordItemText>{item.item.address}</KeywordItemText>
                </KeywordItemContainer>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => removeKeywordItem(index)}>
                <RemoveKeywordItemContainer>
                    <RemoveKeywordIcon
                    source={require('~/Assets/Images/SearchResult/ic_remove.png')}/>
                </RemoveKeywordItemContainer>
                </TouchableWithoutFeedback>
            </KeywordItemBackground>
            )
        }
    }


    const renderFeedItem = ({item, index}: any) => {
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
                />
        )
    }

    const renderCollectionItem = ({item, index}: any) => {
      return (
        <CollectionItem
        collectionId={item.id ? item.id : null}
        coverImage={item.coverImg ? item.coverImg : null}
        name={item.name ? item.name : null}
        navigation={navigation}
        profileNickname={item.Posts[0] ? item.Posts[0].user.nickname : null}
        profileImage={item.Posts[0] ? item.Posts[0].user.profileImg : null}
        />

      )
    }

    return (
        <Container>
            <HeaderBar>
                <TouchableWithoutFeedback onPress={() => navigateGoBack()}>
                <HeaderLeftContainer>
                    <HeaderBackIcon
                    source={require('~/Assets/Images/HeaderBar/ic_back.png')}/>
                </HeaderLeftContainer>
                </TouchableWithoutFeedback>
                <HeaderTitleContainer>
                <FlatList
                contentContainerStyle={{backgroundColor:'#ffffff', justifyContent:'center', alignItems:'center'}}
                horizontal={true}
                data={currentUser.inputedKeywordList}
                renderItem={({item, index}) => {
                  if(item.type === "태그") {
                  return (
                    <HeaderTitleText>{index === currentUser.inputedKeywordList.length-1 ?"#" + item.item.name : "#" + item.item.name +", "}</HeaderTitleText>
                    )
                  } else if(item.type === "장소") {
                  return (
                    <HeaderTitleText>{index === currentUser.inputedKeywordList.length-1 ? item.item.address : item.item.address + ", "}</HeaderTitleText>
                  )
                  } else if(item.type === "계정") {
                  return (
                    <HeaderTitleText>{index === currentUser.inputedKeywordList.length-1 ? item.item.nickname : item.item.nickname + ", "}</HeaderTitleText>
                  )
                  }
                }}/>
                </HeaderTitleContainer>
                <TouchableWithoutFeedback onPress={() => showFilterModal()}>
                    <HeaderRightContainer>
                        <HeaderFilterIcon
                        source={require('~/Assets/Images/HeaderBar/ic_filter.png')}/>
                </HeaderRightContainer>
                </TouchableWithoutFeedback>
            </HeaderBar>
            <ScrollableTabView
            refreshingSearchData={refreshingSearchData}
            onRefreshSearchData={onRefreshSearchFeedData}
            loadMoreSearchFeedData={loadMoreSearchFeedData}
            collapsableBar={keywordListContainer()}
            initialPage={0}
            tabContentHeights={[feedListTabHeight, collectionListTabHeight]}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            prerenderingSiblingsNumber={Infinity}
            renderTabBar={() => <SearchResultTabBar/>}
            >
            <FeedListTabContainer
            onLayout={(event) => measureFeedListTab(event)}
            tabLabel="게시글" >
            <SearchFeedList
            route={route}
            navigation={navigation}
            feedListData={searchResultFeedListData}/>
            </FeedListTabContainer>
            <CollectionListTabContainer
            onLayout={(event) => measureCollectionListTab(event)}
            tabLabel="컬렉션"
            >
              {!noSearchCollectionList && (
            <FlatList
            columnWrapperStyle={{justifyContent:'space-between', paddingLeft:15, paddingRight:15, paddingTop:10, paddingBottom:10, backgroundColor:'#ffffff'}}
            numColumns={2}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={(index: any) => index}
            data={searchResultCollectionListData}
            renderItem={renderCollectionItem}/>
              )}
              {noSearchCollectionList && (
                <NoSearchResultContainer>
                  <NoSearchResultText>검색된 컬렉션이 없어요.</NoSearchResultText>
                </NoSearchResultContainer>
              )}
            </CollectionListTabContainer>
            </ScrollableTabView>
            {/*
            <SearchResultListContainer>
                <SearchResultTopTabNavigator
                navigation={navigation}
                feedResultListData={TEST_FEED_DATA}
                />
            </SearchResultListContainer>
            */}
            <Modal
            style={styles.filterModal}
            isVisible={filterModalVisible}
            backdropOpacity={0.25}>
                <FilterModalContainer>
                    <ModalHeaderContainer>
                        <ModalToggleButton/>
                    </ModalHeaderContainer>
                    <ModalTitleContainer>
                        <ModalTitleText>
                            검색 필터
                        </ModalTitleText>
                        <TouchableWithoutFeedback onPress={() => applySearchFilter()}>
                        <ModalApplyText>
                            적용
                        </ModalApplyText>
                        </TouchableWithoutFeedback>
                         </ModalTitleContainer>
                            <RadioForm>
                            {radio_props.map((obj, i) => (
                            <ModalTabContainer>
                            <ModalTabInfoContainer>
                            <RadioButton 
                            labelHorizontal={true} 
                            key={i}>
                                <RadioButtonLabel
                                obj={obj}
                                index={i}
                                onPress={() => onPressRadioButton(i)}
                                labelHorizontal={true}
                                labelStyle={{fontSize: 16, color: '#1D1E1F'}}
                                labelWrapStyle={{paddingRight: 300, backgroundColor:'#ffffff'}}/>
                            </RadioButton>
                            <RadioButtonInput
                                obj={obj}
                                index={i}
                                isSelected={selectedRadioIndex === i}
                                onPress={() => onPressRadioButton(i)}
                                borderWidth={1.5}
                                buttonInnerColor={'#267DFF'}
                                buttonOuterColor={selectedRadioIndex === i ? '#267DFF' : '#00000020'}
                                buttonSize={wp('3.73%')}
                                buttonOuterSize={wp('5.86%')}
                                buttonStyle={{}}
                                buttonWrapStyle={{marginLeft: 10}}/>
                            </ModalTabInfoContainer>
                            </ModalTabContainer>
                             ))}
                           </RadioForm>
                </FilterModalContainer>
            </Modal>
        </Container>
    )
}

const styles = StyleSheet.create({
    firstKeyword: {
        marginLeft: 10,
    },
    lastKeyword: {
        marginRight: 10,
    },
    filterModal: {
        justifyContent: 'flex-end',
        margin: 0,
    }
})

export default SearchResultScreen;


