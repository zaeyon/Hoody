import React, {useEffect, useState} from 'react';
import Styled from 'styled-components/native';
import {FlatList, TouchableWithoutFeedback, View, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector, useDispatch} from 'react-redux';
import allActions from '~/action';

// Route
import GetFeedDetail from '~/Route/Post/GetFeedDetail';
import {POSTLike, DELETELike} from '~/Route/Post/Like';
import POSTScrapFeed from '~/Route/Post/Scrap/POSTScrapFeed';
import DELETEScrapFeed from '~/Route/Post/Scrap/DELETEScrapFeed';

const Container = Styled.View`

 `;

const FeedItemContainer = Styled.View`
 width: ${wp('100%')}px;
 background-color:#ffffff;
 flex-direction: row;
 padding-top: 10px;
`;

const LeftContainer = Styled.View`
 width: ${wp('12%')}px;
 padding: 5px 0px 0px 55px;
 align-items: flex-end;
`;

const RightContainer = Styled.View`
 width: ${wp('88%')}px;
 padding: 5px 20px 0px 7px;
`;

const HeaderContainer = Styled.View`
 flex-direction: row;
 justify-content: space-between;
 `;

const BodyContainer = Styled.View`
 padding-top: 5px;
`;

const FooterContainer = Styled.View`
padding-top: 10px;
padding-bottom: 13px;
padding-left: 5px;
padding-right: 5px;
`;

const FooterLeftContainer = Styled.View`
flex-direction: row;
`;

const FooterRightContainer = Styled.View`
`;

const WriterContainer = Styled.View`
 flex-direction: row;
 justify-content: center;
 align-items: center;
`;

const HeaderCenterContainer = Styled.View`
`;

const NicknameCreatedAtContainer = Styled.View`
 flex-direction: row;
 align-items: center;
`;

const CreatedAtText = Styled.Text`
 margin-left: 7px;
 color: #cccccc;
 font-size: 12px;
`;

const WriterProfileImage = Styled.Image`
border-radius: 100px;
width: ${wp('9.6%')}px;
height: ${wp('9.6%')}px;
`;

const WriterNickname = Styled.Text`
font-size: 16px;
font-weight: 600;
`;


const LocationText = Styled.Text`
 margin-top: 4px;
 font-size: 13px;
 color: #8e8e8e;
`;

const ExpenseRatingContainer = Styled.View`
 flex-direction: row;
`;

const RatingStarImage = Styled.Image`
margin-left: 5px;
margin-right: 3px;
width: ${wp('3.2%')}px;
height: ${wp('3.2%')}px;
`;

const RatingText = Styled.Text`
font-weight: 500;
font-size: 13px;
color: #1D1E1F;
`;

const HalfRatingStarImage = Styled.Image`
margin-left: 2px;
margin-right: 2px;
margin-top: 3px;
width: 18px;
height: 18px;
tint-color: #23E5D2;
`;

const ManyReviewImageContainer = Styled.View`
padding-top: 10px;
margin-bottom: 5px;
 flex-direction: row;
`;

const ImageCountBackground = Styled.View`
 top: 15px;
 right: 5px;
 padding: 5px 9px 5px 9px;
 position: absolute;
 border-radius: 26px;
 background-color: #000000;
 opacity: 0.5;
`;

const ImageCountText = Styled.Text`
 font-size: 14px;
 font-weight: 500;
 color: #ffffff;
`;

const FirstImage = Styled.Image`
 border-top-left-radius: 10px;
 border-bottom-left-radius: 10px;
resize-mode:cover;
width: ${wp('40.5%')}px;
height: ${wp('44%')}px;
`;

const SecondImage = Styled.Image`
 margin-left: 2.5px;
 border-top-right-radius: 10px;
 border-bottom-right-radius: 10px;
resize-mode:cover;
 width: ${wp('40.5%')}px;
 height: ${wp('44%')}px;
`;

const ReviewImageContainer = Styled.View`
padding-top: 10px;
height: ${wp('82%')}px;
margin-bottom: 10px;
`;

const ReviewImage = Styled.Image`
resize-mode:cover;
border-radius: 10px; 
width: ${wp('82%')}px
height: ${wp('82%')}px;
`;

const TagContainer = Styled.View`
flex-direction: row;
`;

const TagBackground = Styled.View`
padding: 5px;
border-radius: 4px;
background-color: #ffffff;
opacity: 1;
`;

const MainTagText = Styled.Text`
 font-size: 16px;
 font-weight: 600;
 color: #3384FF;
 margin-right: 7px;
`;

const SubTagText = Styled.Text`
color: #CCCCCC;
font-size: 16px;
font-weight: 600;
margin-right: 7px;
`;

const LocationPriceContainer = Styled.View`
 margin-top: 5px;
 margin-left: 8px;
 height: 20px;
 flex-direction: row;
 `;

const LocationContainer = Styled.View`
 flex-direction: row;
 justify-content: center;
 align-items: center;
`;

const LocationIcon = Styled.Image`
 width: 14px;
 height: 14px;
`;


const PriceContainer = Styled.View`
 margin-left: 8px;
 flex-direction: row;
 justify-content: center;
 align-items: center;
`;

const PriceIcon = Styled.Image`
 width: 14px;
 height: 14px;
`;

const PriceText = Styled.Text`
 margin-left: 2px;
 font-size: 14px;
 color: #707070;
`;

const DescriptionContainer = Styled.View`
padding-top: 5px;
`;

const DescriptionText = Styled.Text`
 font-size: 16px;
 color: #4B4B4B;
`;

const AdditionalInfoContainer = Styled.View`
 padding-top: 0px;
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 
`;

const InfoLabelText = Styled.Text`
 font-size: 12px;
 color: #AAB2B7;
`;

const InfoCountText = Styled.Text`
 position: absolute;
 left: ${wp('3.5%')}
 margin-left: 5px;
 font-size: 13px;
 color: #8E9199;
`;

const InfoDivider = Styled.Text`
 margin-left: 5px;
 margin-right: 5px;
 font-size: 15px;
 color: #AAB2B7;
`;

const InfoContainer = Styled.View`
 flex-direction: row;
 align-items: center;
`;

const ItemBottomBorder = Styled.View`
 background-color: #F1F1F1;
 width: ${wp('100%')}px;
 height: 1px;
`;

const LikeIcon = Styled.Image`
width: ${wp('4.0%')}px;
height: ${wp('3.5%')}px;
`;

const CommentIcon = Styled.Image`
width: ${wp('4%')}px;
height: ${wp('4%')}px;
`;

const ScrapIcon = Styled.Image`
width: ${wp('4.5%')}px;
height: ${wp('4.5%')}px;
`;

const ExpenseText = Styled.Text`
 font-weight: 500;
 font-size: 13px;
 color: #1D1E1F;
`;

interface Props {
  id: number;
  profile_image: string;
  nickname: string;
  createdAt: string;
  rating: number;
  main_image: string;
  main_tag: string;
  sub_tag1?: string;
  sub_tag2?: string;
  review_content: array;
  image_count: number;
  like_count: number;
  comment_count: number;
  reply_count: number;
  scrap_count: number;
  location: string;
  expense: number;
  desArray: Array<object>;
  navigation: any;
  mediaFiles: Array<objevt>;
}

const FeedItem = ({
  id,
  profile_image,
  nickname,
  createdAt,
  rating,
  main_image,
  main_tag,
  sub_tag1,
  sub_tag2,
  review_content,
  image_count,
  like_count,
  comment_count,
  reply_count,
  scrap_count,
  location,
  expense,
  desArray,
  navigation,
  mediaFiles,
}: Props) => {
  const [ratingArray, setRatingArray] = useState([
    'empty',
    'empty',
    'empty',
    'empty',
    'empty',
  ]);
  const [tagList, setTagList] = useState(['']);
  const [feedDetailInfo, setFeedDetailInfo] = useState('');
  const [paragraphData, setParagraphData] = useState();
  const [createdDate, setCreatedDate] = useState();
  const [changeState, setChangeState] = useState<boolean>(false);
  const [currentUserLike, setCurrentUserLike] = useState<boolean>(false);
  const [currentUserScrap, setCurrentUserScrap] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(like_count);
  const [allCommentCount, setAllCommentCount] = useState<number>(comment_count+reply_count);
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  var likeFeedsIndex: any;
  const tmpRatingArr = ['empty', 'empty', 'empty', 'empty', 'empty'];

  useEffect(() => {
    if (rating % 1 === 0) {
      for (var i = 0; i < rating; i++) {
        tmpRatingArr[i] = 'full';
        if (i === rating - 1) {
          setRatingArray(tmpRatingArr);
        }
      }
    } else {
      for (var i = 0; i < rating; i++) {
        if (i === rating - 0.5) {
          tmpRatingArr[i] = 'half';
          setRatingArray(tmpRatingArr);
        } else {
          tmpRatingArr[i] = 'full';
        }
      }
    }

    
    let tmpTagList = new Array();
    tmpTagList.push(main_tag);
    if (sub_tag1 !== null) tmpTagList.push(sub_tag1);
    if (sub_tag2 !== null) tmpTagList.push(sub_tag2);
    setTagList(tmpTagList);
    

    const tmpCreatedDate = getDateFormat(createdAt);
    setCreatedDate(tmpCreatedDate);
    console.log("description", desArray);
    console.log("feedId", id);
    console.log("피드 상세 미디어파일",mediaFiles)
    console.log("피드 닉네임", nickname)
    setChangeState(!changeState);

    var index = currentUser.likeFeeds.findIndex(obj => obj.id === id);
    if(index !== -1) {
      setCurrentUserLike(true);
      likeFeedsIndex = index;
    } else if(index === -1) {
      setCurrentUserLike(false);
    }
    console.log("해당 피드가 사용자가 좋아요한 피드목록에 있음", index); 

    var scrapFeedIndex = currentUser.scrapFeeds.findIndex(obj => obj.id === id);
    if(scrapFeedIndex !== -1) {
      setCurrentUserScrap(true);
    } else if(scrapFeedIndex === -1) {
      setCurrentUserScrap(false);
    }
  }, []);

  useEffect(() => {
    //console.log("currentUser.likeFeeds[0].Like", currentUser.likeFeeds[0].Like)
    var index = currentUser.likeFeeds.findIndex(obj => obj.id === id);
    if(index !== -1) {
      if(!currentUserLike) {
        setLikeCount(likeCount+1)
        setCurrentUserLike(true);
      } 
    } else if(index === -1) {
      if(currentUserLike) {
        setLikeCount(likeCount-1)
        setCurrentUserLike(false);
      }
    }

    var scrapFeedIndex = currentUser.scrapFeeds.findIndex(obj => obj.id === id);
    if(scrapFeedIndex !== -1) {
      setCurrentUserScrap(true);
    } else if(scrapFeedIndex === -1) {
        setCurrentUserScrap(false);
    }

  }, [currentUser])


  function getDateFormat(date) {
    var tmpDate = new Date(date);
    var year = tmpDate.getFullYear();
    var month = (1+ tmpDate.getMonth());
    month = month >= 10 ? month : '0' + month;
    var day = tmpDate.getDate();
    day = day >= 10 ? day : '0' + day;
    return year + '년 ' + month + '월 ' + day + '일 '
}

  const deleteLike = () => {
    console.log("currentUser.likeFeeds", currentUser.likeFeeds);
    var removedLikeFeeds = currentUser.likeFeeds;
    var deletedIndex = currentUser.likeFeeds.findIndex(obj => obj.id === id);
    removedLikeFeeds.splice(deletedIndex, 1);
    console.log("deletedLike", removedLikeFeeds);
    dispatch(allActions.userActions.setLikeFeeds(removedLikeFeeds))
    setCurrentUserLike(false);
    setLikeCount(likeCount-1);
    console.log("deleteLike currentUser.user.userId", currentUser.user.userId);
    console.log("deleteLike id", id);
    DELETELike(currentUser.user.userId, id)
    .then(function(response) {
    })
    .catch(function(error) {
      console.log("좋아요 삭제 error", error)
    })
  }

  const addLike = () => {
    var addedLikeFeeds = currentUser.likeFeeds;
    const likeObj = {
      id: id,
      likeCount: likeCount+1
    }

    addedLikeFeeds.push(likeObj);
    dispatch(allActions.userActions.setLikeFeeds(addedLikeFeeds))
    setCurrentUserLike(true);
    setLikeCount(likeCount+1);
    POSTLike(currentUser.user.userId, id)
    .then(function(response) {
    })
    .catch(function(error) {
      console.log("좋아요 추가 error", error);
    })
  }

  const addScrapFeed = () => {
    var scrapFeedArray = new Array();
    scrapFeedArray.push(id);
    setCurrentUserScrap(true);

    var addedScrapFeeds = currentUser.scrapFeeds;
    const scrapObj = {
      id: id,
    }
    addedScrapFeeds.push(scrapObj);
    dispatch(allActions.userActions.setScrapFeeds(addedScrapFeeds))
    POSTScrapFeed(scrapFeedArray)
    .then(function(response: any) {
      console.log("스크랩성공", response)
    })
    .catch(function(error: any) {
      console.log("스크랩실패", error);
    })
  }

  const deleteScrapFeed = () => {
    setCurrentUserScrap(false);
    var tmpFeedIds = new Array();
    tmpFeedIds.push(id);

    console.log("tmpFeedIds", tmpFeedIds)
    var deletedScrapFeeds = currentUser.scrapFeeds;
    var deleteIndex = currentUser.scrapFeeds.findIndex(obj => obj.id === id);
    deletedScrapFeeds.splice(deleteIndex, 1);
    
    dispatch(allActions.userActions.setScrapFeeds(deletedScrapFeeds));
    DELETEScrapFeed(tmpFeedIds)
    .then(function(response) {
      console.log("스크랩삭제", response);
    })
    .catch(function(error) {
      console.log("스크랩삭제 실패", error);
    })
  }

  const moveToWriterProfile = () => {
    navigation.navigate("AnotherUserProfileStack", {
      screen: 'AnotherUserProfileScreen',
      params: {requestedUserNickname: nickname}
    });
  }

  const moveToFeedDetail = () => {
    navigation.navigate("FeedStack", {
      screen: "FeedDetailScreen",
      params: {
      feedId:id,
      createdAt: createdDate,
      currentUserLike: currentUserLike,
      currentUserScrap: currentUserScrap,
      }
    })
  }

  return (
    <Container>
      <FeedItemContainer>
        <LeftContainer>
        <TouchableWithoutFeedback onPress={() => moveToWriterProfile()}>
        <WriterProfileImage
              source={{uri: profile_image}}></WriterProfileImage>
         </TouchableWithoutFeedback>
        </LeftContainer>
        <RightContainer>
        <HeaderContainer>
          <WriterContainer>
              <HeaderCenterContainer>
             <NicknameCreatedAtContainer>
            <TouchableWithoutFeedback onPress={() => moveToWriterProfile()}>
            <WriterNickname>{nickname}</WriterNickname>
            </TouchableWithoutFeedback>
            </NicknameCreatedAtContainer>
            {location !== null && (
              <LocationText>{location}</LocationText>
            )}
            </HeaderCenterContainer>
          </WriterContainer>
          <ExpenseRatingContainer>
            <ExpenseText>{expense ? expense+"원" : null}</ExpenseText>
            <RatingStarImage
            source={require('~/Assets/Images/ic_newStar.png')}
            />
            <RatingText>{rating}</RatingText>
          </ExpenseRatingContainer>
        </HeaderContainer>
        <TouchableWithoutFeedback onPress={() => moveToFeedDetail()}>
        <View>
        <BodyContainer>
        <TagContainer>
            <FlatList
              horizontal={true}
              data={tagList}
              renderItem={({item, index}) => {
                if(index === 0) 
                { return (
                  <MainTagText>#{item}</MainTagText>
                )
                } else {
                  return (
                  <SubTagText>#{item}</SubTagText>
                  )
                }
              }}
            />
          </TagContainer>
        <DescriptionContainer>
            <DescriptionText>{desArray[0].description}</DescriptionText>
          </DescriptionContainer>
          {mediaFiles.length === 1 && (
          <ReviewImageContainer>
          <ReviewImage source={{uri:mediaFiles[0].url}}/>
          </ReviewImageContainer>
          )}
          {mediaFiles.length > 1 && (
            <ManyReviewImageContainer>
              <FirstImage source={{uri:mediaFiles[0].url}}/>
              <SecondImage source={{uri:mediaFiles[1].url}}/>
              {mediaFiles.length > 2 && (
              <ImageCountBackground>
          <ImageCountText>+{mediaFiles.length-2}</ImageCountText>
              </ImageCountBackground>
              )}
            </ManyReviewImageContainer>
          )}
        </BodyContainer>
        <FooterContainer>
          <AdditionalInfoContainer>
            <FooterLeftContainer>
            {currentUserLike && (
            <TouchableWithoutFeedback onPress={() => deleteLike()}>
            <InfoContainer>
            <LikeIcon
            source={require('~/Assets/Images/ic_pressedLike.png')}/>
            <InfoCountText style={currentUserLike && styles.pressedLikeText}>{likeCount}</InfoCountText>
            </InfoContainer>
            </TouchableWithoutFeedback>
            )}
            {!currentUserLike && (
            <TouchableWithoutFeedback onPress={() => addLike()}>
            <InfoContainer>
            <LikeIcon
style={{tintColor:'#8E9199'}}
            source={require('~/Assets/Images/ic_like.png')}/>
            <InfoCountText>{likeCount}</InfoCountText>
            </InfoContainer>
            </TouchableWithoutFeedback>
            )}
            <InfoContainer style={{marginLeft: 50, backgroundColor:'#ffffff'}}> 
            <CommentIcon
style={{tintColor:'#8E9199'}}
            source={require('~/Assets/Images/ic_comment.png')}/>
            <InfoCountText>{allCommentCount}</InfoCountText>
            </InfoContainer>
            </FooterLeftContainer>
            <FooterRightContainer>
              {!currentUserScrap && (
            <TouchableWithoutFeedback onPress={() => addScrapFeed()}>
            <InfoContainer
            style={{backgroundColor:'#ffffff', paddingTop:3}}>
            <ScrapIcon
            style={{tintColor:'#8E9199'}}
            source={require('~/Assets/Images/Feed/ic_emptyScrap.png')}/>
            </InfoContainer>
            </TouchableWithoutFeedback>
              )}
              {currentUserScrap && (
              <TouchableWithoutFeedback onPress={() => deleteScrapFeed()}>
                <InfoContainer
                style={{backgroundColor:'#ffffff', paddingTop:3}}>
                  <ScrapIcon
                  source={require('~/Assets/Images/Feed/ic_pressedScrap.png')}/>
                </InfoContainer>
              </TouchableWithoutFeedback>
              )}
            </FooterRightContainer>
          </AdditionalInfoContainer>
        </FooterContainer>
        </View>
        </TouchableWithoutFeedback>
        </RightContainer>
      </FeedItemContainer>
      <ItemBottomBorder/>
    </Container>
  );
};

const styles = StyleSheet.create({
  pressedLikeIcon : {
    tintColor: '#F86C57'
  }, 
  pressedLikeText : {
    color: '#F86C57'
  }
})

export default FeedItem;
