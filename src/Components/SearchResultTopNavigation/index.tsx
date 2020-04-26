import React from 'react';
import Styled from 'styled-components/native';
import {View, Text, FlatList} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const SearchResultContainer = Styled.View`
width: ${wp('100%')};
height: ${hp('100%')};
background-color:#ffffff;
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
`;

interface Props {
  searchData_popular: Array<string>;
  searchData_latest: Array<string>;
}

const SearchResultTopNavigation = ({
  searchData_popular,
  searchData_latest,
}: Props) => {
  const PostTab = createMaterialTopTabNavigator();

  function PopularityPost() {
    return (
      <SearchResultContainer>
        <FlatList
          data={searchData_popular}
          numColumns={3}
          renderItem={({item, index}) => (
            <SearchResultItemContainer>
              <SearchResultItemImage
                source={{
                  uri: item,
                }}
              />
            </SearchResultItemContainer>
          )}
        />
      </SearchResultContainer>
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
