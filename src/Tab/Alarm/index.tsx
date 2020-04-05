import React from 'react';
import Styled from 'styled-components/native';
import {Text, Dimensions, NativeSyntheticEvent, ScrollView} from 'react-native';

import AlarmItem from '~/Components/AlarmItem';

const Container = Styled.View`
  flex: 1;
  background-color: #FFFFFF;
  flex-direction: column;
`;

const TodayText = Styled.Text`
  padding: 10px 20px 5px 25px;
  font-size: 23px;
`;

const Alarm = ({navigation}) => {
  return (
    <Container>
      <TodayText>오늘</TodayText>
      <AlarmItem
        profileImage="https://t1.daumcdn.net/thumb/R600x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fqna%2Fimage%2F1542632018000000528"
        id="@Choiwonyoung777"
        message="님이 회원님의 후기를 좋아합니다."
        postImage="https://img1.daumcdn.net/thumb/R720x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fliveboard%2Fdailylife%2F1fe7dfbdfa244c60baf3de469c0e390b.JPG"
      />
      <AlarmItem
        profileImage="https://t1.daumcdn.net/thumb/R600x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fqna%2Fimage%2F1542632018000000528"
        id="@Choiwonyoung777"
        message="님이 회원님의 후기를 좋아합니다."
        postImage="https://img1.daumcdn.net/thumb/R720x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fliveboard%2Fdailylife%2F1fe7dfbdfa244c60baf3de469c0e390b.JPG"
      />
      <AlarmItem
        profileImage="https://t1.daumcdn.net/thumb/R600x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fqna%2Fimage%2F1542632018000000528"
        id="@Choiwonyoung777"
        message="님이 회원님의 후기를 좋아합니다."
        postImage="https://img1.daumcdn.net/thumb/R720x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fliveboard%2Fdailylife%2F1fe7dfbdfa244c60baf3de469c0e390b.JPG"
      />
      <AlarmItem
        profileImage="https://t1.daumcdn.net/thumb/R600x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fqna%2Fimage%2F1542632018000000528"
        id="@Choiwonyoung777"
        message="님이 회원님의 후기를 좋아합니다."
        postImage="https://img1.daumcdn.net/thumb/R720x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fliveboard%2Fdailylife%2F1fe7dfbdfa244c60baf3de469c0e390b.JPG"
      />
    </Container>
  );
};

export default Alarm;
