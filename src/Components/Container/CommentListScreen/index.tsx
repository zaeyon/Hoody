import React, {useState, useEffect, useRef, useLayoutEffect} from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import {FlatList, TouchableWithoutFeedback, Keyboard, ScrollView, Text, StyleSheet, RefreshControl, ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';
import AboveKeyboard from 'react-native-above-keyboard';
import {KeyboardAwareScrollView, KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modal';
import {isIphoneX} from 'react-native-iphone-x-helper';

import CommentItem from '~/Components/Presentational/CommentListScreen/CommentItem';
import ReplyItem from '~/Components/Presentational/CommentListScreen/ReplyItem';
import FeedInformation from '~/Components/Presentational/FeedDetailScreen/FeedInformation';

import {POSTComment, GetComment, PostReply} from '~/Route/Post/Comment';
import DELETEComment from '~/Route/Post/DELETEComment';
import { configure } from 'react-native-location';

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
padding-top: 13px;
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

const FeedInformationContainer = Styled.View`
 padding-top: 10px;
`;

const CommentListContainer = Styled.View`
flex: 1;
padding-bottom: ${isIphoneX() ? wp('10%') : wp('20%')};
background-color: #ffffff;
`;

const ProfileImage = Styled.Image`
 width: ${wp('9.6%')};
 height: ${wp('9.6%')};
 border-radius: 100px;
 margin-top: 3px;
 margin-bottom: 3px;
`;

const FooterContainer = Styled.View`
 width: ${wp('100%')};
 position: absolute;
 background-color: #ffffff;
`;

const CommentContainer = Styled.View`
width: ${wp('100%')}
align-items: center;
flex-direction: row;
padding-left: ${wp('4.2%')}px;
padding-bottom: 20px;
padding-top: 5px;
background-color: #ffffff;
`;

const CommentItemContainer = Styled.View`
`;

const CommentInputLeftContainer = Styled.View`
 flex-direction: row;
 align-items: center; 
`;

const CommentInputContainer = Styled.View`
margin-left: 11px;
padding-top: 8px;
padding-bottom: 8px;
width: ${wp('80%')};
border-radius: 23px;
border-width: 1px;
border-color: #efefef;
flex-direction: row;
padding-left: 18px;
background-color:#ffffff;
align-items: center;
`;

const CommentInput = Styled.TextInput`
 width: ${wp('62%')};
 font-size: 16px;
 color: #000000;
 padding-bottom: 5px;
`;

const CommentRegisterText = Styled.Text`
 font-size: 17px;
 color: #267DFF;
 font-weight: 500;
`;

const CommentRegisterContainer = Styled.View`
padding-left: 5px;
padding-right: 25px;
justify-content: center;
`;

const InputingReplyContainer = Styled.View`
 height: ${wp('10.6%')};
 width:${wp('100%')};
 align-items: center;
 padding-left: 16px;
 background-color: #ECECEE;
 flex-direction: row;
 justify-content: space-between;
 align-items: center;
`;

const InputingReplyText = Styled.Text`
 font-size: 14px;
 color: #8E9199;
`;

const InputingReplyCancelContainer = Styled.View`
padding-top: 16px;
padding-bottom: 16px;
padding-left: 16px;
padding-right: 16px;
align-items: center;
justify-content: center;
`;

const InputingReplyCancelIcon = Styled.Image`
 width: ${wp('2.6%')};
 height: ${wp('2.6%')};
`;

const ReportModalContainer = Styled.View`
 width: ${wp('100%')};
 height: 500px;
 background-color: #FFFFFF;
 border-top-left-radius: 10px;
 border-top-right-radius: 10px;
`;


const OtherUsersFeedViewMoreModalContainer = Styled.View`
width: ${wp('100%')};
height: ${wp('36.8%')};
border-top-left-radius: 10px;
border-top-right-radius: 10px;
background-color: #FFFFFF;
`;

const ModalHeaderContainer = Styled.View`
 padding-top: 4px;
 width: ${wp('100%')};
 padding-bottom: 10px;
 align-items: center;
`;


const ModalToggleButton = Styled.View`
 width: ${wp('11.7%')};
 height: ${wp('1.4%')};
 background-color: #F4F4F7;
 border-radius: 5px;
`;


const ModalTabItemContainer = Styled.View`
 height: ${wp('17%')};
 flex-direction: row;
 align-items: center;
 padding-left: 16px;
 padding-right: 16px;
 border-bottom-width: 0.6px;
 border-color: #ECECEE;
`;

const ModalTabItemIconImage = Styled.Image`
width: ${wp('6.4%')};
height: ${wp('6.4%')};
tint-color: #1D1E1F;
`;

const ModalTabItemLabelText = Styled.Text`
 margin-left: 11px;
 font-size: 18px;
 color: #1D1E1F;
`;

const LoadingContainer = Styled.View`
 width: ${wp('100%')};
 margin-top: ${hp('35%')};
 align-items: center;
 justify-content: center;
`;

const EmptyContainer = Styled.View`
 background-color: #FFFFFF;
 width: ${wp('100%')};
`;

const LoadingRegisterContainer = Styled.View`
position: absolute;
width: ${wp('100%')};
height: ${hp('100%')};
background-color: #00000030;
align-items: center;
justify-content: center;
`;

const config = {
  animation: 'timing',
  config: {
    duration: 0,
  },
};

interface Props {
    navigation: any,
    route: any
}

var selectingCommentId = 0;

const CommentListScreen = ({navigation, route}: Props) => {
    const [commentList, setCommentList] = useState<Array<object>>([]);
    const [keyboardHeight, setKeyboardHeight] = useState<number>(0);
    const [postId, setPostId] = useState<number>();
    const [inputComment, setInputComment] = useState<string>("");
    const [replyTarget, setReplyTarget] = useState<string>();
    const [inputHeight, setInputHeight] = useState<number>(0);
    const [inputType, setInputType] = useState<string>("comment");
    const [allCommentCount, setAllCommentCount] = useState<number>(0);
    const [replyCommentId, setReplyCommentId] = useState<number>();
    const [reloadCommentList, setReloadCommentList] = useState<boolean>(false);
    const [visibleCommentModal, setVisibleCommentModal] = useState<boolean>(false);
    const [visibleMyCommentModal, setVisibleMyCommentModal] = useState<boolean>(false);
    const [selectedCommentId, setSelectedCommentId] = useState<number>();
    const [reloadComment, setReloadComment] = useState<boolean>(false);

    const [inputFocus, setInputFocus] = useState<boolean>(false);
    const [refreshingComment, setRefreshingComment] = useState<boolean>(false);
    const [loadingComment, setLoadingComment] = useState<boolean>(true);
    const [loadingRegister, setLoadingRegister] = useState<boolean>(false);

    const currentUser = useSelector((state) => state.currentUser);
    const commentInputRef = useRef(null);
    

    const onKeyboardDidShow = (e: KeyboardEvent) => {
        setKeyboardHeight(e.endCoordinates.height);
    }

    const onKeyboardDidHide = () => {
        setKeyboardHeight(0);
    }

    useLayoutEffect(() => {
      navigation.setOptions({
        transitionSpec: {
          open: config,
          close: config,
        }
      })
    },[navigation, route])


    useEffect(() => {
      console.log("CommentListScreen navigation", navigation);
      console.log("댓글불러올 피드 ID", route.params.postId)
    }, [])

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", onKeyboardDidShow);
        Keyboard.addListener("keyboardDidHide", onKeyboardDidHide);
        return ():void => {
            Keyboard.removeListener("keyboardDidShow", onKeyboardDidShow);
            Keyboard.removeListener("keyboardDidHide", onKeyboardDidHide);
        }
    })

    useEffect(() => {
        if(reloadComment) {
          setReloadComment(false)
        }
        if(route.params?.postId) {
            console.log("route.params.postId", route.params.postId);
            setPostId(route.params.postId);
            getCommentList();
            
        }
    }, [route.params?.postId, reloadComment])

    const getCommentList = () => {
      GetComment(route.params.postId)
            .then(function(response) {
                console.log("댓글 불러오기 성공", response.allComment)
                setLoadingComment(false);
                setRefreshingComment(false);
                setCommentList(response.allComment);
                setAllCommentCount(response.allCommentCount)
            })
            .catch(function(error) {
                console.log("댓글 불러오기 실패", error);
            })
    }

    const clickToReply = (target: string, commentId: number) => {
        console.log("답글 달기", target);
        console.log("commentId", commentId);
        setReplyTarget(target)
        setInputType("reply");
        setReplyCommentId(commentId);
        commentInputRef.current.focus();
    }


    function getDateFormat(date) {
        var year = date.getFullYear();
        var month = (1+ date.getMonth());
        month = month >= 10 ? month : '0' + month;
        var day = date.getDate();
        day = day >= 10 ? day : '0' + day;
        return year + '/' + month + '/' + day;
    }


   const postComment = () => {
    setLoadingRegister(true)
   if(inputType === "comment") {
    POSTComment(postId, inputComment)
    .then(function(response) {
        console.log("response", response);
        GetComment(route.params.postId)
        .then(function(response) {
        setLoadingRegister(false);
            console.log("댓글 불러오기 성공", response)
            setCommentList(response.allComment);
            setInputComment("")
            Keyboard.dismiss();
        })
        .catch(function(error) {
          setLoadingRegister(false);
            console.log("댓글 불러오기 실패", error);
        })
    })
    .catch(function(error) {
        setLoadingRegister(false);
        console.log("error", error);
    })
   } else if(inputType === 'reply') {
       PostReply(replyCommentId, inputComment)
       .then(function(response) {
           console.log("response", response);
           GetComment(route.params.postId)
           .then(function(response) {
         setLoadingRegister(false);
               console.log("댓글 불러오기 성공", response)
               setCommentList(response.allComment);
               setInputComment("")
               setInputType("comment")
               Keyboard.dismiss();
           })
           .catch(function(error) {
               console.log("댓글 불러오기 실패", error);
           })
       })
       .catch(function(error) {
         setLoadingRegister(false);
         console.log("")
       })
   }}

   const navigateGoBack = () => {
      if(route.params?.pushAlarm) {
        navigation.navigate("FeedDetailScreen", {
            commentList: commentList,
            postId: route.params?.postId,
            pushAlarm: true,
        })
      } else if(route.params?.request === "Alarm") {
        navigation.navigate("FeedDetailScreen", {
        postId: route.params?.postId,
        request: "Alarm",
        })
      } else {
        navigation.goBack();
      }
   }


   const moveToWriterProfile = () => {
    navigation.navigate("AnotherUserProfileStack", {
      screen: "AnotherUserProfileScreen",
      params: {requestedUserNickname: route.params?.feedDetailInfo.user.nickname}
    });
  }

   const onChangeCommentInput = (text:string) => {
       setInputComment(text)
   }

   const cancelReply = () => {
     setInputType("comment");
     setInputComment("")
     commentInputRef.current.blur()
   }

   const openCommentModal = (nickname:string, commentId:number) => {
     //setSelectedCommentId(commentId);
     selectingCommentId = commentId;
     console.log("선택한 commentId", commentId);
     if(currentUser.user.nickname == nickname) {
       setVisibleMyCommentModal(true)
     } else {
       setVisibleCommentModal(true)
     }
   }

   const deleteComment = () => {
     console.log("selectingCommentId", selectingCommentId);
     DELETEComment(selectingCommentId)
     .then(function(response) {
       console.log("댓글 삭제 성공", response);
       setVisibleMyCommentModal(false);
       setReloadComment(true);
     })
     .catch(function(error) {
       console.log("댓글 삭제 실패", error)
     })
   }

   const moveToCommentDeclare = () => {
     setVisibleCommentModal(false);
     navigation.navigate("CommentDeclareScreen", {
       commentId: selectingCommentId
     })
   }

   const onRefreshComment = () => {
     setRefreshingComment(true);
     getCommentList();
   }

   const renderReplyItem = ({item, index}: any) => {
     console.log("renderReplyItem item", item);
     var date = new Date(item.createdAt);
     date = getDateFormat(date);
     

     return (
       <ReplyItem
       replyId={item.id}
       profileImage={item.user.thumbnailImg}
       nickname={item.user.nickname}
       description={item.description}
       createAt={date.toString()}
       navigation={navigation}
       openCommentModal={openCommentModal}
       />
     )
   }


  const renderCommentItem = ({item, index}) => {
    var date = new Date(item.createdAt);
    date = getDateFormat(date);
    
    return (
    <CommentItemContainer style={index === 0 && {marginTop:14}}>
    <CommentItem
    commentId={item.id}
    clickToReply={clickToReply}
    profileImage={item.user.thumbnailImg}
    nickname={item.user.nickname}
    comment={item.description}
    replys={item.replys}
    createAt={date.toString()}
    navigation={navigation}
    openCommentModal={openCommentModal}
    />
    {item.replys[0] && (
      <FlatList
      data={item.replys}
      renderItem={renderReplyItem}/>
    )}
    </CommentItemContainer>
    )
   }


    return (
    <Container>
    <HeaderBar>
        <TouchableWithoutFeedback onPress={() => navigateGoBack()}>
       <HeaderLeftContainer>
           <HeaderCancelIcon
           source={require('~/Assets/Images/HeaderBar/ic_X.png')}/>
       </HeaderLeftContainer>
       </TouchableWithoutFeedback>
       <TouchableWithoutFeedback onPress={() => 0}>
         <HeaderCenterContainer>
         <HeaderTitleText>{loadingComment ? "" : ("댓글 " + allCommentCount+"개")}</HeaderTitleText>
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
     {/*
     <FeedInformationContainer>
     <FeedInformation
     profileImage={route.params?.feedDetailInfo.user.profileImg}
     profileNickname={route.params?.feedDetailInfo.user.nickname}
     createdAt={route.params?.createdAt}
     mainTag={route.params?.feedDetailInfo.mainTags.name}
     subTag1={route.params?.feedDetailInfo.subTagOnes ? route.params.feedDetailInfo.subTagOnes.name : null}
     subTag2={route.params?.feedDetailInfo.subTagTwos ? route.params.feedDetailInfo.subTagTwos.name : null}
     rating={route.params?.feedDetailInfo.starRate}
     expensePrice={route.params?.feedDetailInfo.expense ? route.params.feedDetailInfo.expense + "원" : "금액정보 없음"}
     location={route.params?.feedDetailInfo.address ? route.params.feedDetailInfo.address.address : "위치정보 없음"}
     expenseDate={route.params?.feedDetailInfo.spendDate ? route.params.feedDetailInfo.spendDate : null}
     moveToWriterProfile={moveToWriterProfile}
     />
     </FeedInformationContainer>

     */}
     {loadingComment && (
       <LoadingContainer>
         <ActivityIndicator/>
       </LoadingContainer>
     )}
     {!loadingComment && (
     <KeyboardAwareScrollView
     showsVerticalScrollIndicator={false}
     refreshControl={
       <RefreshControl
       refreshing={refreshingComment}
       onRefresh={onRefreshComment}/>
     }
     >
      <CommentListContainer
      style={inputType === "reply" && { paddingBottom: isIphoneX() ? wp('20%') : wp('30%')}}>
         <FlatList
        showsVerticalScrollIndicator={false}
        refreshing={false}
        data={commentList}
        renderItem={renderCommentItem}
        />
        </CommentListContainer>
        </KeyboardAwareScrollView>
     )}
        <FooterContainer style={inputFocus ? {bottom:0} : (isIphoneX() ? {bottom: 0} : {bottom: 0})}>
          <AboveKeyboard
          style={{backgroundColor:'#ffffff'}}
          >
          {inputType === "reply" && (
            <InputingReplyContainer>
            <InputingReplyText>{replyTarget+"님에게 답글 남기는 중"}</InputingReplyText>
            <TouchableWithoutFeedback onPress={() => cancelReply()}>
            <InputingReplyCancelContainer>
            <InputingReplyCancelIcon
            source={require('~/Assets/Images/ic_replyCancel.png')}
            />
            </InputingReplyCancelContainer>
            </TouchableWithoutFeedback>
            </InputingReplyContainer>

          )}
        <CommentContainer style={inputFocus && {paddingBottom:5}}>
        <ProfileImage
            source={{uri:currentUser.user?.profileImage}}/>
        <CommentInputContainer>
            <CommentInput
            ref={commentInputRef}
            autoCapitalize={false}
            multiline={true}
            onFocus={() => setInputFocus(true)}
            onSubmitEditing={() => setInputFocus(false)}
            onEndEditing={() => setInputFocus(false)}
            placeholder={inputType==="comment" ? "댓글 달기" : "답글 달기"}
            onChangeText={(text: string) => onChangeCommentInput(text)}
            value={inputComment}
            />
            <TouchableWithoutFeedback onPress={() => postComment()}>
            <CommentRegisterContainer>
            <CommentRegisterText>입력</CommentRegisterText>
            </CommentRegisterContainer>
            </TouchableWithoutFeedback>
        </CommentInputContainer>
        </CommentContainer>
        </AboveKeyboard>
        </FooterContainer>
        <Modal
      onBackdropPress={() => setVisibleCommentModal(false)}
      isVisible={visibleCommentModal}
      backdropOpacity={0.25}
      onSwipeComplete={() => setVisibleCommentModal(false)}
      swipeDirection={['down']}
      style={styles.commentModal}>
        <OtherUsersFeedViewMoreModalContainer>
        <ModalHeaderContainer>
        <ModalToggleButton/>
        </ModalHeaderContainer>
        <TouchableWithoutFeedback onPress={() => moveToCommentDeclare()}>
        <ModalTabItemContainer>
          <ModalTabItemIconImage
          style={{tintColor:'#1D1E1F'}}
          source={require('~/Assets/Images/Feed/ic_declare.png')}/>
          <ModalTabItemLabelText
          style={{color:'#1D1E1F'}}
          >신고하기</ModalTabItemLabelText>
        </ModalTabItemContainer>
        </TouchableWithoutFeedback>
        </OtherUsersFeedViewMoreModalContainer>
      </Modal>
      <Modal
      onBackdropPress={() => setVisibleMyCommentModal(false)}
      isVisible={visibleMyCommentModal}
      backdropOpacity={0.25}
      onSwipeComplete={() => setVisibleMyCommentModal(false)}
      swipeDirection={['down']}
      style={styles.commentModal}>
        <OtherUsersFeedViewMoreModalContainer>
        <ModalHeaderContainer>
        <ModalToggleButton/>
        </ModalHeaderContainer>
        <TouchableWithoutFeedback onPress={() => deleteComment()}>
        <ModalTabItemContainer>
          <ModalTabItemIconImage
          style={{tintColor:'#1D1E1F'}}
          source={require('~/Assets/Images/Feed/ic_remove.png')}/>
          <ModalTabItemLabelText
          style={{color:'#1D1E1F'}}
          >삭제하기</ModalTabItemLabelText>
        </ModalTabItemContainer>
        </TouchableWithoutFeedback>
        </OtherUsersFeedViewMoreModalContainer>
      </Modal>
      {loadingRegister && (
        <LoadingRegisterContainer>
          <ActivityIndicator
          color={"#ffffff"}/>
        </LoadingRegisterContainer>
      )}
    </Container>
    )
}

const styles = StyleSheet.create({
  commentModal: {
    justifyContent: 'flex-end',
    margin: 0,
  }
})

export default CommentListScreen;
