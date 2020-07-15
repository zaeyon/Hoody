import React, {useEffect, useState} from 'react';
import {TouchableWithoutFeedback, FlatList, View, Keyboard, ScrollView} from 'react-native';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {NavigationContainer} from '@react-navigation/native';

import FeedItem from '~/Components/Presentational/FeedListScreen/FeedItem';
import PopularTagItem from '~/Components/Presentational/FeedListScreen/PopularTagItem';
import GetAllFeed from '~/Route/Post/TestFeed';
import SearchBar from '~/Components/Presentational/FeedListScreen/SearchBar'
import SearchResult from '~/Components/SearchResult';
import SearchAutoComplete from '~/Components/Presentational/SearchScreen/SearchAutoCompleteItem';
import GetAutoComplete from '~/Route/Search/GetAutoComplete';
import Geolocation from 'react-native-geolocation-service';

const BottomTabHeight = Styled.View`
 width: ${wp('100%')}px;
 height: 45px;
 background-color: #F4F8FB;
`;

const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #ffffff;
 align-items: center;
`;

const HeaderBar = Styled.View`
 width: ${wp('100%')}px;
 padding: 20px 20px 10px 20px;
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
`;

const HeaderTitleText = Styled.Text`
 font-size: 24px;
 font-family: 'SFProDisplay-Regular';
`;


const ReviewMapIcon = Styled.Image`
 width: ${wp('8%')}px;
 height: ${wp('8%')}px;
`;

const NoFeedListContainer = Styled.View`
 width: ${wp('100%')}px;
 height: ${hp('87%')}px;
 justify-content: center;
 align-items: center;
`;

const FeedListContainer = Styled.View`
 width: ${wp('100%')}px;
 justify-content: center;
 align-items: center;
`;

const NoFeedText = Styled.Text`
 font-size: 17px;
 color: #c3c3c3;
`;

const BodyContainer = Styled.ScrollView`
 background-color: #ffffff;
`;


const TagAutoCompleteContainer = Styled.View`
width: ${wp('100%')}px;
top: 0px;
position: absolute;
background-color: #ffffff;
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
    expanse: 2000,
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
    expanse: 2000,
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
    expanse: 2000,
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

const POPULAR_TAG_DATE = [
  {
    tag_image:
      'https://item.kakaocdn.net/do/aebede13eed766c14f8e46d68509586c7154249a3890514a43687a85e6b6cc82',

    tag_name: '아무거나',
  },
  {
    tag_image:
      'https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/83096173_570405996888776_2961831972565807746_n.jpg?_nc_ht=scontent-yyz1-1.cdninstagram.com&_nc_cat=108&_nc_ohc=NvpWEnbC9AcAX_R_890&oh=c8945d8c09c40c2910563e0f8a22b621&oe=5EF86D59',
    tag_name: '배고파',
  },
];

interface Props {
  navigation: any,
  route: any
}

function FeedListScreen({navigation, route}: Props) {
  const [feedListData, setFeedListData] = useState([]);
  const [searchFocus, setSearchFocus] = useState<boolean>(false);
  const [desArray, setDesArray] = useState();
  const [query, setQuery] = useState();
  const [category, setCategory] = useState("popular");
  const [autoComplete, setAutoComplete] = useState();
  const [resultCategory, setResultCategory] = useState();
  const [currentLocation, setCurrentLocation] = useState();
  
  useEffect(() => {
    getFeedData();

    var hasLocationPermission = true;

    if (hasLocationPermission) {
        Geolocation.getCurrentPosition(
            (position) => {
              console.log("현재 위치", position);
              setCurrentLocation(position.coords);
            },
            (error) => {
              // See error code charts below.
              console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      }


  }, []);

  useEffect(() => {
    GetAutoComplete(query, category)
    .then(function(response) {
      console.log("검색 자동 완성", response);
      setAutoComplete(response.result);
    })
    .catch(function(error) {
      console.log("검색 자동 완성 실패", error);
    })
  }, [query, category])

  const getFeedData = () => {
    GetAllFeed().then(function(response) {
      setFeedListData(response);
      console.log("파드 목록 가져오기 성공", response);
    })
    .catch(function(error) {
      console.log("피드 목록 가져오기 실패", error);
    })
  };

  const onFocusSearch = () => {
    setSearchFocus(true);
  }
  
  const onBlurSearch = () => {
    if(searchFocus === true) {
    setSearchFocus(false);
    Keyboard.dismiss();
    }
  }

  const changingSearchInput = (text:string) => {
    setQuery(text);
  }

  const changeSearchCategory = (changedCategory: string) => {
    setCategory(changedCategory)
  }

  const moveNearFeedMap = () => {
      console.log("currentLocation", currentLocation);

      navigation.navigate("NearFeedMapScreen", {
        currentLatitude: currentLocation.latitude,
        currentLongitude: currentLocation.longitude,
    })
  }
  

  return (
    <TouchableWithoutFeedback onPress={() => onBlurSearch()}>
    <Container>
      
      <HeaderBar>
          {/*
        <SearchBar
        onFocusSearch={onFocusSearch}
        changingSearchInput={changingSearchInput}
        />
          */}
          <HeaderTitleText>피드</HeaderTitleText>
          <TouchableWithoutFeedback onPress={() => moveNearFeedMap()}>
          <ReviewMapIcon
          source={require('~/Assets/Images/ic_map.png')}/>
          </TouchableWithoutFeedback>
      </HeaderBar>
      <BodyContainer>
      {feedListData[0] && (
      <FeedListContainer>
      <FlatList
        data={TEST_FEED_DATA}
        renderItem={({item}) => (
                <FeedItem
                  id={item.id}
                  profile_image={item.user.profileImg}
                  nickname={item.user.nickname}
                  createdAt={item.createdAt}
                  rating={item.starRate}
                  main_tag={item.mainTags.name}
                  sub_tag1={item.subTagOnes.name}
                  sub_tag2={item.subTagTwos.name}
                  like_count={item.Likers.length}
                  comment_count={item.comments.length}
                  scrap_count={item.Scraps.length}
                  mediaFiles={item.mediaFiles}
                  image_count={item.mediaFiles.length}
                  location={item.address.address}
                  expanse={item.expanse}
                  desArray={item.descriptions}
                  navigation={navigation}
                />
        )}
      />
      </FeedListContainer>
      )}
      {!feedListData[0] && (
        <NoFeedListContainer>
          <NoFeedText>등록된 피드가 없어요</NoFeedText>

        </NoFeedListContainer>
      )}
      {/*
      {searchFocus && (
        <TagAutoCompleteContainer>
        <SearchAutoComplete
        autoCompleteResult={autoComplete}
        changeSearchCategory={changeSearchCategory}
        query={query}
        resultCategory={category}
        > 
        </SearchAutoComplete>
        </TagAutoCompleteContainer>
      )}
      */}
      </BodyContainer>
    </Container>
    </TouchableWithoutFeedback>
  );
}

export default FeedListScreen;
