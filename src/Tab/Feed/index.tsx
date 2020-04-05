import * as React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import Styled from 'styled-components/native';
import FeedItem from '~/Components/FeedItem';

const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #FFFFFF;
 f
`;

const HeaderBottomWidth = Styled.View`
  width: 100%;
  background-color: #c3c3c3;
`;

function Feed({navigation}) {
  const ReviewContent =
    '을지로 입구역에서 에어팟을 구입 후 언박싱을 하였다. 언박싱 후 기존의 있었다.';
  return (
    <Container>
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
    </Container>
  );
}

export default Feed;
