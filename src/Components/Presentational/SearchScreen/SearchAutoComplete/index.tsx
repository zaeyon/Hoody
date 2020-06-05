import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {
  FlatList,
  TouchableWithoutFeeback,
  ScrollView,
  Text,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Container = Styled.View`
 flex:1;
 background-color: #ffffff;
`;

const AutoCompleteContainer = Styled.View`
 width: ${wp('100%')};
 height: ${hp('101%')};
 background-color: #ffffff;
 padding-bottom: 47px;
`;

const AutoCompleteItemContainer = Styled.View`
 width: ${wp('100%')};
 height: ${hp('8%')};
 flex-direction: row;
 border-bottom-width: 0.3px;
 border-color: #cccccc;
 justify-content: space-between;
 align-items: center;
 padding: 15px;
`;

const ItemLeftContainer = Styled.View`
flex-direction: row;
`;

const ItemRightContainer = Styled.View`
flex-direction:row;
`;

const TagName = Styled.Text`
color: #707070;
font-size: 16px;
`;

const TagRating = Styled.Text`
color: #707070;
font-size: 13px;
`;

const TagCount = Styled.Text`
margin-left: 0px;
color: #707070;
font-size: 13px;
`;

const UserName = Styled.Text`
color: #707070;
font-size: 16px;
`;

const UserFollwer = Styled.Text`
color: #707070;
font-size: 13px;
`;

const UserScore = Styled.Text`
color: #707070;
font-size: 13px;
`;

const LocationName = Styled.Text`
color: #707070;
font-size: 16px;
`;

const LocationRating = Styled.Text`
color: #707070;
font-size: 13px;
`;

const LocationCount = Styled.Text`
color: #707070;
font-size: 13px;
`;

const SearchAutoComplete = () => {
  const AutoCompleteTab = createMaterialTopTabNavigator();
  const [popularityData, setPopularityData] = useState([
    {
      type: 'tag',
      tagName: '인기 태그1',
      tagRating: 5,
      tagCount: 23,
    },
    {
      type: 'user',
      userName: '인기 사용자1',
      userFollwer: 103,
      userScore: 80,
    },
  ]);
  const [tagData, setTagData] = useState([
    {
      type: 'tag',
      tagName: '태그1',
      tagRating: 5,
      tagCount: 23,
    },
    {
      type: 'tag',
      tagName: '태그2',
      tagRating: 3,
      tagCount: 11,
    },
  ]);
  const [locationData, setLocationData] = useState([
    {
      type: 'location',
      locationName: '을지로 홍원빌딩',
      locationRating: 5,
      locationCount: 223,
    },
  ]);
  const [userData, setUserData] = useState([
    {
      type: 'user',
      userName: '사용자1',
      userFollwer: 103,
      userScore: 80,
    },
  ]);

  function Popularity() {
    return (
      <ScrollView
        bounces={false}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}>
        <AutoCompleteContainer>
          <FlatList
            bounces={false}
            data={popularityData}
            renderItem={({item, index}) => {
              if (item.type === 'tag') {
                return (
                  <AutoCompleteItemContainer>
                    <ItemLeftContainer>
                      <TagName>#{item.tagName}</TagName>
                    </ItemLeftContainer>
                    <ItemRightContainer>
                      <TagRating>평점 {item.tagRating}</TagRating>
                      <Text style={{color: '#707070'}}> | </Text>
                      <TagCount>후기 수 {item.tagCount}개</TagCount>
                    </ItemRightContainer>
                  </AutoCompleteItemContainer>
                );
              } else if (item.type === 'user') {
                return (
                  <AutoCompleteItemContainer>
                    <ItemLeftContainer>
                      <UserName>{item.userName}</UserName>
                    </ItemLeftContainer>
                    <ItemRightContainer>
                      <UserFollwer>팔로워 수 {item.userFollwer}명</UserFollwer>
                      <Text style={{color: '#707070'}}> | </Text>
                      <UserScore>점수 {item.userScore}</UserScore>
                    </ItemRightContainer>
                  </AutoCompleteItemContainer>
                );
              }
            }}
          />
        </AutoCompleteContainer>
      </ScrollView>
    );
  }

  function Tag() {
    return (
      <ScrollView
        bounces={false}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}>
        <AutoCompleteContainer>
          <FlatList
            bounces={false}
            data={tagData}
            renderItem={({item, index}) => (
              <AutoCompleteItemContainer>
                <ItemLeftContainer>
                  <TagName>#{item.tagName}</TagName>
                </ItemLeftContainer>
                <ItemRightContainer>
                  <TagRating>평점 {item.tagRating}</TagRating>
                  <Text style={{color: '#707070'}}> | </Text>
                  <TagCount>후기 수 {item.tagCount}개</TagCount>
                </ItemRightContainer>
              </AutoCompleteItemContainer>
            )}
          />
        </AutoCompleteContainer>
      </ScrollView>
    );
  }

  function Location() {
    return (
      <ScrollView
        bounces={false}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}>
        <AutoCompleteContainer>
          <FlatList
            bounces={false}
            data={locationData}
            renderItem={({item, index}) => (
              <AutoCompleteItemContainer>
                <ItemLeftContainer>
                  <LocationName>{item.locationName}</LocationName>
                </ItemLeftContainer>
                <ItemRightContainer>
                  <LocationRating>평점 {item.locationRating}</LocationRating>
                  <Text> | </Text>
                  <LocationCount>후기 수 {item.locationCount}</LocationCount>
                </ItemRightContainer>
              </AutoCompleteItemContainer>
            )}
          />
        </AutoCompleteContainer>
      </ScrollView>
    );
  }

  function User() {
    return (
      <ScrollView
        bounces={false}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}>
        <AutoCompleteContainer>
          <FlatList
            bounces={false}
            data={userData}
            renderItem={({item, index}) => (
              <AutoCompleteItemContainer>
                <ItemLeftContainer>
                  <UserName>{item.userName}</UserName>
                </ItemLeftContainer>
                <ItemRightContainer>
                  <UserFollwer>팔로워 수 {item.userFollwer}명</UserFollwer>
                  <Text style={{color: '#707070'}}> | </Text>
                  <UserScore>점수 {item.userScore}</UserScore>
                </ItemRightContainer>
              </AutoCompleteItemContainer>
            )}
          />
        </AutoCompleteContainer>
      </ScrollView>
    );
  }

  return (
    <Container>
      <AutoCompleteTab.Navigator
        initialRouteName="인기"
        swipeEnabled={true}
        tabBarOptions={{
          indicatorStyle: {backgroundColor: '#ffffff'},
          style: {elevation: 0.5},
          labelStyle: {fontSize: 13, },
        }}>
        <AutoCompleteTab.Screen name="인기" component={Popularity} />
        <AutoCompleteTab.Screen name="태그" component={Tag} />
        <AutoCompleteTab.Screen name="장소" component={Location} />
        <AutoCompleteTab.Screen name="계정" component={User} />
      </AutoCompleteTab.Navigator>
    </Container>
  );
};

export default SearchAutoComplete;
