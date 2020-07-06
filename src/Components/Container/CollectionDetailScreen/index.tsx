import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableWithoutFeedback, FlatList} from 'react-native'
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

import CollectionFeedItem from '~/Components/Presentational/CollectionDetailScreen/CollectionFeedItem';

const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #ffffff;
`;


const HeaderBar = Styled.View`
 width: ${wp('100%')};
 height: ${hp('6.5%')};
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 background-color:#ffffff;
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
`;

const CollectionTitleText = Styled.Text`
 font-weight: 500;
 font-size: 17px;
 color: #333333;
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
background-color: #ffffff;
`;

const LocationMapContainer = Styled.View`
width: ${wp('100%')};
height: ${wp('49%')};
background-color:#c3c3c3;
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

    const renderCollectionFeedItem = ({item, index}) => {
        return (
            <CollectionFeedItem/>
        )
    }

    return (
        <Container>
            <HeaderBar>
                <HeaderLeftContainer>
                    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                    <BackButtonContainer>
                    <BackButton
                    source={require('~/Assets/Images/ic_back.png')}/>
                    </BackButtonContainer>
                    </TouchableWithoutFeedback>
                </HeaderLeftContainer>
                <CollectionTitleText>컬렉션 이름</CollectionTitleText>
                <HeaderRightContainer>
                    <HeaderRightView/>
                </HeaderRightContainer>
            </HeaderBar>
            <LocationMapContainer>
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
            <CollectionFeedListContainer>
            <FeedListHeaderBar>
                <CollectionFeedCountText>게시글 33</CollectionFeedCountText>
                <CollectionEditText>편집</CollectionEditText>
            </FeedListHeaderBar>
            <CollectionFeedFlatListContainer>
            <FlatList
            data={TEST_COLLECTION_DATA.feed}
            renderItem={renderCollectionFeedItem}
            />
            </CollectionFeedFlatListContainer>
            </CollectionFeedListContainer>
        </Container>
    )
}

export default CollectionDetailScreen


