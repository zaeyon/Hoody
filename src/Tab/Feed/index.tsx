import React, {useEffect, useState} from 'react';
import {TouchableWithoutFeedback, FlatList, View} from 'react-native';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import axios from 'axios';

import FeedItem from '~/Components/Presentational/FeedItem';
import PopularTagItem from '~/Components/Presentational/PopularTagItem';

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
 height: ${hp('13%')};
 background-color: #ffffff;
 padding: 5px;
 border-bottom-width: 0.4px;
 border-color: #eeeeee;
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
  const [feedData, setFeedData] = useState([]);
  useEffect(() => {
    getFeedData();
  }, []);

  const getFeedData = () => {
    const url = 'https://e82f43910fe9.ngrok.io' + '/feed';
    return new Promise(function (resolve, reject) {
      axios
        .get(url)
        .then(function (response) {
          console.log('response.data: ', JSON.stringify(response.data));
          const stringifyedData = JSON.stringify(response.data);
          const parsedData = JSON.parse(stringifyedData);
          console.log('parsedData', parsedData);
          const feedData = [
            {
              id: 1,
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
          resolve(response.data);
        })
        .catch(function (error) {
          console.log('error : ', error);
          reject(error);
        });
    });
  };

  return (
    <Container>
      <HeaderBar>
        <FlatList
          horizontal={true}
          data={POPULAR_TAG_DATE}
          renderItem={({item}) => (
            <PopularTagItem
              tag_image={item.tag_image}
              tag_name={item.tag_name}
            />
          )}
        />
      </HeaderBar>
      <FlatList
        data={FEED_DATA}
        renderItem={({item}) => (
          <View style={{marginBottom: 12}}>
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate('FeedDetail', {
                  review_imageArray: item.review_image_list,
                  profile_image: item.profile_image,
                  nickname: item.nickname,
                  write_time: item.write_time,
                  rating: item.rating,
                  favorite_count: item.favorite_count,
                  review_content: item.review_content,
                  review_image_list: item.review_image_list,
                })
              }>
              <View>
                <FeedItem
                  id={item.id}
                  profile_image={item.profile_image}
                  nickname={item.nickname}
                  write_time={item.write_time}
                  rating={item.rating}
                  main_tag={item.main_tag}
                  sub_tag1={item.sub_tag1}
                  sub_tag2={item.sub_tag2}
                  favorite_count={item.favorite_count}
                  main_image={item.main_image}
                  review_content={item.review_content}
                  image_count={item.image_count}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        )}
      />
      <BottomTabHeight />
    </Container>
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
