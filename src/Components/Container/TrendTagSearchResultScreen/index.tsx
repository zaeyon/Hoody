import React, {useRef, useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, Animated, ScrollView, FlatList, ActivityIndicator} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {isIphoneX} from 'react-native-iphone-x-helper';

import MemoizedFeedItem from '~/Components/Presentational/FeedListScreen/MemoizedFeedItem';

import GETSearchResult from '~/Route/Search/GETSearchResult';

const Container = Styled.View`
flex: 1;
background-color: #FFFFFF;
`;

const HeaderBar = Styled.SafeAreaView`
margin-top:16px;
 width: ${wp('100%')};
 height: ${wp('13.8%')};
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
 tint-color: #1D1E1F;
 `;

 const HeaderTitleContainer = Styled.View`
 padding-top: 7px;
 `;
const HeaderTitleText = Styled.Text`
font-weight: 600;
font-size: 18px;
color: #1D1E1F;
`;

const HeaderRightContainer = Styled.View`
padding: 10px 15px 10px 15px;
 align-items: center;
 justify-content: center;
 flex-direction: row;
`;

const HeaderEmptyContainer = Styled.View`
 width: ${wp('6.4%')};
 height: ${wp('6.4%')};
`;

const TrendTagCoverImage = Styled.Image`
 flex: 1;
`;

const TrendTagInfoContainer = Styled.View`
flex-direction: row;
width: ${wp('100%')};
height: ${wp('17.86%')};
background-color: #FAFAFA;
justify-content: space-around;
align-items: center;
border-width: 0.5px;
border-color: #F1F1F1;
`;

const TrendTagInfoItemContainer = Styled.View`
flex-direction: column;
align-items: center;

`;

const TrendTagInfoLabelText = Styled.Text`
font-size: 14px;
color: #8E8E8E;
`;

const TrendTagInfoCountContainer = Styled.View`
margin-top: 3px;
flex-direction: row;
align-items: center;
`;

const TrendTagRatingIcon = Styled.Image`
width: ${wp('3.2%')};
height: ${wp('3.2%')};
`;

const TrendTagInfoCountText = Styled.Text`
margin-left: 1.5px;
font-weight: 600;
font-size: 16px;
color: #333333;
`;

const FeedListContainer = Styled.View`
 width: ${wp('100%')};

 padding-bottom: ${isIphoneX() ? hp("5.5%") : hp("8%")}
 background-color: #ffffff;
`;

const LoadingContainer = Styled.View`
 width: ${wp('100%')};
 height: ${hp('100%')};
 background-color: #ffffff;
 position: absolute;
 align-items: center;
 justify-content: center;
`;

interface Props {
    navigation: any,
    route: any,
}

var feedOffset = 0;
var feedLimit = 10;

const TrendTagSearchResultScreen = ({navigation, route}: Props) => {
    const [feedListData, setFeedListData] = useState<Array<object>>([]);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [tagQuery, setTagQuery] = useState<any>();
    const [noMoreData, setNoMoreData] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    console.log("TrendTagSearchResultScreen route.params.trendTag", route.params.trendTag);

    const H_MAX_HEIGHT = isIphoneX() ? wp('134%') : wp('110%');
    const H_MIN_HEIGHT = isIphoneX() ? (wp('32%') + getStatusBarHeight()) : (wp('32%') + getStatusBarHeight());
    const H_SCROLL_DISTANCE = H_MAX_HEIGHT - H_MIN_HEIGHT;

    const scrollOffsetY = useRef(new Animated.Value(0)).current;

    const headerScrollHeight = scrollOffsetY.interpolate({
        inputRange: [0, H_SCROLL_DISTANCE],
        outputRange: [H_MAX_HEIGHT, H_MIN_HEIGHT],
        extrapolate: "clamp"
    })

    useEffect(() => {
        if(route.params?.trendTag) {
            feedOffset = 0;
            var query = "tag:" + route.params.trendTag[0].item.name
            setTagQuery(query);
            keywordSearchFeedList(query, "createdAt", feedOffset, feedLimit);
        }

    }, [route.params?.trendTag])

    const keywordSearchFeedList = (query: string, order: string, feedOffset: number, feedLimit: number) => {
        GETSearchResult("post", query, order, feedOffset, feedLimit)
              .then(function(response) {
              console.log("keywordSearchFeedList response", response);
              setFeedListData(response.data);
              setRefreshing(false);
              setLoading(false);
              })
              .catch(function(error) {
              console.log("GETSearchResult error", error);
        })
      }

    const onRefreshFeedList = () => {
        setRefreshing(true);
        feedOffset = 0;
        keywordSearchFeedList(tagQuery, "createdAt", feedOffset, feedLimit);
    }

    const loadMoreFeedData = () => {
        console.log("피드 더 볼러오기");
        if(noMoreData) {
            return
        } else {
            feedOffset = feedOffset + 10;
            GETSearchResult("post", tagQuery, "createdAt", feedOffset, feedLimit)
            .then(function(response) {
            console.log("keywordSearchFeedList response", response);
            if(response.data.length === 0) {
                setNoMoreData(true);
                setRefreshing(false);
                return
            } else {
                setFeedListData(feedListData.concat(response.data));
                setRefreshing(false);
            }
            })
            .catch(function(error) {
            console.log("GETSearchResult error", error);
            })
        }
    }
        
    

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
		const paddingToBottom = 20;
		return layoutMeasurement.height + contentOffset.y >=
			contentSize.height - paddingToBottom;
    }
    

    const onScrollBottom = (e: any) => {
		if(isCloseToBottom(e.nativeEvent)) {
            console.log("scrollBottom");
            loadMoreFeedData();
		}
	}

      const renderFeedItem = ({item, index}: any) => {
        console.log("트랜드태그 renderFeedItem item", item);
        return (
          <MemoizedFeedItem
            id={item.id}
            profile_image={item.user.thumbnailImg}
            nickname={item.user.nickname}
            createdAt={item.createdAt}
            rating={item.starRate}
            main_tag={item.mainTags.name}
            sub_tag1={item.subTagOnes?item.subTagOnes.name:null}
            sub_tag2={item.subTagTwos?item.subTagTwos.name:null}
            like_count={item.likes}
            comment_count={item.commentsCount}
            reply_count={item.replysCount}
            scrap_count={0}
            mediaFiles={item.mediaFiles}
            image_count={item.mediaFiles.length}
            location={item.address?item.address.address:null}
            expense={item.expense?item.expense:null}
            desArray={item.descriptions}
            navigation={navigation}
            productArray={item.Products}
            userLike={item.Likers}
            userScrap={item.Scraps}
            />
       )
    }

    return (
        <Container>
            <Animated.View
            style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: headerScrollHeight,
            width: "100%",
            overflow: "hidden",
            zIndex: 10,
            }}>
            <TrendTagCoverImage
            source={{uri: "https://file.moyiza.kr/data/moyiza/document_files/images/2017/04/26/33cff99aed5d97fd56ddbe933cbfd1b7.jpg"}}/>
            <HeaderBar>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                <HeaderLeftContainer>
                    <BackButtonContainer>
                        <BackButton
                        source={require('~/Assets/Images/HeaderBar/ic_back.png')}/>
                    </BackButtonContainer>
                </HeaderLeftContainer>
                </TouchableWithoutFeedback>
                <HeaderTitleContainer>
                <HeaderTitleText>{route.params.trendTag[0].item.name}</HeaderTitleText>
                </HeaderTitleContainer>
                <HeaderRightContainer>
               
                    <HeaderEmptyContainer></HeaderEmptyContainer>
                </HeaderRightContainer>
            </HeaderBar>
            <TrendTagInfoContainer>
                        <TrendTagInfoItemContainer>
                            <TrendTagInfoLabelText>평균 별점</TrendTagInfoLabelText>
                            <TrendTagInfoCountContainer>
                            <TrendTagRatingIcon
                            source={require('~/Assets/Images/ic_newStar.png')}/>
                            <TrendTagInfoCountText>{route.params.trendTag[0].item.starRate + "점"}</TrendTagInfoCountText>
                            </TrendTagInfoCountContainer>
                        </TrendTagInfoItemContainer>
                        <TrendTagInfoItemContainer>
                            <TrendTagInfoLabelText>평균 가격</TrendTagInfoLabelText>
                            <TrendTagInfoCountContainer>
                            <TrendTagInfoCountText>33,000원</TrendTagInfoCountText>
                            </TrendTagInfoCountContainer>
                        </TrendTagInfoItemContainer>
                        <TrendTagInfoItemContainer>
                            <TrendTagInfoLabelText>게시글 수</TrendTagInfoLabelText>
                            <TrendTagInfoCountContainer>
                            <TrendTagInfoCountText>{route.params.trendTag[0].item.reviewNum + "개"}</TrendTagInfoCountText>
                            </TrendTagInfoCountContainer>
                        </TrendTagInfoItemContainer>

                    </TrendTagInfoContainer>
            </Animated.View>
            <ScrollView
            onScroll={Animated.event([
                {nativeEvent: {contentOffset: {y: scrollOffsetY}}}])}
            scrollEventThrottle={5}
            showsVerticalScrollIndicator={false}
            onMomentumScrollEnd={onScrollBottom}>
                <FeedListContainer style={{paddingTop:H_MAX_HEIGHT}}>
                    <FlatList
                    refreshing={refreshing}
                    onRefresh={onRefreshFeedList}
                    data={feedListData}
                    renderItem={renderFeedItem}/>
                </FeedListContainer>
            </ScrollView>
            {loading && (
                <LoadingContainer>
                    <ActivityIndicator/>
                </LoadingContainer>

            )}
        </Container>

    )
}

export default TrendTagSearchResultScreen;