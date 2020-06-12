import React, {useEffect, useState} from 'react';
import {TouchableWithoutFeedback, FlatList, View, Keyboard} from 'react-native';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import axios from 'axios';

import FeedItem from '~/Components/Presentational/FeedListScreen/FeedItem';
import PopularTagItem from '~/Components/Presentational/FeedListScreen/PopularTagItem';
import GetAllFeed from '~/Route/Post/TestFeed';
import SearchBar from '~/Components/Presentational/FeedListScreen/SearchBar'
import SearchResult from '~/Components/SearchResult';
import SearchAutoComplete from '~/Components/Presentational/SearchScreen/SearchAutoComplete';

const BottomTabHeight = Styled.View`
 width: ${wp('100%')};
 height: 45px;
 background-color: #F4F8FB;
`;

const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #ffffff;
 align-items: center;
`;

const HeaderBar = Styled.View`
 width: ${wp('100%')};
 height: ${hp('7%')};
 background-color: #ffffff;
 padding: 5px;
 border-bottom-width: 0.4px;
 border-color: #eeeeee;
 align-items: center;
`;

const NoFeedListDataContainer = Styled.View`
 width: ${wp('100%')};
 height: ${hp('87%')};
 justify-content: center;
 align-items: center;
`;

const NoFeedText = Styled.Text`
 font-size: 17px;
 color: #c3c3c3;
`;

const BodyContainer = Styled.View`
 background-color: #ffffff;
`;


const TagAutoCompleteContainer = Styled.View`
width: ${wp('100%')};
top: 0px;
position: absolute;
background-color: #ffffff;
`;

const FEED_DATA = [
  {
    id: 1,
    profile_image:
      'https://t1.daumcdn.net/thumb/R600x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fqna%2Fimage%2F1542632018000000528',
    nickname: '하핳',
    write_time: '29 seconds ago',
    rating: 2.5,
    favorite_count: 2531,
    comment_count: 12,
    scrap_count: 22,
    main_image:
      'https://www.travelnbike.com/news/photo/201903/77604_141293_4837.png',
    review_image_list:
      'https://www.travelnbike.com/news/photo/201903/77604_141293_4837.png$#$https://www.travelnbike.com/news/photo/201903/77604_141293_4837.png',
    main_tag: '메인태그',
    sub_tag1: '서브태그1',
    sub_tag2: '서브태그2',
    review_content: '을지로에있는 맛집 다녀왔어요!',
    image_count: 4,
    location: '대한민국 서울특별시',
  },
  {
    id: 2,
    profile_image:
      'https://img-wishbeen.akamaized.net/plan/1454465238030_15657083522_d45a489b15_b.jpg',
    nickname: 'jaeyeon',
    write_time: '1 minute ago',
    rating: 0,
    favorite_count: 221,
    comment_count: 42,
    scrap_count: 51,
    main_image:
      'https://img-wishbeen.akamaized.net/plan/1454465238030_15657083522_d45a489b15_b.jpg',
    review_image_list:
      'https://img-wishbeen.akamaized.net/plan/1454465238030_15657083522_d45a489b15_b.jpg',
    main_tag: '메인',
    sub_tag1: '서브1',
    sub_tag2: '서브2',
    review_content: '하하하호호호',
    image_count: 3,
    location: '을지로 3가역 1번출구',
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

function Feed({navigation}) {
  const [feedListData, setFeedListData] = useState([]);
  const [searchFocus, setSearchFocus] = useState<boolean>(false);
  const [desArray, setDesArray] = useState;

  useEffect(() => {
    getFeedData();
  }, []);

  const getFeedData = () => {
    GetAllFeed().then(function(response) {
      console.log("피드 목록 가져오기 성공");
      console.log("response", response);
      
      setFeedListData(response);
      var tmpDesArray = [[]];
      for(var i = 0; i < response.length; i++) {
        console.log("response[i].description", response[i].descriptions);
        for(var j = 0; j < response[i].descriptions.length; i++) {
          tmpDesArray[i][j] = response[i].descriptions[j].description; 
        }
      }
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
  

  return (
    <TouchableWithoutFeedback onPress={() => onBlurSearch()}>
    <Container>
      <HeaderBar>
        <SearchBar
        onFocusSearch={onFocusSearch}
        />
      </HeaderBar>
      <BodyContainer>
      {feedListData[0] && (
      <FlatList
        data={feedListData}
        renderItem={({item}) => (
          <View style={{marginBottom: 12}}>
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate('FeedDetailScreen', {
                  feed_id : item.id,  
                })
              }>
              <View>
                <FeedItem
                  id={item.id}
                  profile_image={item.user.profileImg}
                  nickname={item.user.nickname}
                  write_time={item.createdAt}
                  rating={item.starRate}
                  main_tag={item.mainTags.name}
                  sub_tag1={item.subTagOnes.name}
                  sub_tag2={item.subTagTwos.name}
                  favorite_count={item.likes}
                  main_image={'https://img1.daumcdn.net/thumb/R720x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fliveboard%2Fdailylife%2F6d8abd51eb3644958240a9ca6ddf28bd.JPG'}
                  {...item.descriptions}
                  image_count={0}
                  location={item.address.address}
                  expanse={item.expanse}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        )}
      />
      )}
      {!feedListData[0] && (
        <NoFeedListDataContainer>
          <NoFeedText>등록된 피드가 없어요</NoFeedText>

        </NoFeedListDataContainer>
      )}
      {searchFocus && (
        <TagAutoCompleteContainer>
        <SearchAutoComplete> 
        </SearchAutoComplete>
        </TagAutoCompleteContainer>
      )}
      </BodyContainer>
    </Container>
    </TouchableWithoutFeedback>
  );
}

export default Feed;

/*
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('FeedDetail', {
            content: ReviewContent,
          });
        }}>
        <FeedItem
          name="hooging"
          photo="https://t1.daumcdn.net/thumb/R600x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fqna%2Fimage%2F1542632018000000528"
          description="을지로 입구역에서 에어팟을 구입 후 언박싱을 하였다. 언박싱 후 기존의 에어팟보다 기능이 좋다는것을 알 수 있었다."
          mainImage="https://cdn.clien.net/web/api/file/F01/9207614/48f0dc3910a37b.jpeg?w=780&h=30000"
          rating="4.5 / 5"
          navigation={navigation}
        />
      </TouchableOpacity>
*/
