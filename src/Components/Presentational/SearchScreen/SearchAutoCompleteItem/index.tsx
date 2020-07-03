import React, {useState, useEffect, useLayoutEffect} from 'react';
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
import { useIsFocused } from '@react-navigation/native'; 

const Container = Styled.View`
 flex:1;
 background-color: #ffffff;
`;

const EmptyInputContainer = Styled.View`
width: ${wp('100%')};
height: ${hp('101%')};
background-color: #ffffff;
padding-bottom: 47px;
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

interface Props {
  children: any,
  autoCompleteResult: any,
  resultCategory: any,
  query: string,
  changeSearchCategory: (changedCategory: string) => void,
}

const SearchAutoComplete = ({navigation, resultCategory,changeSearchCategory, autoCompleteResult, query}) => {
  const AutoCompleteTab = createMaterialTopTabNavigator();
  const [popularityData, setPopularityData] = useState([
    {
      category: 'tag',
      query: '인기 태그1',
      starRate: 5,
      COUNT: 23,
    },
    {
      category: 'user',
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
  const [autoCompleteUserData, setAutoCompleteUserData] = useState();
  const [autoCompleteData, setAutoCompleteData] = useState();
  const [autoCompleteChange, setAutoCompleteChange] = useState(false);
  const [emptyInput, setEmptyInput] = useState(true);

  useLayoutEffect(() => {
    if(autoCompleteResult) {
      console.log("autoCompleteResult", autoCompleteResult);
      console.log("자동완성 query", query);
      if(query === undefined) {
        setAutoCompleteData(null);
        setAutoCompleteUserData(null);
      } else {
        if(resultCategory === "user")
      {
        setAutoCompleteUserData(autoCompleteResult);
        setAutoCompleteChange(true);
      } else {
      setAutoCompleteData(autoCompleteResult);
      setAutoCompleteChange(true);
      }
      }  
    }

  }, [autoCompleteResult]);

  function Popularity() {
    const isFocused = useIsFocused();
    
    if(isFocused) {
      console.log("인기탭");
      changeSearchCategory("popular");
    }

    return (
        <AutoCompleteContainer>
          {autoCompleteData && (
          <FlatList
            bounces={false}
            data={autoCompleteData}
            renderItem={({item, index}) => {
              if (item.type === 'tag') {
                return (
                  <AutoCompleteItemContainer>
                    <ItemLeftContainer>
                      <TagName>#{item[0].name}</TagName>
                    </ItemLeftContainer>
                    <ItemRightContainer>
                      <TagRating>평점 {item[0].starRate}</TagRating>
                      <Text style={{color: '#707070'}}> | </Text>
                      <TagCount>후기 수 {item[0].reviewNum}개</TagCount>
                    </ItemRightContainer>
                  </AutoCompleteItemContainer>
                );
              } else if (item.type === 'user') {
                return (
                  <AutoCompleteItemContainer>
                    <ItemLeftContainer>
                      <UserName>{item.nickname}</UserName>
                    </ItemLeftContainer>
                    <ItemRightContainer>
                      <UserFollwer></UserFollwer>
                      <Text style={{color: '#707070'}}></Text>
                      <UserScore></UserScore>
                    </ItemRightContainer>
                  </AutoCompleteItemContainer>
                );
              }
            }}
          />
  )}
        </AutoCompleteContainer>
    );
  }

  function Tag() {

    const isFocused = useIsFocused();
    console.log("tag autoCompleteData", autoCompleteData);
    
    if(isFocused) {
      console.log("태그탭");
      changeSearchCategory("tag")
      
    }

    return (
        <AutoCompleteContainer>
          <FlatList
            bounces={false}
            data={autoCompleteData}
            extraData={autoCompleteChange}
            renderItem={({item, index}) => (
              <AutoCompleteItemContainer>
                <ItemLeftContainer>
                  <TagName>#{item[0].name}</TagName>
                </ItemLeftContainer>
                <ItemRightContainer>
                  <TagRating>평점 {item[0].starRate}</TagRating>
                  <Text style={{color: '#707070'}}> | </Text>
                  <TagCount>후기 수 {item[0].reviewNum}개</TagCount>
                </ItemRightContainer>
              </AutoCompleteItemContainer>
            )}
          />
         </AutoCompleteContainer>
    );
  }

  function Location() {
    const isFocused = useIsFocused();
    
    if(isFocused) {
      console.log("위치탭");
      changeSearchCategory("address");
    }

    return (
        <AutoCompleteContainer>
          <FlatList
            bounces={false}
            data={autoCompleteData}
            extraData={autoCompleteData}
            renderItem={({item, index}) => (
              <AutoCompleteItemContainer>
                <ItemLeftContainer>
                  <LocationName>{item[0].name}</LocationName>
                </ItemLeftContainer>
                <ItemRightContainer>
                  <LocationRating>평점 {item[0].starRate}</LocationRating>
                  <Text> | </Text>
                  <LocationCount>후기 수 {item[0].reviewNum}</LocationCount>
                </ItemRightContainer>
              </AutoCompleteItemContainer>
            )}
          />
        </AutoCompleteContainer>
    );
  }

  function User() {
    const isFocused = useIsFocused();
    if(isFocused) {
      console.log("사용자탭");
      changeSearchCategory("user");
    }

    return (
        <AutoCompleteContainer>
          <FlatList
            bounces={false}
            data={autoCompleteUserData}
            renderItem={({item, index}) => (
              <AutoCompleteItemContainer>
                <ItemLeftContainer>
                  <UserName>{item.nickname}</UserName>
                </ItemLeftContainer>
                <ItemRightContainer>
                  <UserFollwer></UserFollwer>
                  <UserScore></UserScore>
                </ItemRightContainer>
              </AutoCompleteItemContainer>
            )}
          />
        </AutoCompleteContainer>
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
          labelStyle: {fontSize: 13},
        }}>
        <AutoCompleteTab.Screen 
        name="인기" 
        component={Popularity}
        />
        <AutoCompleteTab.Screen 
        name="태그" 
        component={Tag}
        />
        <AutoCompleteTab.Screen 
        name="장소" 
        component={Location}
        />
        <AutoCompleteTab.Screen 
        name="계정" 
        component={User}
        />
      </AutoCompleteTab.Navigator>
    </Container>
  );
};

export default SearchAutoComplete;
