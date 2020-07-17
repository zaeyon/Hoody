import React from 'react';
import {
    FlatList
} from 'react-native';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import MainPopularFeedItem from '~/Components/Presentational/ExploreScreen/MainPopularFeedItem';
import SubPopularFeedItem from '~/Components/Presentational/ExploreScreen/SubPopularFeedItem';

const Container = Styled.View`
 flex: 1;
`;

const HeaderContainer = Styled.View`
padding-top: 20px;
padding-left: 16px;
padding-bottom: 12px;
padding-right: 12px;
`;

const HeaderTitleText = Styled.Text`
font-weight: 600;
font-size: 18px;
color: #1D1E1F;
`;

const PopularFeedListContainer = Styled.View`
 flex: 1;
 align-items: center;
 background-color: #ffffff;
`;

const MainPopularFeedItemContainer = Styled.View`
 margin-bottom: 8px;
`;

const SubPopularFeedItemContainer = Styled.View`
`;

const TEST_POPULAR_FEED_DATA = [
    {
        index: 1,
    },
    {
        index: 2,
    },
    {
        index: 3,
    },
    {
        index: 4,
    }
]

const PopularFeedList = ({}) => {

    const renderPopularFeedItem = ({item, index}: any) => {
        if(index === 0) {
            return (
            <MainPopularFeedItemContainer>
            <MainPopularFeedItem/>
            </MainPopularFeedItemContainer>
            )
        } else {
            return (
            <SubPopularFeedItemContainer>
            <SubPopularFeedItem/>
            </SubPopularFeedItemContainer>
            )
        }
    }

    return (
        <Container>
            <HeaderContainer>
                <HeaderTitleText>인기 게시글</HeaderTitleText>
            </HeaderContainer>
            <PopularFeedListContainer>
                <FlatList
                contentContainerStyle={{alignItems:'center'}}
                data={TEST_POPULAR_FEED_DATA}
                renderItem={renderPopularFeedItem}/>
            </PopularFeedListContainer>
        </Container>
    )
}

export default PopularFeedList;