import React, {useState, useEffect, useRef, createRef} from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableWithoutFeedback, FlatList, ScrollView, Animated, Image} from 'react-native'
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import ActionSheet from 'react-native-actionsheet';

// Local Component
import CollectionTileFeedItem from '~/Components/Presentational/CollectionDetailScreen/CollectionTileFeedItem';

// Route
import GETCollectionDetailInfo from '~/Route/Collection/GETCollectionDetailInfo';

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
 padding-bottom: 16px;
 border-bottom-width: 0.6px;
 border-color: #ececee;
`;

const CollectionIconContainer = Styled.View`
 flex-direction: row;
`;

const CollectionLikeIcon = Styled.Image`
 width: ${wp('6.4%')};
 height: ${wp('6.4%')};
`;

const CollectionScrapIcon = Styled.Image`
margin-left: 12px;
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

    const H_MAX_HEIGHT = wp('100%')
    const H_MIN_HEIGHT = wp('25.6%');
    const H_SCROLL_DISTANCE = H_MAX_HEIGHT - H_MIN_HEIGHT;

    const scrollOffsetY = useRef(new Animated.Value(0)).current;

    const headerScrollHeight = scrollOffsetY.interpolate({
        inputRange: [0, H_SCROLL_DISTANCE],
        outputRange: [H_MAX_HEIGHT, H_MIN_HEIGHT],
        extrapolate: "clamp"
    })

    useEffect(() => {
        if(route.params?.collectionId) {
           GETCollectionDetailInfo(route.params.collectionId)
           .then(function(response) {
               console.log("GETCollectionDetailInfo response", response)
               setCollectionDetailInfo(response.collection);
           })
           .catch(function(error) {
               console.log("GETCollectionDetailInfo error", error)
           })
        }

    }, [route.params?.collectionId])

    

    const renderCollectionFeedItem = ({item, index}) => {
        return (
            <CollectionTileFeedItem
            mainImage={item.mediaFiles[0] ? item.mediaFiles[0].uri : null}
            mainTag={item.mainTags.name}
            rating={item.starRate}
            expense={item.expense}
            location={item.address}
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

    const onPressActionSheet = (index) => {
        console.log("actionsheet press index", index);
        if(index === 2) {
            navigation.navigate("CollectionModifyScreen");
        } else if(index === 3) {
            navigation.navigate("CollectionFeedEditScreen")
        }
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
            source={{uri:'https://d2uh4olaxaj5eq.cloudfront.net/fit-in/1080x0/b10f0e26-105a-49b9-9593-b70b69c2e611.jpg'}}/>
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
            showsVerticalScrollIndicator={false}
            >
            <CollectionInfoContainer style={{paddingTop:H_MAX_HEIGHT-25}}>
            <CollectionInfoHeader>
            <CollectionTitleText>{collectionDetailInfo.name}</CollectionTitleText>
            <CollectionIconContainer>
            <CollectionLikeIcon
            source={require('~/Assets/Images/ic_heart_outline.png')}/>
            <CollectionScrapIcon
            source={require('~/Assets/Images/ic_scrap_outline.png')}/>
            </CollectionIconContainer>
            </CollectionInfoHeader>
            <WriterProfileContainer>
                <WriterInfoContainer>
                <ProfileImage
                source={{uri:route.params?.profileImage}}
                />
                <ProfileNicknameText>{route.params?.profileNickname}</ProfileNicknameText>
                </WriterInfoContainer>
                <FollowText>팔로우</FollowText>
            </WriterProfileContainer>
            <CollectionDescripText>{collectionDetailInfo.description? collectionDetailInfo.description: null}
            </CollectionDescripText>
            <CollectionInfoFooter>
            <CollectionSocialContainer>
            <CollectionFeedLabelText>게시글</CollectionFeedLabelText>
            <CollectionInfoCountText>{collectionDetailInfo.Posts ? collectionDetailInfo.Posts.length : ""}</CollectionInfoCountText>
            <CollectionLikeLabelText>좋아요</CollectionLikeLabelText>
            <CollectionInfoCountText>{collectionDetailInfo.Like}</CollectionInfoCountText>
            </CollectionSocialContainer>
            </CollectionInfoFooter>
            </CollectionInfoContainer>
            <FlatList
            columnWrapperStyle={{justifyContent:'space-between', paddingLeft:16, paddingRight:15, paddingTop:11, paddingBottom:0}}
            numColumns={2}
            data={collectionDetailInfo.Posts}
            renderItem={renderCollectionFeedItem}
            />
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


