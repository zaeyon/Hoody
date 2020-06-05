import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {
  FlatList,
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  BackHandler,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TagInfoItem from '~/Components/TagInfoItem';
import FeedItem from '~/Components/SearchResultFeedListItem';

const Container = Styled.View`
 flex:1;
 background-color:#ffffff;
`;

const SearchResultContainer = Styled.View`
width: ${wp('100%')};
height: ${hp('101%')};
background-color:#ffffff;
padding-bottom: 47px;

`;

const SearchResultItemImage = Styled.Image`
width: ${wp('33%')};
height: ${wp('33%')};
`;

const SearchResultItemContainer = Styled.View`
width: ${wp('33%')};
height: ${wp('33%')};
margin-right: 2px;
margin-bottom: 2px;
`;

const TagItemContainer = Styled.View`
background-color: #ffffff;
padding-left: 5px;
padding-right: 5px;
padding-bottom: 5px;
border-bottom-width: 0.5px;
border-color: #eeeeee;
width: 100%;
`;

const TagInfoItemContainer = Styled.View`
 margin-right: 6px;
`;

const ResultItemRatingContainer = Styled.View`
position: absolute;
bottom: 5px;
right: 5px;
width: ${wp('11%')};
height: ${wp('5%')};
padding: 6.5px;
justify-content: space-between;
align-items: center;
background-color: 'rgba(52, 52, 52, 0.6)'
flex-direction: row;
border-radius: 5px;
`;

const ResultItemStarImage = Styled.Image`
width: ${wp('4%')};
height: ${wp('4%')};
tint-color: #23E5D2;
`;

const ResultItemRatingText = Styled.Text`
font-size: 13px;

color: #ffffff;
`;

const FeedDetailListContainer = Styled.View`
position: absolute;
top: 0px;
bottom: 0px;
background-color:#ffffff;
width: ${wp('100%')};
margin-bottom: 44px;
`;

const FeedDetailList_DATA = [
  {
    id: 1,
    profile_image:
      'https://t1.daumcdn.net/thumb/R600x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fqna%2Fimage%2F1542632018000000528',
    nickname: '하핳',
    write_time: '29 seconds ago',
    rating: 4,
    favorite_count: 2531,
    main_image:
      'https://www.travelnbike.com/news/photo/201903/77604_141293_4837.png',
    review_image_list:
      'https://www.travelnbike.com/news/photo/201903/77604_141293_4837.png$#$https://www.travelnbike.com/news/photo/201903/77604_141293_4837.png',
    tag_list: '을지로&#&맛집&#&하핳',
    review_content: '을지로에있는 맛집 다녀왔어요!',
    image_count: 4,
  },
  {
    id: 2,
    profile_image:
      'https://img-wishbeen.akamaized.net/plan/1454465238030_15657083522_d45a489b15_b.jpg',
    nickname: 'jaeyeon',
    write_time: '1 minute ago',
    rating: 5,
    favorite_count: 221,
    main_image:
      'https://img-wishbeen.akamaized.net/plan/1454465238030_15657083522_d45a489b15_b.jpg',
    review_image_list:
      'https://img-wishbeen.akamaized.net/plan/1454465238030_15657083522_d45a489b15_b.jpg',
    tag_list: '태그태그&#&테스트',
    review_content: '하하하호호호',
    image_count: 3,
  },

  {
    id: 3,
    profile_image:
      'https://img-wishbeen.akamaized.net/plan/1454465238030_15657083522_d45a489b15_b.jpg',
    nickname: '테스트테스트',
    write_time: '1 minute ago',
    rating: 1,
    favorite_count: 1313,
    main_image:
      'https://img-wishbeen.akamaized.net/plan/1454465238030_15657083522_d45a489b15_b.jpg',
    review_image_list:
      'https://img-wishbeen.akamaized.net/plan/1454465238030_15657083522_d45a489b15_b.jpg',
    tag_list: '태그ㅋㅋ&#&하하하핳',
    review_content: '리뷰내용',
    image_count: 3,
  },
];

interface Props {
  searchData_popular?: Array<string>;
  searchData_latest?: Array<string>;
  searchedTag_arr?: Array<string>;
}

const SearchResult = ({
  searchData_popular,
  searchData_latest,
  searchedTag_arr,
}: Props) => {
  const [openFeedDetail, setOpenFeedDetail] = useState<boolean>(false);
  const PostTab = createMaterialTopTabNavigator();

  useEffect(() => {
    const backAction = () => {
      if (openFeedDetail) {
        setOpenFeedDetail(false);
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [openFeedDetail]);

  function PopularityPost() {
    return (
      <ScrollView
        bounces={false}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}>
        <SearchResultContainer>
          <FlatList
            bounces={false}
            data={searchData_popular}
            numColumns={3}
            renderItem={({item, index}) => (
              <TouchableWithoutFeedback onPress={() => setOpenFeedDetail(true)}>
                <SearchResultItemContainer>
                  <SearchResultItemImage
                    source={{
                      uri: item,
                    }}
                  />
                  <ResultItemRatingContainer>
                    <ResultItemStarImage
                      source={require('~/Assets/Images/ic_star.png')}
                    />
                    <ResultItemRatingText>4</ResultItemRatingText>
                  </ResultItemRatingContainer>
                </SearchResultItemContainer>
              </TouchableWithoutFeedback>
            )}
          />
        </SearchResultContainer>
      </ScrollView>
    );
  }

  function LatestPost() {
    return (
      <ScrollView
        bounces={false}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}>
        <SearchResultContainer>
          <FlatList
            data={searchData_latest}
            numColumns={3}
            renderItem={({item, index}) => (
              <SearchResultItemContainer>
                <SearchResultItemImage
                  source={{
                    uri: item,
                  }}
                />

                <ResultItemRatingContainer>
                  <ResultItemStarImage
                    source={require('~/Assets/Images/ic_star.png')}
                  />
                  <ResultItemRatingText>4</ResultItemRatingText>
                </ResultItemRatingContainer>
              </SearchResultItemContainer>
            )}
          />
        </SearchResultContainer>
      </ScrollView>
    );
  }

  return (
    <Container>
      {/*
      <TagItemContainer>
        <FlatList
          data={searchedTag_arr}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <TagInfoItemContainer>
              <TagInfoItem
                tagName={item}
                tagReviewCount={234}
                tagRatingAverage={4.5}
                tagThumbnail={''}></TagInfoItem>
            </TagInfoItemContainer>
          )}
        />
      </TagItemContainer>
          */}
      <PostTab.Navigator
        initialRouteName="인기 게시물"
        swipeEnabled={true}
        tabBarOptions={{
          indicatorStyle: {backgroundColor: '#ffffff'},
          style: {elevation: 0.5},
          labelStyle: {fontSize: 13, },
        }}>
        <PostTab.Screen name="인기 게시물" component={PopularityPost} />
        <PostTab.Screen name="최근 게시물" component={LatestPost} />
      </PostTab.Navigator>
      {openFeedDetail && (
        <FeedDetailListContainer>
          <View
            style={{width: wp('100%'), height: 0.5, backgroundColor: '#eeeeee'}}
          />
          <FlatList
            data={FeedDetailList_DATA}
            renderItem={({item, index}) => (
              <FeedItem
                profile_image={item.profile_image}
                nickname={item.nickname}
                write_time={item.write_time}
                rating={item.rating}
                favorite_count={item.favorite_count}
                tag_list={item.tag_list}
                review_content={item.review_content}
                review_image_list={item.review_image_list}
              />
            )}
          />
        </FeedDetailListContainer>
      )}
    </Container>
  );
};

export default SearchResult;
