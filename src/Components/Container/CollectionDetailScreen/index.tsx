import React, {useState, useEffect, useRef, createRef} from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableWithoutFeedback, FlatList, ScrollView, Animated, Image, Alert} from 'react-native'
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import ActionSheet from 'react-native-actionsheet';
import {useSelector ,useDispatch} from 'react-redux';
import allActions from '~/action';

// Local Component
import CollectionTileFeedItem from '~/Components/Presentational/CollectionDetailScreen/CollectionTileFeedItem';

// Route
import GETCollectionDetailInfo from '~/Route/Collection/GETCollectionDetailInfo';
import POSTScrapCollection from '~/Route/Collection/Scrap/POSTScrapCollection';
import DELETEScrapCollection from '~/Route/Collection/Scrap/DELETEScrapCollection'
import POSTLikeCollection from '~/Route/Collection/Like/POSTLikeCollection';
import DELETELikeCollection from '~/Route/Collection/Like/DELETELikeCollection';
import DELETECollection from '~/Route/Collection/DELETECollection';
import {POSTFollowUser, DELETEUnfollowUser} from '~/Route/User/Follow';

const actionSheetRef = createRef();
const Container = Styled.SafeAreaView`
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
padding: 10px 15px 10px 15px;
 align-items: center;
 justify-content: center;
`;

const BackButton = Styled.Image`
 width: ${wp('8%')};
 height: ${wp('8%')};
 tint-color: #ffffff;
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
height: ${wp('80%')};
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
 padding: 0px 16px 11px 16px;
`;

const CollectionInfoHeader = Styled.View`
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
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
 width: ${wp('9%')};
 height: ${wp('9%')};
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
    const H_MAX_HEIGHT = wp('100%')
    const H_MIN_HEIGHT = wp('25.6%');
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

        if(route.params?.collectionEdit) {
            
            route.params.collectionEdit = false;
        }

        if(route.params?.collectionId) {
           GETCollectionDetailInfo(route.params.collectionId)
           .then(function(response) {
               console.log("GETCollectionDetailInfo response", response)
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

    }, [route.params?.collectionId, route.params?.collectionEdit])

    const renderCollectionFeedItem = ({item, index}: any) => {
        return (
            <CollectionTileFeedItem
            navigation={navigation}
            mainImage={item.mediaFiles[0] ? item.mediaFiles[0].uri : null}
            mainTag={item.mainTags.name}
            rating={item.starRate}
            expense={item.expense}
            location={item.address ? item.address.address : null}
            feedId={item.id}
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

                    /*
                  var deletedFeedIndex:number;
                  console.log("currentUser.userAllFeeds", currentUser.userAllFeeds)
                  if(currentUser.userAllFeeds) {
                    currentUser.userAllFeeds.forEach((feed: object, index: number) => {
                       if(feed.id === postId) {
                         deletedFeedIndex = index;
                       }
                    })
                  }
                  DELETEPost(postId)
                  .then(function(response) {
                    console.log("피드 삭제 성공 response", response);
                    if(currentUser.userAllFeeds) {
                      console.log("피드삭제성공deletedFeedIndex", deletedFeedIndex);
                      var deletedFeeds = currentUser.userAllFeeds;
                      deletedFeeds.splice(deletedFeedIndex, 1);
                      dispatch(allActions.userActions.setUserAllFeeds(deletedFeeds));
                      navigation.goBack();
                    }
                  })
                  .catch(function(error) {
                    console.log("피드 삭제 error", error);
                  })
                  */
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

    const onPressActionSheet = (index: number) => {
        console.log("actionsheet press index", index);
        if(index === 1) {
            deleteCollection()
        } if(index === 2) {
            navigation.navigate("CollectionModifyScreen", {
            coverImage: collectionDetailInfo.coverImg,
            name: collectionDetailInfo.name,
            description: collectionDetailInfo.description,
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

    return (
        <Container>
           <Animated.View
            onLayout={(event) => onChangeHeaderHeight(event)}
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
            source={{uri:collectionDetailInfo.coverImg ? collectionDetailInfo.coverImg : ""}}/>
            <HeaderBar style={{marginTop: getStatusBarHeight()}}>
                <HeaderLeftContainer>
                    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                    <BackButtonContainer>
                    <BackButton
                    source={require('~/Assets/Images/ic_back.png')}/>
                    </BackButtonContainer>
                    </TouchableWithoutFeedback>
                </HeaderLeftContainer>
                {headerBlur && (
                <HeaderCollectionTitleText>{collectionDetailInfo.name}</HeaderCollectionTitleText>
                )}
                <TouchableWithoutFeedback onPress={() => showActionSheet()}>
                <HeaderRightContainer>
                    <CollectionMoreIcon
                    source={require('~/Assets/Images/ic_more.png')}/>
                </HeaderRightContainer>
                </TouchableWithoutFeedback>
            </HeaderBar>
            
            </Animated.View>
            <ScrollView
            onScroll={Animated.event([
                {nativeEvent: { contentOffset: {y: scrollOffsetY}}}])}
            scrollEventThrottle={5}
            showsVerticalScrollIndicator={false}>
            <CollectionInfoContainer style={{paddingTop:H_MAX_HEIGHT-25}}>
            <CollectionInfoHeader>
            <CollectionTitleText>{collectionDetailInfo.name}</CollectionTitleText>
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
                source={{uri:collectionDetailInfo.user?.profileImg}}/>
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
            columnWrapperStyle={{justifyContent:'space-between', paddingLeft:16, paddingRight:15, paddingTop:11, paddingBottom:0}}
            numColumns={2}
            data={collectionDetailInfo.Posts}
            renderItem={renderCollectionFeedItem}
            />
            {collectionDetailInfo?.includeLocation && (
            <LocationMapContainer>
            <LocationMapHeaderBar>
                <LocationMapText>지도</LocationMapText>
                <LocationMapNextIcon
                source={require('~/Assets/Images/ic_mapNext.png')}/>
            </LocationMapHeaderBar>
            <MapView
            style={{flex:1}}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
                latitude: 32,
                longitude: 121,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}>
                <Marker
                coordinate={LatLng}
                image={require('~/Assets/Images/ic_circleMarker.png')}>
                <MarkerFeedImage
                source={{uri:'https://d2uh4olaxaj5eq.cloudfront.net/fit-in/1080x0/3d655d9b-3ca8-4c4b-bbaf-7519bdc09f42.jpg'}}/>
                </Marker>
            </MapView>
            </LocationMapContainer>

            )}
            </ScrollView>
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


