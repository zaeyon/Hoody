import React from 'react';
import Styled from 'styled-components/native';
import {FlatList} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import TileFeedItem from '~/Components/Presentational/TileFeedItem';
import LocationTagItem from '~/Components/Presentational/ExploreScreen/LocationTagItem';

const Container = Styled.View`
 background-color: #ffffff;
`;

const HeaderContainer = Styled.View`
 margin-top: 20px;
 padding-left: 16px;
 padding-right: 16px;
 padding-bottom: 12px;
`;

const HeaderTitleText = Styled.Text`
 font-weight: 600;
 font-size: 18px;
 color: #1D1E1F;
`; 

const FeedListContainer = Styled.View`
`;

const LocationTagListContainer = Styled.View`
`;

const TEST_FEED_DATA = [
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

const TEST_LOCATION_TAG = [
    {
        index: 1,
    },
    {
        index: 2,
    }
]

interface Props {
    navigation: any,
    placeName: string,
    hotPlaceData: object,
}

const PopularFeedListByLocation = ({navigation,hotPlaceData, placeName}: Props) => {

    console.log("PopularFeedListByLocation", hotPlaceData);

    const renderLocationPopularFeedItem = ({item, index}: any) => {
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

    const renderLocationTagItem = ({item,index}: any) => {
        return (
            <LocationTagItem
            tagItem={item}
            tagName={item.name}
            feedCount={item.reviewNum}
            navigation={navigation}
            />
        )
    }


    return (
        <Container>
            <HeaderContainer>
                <HeaderTitleText>{hotPlaceData.place + " 인기"}</HeaderTitleText>
            </HeaderContainer>
            <FeedListContainer>
                <FlatList
                contentContainerStyle={{paddingLeft: 16, paddingRight: 16}}
                horizontal={true}
                data={hotPlaceData.posts}
                renderItem={renderLocationPopularFeedItem}
                />
            </FeedListContainer>
            <LocationTagListContainer>
                <FlatList
                data={hotPlaceData.tags}
                renderItem={renderLocationTagItem}
                />
            </LocationTagListContainer>
        </Container>
    )
}

export default PopularFeedListByLocation;