import * as React from 'react';
import {TouchableWithoutFeedback, FlatList, View} from 'react-native';
import Styled from 'styled-components/native';
import FeedItem2 from '~/Components/FeedItem2';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const BottomTabHeight = Styled.View`
 width: ${wp('100%')};
 height: 45px;
 background-color: #F4F8FB;
`;

const FEED_DATA = [
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
      'https://www.travelnbike.com/news/photo/201903/77604_141293_4837.png$#$https://www.travelnbike.com/news/photo/201903/77604_141293_4837.png',
    tag_list: '태그태그&#&테스트',
    review_content: '하하하호호호',
    image_count: 3,
  },
];

function Feed({navigation}) {
  return (
    <Container>
      <FlatList
        data={FEED_DATA}
        renderItem={({item}) => (
          <TouchableWithoutFeedback
            onPress={() =>
              navigation.navigate('FeedDetail', {
                review_imageArray: item.review_image_list,
                profile_image: item.profile_image,
                nickname: item.nickname,
                write_time: item.write_time,
                rating: item.rating,
                favorite_count: item.favorite_count,
                tag_list: item.tag_list,
                review_content: item.review_content,
                review_image_list: item.review_image_list,
              })
            }>
            <View>
              <FeedItem2
                id={item.id}
                profile_image={item.profile_image}
                nickname={item.nickname}
                write_time={item.write_time}
                rating={item.rating}
                favorite_count={item.favorite_count}
                main_image={item.main_image}
                tag_list={item.tag_list}
                review_content={item.review_content}
                image_count={item.image_count}
              />
            </View>
          </TouchableWithoutFeedback>
        )}
      />
      <BottomTabHeight />
    </Container>
  );
}

const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #FFFFFF;
 align-items: center;
 width: ${wp('100%')};
 height: ${hp('100%')};
`;

const HeaderBottomWidth = Styled.View`
  width: 100%;
  background-color: #c3c3c3;
`;

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
