import React from 'react';
import {
    TouchableWithoutFeedback,
     FlatList,
     ScrollView,
    } from 'react-native';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import RecommendUser from '~/Components/Presentational/ExploreScreen/RecommendUser';
import RecommendTagBanner from '~/Components/Presentational/ExploreScreen/RecommendTagBanner';
import PopularTagByAgeGroup from '~/Components/Presentational/ExploreScreen/PopularTagByAgeGroup';
import PopularFeedList from '~/Components/Presentational/ExploreScreen/PopularFeedList';
import RecommendCollectionList from '~/Components/Presentational/ExploreScreen/RecommendCollectionList'; 
import PopularFeedListByLocation from '~/Components/Presentational/ExploreScreen/PopularFeedListByLocation';


const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #ffffff;
`;

const BodyContainer = Styled.ScrollView`
 background-color: #ffffff;
`;

const HeaderBar = Styled.View`
 width: ${wp('100%')};
 height: ${hp('6.5%')};
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 background-color:#ffffff;
 padding-bottom: 7px;
`;

const SearchInputContainer = Styled.View`
align-items: center;
width: ${wp('81%')};
height: 36px;
border-radius: 40px;
background-color: #F3F3F3;
flex-direction: row;
`;

const SearchInput = Styled.TextInput`
 width: ${wp('79%')};
 height: 36px;
 padding-left: ${wp('8%')};
 font-size: 16px;
`;

const SearchInputPlacehoderText = Styled.Text`
font-size: 16px;
color: #c6c7cc;
margin-left: ${wp('9%')};
`;
 

const SearchIcon = Styled.Image`
position: absolute;
left: 13px;
 width: ${wp('4%')};
 height: ${wp('4%')};
 tint-color: #C6C7CC
`;

const HeaderLeftContainer = Styled.View`
padding: 10px 15px 10px 15px;
align-items: center;
justify-content: center;
`;

const HeaderTitleText = Styled.Text`
 font-weight: 600;
 font-size: 24px;
 color: #333333;
`;

const HeaderRightContainer = Styled.View`
 flex-direction: row;
`;

const HeaderSearchContainer = Styled.View`
padding: 10px 8px 10px 15px
 align-items: center;
 justify-content: center;
`;

const HeaderSearchIcon = Styled.Image`
width: ${wp('6.4%')};
height: ${wp('6.4%')};
tint-color: #000000;
`;

const HeaderLocationContainer = Styled.View`
padding: 10px 15px 10px 8px;
align-items: center;
justify-content: center;
`;

const HeaderLocationIcon = Styled.Image`
 width: ${wp('6.4%')};
 height: ${wp('6.4%')};
 tint-color: #000000;
`;

const RecommendUserContainer = Styled.View`
`;

const RecommendTagBannerContainer = Styled.View`
 margin-top: 10px;
`;

const PopularTagByAgeGroupContainer = Styled.View`
margin-top: 10px;
`;

const PopularFeedListContainer = Styled.View`
`;

const RecommendCollectionContainer = Styled.View`
 margin-top: 10px;
`;

const PopularFeedListByLocationContainer = Styled.View`
 margin-top: 10px;
 padding-bottom: 40px;
`;

interface Props {
    navigation: any,
    route: any,
}

const ExploreScreen = ({navigation, route}: Props) => {

    return (
        <Container>
            <HeaderBar>
            <HeaderRightContainer>
                <HeaderSearchContainer>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate("SearchScreen")}>
                    <SearchInputContainer>
                        <SearchInputPlacehoderText>검색</SearchInputPlacehoderText>
                        <SearchIcon
                        source={require('~/Assets/Images/ic_search_explore.png')}/>
                    </SearchInputContainer>
                    </TouchableWithoutFeedback>
                </HeaderSearchContainer>
                <HeaderLocationContainer>
                    <HeaderLocationIcon
                    source={require('~/Assets/Images/ic_header_location.png')}/>
                </HeaderLocationContainer>
            </HeaderRightContainer>
            </HeaderBar>
            <BodyContainer
            showsVerticalScrollIndicator={false}
            >
            <RecommendUserContainer>
            <RecommendUser
            navigation={navigation}
            />
            </RecommendUserContainer>
            <RecommendTagBannerContainer>
            <RecommendTagBanner/>
            </RecommendTagBannerContainer>
            <PopularTagByAgeGroupContainer>
                <PopularTagByAgeGroup
                navigation={navigation}
                />
            </PopularTagByAgeGroupContainer>
            <PopularFeedListContainer>
                <PopularFeedList
                navigation={navigation}
                />
            </PopularFeedListContainer>
            <RecommendCollectionContainer>
                <RecommendCollectionList
                navigation={navigation}
                />
            </RecommendCollectionContainer>
            <PopularFeedListByLocationContainer>
                <PopularFeedListByLocation
                navigation={navigation}
                />
            </PopularFeedListByLocationContainer>
            </BodyContainer>
        </Container>
    )
}

export default ExploreScreen;





