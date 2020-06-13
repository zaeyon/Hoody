import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import {FlatList, TouchableWithoutFeedback, Keyboard} from 'react-native';
import CommentItem from '~/Components/Presentational/CommentScreen/CommentItem';


const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #ffffff;
`;


const HeaderContainer = Styled.View`
 width: ${wp('100%')};
 height: ${hp('7%')};
 flex-direction: row;
 align-items: center;
 justify-content:space-between;
 padding: 0px 0px 0px 0px;
`;


const LeftContainer = Styled.View`
background-color: #ffffff;
height: ${hp('7%')};
flex: 1;
justify-content: center;
align-items: center;
`;

const CenterContainer = Styled.View`
justify-content: center;
align-items: center;
background-color: #ffffff;
height: ${hp('7%')};
flex: 7;
`;

const RightContainer = Styled.View`
justify-content: center;
background-color: #ffffff;
height: ${hp('7%')};
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

const CommentListContainer = Styled.View`
 margin-top: 5px;
 height: ${hp('100%')};
`;

const ProfileImage = Styled.Image`
 width: ${hp('4.5%')};
 height: ${hp('4.5%')};
 border-radius: 100px;
`;

const CommentInputContainer = Styled.View`
 width: ${wp('100%')};
 height: ${hp('6.5%')};
 position: absolute;
 bottom: 0px;
 background-color: #ffffff;
 align-items: center;
 justify-content: space-around;
 border-top-width: 0.2px;
 border-color: #c3c3c3;
 flex-direction: row;
`;

const CommentInputLeftContainer = Styled.View`
 flex-direction: row;
 align-items: center; 
`;

const CommentInput = Styled.TextInput`
 margin-left: 5px;
 width: ${wp('75%')};
 height: ${hp('4.5%')};
 border-radius: 35px;
 border-width: 0.3px;
 border-color: #707070;
 padding-left: 15px;
`;

const PostCommentButtonText = Styled.Text`
 font-size: 16px;
 color: #338EFC;
 margin-right: 10px;
`;

const COMMENT_DATA = [
    {
    user: {
        profileImage: 'https://t1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/2JVJ/image/VkxFbnXm8s7Vhw3ydyfo4f2YOa4.jpg',
        nickname: '비타화장해석쟁'
    },
    comment: '여긴 또 가봐야겠네요! 너무 좋은정보인거 같아요!',
    createAt: '5/22 22:12'
    },
    {
    user: {
        profileImage: 'https://t1.daumcdn.net/thumb/R600x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fqna%2Fimage%2F1542632018000000528',
        nickname: '사용자닉네임'
    },
    comment: '댓글내용',
    createAt: '6/11 05:25',
    }
]

const renderCommentItem = ({item, index}) => {
    return (
    <CommentItem
    profileImage={item.user.profileImage}
    nickname={item.user.nickname}
    comment={item.comment}
    createAt={item.createAt}
    />
    )
}

interface Props {
    navigation: any,
    route: any
}

const CommentScreen = ({navigation, route}: Props) => {
    const [commentData, setCommentData] = useState();
    const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

    const onKeyboardDidShow = (e: KeyboardEvent) => {
        setKeyboardHeight(e.endCoordinates.height);
    }

    const onKeyboardDidHide = () => {
        setKeyboardHeight(0);
    }

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", onKeyboardDidShow);
        Keyboard.addListener("keyboardDidHide", onKeyboardDidHide);
        return ():void => {
            Keyboard.removeListener("keyboardDidShow", onKeyboardDidShow);
            Keyboard.removeListener("keyboardDidHide", onKeyboardDidHide);
        }
    })

    return (
    <Container>
        <HeaderContainer>
        <LeftContainer>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <BackButton source={require('~/Assets/Images/ic_back2.png')} />
          </TouchableWithoutFeedback>
        </LeftContainer>
        <TouchableWithoutFeedback onPress={() => 0}>
          <CenterContainer>
          <HeaderTitleText>댓글</HeaderTitleText>
        </CenterContainer>
        </TouchableWithoutFeedback>
        <RightContainer>
              <TouchableWithoutFeedback onPress = {() => 0}>
              <ButtonText></ButtonText>
              </TouchableWithoutFeedback>
        </RightContainer>
      </HeaderContainer>
      <HeaderBorder/>
      <CommentListContainer>
        <FlatList
        data={COMMENT_DATA}
        renderItem={renderCommentItem}
        />
        </CommentListContainer>
        <CommentInputContainer style={{marginBottom:keyboardHeight}}>
            <CommentInputLeftContainer>
            <ProfileImage
            source={{uri:"https://clip-instagram.com/wp-content/uploads/2017/12/%EA%B9%80%EC%97%B0%EC%95%84-%ED%8F%89%EC%B0%BD%EB%8F%99%EA%B3%84%EC%98%AC%EB%A6%BC%ED%94%BD-%EC%9D%B8%EC%8A%A4%ED%83%80%EA%B7%B8%EB%9E%A8-%EC%82%AC%EC%A7%84.jpg"}}/>
            <CommentInput
            placeholder={"댓글 달기"}
            />
            </CommentInputLeftContainer>
            <PostCommentButtonText>작성</PostCommentButtonText>
        </CommentInputContainer>
    </Container>
    )
}

export default CommentScreen;
