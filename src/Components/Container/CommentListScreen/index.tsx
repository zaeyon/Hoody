import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import {FlatList, TouchableWithoutFeedback, Keyboard, ScrollView, Text} from 'react-native';

import CommentItem from '~/Components/Presentational/CommentListScreen/CommentItem';
import {PostComment, GetComment, PostReply} from '~/Route/Post/Comment';

const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #ffffff;
`;

const HeaderContainer = Styled.View`
 width: ${wp('100%')};
 height: ${hp('6%')};
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

const CommentListContainer = Styled.View`
 margin-top: 5px;
`;

const ProfileImage = Styled.Image`
 width: ${hp('4.5%')};
 height: ${hp('4.5%')};
 border-radius: 100px;
 margin-left: 5px;
`;

const CommentInputContainer = Styled.View`
 width: ${wp('100%')};
 padding: 10px;
 position: absolute;
 bottom: 0px;
 background-color: #ffffff;
 align-items: center;
 justify-content: space-around;
 border-top-width: 0.2px;
 border-color: #c3c3c3;
 flex-direction: row;
`;

const CommentItemContainer = Styled.View`
`;

const CommentInputLeftContainer = Styled.View`
 flex-direction: row;
 align-items: center; 
`;

const CommentInput = Styled.TextInput`
 margin-left: 5px;
 width: ${wp('75%')};
 border-radius: 35px;
 border-width: 0.3px;
 border-color: #707070;
 padding-left: 12px;
 padding-top: 10px;
 padding-bottom: 10px;
 padding-right: 5px;
`;

const PostCommentButtonText = Styled.Text`
 font-size: 16px;
 color: #338EFC;
 margin-right: 10px;
`;

const PostCommentButtonContainer = Styled.View`
padding-left: 25px;
padding-top: 10px;
padding-bottom: 10px;
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

interface Props {
    navigation: any,
    route: any
}

const CommentListScreen = ({navigation, route}: Props) => {
    const [commentList, setCommentList] = useState();
    const [keyboardHeight, setKeyboardHeight] = useState<number>(0);
    const [postId, setPostId] = useState<number>();
    const [inputComment, setInputComment] = useState<string>("");
    const [replyTarget, setReplyTarget] = useState<string>();
    const [inputHeight, setInputHeight] = useState<number>(0);
    const [inputType, setInputType] = useState<string>("comment");
    const [replyCommentId, setReplyCommentId] = useState<number>();

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

    useEffect(() => {
        if(route.params?.postId) {
            //console.log("route.params.comments", route.params.comments);
            console.log("route.params.feedId", route.params.feedId);
            setPostId(route.params.postId);
            GetComment(route.params.postId)
            .then(function(response) {
                console.log("댓글 불러오기 성공", response)
                setCommentList(response);
            })
            .catch(function(error) {
                console.log("댓글 불러오기 실패", error);
            })
        }
    }, [route.params?.postId])

    const setTarget = (target: string, commentId: number) => {
        console.log("답글 달기", target);
        console.log("commentId", commentId);
        setReplyTarget(target)
        setInputType("reply");
        setReplyCommentId(commentId);
    }


    function getDateFormat(date) {
        var year = date.getFullYear();
        var month = (1+ date.getMonth());
        month = month >= 10 ? month : '0' + month;
        var day = date.getDate();
        day = day >= 10 ? day : '0' + day;
        return year + '/' + month + '/' + day;
    }

    const renderCommentItem = ({item, index}) => {
    var date = new Date(item.createdAt);
    date = getDateFormat(date);
      
    return (
    <CommentItemContainer>
    <CommentItem
    commentId={item.id}
    setTarget={setTarget}
    profileImage={item.user.profileImg}
    nickname={item.user.nickname}
    comment={item.description}
    replys={item.replys}
    createAt={date.toString()}
    />
    {item.replys[0] && (
        <Text>답글존재</Text>
    )}
    </CommentItemContainer>
    )
   }

   const postComment = () => {
   if(inputType === "comment") {
    PostComment(postId, inputComment)
    .then(function(response) {
        console.log("response", response);
        GetComment(route.params.postId)
        .then(function(response) {
            console.log("댓글 불러오기 성공", response)
            setCommentList(response);
            setInputComment("")
            Keyboard.dismiss();
        })
        .catch(function(error) {
            console.log("댓글 불러오기 실패", error);
        })
    })
    .catch(function(error) {
        console.log("error", error);
    })
   } else if(inputType === 'reply') {
       PostReply(replyCommentId, inputComment)
       .then(function(response) {
           console.log("response", response);
           GetComment(route.params.postId)
           .then(function(response) {
               console.log("댓글 불러오기 성공", response)
               setCommentList(response);
               setInputComment("")
               setInputType("comment")
               Keyboard.dismiss();
           })
           .catch(function(error) {
               console.log("댓글 불러오기 실패", error);
           })
       })
   }}

    return (
    <Container>
        <HeaderContainer>
        <LeftContainer>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <BackButton source={require('~/Assets/Images/ic_back2.png')}/>
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
      <CommentListContainer
      style={{marginBottom:inputHeight+keyboardHeight}}>
         <FlatList
        data={commentList}
        renderItem={renderCommentItem}
        />
        </CommentListContainer>
        <CommentInputContainer 
        style={{marginBottom:keyboardHeight}}
        onLayout={(event) => {
            const layout = event.nativeEvent.layout;
            setInputHeight(layout.height+30);
        }}>
            <CommentInputLeftContainer>
            <ProfileImage
            source={{uri:"https://clip-instagram.com/wp-content/uploads/2017/12/%EA%B9%80%EC%97%B0%EC%95%84-%ED%8F%89%EC%B0%BD%EB%8F%99%EA%B3%84%EC%98%AC%EB%A6%BC%ED%94%BD-%EC%9D%B8%EC%8A%A4%ED%83%80%EA%B7%B8%EB%9E%A8-%EC%82%AC%EC%A7%84.jpg"}}/>
            <CommentInput
            multiline={true}
            placeholder={"댓글 달기"}
            onChangeText={(text: string) => setInputComment(text)}
            value={inputComment}
            />
            </CommentInputLeftContainer>
            <TouchableWithoutFeedback onPress={() => postComment()}>
            <PostCommentButtonContainer>
            <PostCommentButtonText>작성</PostCommentButtonText>
            </PostCommentButtonContainer>
            </TouchableWithoutFeedback>
        </CommentInputContainer>
    </Container>
    )
}

export default CommentListScreen;
