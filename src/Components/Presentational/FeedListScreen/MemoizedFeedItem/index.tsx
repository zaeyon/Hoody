import React, {useEffect, useState} from 'react';
import Styled from 'styled-components/native';
import {FlatList, TouchableWithoutFeedback, View, StyleSheet, Dimensions} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector, useDispatch} from 'react-redux';
import allActions from '~/action';

import ProductItem from './ProductItem';

// Route
import GetFeedDetail from '~/Route/Post/GetFeedDetail';
import {POSTLike, DELETELike} from '~/Route/Post/Like';
import POSTScrapFeed from '~/Route/Post/Scrap/POSTScrapFeed';
import DELETEScrapFeed from '~/Route/Post/Scrap/DELETEScrapFeed';

const deviceWidth = Dimensions.get('window').width

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
width: ${deviceWidth < 375 ? wp('86.0%') : wp('88.0%')}px;
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
padding-top: 12px;
padding-bottom: 4px;
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
width: ${wp('10.6%')}px;
height: ${wp('10.6%')}px;
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
 align-items: center;
height: ${wp('4.5%')}px;
background-color:#ffffff;
`;

const RatingStarImage = Styled.Image`
margin-top: 0px;
margin-left: 5px;
margin-right: 3px;
width: ${wp('3.2%')}px;
height: ${wp('3.2%')}px;
`;

const RatingText = Styled.Text`
margin-top: 0.5px;
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
 top: 17px;
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
width: ${deviceWidth < 375 ? wp('38.5%') : wp('40.5%')}px;
height: ${wp('44%')}px;
`;

const SecondImage = Styled.Image`
 margin-left: 2.5px;
 border-top-right-radius: 10px;
 border-bottom-right-radius: 10px;
resize-mode:cover;
width: ${deviceWidth < 375 ? wp('38.5%') : wp('40.5%')}px;
 height: ${wp('44%')}px;
`;

const ReviewImageContainer = Styled.View`
padding-top: 10px;
height: ${wp('81%')}px;
margin-bottom: 10px;
`;

const ProductContainer = Styled.View`
padding-top: 10px;
`;

const ReviewImage = Styled.Image`
resize-mode:cover;
border-radius: 10px; 
width: ${deviceWidth < 375 ? wp('77%') + 2.5 : wp('81%')}px;
height: ${wp('81%')}px;
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
 color: #000000;
 margin-right: 2.5px;
`;

const SubTagText = Styled.Text`
color: #CCCCCC;
font-size: 16px;
font-weight: 600;
margin-right: 2.5px;
`;

const LocationPriceContainer = Styled.View`
 margin-top: 3px;
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
 left: ${wp('3.8%')}
 margin-left: 12px;
 font-size: 15px;
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
 padding-top: 6px;
 padding-left: 6px;
 padding-right: 6px;
 padding-bottom: 6px;
`;

const ItemBottomBorder = Styled.View`
 background-color: #F1F1F1;
 width: ${wp('100%')}px;
 height: 1px;
`;

const LikeIcon = Styled.Image`
width: ${wp('4.4%')}px;
height: ${wp('3.8%')}px;
`;

const CommentIcon = Styled.Image`
width: ${wp('4.3%')}px;
height: ${wp('4.3%')}px;
`;

const ScrapIcon = Styled.Image`
width: ${wp('4.8%')}px;
height: ${wp('4.8%')}px;
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
  main_tag: string;
  sub_tag1?: string;
  sub_tag2?: string;
  review_content: any;
  image_count: number;
  like_count: number;
  comment_count: number;
  reply_count: number;
  scrap_count: number;
  location: string;
  expense: number;
  desArray: Array<object>;
  navigation: any;
  mediaFiles: Array<object>;
  productArray: Array<object>;
  userLike: Array<object>;
  userScrap: Array<object>;
}

const FeedItem = ({
  id,
  profile_image,
  nickname,
  createdAt,
  rating,
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
  productArray,
  userLike,
  userScrap,
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

    const tmpCreatedDate = getDateFormat(createdAt);
    setCreatedDate(tmpCreatedDate);
    setChangeState(!changeState);

    if(userLike[0]?.id) {
      setCurrentUserLike(true);
    } else {
      setCurrentUserLike(false);
    }

    if(userScrap[0]?.id) {
      setCurrentUserScrap(true);
    } else {
      setCurrentUserScrap(false);
    }

    setLikeCount(like_count);
    setAllCommentCount(comment_count+reply_count);
    
    // 현재 사용자 좋아요 여부 
    //var index = currentUser.likeFeeds?.findIndex(obj => obj.id === id);
    //var realTimeAddIndex = currentUser.realTimeAddLikeList?.findIndex(obj => obj.id === id);
    /*
    if(index !== -1) {
      setCurrentUserLike(true);
      likeFeedsIndex = index;
      if(currentUser.realTimeAddLike === id) {
       // console.log("realTimeIndexzz", realTimeAddIndex);
        dispatch(allActions.userActions.setRealTimeAddLike(null));
        setLikeCount(likeCount+1);
      }
    } else if(index === -1) {
      setCurrentUserLike(false);
      if(currentUser.realTimeRemoveLike === id) {
        dispatch(allActions.userActions.setRealTimeRemoveLike(null))
        setLikeCount(likeCount-1);
      }
    }

    var scrapFeedIndex = currentUser.scrapFeeds?.findIndex(obj => obj.id === id);
    if(scrapFeedIndex !== -1) {
      setCurrentUserScrap(true);
    } else if(scrapFeedIndex === -1) {
      setCurrentUserScrap(false);
    }
    */

  }, [userLike, userScrap, like_count]);

  /*
  useEffect(() => {
    //console.log("currentUser.likeFeeds[0].Like", currentUser.likeFeeds[0].Like)
    var index = currentUser.likeFeeds?.findIndex(obj => obj.id === id);
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
    

    var scrapFeedIndex = currentUser.scrapFeeds?.findIndex(obj => obj.id === id);
    if(scrapFeedIndex !== -1) {
      setCurrentUserScrap(true);
    } else if(scrapFeedIndex === -1) {
        setCurrentUserScrap(false);
    }

  }, [currentUser])
  */

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

    /*
    console.log("tmpFeedIds", tmpFeedIds)
    var deletedScrapFeeds = currentUser.scrapFeeds;
    var deleteIndex = currentUser.scrapFeeds?.findIndex(obj => obj.id === id);
    deletedScrapFeeds.splice(deleteIndex, 1);
    dispatch(allActions.userActions.setScrapFeeds(deletedScrapFeeds));
    */
   
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
    navigation.push("FeedStack", {
      screen: "FeedDetailScreen",
      params: {
      postId:id,
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
            <ExpenseText>{expense ? expense.toLocaleString()+"원" : null}</ExpenseText>
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
          <MainTagText>
            {"#" + main_tag}
            {sub_tag1 && (
              <SubTagText>{" #" + sub_tag1}
              {sub_tag2 && (
                <SubTagText>{" #" + sub_tag2}</SubTagText>
              )}
              </SubTagText>
            )}
          </MainTagText>
          </TagContainer>
          {desArray[0] && (
        <DescriptionContainer>
        <DescriptionText>{desArray[0] ? desArray[0].description : ""}</DescriptionText>
        </DescriptionContainer>
          )}
          {!mediaFiles[0] && productArray[0] && (
          <ProductContainer>
            <ProductItem
            productImage={productArray[0].image}
            productName={productArray[0].title}
            productDescription={productArray[0].description}
            shopIcon={productArray[0].favicon}
            shopName={productArray[0].site}/>
          </ProductContainer>
          )}
          {mediaFiles.length === 1 && (
          <ReviewImageContainer>
          <ReviewImage source={{uri:mediaFiles[0].thumbnailImg}}/>
          </ReviewImageContainer>
          )}
          {mediaFiles.length > 1 && (
            <ManyReviewImageContainer>
              <FirstImage source={{uri:mediaFiles[0].thumbnailImg}}/>
              <SecondImage source={{uri:mediaFiles[1].thumbnailImg}}/>
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

const MemoizedFeedItem = React.memo(FeedItem);

export default MemoizedFeedItem;
