import React, {useState, useEffect, useLayoutEffect} from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableWithoutFeedback, Text, FlatList, ScrollView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import allActions from '~/action';
import GetFeedDetail from '~/Route/Post/GetFeedDetail';
import FeedContent from '~/Components/Presentational/FeedDetailScreen/FeedContent';

import {POSTLike, DELETELike} from '~/Route/Post/Like';

const Container = Styled.SafeAreaView`
width: ${wp('100%')};
height:${hp('100%')};
background-color: #ffffff;
`;

const HeaderContainer = Styled.View`
 width: ${wp('100%')};
 height: ${hp('6.5%')};
 flex-direction: row;
 align-items: center;
 justify-content:space-between;
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

const WriterContainer = Styled.View`
 flex-direction: row;
 align-items: center;
 justify-content: center;
`;

const RightContainer = Styled.View`
justify-content: center;
background-color: #ffffff;
height: ${hp('6%')};
flex: 1;
`;

const WriterProfileImage = Styled.Image`
border-radius: 100px;
 width: ${wp('8.5%')};
 height: ${wp('8.5%')};
`;

const WriterNicknameText = Styled.Text`
margin-left: 9px;
font-weight: 600;
font-size: 16px;
color: #333333;
`;

const HeaderTitleText = Styled.Text`
 font-size: 20px;
 margin-left: 6px;
`;

const BackButton = Styled.Image`
width: ${wp('7%')};
height: ${wp('7%')};
`;

const ButtonText = Styled.Text`
 font-size: 20px;
 color: #338EFC;
`;

const ViewMoreIcon = Styled.Image`
 width: ${wp('8.5%')};
 height: ${wp('8.5%')};
`;


const HeaderBorder = Styled.View`
 width: ${wp('100%')};
 height: 1px;
 background-color: #F1F1F1;
`;

const InformationContainer = Styled.View`
padding: 20px 20px 5px 20px;
background-color: #ffffff;
`;

const CreatedAtContainer = Styled.View`
 flex:1;
 align-items: flex-end;
`;

const CreatedAtText = Styled.Text`
font-size: 12px;
color: #CCCCCC;
`;

const TagListContainer = Styled.View`
flex-direction: row;
padding-top: 10px;
`;

const MainTagText = Styled.Text`
 font-size: 20px;
 font-weight: 600;
 color: #3384FF;
 margin-right: 7px;
`;

const SubTagText = Styled.Text`
color: #CCCCCC;
font-size: 20px;
font-weight: 600;
margin-right: 7px;
`;

const FeedContentContainer = Styled.View`
height: ${hp('100%')};
background-color: #000000;
`;

const MetadataContainer = Styled.View`
margin-top: 7px;
flex-direction: row;
`;

const RatingContainer = Styled.View`
 flex-direction: row;
`;

const RatingStarImage = Styled.Image`
margin-right: 3px;
width: ${wp('3.5%')};
height: ${wp('3.5%')};
`;

const ExpanseContainer = Styled.View`
flex-direction: row;
`;

const ExpanseIcon = Styled.Image`
width: ${wp('4.5%')};
height: ${wp('4.5%')};
`;

const ExpanseText = Styled.Text`
font-weight: 500;
font-size: 13px;
color: #C4C4C4;
`;

const LocationContainer = Styled.View`
flex-direction: row;
`;

const LocationIcon = Styled.Image`
width: ${wp('4.5%')};
height: ${wp('4.5%')};
`;

const LocationText = Styled.Text`
font-weight: 500;
font-size: 13px;
color: #C4C4C4;
`;

const IconDivider = Styled.View`
 margin-top: 2px;
 width: 1px;
 height: 13px;
 background-color: #EFEFEF;
 margin-left: 7px;
 margin-right: 7px;
`;

const ExpanseDateContainer = Styled.View`
 margin-top: 7px;
 flex-direction: row;
 align-items: center;
`;


const ExpanseDateText = Styled.Text`
font-size: 13px;
color: #C4C4C4;
`;



const BottomBar = Styled.SafeAreaView`
 width: ${wp('100%')};
 height: ${hp('7%')};
 position: absolute;
 bottom: 0;
 right: 15px;
 align-items: center;
 justify-content: flex-end;
 background-color: #FAFAFA;
 flex-direction: row;
`;

const LikeIconContainer = Styled.View`
 padding: 5px;
 justify-content: center;
 align-items: center;
`;

const CommentContainer = Styled.View`
 flex:1;
 justify-content: center;
 align-items: center;
 height: ${hp('5.5%')};
`;

const ScrapContainer = Styled.View`
 flex:1;
 justify-content: center;
 align-items: center;
 height: ${hp('5.5%')};
`;

const InfoContainer = Styled.View`
 flex-direction: row;
 align-items: center;
 margin-left: 15px;
 margin-bottom: 15px;
`;

const LikeCountText = Styled.Text`
 margin-left: 0px;
 font-size: 15px;
 color: #333333;
`;


const InfoCountText = Styled.Text`
 margin-left: 5px;
 font-size: 15px;
 color: #333333;
`;

const LikeIcon = Styled.Image`
width: ${wp('5.7%')};
height: ${wp('5.7%')};
tint-color: #333333;
`;

const PressedLikeIcon = Styled.Image`
width: ${wp('5.7%')};
height: ${wp('5.7%')};
`;

const CommentIcon = Styled.Image`
width: ${wp('5.7%')};
height: ${wp('5.7%')};

tint-color: #333333;
`;

const ScrapIcon = Styled.Image`
width: ${wp('5.7%')};
height: ${wp('5.7%')};

tint-color: #333333;
`;


const TEST_FEED_DETAIL = 
    {
      id: 1,
      user : {
        profileImg: 'https://t1.daumcdn.net/thumb/R600x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fqna%2Fimage%2F1542632018000000528',
        nickname: '테스트닉네임'
      },
      createAt: '2020-05-22',
      starRate: 2.5,
      mainTags : {
        name: '메인태그'
      },
      subTagOnes: {
        name: '서브태그1'
      },
      subTagTwos: {
        name: '서브태그2'
      },
      likes: 233,
      address : {
        address: '블루문 스터디 카페'
      },
      expanse: 2000,
      descriptions: [
        {
          description: "이번 남자친구가 선물해준 키엘 수분 크림을 사용해 봤는데 너무 좋은거 같아요 이번에 남자 ..."
        },
        {
          description: "내용2"
        }
      ],
      mediaFiles: [
        {
          type: 'image',
          url: 'https://img1.daumcdn.net/thumb/R720x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fliveboard%2Fdailylife%2F6d8abd51eb3644958240a9ca6ddf28bd.JPG'
        }
      ],
      paragraphData: [
        {
          type:"description",
          description: "이번 남자친구가 선물해준 키엘 수분 크림을 사용해 봤는데 너무 좋은거 같아요 이번에 남자 ..."
        },
        {
          type:"image",
          url: 'https://img1.daumcdn.net/thumb/R720x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fliveboard%2Fdailylife%2F6d8abd51eb3644958240a9ca6ddf28bd.JPG',
        },
        {
          type:"description",
          description: "내용2"
        }
      ]
    };



interface Props {
    navigation: any,
    route: any,
}

const FeedDetailScreen = ({navigation, route}: Props) => {
    const [mainTag, setMainTag] = useState("메인태그");
    const [paragraphData, setParagraphData] = useState<Array<object>>([]);
    const [postId, setPostId] = useState();
    const [feedDetailInfo, setFeedDetailInfo] = useState({
        user : {
          profileImg: "",
        },
        address : {
          address : ""
        }
    });
    const [ratingArray, setRatingArray] = useState<Array<string>>();
    const [tagList, setTagList] = useState<Array<string>>();
    const [createdDate, setCreatedDate] = useState();
    const [spendDate, setSpendDate] = useState();
    const [currentUserLike, setCurrentUserLike] = useState<boolean>(false);
    const [likeCount, setLikeCount] = useState<number>();
    const currentUser = useSelector((state) => state.currentUser);
    const dispatch = useDispatch();
    
    // 서버 연결 코드
    useLayoutEffect(() => {
        if(route.params?.feedId) {
       GetFeedDetail(route.params.feedId).then(function(response) {
           console.log("GetFeedDetail Success:", response.data)
           console.log("response.data.post", response.data.post);
           response.data.post.spendDate = getDateFormat(response.data.post.spendDate)
           setParagraphData(response.data.postBody);
           setPostId(route.params.feedId);
           setFeedDetailInfo(response.data.post);
           setLikeCount(response.data.post.likes)
           setTagList(route.params.tagList);
           setRatingArray(route.params.ratingArray);
           setCreatedDate(route.params.createdAt);
           setCurrentUserLike(route.params.currentUserLike)
       })
       .catch(function(error) {
           console.log("error", error);
       })
    }
    }, [route.params?.feedId])

    function getDateFormat(date) {
      var tmpDate = new Date(date);
      var year = tmpDate.getFullYear();
      var month = tmpDate.getMonth() + 1;
      month = month >= 10 ? month : '0' + month;
      var day = tmpDate.getDate();
      day = day >= 10 ? day : '0' + day;
      return year + '. ' + month + '. ' + day
    }


    /*
    // 서버연결X 테스트용 코드
    useLayoutEffect(() => {
        if(route.params?.feedId) {
           setPostId(route.params.feedId);
           setFeedDetailInfo(TEST_FEED_DETAIL);
           setTagList(route.params.tagList);
           setRatingArray(route.params.ratingArray);
    }
    }, [route.params.feedId])
    */

    const moveToCommentList = () => {
        console.log("postId", postId);

        navigation.navigate("CommentListScreen", {
            postId: postId,
        })
    }

    const moveToLikersList = () => {
      navigation.navigate("LikeListScreen",{
        likersList: feedDetailInfo.Likers,
      })
    }

    const clickToLikeIcon = () => {
      console.log("currentUser", currentUser);
      console.log("postId", postId);

      POSTLike(currentUser.user.userId, postId)
      .then(function(response) {
        console.log("response", response)
      })
      .catch(function(error) {
        console.log("error", error)
      })
    }

    const renderTagItem = ({item, index}) => {
        if(index === 0) { 
          return (
            <MainTagText>#{item}</MainTagText>
            )
        } else {
          return (
          <SubTagText>#{item}</SubTagText>
            )
        }
    }

    const addLike = () => {
      var addedLikeFeeds = currentUser.likeFeeds;
      var tmpLikeCount = likeCount + 1;
      setLikeCount(tmpLikeCount);
      setCurrentUserLike(true);
      const likeObj = {
        id: route.params.feedId,
      }

      addedLikeFeeds.push(likeObj);
      dispatch(allActions.userActions.setLikeFeeds(addedLikeFeeds))

      POSTLike(currentUser.user.userId, postId)
      .then(function(response) {
        console.log("response", response)
      })
      .catch(function(error) {
        console.log("error", error);
      })
    }

    const deleteLike = () => {
      var deletedLikeFeeds = currentUser.likeFeeds;
      console.log("FeedDetailScreen currentUser", currentUser);
      var index = deletedLikeFeeds.indexOf(postId);
      deletedLikeFeeds.splice(index, 1);
      dispatch(allActions.userActions.setLikeFeeds(deletedLikeFeeds));

      var tmpLikeCount = likeCount - 1;
      setLikeCount(tmpLikeCount);
      setCurrentUserLike(false);

      DELETELike(currentUser.user.userId, postId)
      .then(function(response) {
        console.log("response", response)
      })
      .catch(function(error) {
        console.log("error", error)
      })
    }
  

   return (
       <Container>
        <HeaderContainer>
        <LeftContainer>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <BackButton source={require('~/Assets/Images/ic_back.png')} />
          </TouchableWithoutFeedback>
        </LeftContainer>
        <TouchableWithoutFeedback onPress={() => 0}>
          <CenterContainer>
              <WriterContainer>
                  <WriterProfileImage
                  source={{uri: feedDetailInfo.user.profileImg}}
                  />
                  <WriterNicknameText>{feedDetailInfo.user.nickname}</WriterNicknameText>
              </WriterContainer>
        </CenterContainer>
        </TouchableWithoutFeedback>
        <RightContainer>
              <TouchableWithoutFeedback onPress = {() => 0}>
                  <ViewMoreIcon
                  source={require('~/Assets/Images/ic_more.png')}/>
              </TouchableWithoutFeedback>
        </RightContainer>
      </HeaderContainer>
      <HeaderBorder/>
      <ScrollView>
      <InformationContainer>
    <CreatedAtContainer>
   <CreatedAtText>{"게시일 "+createdDate}</CreatedAtText>
   </CreatedAtContainer>
   <TagListContainer>
            <FlatList
              horizontal={true}
              data={tagList}
              renderItem={renderTagItem}
            />
   </TagListContainer>
   <MetadataContainer>
   <RatingContainer>
              <FlatList
              horizontal={true}
              data={ratingArray}
              renderItem={({item, index}) => {
                if (item === 'full') {
                  return (
                    <RatingStarImage
                      source={require('~/Assets/Images/ic_newStar.png')}
                    />
                  );
                } else if (item === 'half') {
                  return (
                    <RatingStarImage
                      source={require('~/Assets/Images/ic_newHalfStar.png')}
                    />
                  );
                } else if (item === 'empty') {
                
                }
              }}
              />
   </RatingContainer>
   <IconDivider/>
   <ExpanseContainer>
       <ExpanseIcon
       source={require('~/Assets/Images/ic_expanse.png')}/>
       <ExpanseText>{feedDetailInfo.expanse? feedDetailInfo.expanse + "원" : "금액정보 없음"}</ExpanseText>
   </ExpanseContainer>
   <IconDivider/>
   <LocationContainer>
       <LocationIcon
       source={require('~/Assets/Images/ic_location.png')}/>
       <LocationText>{feedDetailInfo.address ? feedDetailInfo.address.address:"위치정보 없음"}</LocationText>
   </LocationContainer>
   </MetadataContainer>
   <ExpanseDateContainer>
       <ExpanseDateText>소비날짜</ExpanseDateText>
       <IconDivider/>
       <ExpanseDateText>{feedDetailInfo.spendDate}</ExpanseDateText>
   </ExpanseDateContainer>
      </InformationContainer>
          <FeedContent
          paragraphData={paragraphData}
          ></FeedContent>
          </ScrollView>
      <BottomBar>
          <InfoContainer>
            {!currentUserLike && (
            <TouchableWithoutFeedback onPress={() => addLike()}>
            <LikeIconContainer>
            <LikeIcon
            source={require('~/Assets/Images/ic_heart_outline.png')}/>
            </LikeIconContainer>
            </TouchableWithoutFeedback>
            )}
            {currentUserLike && (
            <TouchableWithoutFeedback onPress={() => deleteLike()}>
            <LikeIconContainer>
            <PressedLikeIcon
            source={require('~/Assets/Images/ic_pressedLike.png')}/>
            </LikeIconContainer>
            </TouchableWithoutFeedback>
            )}
               <TouchableWithoutFeedback onPress={() => moveToLikersList()}>
              <LikeCountText style={currentUserLike && {color:'#FF453A'}}>{likeCount}</LikeCountText>
          </TouchableWithoutFeedback>
          </InfoContainer>
          <TouchableWithoutFeedback onPress={() => moveToCommentList()}>
          <InfoContainer>
          <CommentIcon
            source={require('~/Assets/Images/ic_comment_outline.png')}/>
            <InfoCountText>{feedDetailInfo.commentsCount}</InfoCountText>
          </InfoContainer>
          </TouchableWithoutFeedback>
          <InfoContainer>
            <ScrapIcon
            source={require('~/Assets/Images/ic_scrap_outline.png')}/>
            <InfoCountText>{feedDetailInfo.Scraps ? feedDetailInfo.Scraps.length : null}</InfoCountText>
          </InfoContainer>
      </BottomBar>

       </Container>
   )
}

export default FeedDetailScreen;