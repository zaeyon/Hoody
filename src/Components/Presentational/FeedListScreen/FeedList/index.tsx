import React, {useEffect, useState, useMemo} from 'react';
import {TouchableWithoutFeedback, FlatList, View, Keyboard, ScrollView, RefreshControl} from 'react-native';
import Styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import allActions from '~/action';


import MomoizedFeedItem from '~/Components/Presentational/FeedListScreen/MomoizedFeedItem';


const Container = Styled.SafeAreaView`
 background-color: #ffffff;
 align-items: center;
`;

const NoFeedListContainer = Styled.View`
 width: ${wp('100%')};
 height: ${hp('100%')};
 padding-bottom: 200px;
 background-color: #ffffff;
 justify-content: center;
 align-items: center;
`;

const FeedListContainer = Styled.View`
 width: ${wp('100%')}px;
 padding-bottom: 135px;
 background-color: #ffffff;
`;


const NoFeedText = Styled.Text`
 font-size: 17px;
 color: #c3c3c3;
`;

const baseUrl = 'http://hoody-api-test-server-alb-349396782.ap-northeast-2.elb.amazonaws.com
'; 

interface Props {
    navigation: any,
    route: any,
    feedListData: Array<object>,
    refreshing: boolean,
    onRefreshFeedListData: () => void,
    loadMoreFeedListData: () => void,
    loading: boolean,
}

const FeedList = ({navigation, route, feedListData, refreshing, onRefreshFeedListData, loadMoreFeedListData, loading}: Props) => {

  const renderFeedItem = ({item, index}: any) => {
    return (
      <MomoizedFeedItem
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
      {feedListData[0] && (
            <FeedListContainer>
                <FlatList
                refreshing={refreshing}
                onRefresh={onRefreshFeedListData}
                showsVerticalScrollIndicator={false}
                data={feedListData}
                renderItem={renderFeedItem}
                onEndReached={(loading === false) ? loadMoreFeedListData : null}
                onEndReachedThreshold={1}
                />
            </FeedListContainer>
        )}
        {!feedListData[0] && (
        <NoFeedListContainer>
          <NoFeedText>등록된 게시글이 없습니다.</NoFeedText>
        </NoFeedListContainer>
        )}
        </Container>
    )
}

export default FeedList;