import React, {useEffect, useState} from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import {
    TouchableWithoutFeedback,
    FlatList
} from 'react-native';

import LikeItem from '~/Components/Presentational/LikeListScreen/LikeItem';
import { BaseRouter } from '@react-navigation/native';

const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #ffffff;
`;

const HeaderContainer = Styled.View`
 width: ${wp('100%')};
 height: ${hp('6.%')};
 flex-direction: row;
 align-items: center;
 justify-content:space-between;
 padding: 0px 0px 0px 0px;
`;


const LeftContainer = Styled.View`
background-color: #ffffff;
height: ${hp('6%')};
flex: 1;
justify-content: center;
align-items: center;
`;

const CenterContainer = Styled.View`
justify-content: center;
align-items: center;
background-color: #ffffff;
height: ${hp('6%')};
flex: 7;
`;

const RightContainer = Styled.View`
justify-content: center;
background-color: #ffffff;
height: ${hp('6%')};
flex: 1;
`;

const HeaderTitleText = Styled.Text`
 font-size: 20px;
 margin-left: 6px;
`;

const BackButton = Styled.Image`
width: 11px;
height: 19px;
`;

const ButtonText = Styled.Text`
 font-size: 20px;
 color: #338EFC;
`;

const HeaderBorder = Styled.View`
 width: ${wp('100%')};
 height: 0.3px;
 background-color: #c3c3c3;
`;

const LikeListContainer = Styled.View`
 width: ${wp('100%')};
 height: ${hp('100%')};
 padding: 10px;
`;

const LIKE_USER_DATA = [
    {
        nickname: "좋아요누른사람1",
        profileImage: 'https://t1.daumcdn.net/thumb/R600x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fqna%2Fimage%2F1542632018000000528'
    },
    {
        nickname: "좋아요누른사람2",
        profileImage: 'https://t1.daumcdn.net/thumb/R600x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fqna%2Fimage%2F1542632018000000528'
    },
    {
        nickname: "좋아요누른사람3",
        profileImage: 'https://t1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/2JVJ/image/VkxFbnXm8s7Vhw3ydyfo4f2YOa4.jpg'
    },
]

interface Props {
    navigation: any,
    route: any,
}

const LikeListScreen = ({navigation, route}: Props) => {

    const [likersListData, setLikersListData] = useState<Array<object>>([]);

    useEffect(() => {
        if(route.params?.likersList) {
            console.log("route.params?.likersList", route.params.likersList);
            setLikersListData(route.params.likersList);
        }
    }, [route.params?.likersList])

    const renderLikeItem = ({item,index}) => (
        <LikeItem
        nickname={item.nickname}
        profileImage={item.profileImg}
        />
    )

 return <Container>
     <HeaderContainer>
        <LeftContainer>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <BackButton source={require('~/Assets/Images/ic_back2.png')} />
          </TouchableWithoutFeedback>
        </LeftContainer>
        <TouchableWithoutFeedback onPress={() => 0}>
          <CenterContainer>
          <HeaderTitleText>좋아요</HeaderTitleText>
        </CenterContainer>
        </TouchableWithoutFeedback>
        <RightContainer>
              <TouchableWithoutFeedback onPress = {() => 0}>
              <ButtonText></ButtonText>
              </TouchableWithoutFeedback>
        </RightContainer>
      </HeaderContainer>
      <HeaderBorder/>
      <LikeListContainer>
     <FlatList
     data={likersListData}
     renderItem={renderLikeItem}/>
     </LikeListContainer>
 </Container>
}

export default LikeListScreen;