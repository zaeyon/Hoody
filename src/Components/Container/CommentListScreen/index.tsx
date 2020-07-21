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

const HeaderBar = Styled.View`
 width: ${wp('100%')};
 height: ${wp('11.7%')};
 flex-direction: row;
 align-items: center;
 justify-content:space-between;
`;


const HeaderLeftContainer = Styled.View`
background-color: #ffffff;
justify-content: center;
align-items: center;
padding-top: 7px;
padding-left: 16px;
padding-bottom: 13px;
`;

const HeaderCenterContainer = Styled.View`
justify-content: center;
align-items: center;
background-color: #ffffff;
`;

const HeaderRightContainer = Styled.View`
justify-content: center;
align-items: center;
background-color: #ffffff;
padding-top: 7px;
padding-right: 16px;
padding-bottom: 13px;
`;

const HeaderTitleText = Styled.Text`
 font-weight: 600;
 font-size: 18px;
 color: #1D1E1F;
`;

const HeaderCancelIcon = Styled.Image`
 width: ${wp('6.4%')}
 height: ${wp('6.4%')};
`;

const HeaderEmptyView = Styled.View`
background-color: #ffffff;
width: ${wp('6.4%')}
height: ${wp('6.4%')};
`;

const HeaderBorder = Styled.View`
 width: ${wp('100%')};
 height: 0.6px;
 background-color: #ECECEE;
`;

const CommentListContainer = Styled.View`
 margin-top: 5px;
 flex: 1;
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

const COMMENT_DATA = 
[
  {
    "id": 6,
    "description": "하하하",
    "Like": 0,
    "createdAt": "2020-06-19T07:02:28.000Z",
    "updatedAt": "2020-06-19T07:02:28.000Z",
    "deletedAt": null,
    "userId": "43430460-b1f9-11ea-adb1-11494bb1448b",
    "postId": 1,
    "replyId": null,
    "user": {
      "id": "43430460-b1f9-11ea-adb1-11494bb1448b",
      "nickname": "카카카카ㅏ",
      "profileImg": "https://s.gravatar.com/avatar/39333a72e7d0c0deb714d292ba6b2198?s=80&r=x&d=mp"
    },
    "replys": []
  },
  {
    "id": 5,
    "description": "Zzq",
    "Like": 0,
    "createdAt": "2020-06-19T06:57:22.000Z",
    "updatedAt": "2020-06-19T06:57:22.000Z",
    "deletedAt": null,
    "userId": "43430460-b1f9-11ea-adb1-11494bb1448b",
    "postId": 1,
    "replyId": null,
    "user": {
      "id": "43430460-b1f9-11ea-adb1-11494bb1448b",
      "nickname": "카카카카ㅏ",
      "profileImg": "https://s.gravatar.com/avatar/39333a72e7d0c0deb714d292ba6b2198?s=80&r=x&d=mp"
    },
    "replys": []
  },
  {
    "id": 4,
    "description": "Zz",
    "Like": 0,
    "createdAt": "2020-06-19T06:56:57.000Z",
    "updatedAt": "2020-06-19T06:56:57.000Z",
    "deletedAt": null,
    "userId": "43430460-b1f9-11ea-adb1-11494bb1448b",
    "postId": 1,
    "replyId": null,
    "user": {
      "id": "43430460-b1f9-11ea-adb1-11494bb1448b",
      "nickname": "카카카카ㅏ",
      "profileImg": "https://s.gravatar.com/avatar/39333a72e7d0c0deb714d292ba6b2198?s=80&r=x&d=mp"
    },
    "replys": []
  },
  {
    "id": 3,
    "description": "Ddddd",
    "Like": 0,
    "createdAt": "2020-06-19T06:55:14.000Z",
    "updatedAt": "2020-06-19T06:55:14.000Z",
    "deletedAt": null,
    "userId": "43430460-b1f9-11ea-adb1-11494bb1448b",
    "postId": 1,
    "replyId": null,
    "user": {
      "id": "43430460-b1f9-11ea-adb1-11494bb1448b",
      "nickname": "카카카카ㅏ",
      "profileImg": "https://s.gravatar.com/avatar/39333a72e7d0c0deb714d292ba6b2198?s=80&r=x&d=mp"
    },
    "replys": []
  },
  {
    "id": 2,
    "description": "Ddddd",
    "Like": 0,
    "createdAt": "2020-06-19T06:55:09.000Z",
    "updatedAt": "2020-06-19T06:55:09.000Z",
    "deletedAt": null,
    "userId": "43430460-b1f9-11ea-adb1-11494bb1448b",
    "postId": 1,
    "replyId": null,
    "user": {
      "id": "43430460-b1f9-11ea-adb1-11494bb1448b",
      "nickname": "카카카카ㅏ",
      "profileImg": "https://s.gravatar.com/avatar/39333a72e7d0c0deb714d292ba6b2198?s=80&r=x&d=mp"
    },
    "replys": []
  },
  {
    "id": 1,
    "description": "testing comment",
    "Like": 0,
    "createdAt": "2020-06-19T05:45:56.000Z",
    "updatedAt": "2020-06-19T05:45:56.000Z",
    "deletedAt": null,
    "userId": "77be8000-b1e2-11ea-a9ed-a1269359ec27",
    "postId": 1,
    "replyId": null,
    "user": {
      "id": "77be8000-b1e2-11ea-a9ed-a1269359ec27",
      "nickname": "jiwon11",
      "profileImg": "https://s.gravatar.com/avatar/2770f6d3995b48fffe01fe6b5c368adf?s=80&r=x&d=mp"
    },
    "replys": []
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
    <HeaderBar>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
       <HeaderLeftContainer>
           <HeaderCancelIcon
           source={require('~/Assets/Images/HeaderBar/ic_X.png')}/>
       </HeaderLeftContainer>
       </TouchableWithoutFeedback>
       <TouchableWithoutFeedback onPress={() => 0}>
         <HeaderCenterContainer>
         <HeaderTitleText>댓글</HeaderTitleText>
       </HeaderCenterContainer>
       </TouchableWithoutFeedback>
       <HeaderRightContainer>
             <TouchableWithoutFeedback onPress = {() => 0}>
                 <HeaderEmptyView>
                 </HeaderEmptyView>
             </TouchableWithoutFeedback>
       </HeaderRightContainer>
     </HeaderBar>
     <HeaderBorder/>
      <CommentListContainer
      style={{marginBottom:inputHeight+keyboardHeight}}>
         <FlatList
        refreshing={false}
        data={COMMENT_DATA}
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
