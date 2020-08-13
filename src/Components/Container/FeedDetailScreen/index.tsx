import React, {useState, useEffect, useLayoutEffect} from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableWithoutFeedback, Text, FlatList, ScrollView, StyleSheet, Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import allActions from '~/action';
import Modal from 'react-native-modal';

// location component
import FeedContent from '~/Components/Presentational/FeedDetailScreen/FeedContent';
import FeedInformation from '~/Components/Presentational/FeedDetailScreen/FeedInformation';

// Route
import {POSTLike, DELETELike} from '~/Route/Post/Like';
import POSTScrapFeed from '~/Route/Post/Scrap/POSTScrapFeed';
import DELETEScrapFeed from '~/Route/Post/Scrap/DELETEScrapFeed';
import GetFeedDetail from '~/Route/Post/GetFeedDetail';
import DELETEPost from '~/Route/Post/DELETEPost';

const Container = Styled.SafeAreaView`
width: ${wp('100%')};
height:${hp('100%')};
background-color: #ffffff;
`;

const HeaderContainer = Styled.View`
 width: ${wp('100%')};
 height: ${wp('11.7%')};
 flex-direction: row;
 align-items: center;
 justify-content:space-between;
`;


const LeftContainer = Styled.View`
background-color: #ffffff;
justify-content: center;
align-items: center;
padding-top: 7px;
padding-left: 16px;
padding-bottom: 13px;
`;

const CenterContainer = Styled.View`
justify-content: center;
align-items: center;
background-color: #ffffff;
height: ${hp('6%')};
flex: 7;
`;

const WriterContainer = Styled.View`
 flex-direction: row;
 align-items: center;
 justify-content: center;
`;

const RightContainer = Styled.View`
justify-content: center;
align-items: center;
background-color: #ffffff;
padding-right: 16px;
padding-top: 7px;
padding-bottom: 13px;
`;

const WriterProfileImage = Styled.Image`
border-radius: 100px;
 width: ${wp('8.5%')};
 height: ${wp('8.5%')};
`;

const WriterNicknameText = Styled.Text`
margin-left: 9px;
font-weight: 600;
font-size: 16px;
color: #333333;
`;

const HeaderTitleText = Styled.Text`
 font-size: 20px;
 margin-left: 6px;
`;

const BackButton = Styled.Image`
width: ${wp('6.4%')};
height: ${wp('6.4%')};
`;

const ButtonText = Styled.Text`
 font-size: 20px;
 color: #338EFC;
`;

const ViewMoreIcon = Styled.Image`
 width: ${wp('8.5%')};
 height: ${wp('8.5%')};
`;


const HeaderBorder = Styled.View`
 width: ${wp('100%')};
 height: 1px;
 background-color: #F1F1F1;
`;

const InformationContainer = Styled.View`
background-color: #ffffff;
`;

const CreatedAtContainer = Styled.View`
 flex:1;
 align-items: flex-end;
`;

const CreatedAtText = Styled.Text`
font-size: 12px;
color: #CCCCCC;
`;


const MainTagText = Styled.Text`
 font-size: 20px;
 font-weight: 600;
 color: #3384FF;
 margin-right: 7px;
`;

const SubTagText = Styled.Text`
color: #CCCCCC;
font-size: 20px;
font-weight: 600;
margin-right: 7px;
`;

const FeedContentContainer = Styled.View`
height: ${hp('100%')};
background-color: #000000;
`;

const MetadataContainer = Styled.View`
margin-top: 7px;
flex-direction: row;
`;

const RatingContainer = Styled.View`
 flex-direction: row;
`;

const RatingStarImage = Styled.Image`
margin-right: 3px;
width: ${wp('3.5%')};
height: ${wp('3.5%')};
`;

const ExpenseContainer = Styled.View`
flex-direction: row;
`;

const ExpenseIcon = Styled.Image`
width: ${wp('4.5%')};
height: ${wp('4.5%')};
`;

const ExpenseText = Styled.Text`
font-weight: 500;
font-size: 13px;
color: #C4C4C4;
`;

const LocationContainer = Styled.View`
flex-direction: row;
`;

const LocationIcon = Styled.Image`
width: ${wp('4.5%')};
height: ${wp('4.5%')};
`;

const LocationText = Styled.Text`
font-weight: 500;
font-size: 13px;
color: #C4C4C4;
`;

const IconDivider = Styled.View`
 margin-top: 2px;
 width: 1px;
 height: 13px;
 background-color: #EFEFEF;
 margin-left: 7px;
 margin-right: 7px;
`;

const ExpenseDateContainer = Styled.View`
 margin-top: 7px;
 flex-direction: row;
 align-items: center;
`;


const ExpenseDateText = Styled.Text`
font-size: 13px;
color: #C4C4C4;
`;



const BottomBar = Styled.SafeAreaView`
 width: ${wp('100%')};
 height: ${hp('7%')};
 position: absolute;
 bottom: 0;
 right: 15px;
 align-items: center;
 justify-content: flex-end;
 background-color: #FAFAFA;
 flex-direction: row;
`;

const LikeIconContainer = Styled.View`
 padding: 5px;
 justify-content: center;
 align-items: center;
`;

const CommentContainer = Styled.View`
 flex:1;
 justify-content: center;
 align-items: center;
 height: ${hp('5.5%')};
`;

const ScrapContainer = Styled.View`
 flex:1;
 justify-content: center;
 align-items: center;
 height: ${hp('5.5%')};
`;

const InfoContainer = Styled.View`
 flex-direction: row;
 align-items: center;
 margin-left: 15px;
 margin-bottom: 15px;
`;

const LikeCountText = Styled.Text`
 margin-left: 0px;
 font-size: 15px;
 color: #333333;
`;


const InfoCountText = Styled.Text`
 margin-left: 5px;
 font-size: 15px;
 color: #333333;
`;

const LikeIcon = Styled.Image`
width: ${wp('5.7%')};
height: ${wp('5.7%')};
tint-color: #333333;
`;

const PressedLikeIcon = Styled.Image`
width: ${wp('5.7%')};
height: ${wp('5.7%')};
`;

const CommentIcon = Styled.Image`
width: ${wp('5.7%')};
height: ${wp('5.7%')};

tint-color: #333333;
`;

const ScrapIcon = Styled.Image`
width: ${wp('5.7%')};
height: ${wp('5.7%')};
tint-color: #333333;
`;

const PressedScrapIcon = Styled.Image`
width: ${wp('5.7%')};
height: ${wp('5.7%')};
`;

const MyFeedViewMoreModalContainer = Styled.View`
width: ${wp('100%')};
height: ${wp('53.86%')};
border-top-left-radius: 10px;
border-top-right-radius: 10px;
background-color: #FFFFFF;
`;

const OtherUsersFeedViewMoreModalContainer = Styled.View`
width: ${wp('100%')};
height: ${wp('36.8%')};
border-top-left-radius: 10px;
border-top-right-radius: 10px;
background-color: #FFFFFF;
`;

const ModalHeaderContainer = Styled.View`
 padding-top: 4px;
 width: ${wp('100%')};
 padding-bottom: 10px;
 align-items: center;
`;


const ModalToggleButton = Styled.View`
 width: ${wp('11.7%')};
 height: ${wp('1.4%')};
 background-color: #F4F4F7;
 border-radius: 5px;
`;


const ModalTabItemContainer = Styled.View`
 height: ${wp('17%')};
 flex-direction: row;
 align-items: center;
 padding-left: 16px;
 padding-right: 16px;
 border-bottom-width: 0.6px;
 border-color: #ECECEE;
`;

const ModalTabItemIconImage = Styled.Image`
width: ${wp('6.4%')};
height: ${wp('6.4%')};
tint-color: #1D1E1F;
`;

const ModalTabItemLabelText = Styled.Text`
 margin-left: 11px;
 font-size: 18px;
 color: #1D1E1F;
`;

const ReportModalContainer = Styled.View`
 width: ${wp('100%')};
 height: 500px;
 background-color: #FFFFFF;
 border-top-left-radius: 10px;
 border-top-right-radius: 10px;
`;






const TEST_FEED_DETAIL = 
{
  "post": {
    "id": 31,
    "starRate": 4.5,
    "expense": "7,000",
    "certifiedLocation": true,
    "hits": 0,
    "likes": 23,
    "sequence": "DMPLDLDP",
    "temporary": false,
    "spendDate": "2020년 07월 14일",
    "open": true,
    "createdAt": "3시간전",
    "updatedAt": "2020-07-21T09:12:56.000Z",
    "deletedAt": null,
    "userId": "2b00ed60-be9f-11ea-b113-99f6f65adc3f",
    "mainTagId": 4,
    "subTagOneId": 5,
    "subTagTwoId": 6,
    "addressId": 2,
    "commentsCount": 11,
    "replysCount": 4,
    "popular": 63,
    "user": {
      "id": "2b00ed60-be9f-11ea-b113-99f6f65adc3f",
      "nickname": "카페인중독자",
      "profileImg": "https://i.pinimg.com/564x/36/64/bb/3664bbe5c35418ab85850b6314a84366.jpg"
    },
    "mainTags": {
      "id": 4,
      "name": "을지로",
      "starRate": 3.74074,
      "reviewNum": 27
    },
    "subTagOnes": {
      "id": 5,
      "name": "챔프커피",
      "starRate": 0,
      "reviewNum": 23
    },
    "subTagTwos": {
      "id": 6,
      "name": "카페투어",
      "starRate": 0,
      "reviewNum": 23
    },
    "Likers": [],
    "mediaFiles": [
      {
        "filename": "original/1594818766512IMG_0652.JPG",
        "size": 143232,
        "mimetype": "image/jpeg",
        "index": 2,
        "url": "https://d37gdtxv8z76fx.cloudfront.net/original/1594818766512IMG_0652.JPG",
        "type": "image"
      }
    ],
    "descriptions": [
      {
        "description": "test1",
        "index": 1,
        "textAlign": "left",
        "type": "description"
      },
      {
        "description": "test2",
        "index": 5,
        "textAlign": "left",
        "type": "description"
      },
      {
        "description": "test3",
        "index": 7,
        "textAlign": "left",
        "type": "description"
      }
    ],
    "Products": [
      {
        "title": "전부였던 사람이 떠나갔을 때 태연히 밥을 먹기도 했다(무지개 리커버 에디션)",
        "description": "사람을 사랑하고, 사람과 이별하고, 그럼에도 전부였던 ...",
        "image": "http://image.kyobobook.co.kr/images/book/xlarge/505/x9791188469505.jpg",
        "url": "http://www.kyobobook.co.kr/redi_book.jsp?b=9791188469505&g=KOR",
        "site": "KYOBOBOOK",
        "favicon": "http://image.kyobobook.co.kr/newimages/apps/b2c/kyobo.ICO",
        "postProduct": {
          "index": 3,
          "createdAt": "2020-07-15T13:12:47.000Z",
          "updatedAt": "2020-07-15T13:12:47.000Z",
          "productId": 1,
          "postId": 31
        },
        "type": "product"
      },
      {
        "title": "닥터방기원 랩 탈모 증상 완화 샴푸",
        "description": "COUPANG",
        "image": "https://thumbnail10.coupangcdn.com/thumbnails/remote/230x230ex/image/product/image/vendoritem/2019/10/11/3070321063/a48a6244-8764-459a-9d6d-b63ffe7e3f79.jpg",
        "url": "https://www.coupang.com/vp/products/10295034",
        "site": "coupang",
        "favicon": "https://image9.coupangcdn.com/image/coupang/favicon/v2/favicon.ico",
        "postProduct": {
          "index": 8,
          "createdAt": "3시간전",
          "updatedAt": "2020-07-15T13:12:47.000Z",
          "productId": 2,
          "postId": 31
        },
        "type": "product"
      }
    ],
    "address": {
      "id": 2,
      "address": "을지로 세운 대림상가 3층",
      "geographLong": 37.5658,
      "geographLat": 126.991,
      "reviewNum": 22
    },
    "comments": [
      {
        "id": 2,
        "description": "안녕ㅇㅇ",
        "Like": 0,
        "createdAt": "2020-07-21T13:01:35.000Z",
        "updatedAt": "2020-07-21T13:01:35.000Z",
        "deletedAt": null,
        "userId": "a5fb00f0-c4d5-11ea-aac4-73edfae51b0b",
        "postId": 31,
        "replyId": null
      },
      {
        "id": 3,
        "description": "메롱메롱",
        "Like": 0,
        "createdAt": "2020-07-21T13:09:41.000Z",
        "updatedAt": "2020-07-21T13:09:41.000Z",
        "deletedAt": null,
        "userId": "a5fb00f0-c4d5-11ea-aac4-73edfae51b0b",
        "postId": 31,
        "replyId": null
      },
      {
        "id": 4,
        "description": "ㅋㅋㅋㅋ",
        "Like": 0,
        "createdAt": "2020-07-21T13:10:56.000Z",
        "updatedAt": "2020-07-21T13:10:56.000Z",
        "deletedAt": null,
        "userId": "a5fb00f0-c4d5-11ea-aac4-73edfae51b0b",
        "postId": 31,
        "replyId": null
      },
      {
        "id": 5,
        "description": "ggggg",
        "Like": 0,
        "createdAt": "2020-07-21T13:11:59.000Z",
        "updatedAt": "2020-07-21T13:11:59.000Z",
        "deletedAt": null,
        "userId": "a5fb00f0-c4d5-11ea-aac4-73edfae51b0b",
        "postId": 31,
        "replyId": null
      },
      {
        "id": 6,
        "description": "gkgkggkgkk",
        "Like": 0,
        "createdAt": "2020-07-21T13:12:09.000Z",
        "updatedAt": "2020-07-21T13:12:09.000Z",
        "deletedAt": null,
        "userId": "a5fb00f0-c4d5-11ea-aac4-73edfae51b0b",
        "postId": 31,
        "replyId": null
      },
      {
        "id": 7,
        "description": "ssss",
        "Like": 0,
        "createdAt": "2020-07-21T13:13:31.000Z",
        "updatedAt": "2020-07-21T13:13:31.000Z",
        "deletedAt": null,
        "userId": "a5fb00f0-c4d5-11ea-aac4-73edfae51b0b",
        "postId": 31,
        "replyId": null
      },
      {
        "id": 8,
        "description": "ffff",
        "Like": 0,
        "createdAt": "2020-07-22T02:30:16.000Z",
        "updatedAt": "2020-07-22T02:30:16.000Z",
        "deletedAt": null,
        "userId": "a5fb00f0-c4d5-11ea-aac4-73edfae51b0b",
        "postId": 31,
        "replyId": null
      },
      {
        "id": 9,
        "description": "ㅂㄱㅍ",
        "Like": 0,
        "createdAt": "2020-07-22T02:38:12.000Z",
        "updatedAt": "2020-07-22T02:38:12.000Z",
        "deletedAt": null,
        "userId": "a5fb00f0-c4d5-11ea-aac4-73edfae51b0b",
        "postId": 31,
        "replyId": null
      },
      {
        "id": 10,
        "description": "히히힣ㅎ",
        "Like": 0,
        "createdAt": "2020-07-22T02:58:46.000Z",
        "updatedAt": "2020-07-22T02:58:46.000Z",
        "deletedAt": null,
        "userId": "a5fb00f0-c4d5-11ea-aac4-73edfae51b0b",
        "postId": 31,
        "replyId": null
      },
      {
        "id": 11,
        "description": "쇼쇼",
        "Like": 0,
        "createdAt": "2020-07-22T02:59:45.000Z",
        "updatedAt": "2020-07-22T02:59:45.000Z",
        "deletedAt": null,
        "userId": "a5fb00f0-c4d5-11ea-aac4-73edfae51b0b",
        "postId": 31,
        "replyId": null
      },
      {
        "id": 15,
        "description": "이건댓글",
        "Like": 0,
        "createdAt": "2020-07-22T05:02:00.000Z",
        "updatedAt": "2020-07-22T05:02:00.000Z",
        "deletedAt": null,
        "userId": "a5fb00f0-c4d5-11ea-aac4-73edfae51b0b",
        "postId": 31,
        "replyId": null
      }
    ],
    "divisonLines": [
      {
        "index": 4,
        "type": "divisonLine"
      },
      {
        "index": 6,
        "type": "divisonLine"
      }
    ],
    "Scraps": []
  },
  "postBody": [
    {
      "description": "이태원에서 이제는 을지로 세운대림상가에 오픈을 한 을지로 '챔프커피' 3호점 입니다. 벌써 3호점이라니 대단합니다.",
      "index": 1,
      "textAlign": "left",
      "type": "description"
    },
    {
      "filename": "original/1594818766512IMG_0652.JPG",
      "size": 143232,
      "mimetype": "image/jpeg",
      "index": 2,
      "url": "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F88HeB%2Fbtqvzgs1M1X%2Ftjan249YhEJsAdZPKVSXsK%2Fimg.png",
      "type": "image"
    },
    {
      "index": 4,
      "type": "divisonLine"
    },
    {
      "description": "주로 남색 계열의 색상이 많이 느껴지는 공간으로 크게 넓은 공간은 아닙니다. 그래도 세 곳 중 가장 넓고 쾌적한 거 같습니다.",
      "index": 5,
      "textAlign": "left",
      "type": "description"
    },
 
    {
      "description": "또한 매장 앞에 스웨그 넘치는 간이 테이블이 많아서 자리가 부족하지는 않을 거 같습니다.",
      "index": 7,
      "textAlign": "left",
      "type": "description"
    },
    {
      "filename": "original/1594818766512IMG_0652.JPG",
      "size": 143232,
      "mimetype": "image/jpeg",
      "index": 2,
      "url": "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FUrtBr%2FbtqvAAqwXeS%2F6g7fhDFgLs9Ks9BKvOZGZK%2Fimg.png",
      "type": "image"
    },
    {
      "description": "3작업실은 확실히 새로 오픈한 매장답게 원두나 판매상품에 대한 진열 및 전시도 멋스러워졌습니다. 빨간색과 남색의 종이컵이 인상적입니다. 그리고 3호점에서는 티라미수도 판매를 합니다. (하지만 쿠키가 너무 유명하다 보니 애매합니다)",
      "index": 7,
      "textAlign": "left",
      "type": "description"
    },
    {
      "filename": "original/1594818766512IMG_0652.JPG",
      "size": 143232,
      "mimetype": "image/jpeg",
      "index": 2,
      "url": "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbhZEPn%2FbtqvAAKPqKB%2Fy7dWNqg4XNIZ3wJ2I25kI1%2Fimg.png",
      "type": "image"
    },
    {
      "description": "챔프커피 3호점의 메뉴판입니다. 기존의 1.2호점 매장들과의 차이는 거의 없지만 역시 티라미수의 추가와 브루잉 메뉴에 '브라운 인 소울' 블렌드가 추가된 점이 눈에 띕니다.",
      "index": 7,
      "textAlign": "left",
      "type": "description"
    },
    {
      "filename": "original/1594818766512IMG_0652.JPG",
      "size": 143232,
      "mimetype": "image/jpeg",
      "index": 2,
      "url": "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbSa1Ou%2FbtqvAP14MbU%2FTeUt5ya0FBN1HZMiYGF3Tk%2Fimg.png",
      "type": "image"
    },
    {
      "description": "커피만 마시기는 아쉬울 거 같아 챔프쿠키(크렌베리)도 같이 주문했습니다. 저 둘의 조합은 정말 대단한 거 같습니다 고소하면서도 카라멜같은 느낌의 단맛과 균형 잡힌 밸런스가 뛰어난 플랫화이트와 쫀득쫀득하면서도 달지 않고 묵직한 쿠키의 조합은 정말 최고입니다!",
      "index": 7,
      "textAlign": "left",
      "type": "description"
    },
    {
      "description": "페 열풍이 식고 경기불황이 지속되면서 수많은 카페들이 문을 닫고 정리하는 지금 특유의 개성과 정체성을 지키면서 점점 더 발전되어 가는 모습을 보이는 챔프커피를 보며 많은 것을 배웠습니다. 챔프커피같은 곳들이 잘 되었으면 합니다.",
      "index": 7,
      "textAlign": "left",
      "type": "description"
    },
    {
      "description": "한 줄 정리: 힙하면서도 세련된 곳!",
      "index": 7,
      "textAlign": "left",
      "type": "description"
    },
    {
      "title": "전부였던 사람이 떠나갔을 때 태연히 밥을 먹기도 했다(무지개 리커버 에디션)",
      "description": "사람을 사랑하고, 사람과 이별하고, 그럼에도 전부였던 ...",
      "image": "http://image.kyobobook.co.kr/images/book/xlarge/505/x9791188469505.jpg",
      "url": "http://www.kyobobook.co.kr/redi_book.jsp?b=9791188469505&g=KOR",
      "site": "KYOBOBOOK",
      "favicon": "http://image.kyobobook.co.kr/newimages/apps/b2c/kyobo.ICO",
      "postProduct": {
        "index": 3,
        "createdAt": "2020-07-15T13:12:47.000Z",
        "updatedAt": "2020-07-15T13:12:47.000Z",
        "productId": 1,
        "postId": 31
      },
      "type": "product"
    },
  ]
}



interface Props {
    navigation: any,
    route: any,
}

const FeedDetailScreen = ({navigation, route}: Props) => {
    const [paragraphData, setParagraphData] = useState<Array<object>>([]);
    const [postId, setPostId] = useState();
    const [feedDetailInfo, setFeedDetailInfo] = useState({
        user : {
          profileImg: "",
        },
        address : {
          address : ""
        }
    });

    const [createdDate, setCreatedDate] = useState<string>("");
    const [spendDate, setSpendDate] = useState();
    const [currentUserLike, setCurrentUserLike] = useState<boolean>(false);
    const [currentUserScrap, setCurrentUserScrap] = useState<boolean>(false);
    const [likeCount, setLikeCount] = useState<number>();
    const [allCommentCount, setAllCommentCount] = useState<number>();
    const [myFeedModalVisible, setMyFeedModalVisible] = useState<boolean>(false);
    const [otherUsersFeedModalVisible, setOtherUsersFeedModalVisible] = useState<boolean>(false);
    const [currentUserFeed, setCurrentUserFeed] = useState<boolean>(false);
    const [visibleReportModal, setVisibleReportModal] = useState<boolean>(false);

    const currentUser = useSelector((state) => state.currentUser);
    const dispatch = useDispatch();

    // 서버 연결X 테스트용 코드
    /*
    useEffect(() => {

      console.log("response.data.post.mainTags", TEST_FEED_DETAIL.post.mainTags);
      setParagraphData(TEST_FEED_DETAIL.postBody);
      setPostId(route.params.feedId);
      setFeedDetailInfo(TEST_FEED_DETAIL.post);
      setLikeCount(TEST_FEED_DETAIL.post.likes);
      setAllCommentCount(TEST_FEED_DETAIL.post.commentsCount+TEST_FEED_DETAIL.post.replysCount);
      setCreatedDate("3시간전");
      setCurrentUserLike(route.params.currentUserLike)
      setCurrentUserScrap(route.params.currentUserScrap);

    }, [])
    */

    // 서버 연결 코드
    useEffect(() => {
        if(route.params?.update) {
          route.params.update = false
        }
        if(route.params?.feedId) {
       GetFeedDetail(route.params.feedId).then(function(response) {
           console.log("GetFeedDetail Success:", response.data);
           console.log("currentUser.user", currentUser.user);
           if(response.data.post.user.id === currentUser.user.userId) {
             setCurrentUserFeed(true);
           }
           //console.log("response.data.post", response.data.post);
           
           console.log("response.data.post.mainTags", response.data.post.mainTags);
           response.data.post.spendDate = getDateFormat(response.data.post.spendDate)
           setParagraphData(response.data.postBody);
           setPostId(route.params.feedId);
           setFeedDetailInfo(response.data.post);
           setLikeCount(response.data.post.likes);
           setAllCommentCount(response.data.post.commentsCount+response.data.post.replysCount);
           setCreatedDate(route.params.createdAt);
           setCurrentUserLike(route.params.currentUserLike)
           setCurrentUserScrap(route.params.currentUserScrap);

       })
       .catch(function(error) {
           console.log("error", error);
       })
    }
    }, [route.params?.feedId, route.params?.update])

    useEffect(() => {
      if(route.params?.commentList) {
        setAllCommentCount(route.params.commentList.length);
      }
    }, [route.params?.commentList])

    function getDateFormat(date) {
      var tmpDate = new Date(date);
      var year = tmpDate.getFullYear();
      var month = tmpDate.getMonth() + 1;
      month = month >= 10 ? month : '0' + month;
      var day = tmpDate.getDate();
      day = day >= 10 ? day : '0' + day;
      return year + '. ' + month + '. ' + day
    }

    const moveToCommentList = () => {
        console.log("postId", postId);

        navigation.navigate("CommentListScreen", {
            postId: postId,
            feedDetailInfo: feedDetailInfo,
            createdAt: createdDate,
        })
    }

    const moveToLikersList = () => {
      navigation.navigate("LikeListScreen",{
        likersList: feedDetailInfo.Likers,
      })
    }

    const clickToLikeIcon = () => {
      console.log("currentUser", currentUser);
      console.log("postId", postId);

      POSTLike(currentUser.user.userId, postId)
      .then(function(response) {
        console.log("response", response)
      })
      .catch(function(error) {
        console.log("error", error)
      })
    }

    const renderTagItem = ({item, index}) => {
        if(index === 0) { 
          return (
            <MainTagText>#{item}</MainTagText>
            )
        } else {
          return (
          <SubTagText>#{item}</SubTagText>
            )
        }
    }

    const addLike = () => {
      var addedLikeFeeds = currentUser.likeFeeds;
      var tmpLikeCount = likeCount + 1;
      setLikeCount(tmpLikeCount);
      setCurrentUserLike(true);
      const likeObj = {
        id: route.params.feedId,
      }

      addedLikeFeeds.push(likeObj);
      dispatch(allActions.userActions.setLikeFeeds(addedLikeFeeds))

      POSTLike(currentUser.user.userId, postId)
      .then(function(response) {
        console.log("response", response)
      })
      .catch(function(error) {
        console.log("error", error);
      })
    }

    const deleteLike = () => {
      var deletedLikeFeeds = currentUser.likeFeeds;
      console.log("FeedDetailScreen currentUser", currentUser);
      var index = deletedLikeFeeds.indexOf(postId);
      deletedLikeFeeds.splice(index, 1);
      dispatch(allActions.userActions.setLikeFeeds(deletedLikeFeeds));

      var tmpLikeCount = likeCount - 1;
      setLikeCount(tmpLikeCount);
      setCurrentUserLike(false);

      DELETELike(currentUser.user.userId, postId)
      .then(function(response) {
        console.log("response", response)
      })
      .catch(function(error) {
        console.log("error", error)
      })
    }

    const moveToWriterProfile = () => {
      navigation.navigate("AnotherUserProfileStack", {
        screen: "AnotherUserProfileScreen",
        params: {requestedUserNickname: feedDetailInfo.user.nickname}
      });
    }

    const addScrapFeed = () => {
    var scrapFeedArray = new Array();
    scrapFeedArray.push(postId);
    setCurrentUserScrap(true);

    var addedScrapFeeds = currentUser.scrapFeeds;
    const scrapObj = {
      id: postId,
    }
    addedScrapFeeds.push(scrapObj);
    dispatch(allActions.userActions.setScrapFeeds(addedScrapFeeds))
    POSTScrapFeed(scrapFeedArray)
    .then(function(response: any) {
      console.log("스크랩성공", response)
    })
    .catch(function(error: any) {
      console.log("스크랩실패", error);
    })
    }

    const deleteScrapFeed = () => {
      var scrapFeedArray = new Array();
      scrapFeedArray.push(postId);
      setCurrentUserScrap(false);

      DELETEScrapFeed(scrapFeedArray)
      .then(function(response) {
        console.log("스크랩삭제 성공", response)
      })
      .catch(function(error) {
        console.log("스크랩삭제 실패", error);
      })

      var deletedScrapFeeds = currentUser.scrapFeeds;
      var deletedFeedIndex = deletedScrapFeeds.indexOf(postId);
      deletedScrapFeeds.splice(deletedFeedIndex, 1);
      dispatch(allActions.userActions.setScrapFeeds(deletedScrapFeeds))
    }

    const clickToViewMore = () => {
      if(currentUserFeed) {
        setMyFeedModalVisible(true)
      } else {
        setOtherUsersFeedModalVisible(true);
        //setVisibleReportModal(true);
      }
    }

    const deleteFeed = () => {
      Alert.alert(
        '정말 게시글을 삭제하시겠어요?', 
        ' ', 
        [
        {
            text: '확인',
            onPress: () => {
              var deletedFeedIndex:number;
              console.log("currentUser.userAllFeeds", currentUser.userAllFeeds)
              if(currentUser.userAllFeeds) {
                currentUser.userAllFeeds.forEach((feed: object, index: number) => {
                   if(feed.id === postId) {
                     deletedFeedIndex = index;
                   }
                })
              }
              DELETEPost(postId)
              .then(function(response) {
                console.log("피드 삭제 성공 response", response);
                if(currentUser.userAllFeeds) {
                  console.log("피드삭제성공deletedFeedIndex", deletedFeedIndex);
                  var deletedFeeds = currentUser.userAllFeeds;
                  deletedFeeds.splice(deletedFeedIndex, 1);
                  dispatch(allActions.userActions.setUserAllFeeds(deletedFeeds));
                  navigation.goBack();
                }
              })
              .catch(function(error) {
                console.log("피드 삭제 error", error);
              })
        }
        },
        {
            text: '취소',
            onPress: () => 0,
            style: 'cancel',
        }
    ],      
  );
}

   const clickToReportFeed = () => {
     console.log("ggg")
     //setOtherUsersFeedModalVisible(false);
     setVisibleReportModal(true);
   }  

   const moveToFeedEdit = () => {
     setMyFeedModalVisible(false);
     navigation.navigate("FeedEditScreen", {
       paragraphData: paragraphData,
       feedDetailInfo: feedDetailInfo,
       feedId: postId,
     });
   }

  

   return (
       <Container>
        <HeaderContainer>
        <LeftContainer>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <BackButton source={require('~/Assets/Images/HeaderBar/ic_back.png')} />
          </TouchableWithoutFeedback>
        </LeftContainer>
        <RightContainer>
              <TouchableWithoutFeedback onPress = {() => clickToViewMore()}>
                  <ViewMoreIcon
                  source={require('~/Assets/Images/HeaderBar/ic_more.png')}/>
              </TouchableWithoutFeedback>
        </RightContainer>
      </HeaderContainer>
      <ScrollView
      showsVerticalScrollIndicator={false}>
      <InformationContainer>
   <FeedInformation
   profileImage={feedDetailInfo.user.profileImg}
   profileNickname={feedDetailInfo.user.nickname}
   createdAt={createdDate}
   mainTag={feedDetailInfo.mainTags ? feedDetailInfo.mainTags.name : null}
   subTag1={feedDetailInfo.subTagOnes ? feedDetailInfo.subTagOnes.name : null}
   subTag2={feedDetailInfo.subTagTwos ? feedDetailInfo.subTagTwos.name : null}
   rating={feedDetailInfo.starRate}
   expensePrice={feedDetailInfo.expense ? feedDetailInfo.expense.toLocaleString() + "원" : "금액정보 없음"}
   location={feedDetailInfo.address ? feedDetailInfo.address.address : "위치정보 없음"}
   expenseDate={feedDetailInfo.spendDate ? feedDetailInfo.spendDate : null}
   moveToWriterProfile={moveToWriterProfile}
   />
      </InformationContainer>
          <FeedContent
          paragraphData={paragraphData}
          ></FeedContent>
          </ScrollView>
      <BottomBar>
          <InfoContainer>
            {!currentUserLike && (
            <TouchableWithoutFeedback onPress={() => addLike()}>
            <LikeIconContainer>
            <LikeIcon
            source={require('~/Assets/Images/ic_heart_outline.png')}/>
            </LikeIconContainer>
            </TouchableWithoutFeedback>
            )}
            {currentUserLike && (
            <TouchableWithoutFeedback onPress={() => deleteLike()}>
            <LikeIconContainer>
            <PressedLikeIcon
            source={require('~/Assets/Images/ic_pressedLike.png')}/>
            </LikeIconContainer>
            </TouchableWithoutFeedback>
            )}
               <TouchableWithoutFeedback onPress={() => moveToLikersList()}>
              <LikeCountText style={currentUserLike && {color:'#FF453A'}}>{likeCount}</LikeCountText>
          </TouchableWithoutFeedback>
          </InfoContainer>
          <TouchableWithoutFeedback onPress={() => moveToCommentList()}>
          <InfoContainer>
          <CommentIcon
            source={require('~/Assets/Images/ic_comment_outline.png')}/>
            <InfoCountText>{allCommentCount}</InfoCountText>
          </InfoContainer>
          </TouchableWithoutFeedback>
          {!currentUserScrap && (
            <TouchableWithoutFeedback onPress={() => addScrapFeed()}>
              <InfoContainer>
               <ScrapIcon
            source={require('~/Assets/Images/Feed/ic_emptyScrap.png')}/>
              </InfoContainer>
          </TouchableWithoutFeedback>
          )}
          {currentUserScrap && (
            <TouchableWithoutFeedback onPress={() => deleteScrapFeed()}>
              <InfoContainer>
                <PressedScrapIcon
                source={require('~/Assets/Images/Feed/ic_pressedScrap.png')}/>
              </InfoContainer>
            </TouchableWithoutFeedback>
          )}
      </BottomBar>
      <Modal
      onBackdropPress={() => setMyFeedModalVisible(false)}
      isVisible={myFeedModalVisible}
      backdropOpacity={0.25}
      onSwipeComplete={() => setMyFeedModalVisible(false)}
      swipeDirection={['down']}
      style={styles.myFeedModal}>
        <MyFeedViewMoreModalContainer>
        <ModalHeaderContainer>
        <ModalToggleButton/>
        </ModalHeaderContainer>
        <TouchableWithoutFeedback onPress={() => deleteFeed()}>
        <ModalTabItemContainer>
          <ModalTabItemIconImage
          style={{tintColor:'#FF3B30'}}
          source={require('~/Assets/Images/Feed/ic_remove.png')}/>
          <ModalTabItemLabelText
          style={{color:'#FF3B30'}}
          >삭제하기</ModalTabItemLabelText>
        </ModalTabItemContainer>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => moveToFeedEdit()}>
        <ModalTabItemContainer>
          <ModalTabItemIconImage
          style={{tintColor:'#1D1E1F'}}
          source={require('~/Assets/Images/Feed/ic_pen.png')}/>
          <ModalTabItemLabelText
          style={{color:'#1D1E1F'}}
          >수정하기</ModalTabItemLabelText>
        </ModalTabItemContainer>
        </TouchableWithoutFeedback>
        </MyFeedViewMoreModalContainer>
      </Modal>
      <Modal
      onBackdropPress={() => setOtherUsersFeedModalVisible(false)}
      isVisible={otherUsersFeedModalVisible}
      backdropOpacity={0.25}
      onSwipeComplete={() => setOtherUsersFeedModalVisible(false)}
      swipeDirection={['down']}
      style={styles.otherUsersModal}>
        <OtherUsersFeedViewMoreModalContainer>
        <ModalHeaderContainer>
        <ModalToggleButton/>
        </ModalHeaderContainer>
        <ModalTabItemContainer>
          <ModalTabItemIconImage
          style={{tintColor:'#1D1E1F'}}
          source={require('~/Assets/Images/Feed/ic_declare.png')}/>
          <ModalTabItemLabelText
          style={{color:'#1D1E1F'}}
          >신고하기</ModalTabItemLabelText>
        </ModalTabItemContainer>
        </OtherUsersFeedViewMoreModalContainer>
      </Modal>
      <Modal
      onBackdropPress={() => setVisibleReportModal(false)}
      isVisible={visibleReportModal}
      backdropOpacity={0.25}
      onSwipeComplete={() => setVisibleReportModal(false)}
      swipeDirection={['down']}
      style={styles.reportModal}>
        <ReportModalContainer>
          <ModalHeaderContainer>
            <ModalToggleButton/>
          </ModalHeaderContainer>
        </ReportModalContainer>
      </Modal>
       </Container>
   )
}

const styles = StyleSheet.create({
  myFeedModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  otherUsersModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  reportModal : {
    justifyContent: 'flex-end',
    margin: 0,
  }
})

export default FeedDetailScreen;