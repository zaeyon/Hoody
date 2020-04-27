import React from 'react';
import Styled from 'styled-components/native';
import {View, Text, FlatList, ScrollView, image, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const SearchResultContainer = Styled.View`
width: ${wp('100%')};
height: ${hp('100%')};
background-color:#ffffff;
padding-bottom: 45px;
`;

const SearchResultItemImage = Styled.Image`
width: ${wp('33%')};
height: ${wp('33%')};
`;

const SearchResultItemContainer = Styled.View`
width: ${wp('33%')};
height: ${wp('33%')};
margin-right: 2px;
margin-bottom: 2px;
`;

const ResultItemRatingContainer = Styled.View`
position: absolute;
bottom: 5px;
right: 5px;
width: ${wp('11%')};
height: ${wp('5%')};
padding: 6.5px;
justify-content: space-between;
align-items: center;
background-color: 'rgba(52, 52, 52, 0.6)'
flex-direction: row;
border-radius: 5px;
`;

const ResultItemStarImage = Styled.Image`
width: ${wp('4%')};
height: ${wp('4%')};
tint-color: #23E5D2;
`;

const ResultItemRatingText = Styled.Text`
font-size: 13px;
font-family: 'Arita4.0_SB';
color: #ffffff;
`;

interface Props {
  searchData_popular?: Array<string>;
  searchData_latest?: Array<string>;
}

const SearchResultTopNavigation = ({
  searchData_popular,
  searchData_latest,
}: Props) => {
  const PostTab = createMaterialTopTabNavigator();

  function PopularityPost() {
    return (
      <ScrollView bounces={false} overScrollMode="never">
        <SearchResultContainer>
          <FlatList
            bounces={false}
            data={searchData_popular}
            numColumns={3}
            renderItem={({item, index}) => (
              <SearchResultItemContainer>
                <SearchResultItemImage
                  source={{
                    uri: item,
                  }}
                />
                <ResultItemRatingContainer>
                  <ResultItemStarImage
                    source={require('~/Assets/Images/ic_star.png')}
                  />
                  <ResultItemRatingText>4</ResultItemRatingText>
                </ResultItemRatingContainer>
              </SearchResultItemContainer>
            )}
          />
        </SearchResultContainer>
      </ScrollView>
    );
  }

  function LatestPost() {
    return (
      <SearchResultContainer>
        <FlatList
          data={searchData_latest}
          numColumns={3}
          renderItem={({item, index}) => (
            <SearchResultItemContainer>
              <SearchResultItemImage
                source={{
                  uri: item,
                }}
              />

              <ResultItemRatingContainer>
                <ResultItemStarImage
                  source={require('~/Assets/Images/ic_star.png')}
                />
                <ResultItemRatingText>4</ResultItemRatingText>
              </ResultItemRatingContainer>
            </SearchResultItemContainer>
          )}
        />
      </SearchResultContainer>
    );
  }

  return (
    <PostTab.Navigator
      initialRouteName="인기 게시물"
      swipeEnabled={true}
      tabBarOptions={{
        indicatorStyle: {backgroundColor: '#ffffff'},
        style: {elevation: 0.5},
      }}>
      <PostTab.Screen name="인기 게시물" component={PopularityPost} />
      <PostTab.Screen name="최근 게시물" component={LatestPost} />
    </PostTab.Navigator>
  );
};

export default SearchResultTopNavigation;
