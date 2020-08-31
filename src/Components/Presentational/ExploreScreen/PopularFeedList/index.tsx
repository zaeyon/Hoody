import React, {useEffect} from 'react';
import {
    FlatList,
    TouchableWithoutFeedback
} from 'react-native';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import MainPopularFeedItem from '~/Components/Presentational/ExploreScreen/MainPopularFeedItem';
import SubPopularFeedItem from '~/Components/Presentational/ExploreScreen/SubPopularFeedItem';

const Container = Styled.View`
 background-color:#FFFFFF;
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

interface Props {
    navigation: any,
    postsByWroteTagListData: Array<object>,
}

const PopularFeedList = ({navigation, postsByWroteTagListData}: Props) => {

    console.log("사용자가 작성한 태그의 인기게시글", postsByWroteTagListData);

    const renderPopularFeedItem = ({item, index}: any) => {
        console.log("renderPopularFeedItem", item);
        if(index === 0) {
            return (
            <MainPopularFeedItemContainer>
            <MainPopularFeedItem
            navigation={navigation}
            feedId={item.id}
            mainImageUri={item.mediaFiles[0] ? item.mediaFiles[0].url : ""}
            mainTag={item.mainTags.name}
            address={item.address ? item.address.address : null}
            rating={item.starRate}
            />
            </MainPopularFeedItemContainer>
            )
        } else {
            return (
            <SubPopularFeedItemContainer>
            <SubPopularFeedItem
            navigation={navigation}
            feedId={item.id}
            mainImageUri={item.mediaFiles[0] ? item.mediaFiles[0].url : ""}
            mainTag={item.mainTags.name}
            address={item.address ? item.address.address : null}
            rating={item.starRate}
            expense={item.expense}
            />
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
                data={postsByWroteTagListData}
                renderItem={renderPopularFeedItem}/>
            </PopularFeedListContainer>
        </Container>
    )
}

export default PopularFeedList;