import React, {useState, useEffect, useRef, createRef} from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableWithoutFeedback, FlatList, ScrollView, Animated, Image, Alert, ActivityIndicator, View, RefreshControl} from 'react-native'
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import ActionSheet from 'react-native-actionsheet';
import {useSelector ,useDispatch} from 'react-redux';
import {isIphoneX} from 'react-native-iphone-x-helper'
import allActions from '~/action';

// Local Component
import TileFeedItem from '~/Components/Presentational/TileFeedItem';

// Route
import GETCollectionDetailInfo from '~/Route/Collection/GETCollectionDetailInfo';
import POSTScrapCollection from '~/Route/Collection/Scrap/POSTScrapCollection';
import DELETEScrapCollection from '~/Route/Collection/Scrap/DELETEScrapCollection'
import POSTLikeCollection from '~/Route/Collection/Like/POSTLikeCollection';
import DELETELikeCollection from '~/Route/Collection/Like/DELETELikeCollection';
import DELETECollection from '~/Route/Collection/DELETECollection';
import {POSTFollowUser, DELETEUnfollowUser} from '~/Route/User/Follow';

const actionSheetRef = createRef();
const Container = Styled.View`
 flex: 1;
 background-color: #ffffff;
`;


const HeaderBar = Styled.SafeAreaView`
 width: ${wp('100%')};
 height: ${hp('6.5%')}
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 position: absolute;
`;

const HeaderLeftContainer = Styled.View`
`;

const BackButtonContainer = Styled.View`
padding: 12.5px 15px 10px 15px;
 align-items: center;
 justify-content: center;
`;



const BackButton = Styled.Image`
 width: ${wp('6.4%')};
 height: ${wp('6.4%')};
 tint-color: #ffffff;
`;

const BackIconBackground = Styled.View`
 padding: 10px 10px 10px 14px;
 width: ${wp('8%')};
 height: ${wp('8%')};
 background-color: #00000008;
 align-items: center;
 justify-content: center;
 border-radius: 50px;
`;


const MoreIconBackground = Styled.View`
 padding: 10px 10px 10px 10px;
 width: ${wp('8%')};
 height: ${wp('8%')};
 background-color: #00000008;
 align-items: center;
 justify-content: center;
 border-radius: 50px;
`;



const HeaderCollectionTitleText = Styled.Text`
 font-weight: 500;
 font-size: 17px;
 color: #ffffff;
`;

const HeaderRightContainer = Styled.View`
padding: 10px 15px 10px 15px;
 align-items: center;
 justify-content: center;
 flex-direction: row;
`;

const HeaderRightView = Styled.View`
width: ${wp('8%')};
height: ${wp('8%')};
`;

const LocationMapContainer = Styled.View`
margin-top: 30px;
width: ${wp('100%')};
height: ${wp('90%')};
`;

const LocationMapHeaderBar = Styled.View`
 width: ${wp('100%')};
 height: ${wp('12.8%')};
 flex-direction: row;
 align-items: center;
 background-color: #ffffff;
 justify-content: space-between;
 padding-left: 16px;
 padding-right: 16px;
`;

const LocationMapText = Styled.Text`
font-size: 18px;
font-weight: 600;
color: #333333;
`;

const LocationMapNextIcon = Styled.Image`
 width: ${wp('4.5%')};
 height: ${wp('4.5%')};
`;
 
const CollectionFeedListContainer = Styled.View`
 flex: 1;
 background-color: #ffffff;
`;

const CollectionFeedFlatListContainer = Styled.View`
 flex: 1;
`;

const FeedListHeaderBar = Styled.View`
 flex-direction: row;
 align-items: center;
 width: ${wp('100%')};
 height: ${wp('11.2%')};
 background-color: #ffffff;
 justify-content: space-between;
 padding-left: 18px;
 padding-right: 18px;
 border-bottom-width: 0.6px;
 border-color: #eeeeee;
`;

const CollectionFeedCountText = Styled.Text`
 font-size: 13px;
 color: #8e8e8e;
`;

const CollectionEditText = Styled.Text`
 font-size: 13px;
 color: #8e8e8e;
`;

const MarkerFeedImage = Styled.Image`
 width: 32px;
 height: 32px;
 border-radius: 50px;
 margin-top: 3px;
 margin-left: 3px;
`;

const CollectionInfoContainer = Styled.View`
 width: ${wp('100%')};
 background-color: #ffffff;
 padding: 10px 16px 11px 16px;
`;

const CollectionInfoHeader = Styled.View`
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 padding-top: 20px;
 padding-bottom: 9px;
 border-bottom-width: 0.6px;
 border-color: #ececee;
`;

const CollectionIconContainer = Styled.View`
 flex-direction: row;
`;

const CollectionLikeContainer = Styled.View`
 padding:5px;
 background-color:#ffffff;
`;

const CollectionScrapContainer = Styled.View`
padding:5px;
background-color:#ffffff;
`;

const CollectionLikeIcon = Styled.Image`
 width: ${wp('6.4%')};
 height: ${wp('6.4%')};
`;

const CollectionScrapIcon = Styled.Image`
width: ${wp('6.4%')};
height: ${wp('6.4%')};
`;

const CollectionTitleText = Styled.Text`
 font-weight: 600;
 font-size: 21px;
 color: #333333;
`;

const CollectionDescripText = Styled.Text`
 margin-top: 12px;
 font-size: 17px;
 color: #56575C;
`;

const CollectionInfoFooter = Styled.View`
padding-top: 20px;
 flex-direction: row
 justify-content: space-between;
 align-items: center;
`;

const CollectionSocialContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const CollectionFeedLabelText = Styled.Text`
 font-size: 13px;
 color: #000000;
`;

const CollectionLikeLabelText = Styled.Text`
 margin-left: 12px;
 font-size: 13px;
 color: #000000;
`;

const CollectionScrapLabelText = Styled.Text`
margin-left: 12px;
 font-size: 13px;
 color: #000000;
`;

const CollectionInfoCountText = Styled.Text`
font-size: 13px;
color: #000000;
font-weight: bold;
margin-left: 3px;
`;

const CollectionCoverImage = Styled.Image`
 flex:1;
`;

const CollectionMoreIcon = Styled.Image`
 width: ${wp('7%')};
 height: ${wp('7%')};
 tint-color: #ffffff;
`;

const WriterProfileContainer = Styled.View`
padding-top: 12px;
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
`;

const WriterInfoContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const ProfileImage = Styled.Image`
 width: ${wp('6.9%')};
 height: ${wp('6.9%')};
 border-radius: 100px;
`;

const ProfileNicknameText = Styled.Text`
margin-left: 8px;
color: #1D1E1F;
font-weight: 600;
font-size: 15px;
`;

const FollowContainer = Styled.View`
padding: 5px;
`;

const FollowText = Styled.Text`
font-size: 15px;
color: #007AFF; 
`;

const FollowingText = Styled.Text`
font-size: 15px;
color: #007AFF;
`;

const PrivateText = Styled.Text`
 font-weight: 500;
 font-size: 15px;
 color: #C6C7CC;
`;

const CollectionNameContainer = Styled.View`
 flex-direction: column;
 width: ${wp("72%")};
`;

const LoadingContainer = Styled.View`
 position: absolute;
 width: ${wp('100%')};
 height: ${hp('100%')};
 align-items: center;
 background-color: #FFFFFF;
 justify-content: center;
`;



const MarkerThumbnailImage = Styled.Image`
 width: 34px;
 height: 34px;
 border-radius: 50px;
`;

const MarkerThumbnailContainer = Styled.View`
flex:1;
justify-content: center;
align-items: center;
padding-top: 4.2px;
padding-left: 7px;
`;




const TEST_COLLECTION_DATA = {
        title: '컬렉션 테스트1',
        feedCount: 13,
        feed: [
            {
                index:1,
            },
            {
                index:2,
            },
            {
                index:3,
            },
            {
                index:4,
            },
            {
                index:5,
            },
            {
                index:6,
            }
        ]
}

interface Props {
    navigation: any,
    route: any,
}

const LatLng = {
    latitude: 32,
    longitude: 121,
}

const CollectionDetailScreen = ({navigation, route}: Props) => {
    const [headerBlur, setHeaderBlur] = useState<boolean>(false);
    const [collectionDetailInfo, setCollectionDetailInfo] = useState<Array<object>>([]);
    const [currentUserLike, setCurrentUserLike] = useState<boolean>(false);
    const [currentUserScrap, setCurrentUserScrap] = useState<boolean>(false);
    const [currentUserFollow, setCurrentUserFollow] = useState<boolean>(false);
    const [likeCount, setLikeCount] = useState<number>(0);
    const [loadingCollection, setLoadingCollection] = useState<boolean>(true);
    const [refreshingCollection, setRefreshingCollection] = useState<boolean>(false);
    const [locationFeedList, setLocationFeedList] = useState<Array<object>>([]);
    const [mapRegionChange, setMapRegionChange] = useState<boolean>(false);

    const [initialMapRegion, setInitialMapRegion] = useState<Region>({
        latitude:  35.9,
        longitude: 127.8,
        latitudeDelta: 2.5022,
        longitudeDelta: 4.0421,
      })
    const H_MAX_HEIGHT = wp('90%')
    const H_MIN_HEIGHT = isIphoneX() ? wp('25.6%') : wp('19%');
    const H_SCROLL_DISTANCE = H_MAX_HEIGHT - H_MIN_HEIGHT;

    const scrollOffsetY = useRef(new Animated.Value(0)).current;

    const currentUser = useSelector((state: any) => state.currentUser);
    const dispatch = useDispatch();

    const headerScrollHeight = scrollOffsetY.interpolate({
        inputRange: [0, H_SCROLL_DISTANCE],
        outputRange: [H_MAX_HEIGHT, H_MIN_HEIGHT],
        extrapolate: "clamp"
    })

    useEffect(() => {
        if(route.params?.update) {
            route.params.update = false
          }
        if(route.params?.collectionId) {
           getCollectionDetailInfo()
        }

    }, [route.params?.collectionId, route.params?.update])

    const getCollectionDetailInfo = () => {
        GETCollectionDetailInfo(route.params.collectionId)
           .then(function(response) {
               var tmpLocationFeedList = new Array();
               setLoadingCollection(false);
               setRefreshingCollection(false);
               console.log("GETCollectionDetailInfo response", response)
               console.log("GETCollectionDetailInfo response.Posts", response.collection.Posts);
               response.collection.Posts.forEach((item: any, index: number) => {
                   if(item.address) {
                       if(!mapRegionChange) {
                           var mapRegion = {
                            latitude:  item.address.geographLat,
                            longitude: item.address.geographLong,
                            latitudeDelta: 0.0022,
                            longitudeDelta: 0.0421,
                           }
                           setInitialMapRegion(mapRegion)
                           setMapRegionChange(true);
                       }
                       console.log("locationFeedList item.address", item.address)
                       tmpLocationFeedList.push(item)
                   }
               })
               setTimeout(() => {
                   setLocationFeedList(tmpLocationFeedList)
               }, 100)

               setCollectionDetailInfo(response.collection);
               setCurrentUserLike(response.collection.liked);
               setCurrentUserScrap(response.collection.scraped);
               setCurrentUserFollow(response.collection.followed);
               setLikeCount(response.collection.Like);
           })
           .catch(function(error) {
               console.log("GETCollectionDetailInfo error", error)
           })
    }

    const onRefreshCollection = () => {
        setRefreshingCollection(true);
        getCollectionDetailInfo();
    }

    const renderCollectionFeedItem = ({item, index}: any) => {
        console.log("renderCollectionFeedItem item", item)
        return (
            <TileFeedItem
            navigation={navigation}
            postId={item.id}
            product={item.Products}
            mainImage={item.mediaFiles[0] ? item.mediaFiles[0] : ""}
            mainTag={item.mainTags.name}
            rating={item.starRate}
            expense={item.expense}
            address={item.address ? item.address.address : ""}
            />
        )
    }

    const onChangeHeaderHeight = (event) => {
        if(event.nativeEvent.layout.height < 120) {
            console.log("헤더 블러 처리")
            setHeaderBlur(true);
        } else {
            setHeaderBlur(false);

        }
    }

    const showActionSheet = (index) => {
        actionSheetRef.current.show()
    }

    const deleteCollection = () => {
        Alert.alert(
            '정말 컬렉션을 삭제하시겠어요?', 
            ' ', 
            [
            {
                text: '확인',
                onPress: () => {
                  DELETECollection(route.params?.collectionId)
                  .then(function(response) {
                  console.log("컬렉션 삭제 성공 response", response);
                  navigation.navigate("ProfileScreen", {
                    collectionListChange: true,
                  });
                  })
                  .catch(function(error) {
                  console.log("컬렉션 삭제 실패 error", error);
                  })
            }
            },
            {
                text: '취소',
                onPress: () => 0,
                style: 'cancel',
            }
        ],      
      );
    }

    const moveToCollectionFeedEdit = () => {
        dispatch(allActions.userActions.setCollectionFeedList(collectionDetailInfo.Posts));
        navigation.navigate("CollectionFeedEditScreen", {
            collectionFeedList: collectionDetailInfo.Posts,
            collectionId: route.params?.collectionId
        })
    }

    const moveToCollectionFeedMap = () => {
        navigation.navigate("CollectionFeedMapScreen", {
            locationFeedList: locationFeedList,
        })
    }

    const onPressActionSheet = (index: number) => {
        console.log("actionsheet press index", index);
        if(index === 1) {
            deleteCollection()
        } if(index === 2) {
            navigation.navigate("CollectionModifyScreen", {
            collectionId: route.params?.collectionId,
            coverImage: {
                uri: collectionDetailInfo.coverImg
            },
            name: collectionDetailInfo.name,
            description: collectionDetailInfo.description,
            open: collectionDetailInfo.open,
            includeLocation: collectionDetailInfo.includeLocation,
        });
        } else if(index === 3) {
            moveToCollectionFeedEdit()
        }
    }

    const addLikeCollection = () => {
        setCurrentUserLike(true);
        setLikeCount(likeCount+1);
        POSTLikeCollection(route.params?.collectionId)
        .then(function(response) {
            console.log("컬랙션 좋아요 성공", response);
        })
        .catch(function(error) {
            console.log("컬렉션 좋아요 실패", error);
        })
    }

    const deleteLikeCollection = () => {
        setCurrentUserLike(false);
        setLikeCount(likeCount-1);
        DELETELikeCollection(route.params.collectionId)
        .then(function(response) {
            console.log("컬렉션 좋아요 삭제 성공", response);
        })
        .catch(function(error) {
            console.log("컬렉션 좋아요 삭제 실패", error);
        })
    }

    const addScrapCollection = () => {
        setCurrentUserScrap(true);
        POSTScrapCollection(route.params?.collectionId)
        .then(function(response) {
            console.log("컬렉션 스크랩 성공", response);
        })
        .catch(function(error) {
            console.log("컬렉션 스크랩 에러", error);
        })
    }

    const deleteScrapCollection = () => {
        setCurrentUserScrap(false);
        DELETEScrapCollection(route.params?.collectionId)
        .then(function(response) {
            console.log("컬렉션 스크랩 삭제 ", response);
        })
        .catch(function(error) {
            console.log("컬렉션 스크랩 삭제 에러", error);
        })
    }

    const moveToUserProfile = () => {
        if(currentUser.user?.nickname === collectionDetailInfo.user.nickname) {
            navigation.navigate("Profile", {
                screen:"ProfileScreen"
            })
        } else {
            navigation.navigate("AnotherUserProfileStack", {
              screen: "AnotherUserProfileScreen",
              params: {requestedUserNickname: collectionDetailInfo.user.nickname}
            });
        }
      }

    const followUser = () => {
        setCurrentUserFollow(true);
        POSTFollowUser(collectionDetailInfo.user.id)
        .then(function(response) {
            console.log("팔로우 성공", response);
        })
        .catch(function(error) {
            console.log("팔로우 실패", error);
        })
    }

    const unfollowUser = () => {
        setCurrentUserFollow(false);
        DELETEUnfollowUser(collectionDetailInfo.user.id)
        .then(function(response) {
            console.log("언팔로우 성공", response);
        })
        .catch(function(error) {
            console.log("언팔로우 실패", error);
        })
    }

    const moveToFeedDetail = (postId: number) => {
        navigation.push("FeedStack", {
          screen: "FeedDetailScreen",
          params: {
          postId:postId,
          }
        })
      }

    return (
        <Container>
            {!loadingCollection && (
           <Animated.View
            onLayout={(event:any) => onChangeHeaderHeight(event)}
            style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: headerScrollHeight,
            width: "100%",
            overflow: "hidden",
            zIndex: 10,
            // STYLE
            }}>    
            <CollectionCoverImage
            blurRadius={headerBlur ? 40: 0}
            source={{uri:collectionDetailInfo.thumbnailImg ? collectionDetailInfo.thumbnailImg : ""}}/>
            <HeaderBar style={{marginTop: getStatusBarHeight()}}>
                <HeaderLeftContainer>
                    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                    <BackButtonContainer>
                    <BackIconBackground>
                    <BackButton
                    source={require('~/Assets/Images/HeaderBar/ic_back.png')}/>
                    </BackIconBackground>
                    </BackButtonContainer>
                    </TouchableWithoutFeedback>
                </HeaderLeftContainer>
                {headerBlur && (
                <HeaderCollectionTitleText>{collectionDetailInfo.name}</HeaderCollectionTitleText>
                )}
                <TouchableWithoutFeedback onPress={() => showActionSheet()}>
                <HeaderRightContainer>
                    <MoreIconBackground>
                    <CollectionMoreIcon
                    source={require('~/Assets/Images/HeaderBar/ic_more.png')}/>
                    </MoreIconBackground>
                </HeaderRightContainer>
                </TouchableWithoutFeedback>
            </HeaderBar>
            </Animated.View>
            )}
            {!loadingCollection && (
                  <ScrollView
                  onScroll={Animated.event([
                      {nativeEvent: { contentOffset: {y: scrollOffsetY}}}])}
                  scrollEventThrottle={5}
                  showsVerticalScrollIndicator={false}
                  refreshControl={
                      <RefreshControl
                      tintColor={"#000000"}
                      refreshing={refreshingCollection}
                      onRefresh={onRefreshCollection}/>
                  }>
                  <CollectionInfoContainer style={{paddingTop:H_MAX_HEIGHT-10}}>
                  <CollectionInfoHeader>
                  <CollectionNameContainer>
                  <CollectionTitleText>{collectionDetailInfo.name}
                  </CollectionTitleText>
                  {!collectionDetailInfo.open && (
                  <PrivateText>비공개</PrivateText>
                  )}
                  </CollectionNameContainer>
                  <CollectionIconContainer>
                  {!currentUserLike && (
                  <TouchableWithoutFeedback onPress={() => addLikeCollection()}>
                  <CollectionLikeContainer>
                  <CollectionLikeIcon
                  source={require('~/Assets/Images/ic_heart_outline.png')}/>
                  </CollectionLikeContainer>
                  </TouchableWithoutFeedback>
                  )}
                  {currentUserLike && (
                  <TouchableWithoutFeedback onPress={() => deleteLikeCollection()}>
                  <CollectionLikeContainer>
                  <CollectionLikeIcon
                  source={require('~/Assets/Images/ic_pressedLike.png')}/>
                  </CollectionLikeContainer>
                  </TouchableWithoutFeedback>
                  )}
                  {!currentUserScrap && (
                  <TouchableWithoutFeedback onPress={() => addScrapCollection()}>
                  <CollectionScrapContainer>
                  <CollectionScrapIcon
                  source={require('~/Assets/Images/ic_scrap_outline.png')}/>
                  </CollectionScrapContainer>
                  </TouchableWithoutFeedback>
                  )}
                  {currentUserScrap && (
                  <TouchableWithoutFeedback onPress={() => deleteScrapCollection()}>
                  <CollectionScrapContainer>
                  <CollectionScrapIcon
                  source={require('~/Assets/Images/Feed/ic_pressedScrap.png')}/>
                  </CollectionScrapContainer>
                  </TouchableWithoutFeedback>
                  )}
                  </CollectionIconContainer>
                  </CollectionInfoHeader>
                  <WriterProfileContainer>
                      <TouchableWithoutFeedback onPress={() => moveToUserProfile()}>
                      <WriterInfoContainer>
                      <ProfileImage
                      source={{uri:collectionDetailInfo.user?.thumbnailImg}}/>
                      <ProfileNicknameText>{collectionDetailInfo.user?.nickname}</ProfileNicknameText>
                      </WriterInfoContainer>
                      </TouchableWithoutFeedback>
                      {currentUser.user?.nickname !== collectionDetailInfo.user?.nickname && currentUserFollow && (
                      <TouchableWithoutFeedback onPress={() => unfollowUser()}>
                      <FollowContainer>   
                      <FollowText>팔로잉</FollowText>
                      </FollowContainer>
                      </TouchableWithoutFeedback>
                      )}
                      {currentUser.user?.nickname !== collectionDetailInfo.user?.nickname && !currentUserFollow && (
                      <TouchableWithoutFeedback onPress={() => followUser()}>
                      <FollowContainer>   
                      <FollowText>팔로우</FollowText>
                      </FollowContainer>
                      </TouchableWithoutFeedback>
                      )}
                  </WriterProfileContainer>
                  <CollectionDescripText>{collectionDetailInfo.description? collectionDetailInfo.description: null}
                  </CollectionDescripText>
                  <CollectionInfoFooter>
                  <CollectionSocialContainer>
                  <CollectionFeedLabelText>게시글</CollectionFeedLabelText>
                  <CollectionInfoCountText>{collectionDetailInfo.Posts ? collectionDetailInfo.Posts.length : ""}</CollectionInfoCountText>
                  <CollectionLikeLabelText>좋아요</CollectionLikeLabelText>
                  <CollectionInfoCountText>{likeCount}</CollectionInfoCountText>
                  </CollectionSocialContainer>
                  </CollectionInfoFooter>
                  </CollectionInfoContainer>
                  <FlatList
                  contentContainerStyle={{paddingBottom:35}}
                  columnWrapperStyle={{justifyContent:'space-between', paddingLeft:16, paddingRight:15, paddingTop:11, paddingBottom:0}}
                  numColumns={2}
                  data={collectionDetailInfo.Posts}
                  renderItem={renderCollectionFeedItem}
                  />
                  {collectionDetailInfo?.includeLocation && (
                  <LocationMapContainer>
                  <TouchableWithoutFeedback onPress={() => moveToCollectionFeedMap()}>
                  <LocationMapHeaderBar>
                      <LocationMapText>지도</LocationMapText>
                      <LocationMapNextIcon
                      source={require('~/Assets/Images/ic_mapNext.png')}/>
                  </LocationMapHeaderBar>
                  </TouchableWithoutFeedback>
                  <MapView
                  style={{flex:1}}
                  provider={PROVIDER_GOOGLE}
                  initialRegion={initialMapRegion}>
                      {locationFeedList?.map((item, index) => {
                        console.log("locationFeedList item", item);
                       return (
                        <Marker
                        onPress={() => moveToFeedDetail(item.id)}
                        coordinate={{
                            latitude: item.address.geographLat,
                            longitude: item.address.geographLong,
                        }}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        image={require('~/Assets/Images/Map/ic_marker_small.png')}>
                        <MarkerThumbnailContainer>
                            <MarkerThumbnailImage
                            style={!item.mediaFiles[0] && {width: 20, height: 20, marginTop:7, marginLeft:7}}
                            source={
                            item.mediaFiles[0]
                            ? {uri:item.mediaFiles[0].url}
                            : require('~/Assets/Images/Map/ic_hash.png')
                            }/>
                        </MarkerThumbnailContainer>
                        </Marker>
                       )
                      })}
                  </MapView>
                  </LocationMapContainer>
      
                  )}
                  </ScrollView>
            )}
            {loadingCollection && (
                <LoadingContainer>
                    <ActivityIndicator/>
                </LoadingContainer>
            )}
            <ActionSheet
            ref={actionSheetRef}
            options={['취소', '컬렉션 삭제', '컬렉션 수정', '게시글 추가 및 편집']}
            cancelButtonIndex={0}
            destructiveButtonIndex={1}
            onPress={(index) => onPressActionSheet(index)}/>
        </Container>
    )
}

export default CollectionDetailScreen


