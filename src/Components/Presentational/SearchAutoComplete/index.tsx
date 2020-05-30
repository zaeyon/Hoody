import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {FlatList, TouchableWithoutFeeback, ScrollView} from 'react-native';
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
 height: ${hp('10%')};

`;

const SearchAutoComplete = () => {
  const AutoCompleteTab = createMaterialTopTabNavigator();
  const [popularityData, setPopularityData] = useState([]);
  const [tagData, setTagData] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [userData, setUserData] = useState([]);

  function Popularity() {
    return (
      <ScrollView bounces={false} overScrollMode="never">
        <AutoCompleteContainer>
          <FlatList
            bounces={false}
            data={popularityData}
            renderItem={({item, index}) => (
              <AutoCompleteItemContainer></AutoCompleteItemContainer>
            )}
          />
        </AutoCompleteContainer>
      </ScrollView>
    );
  }

  function Tag() {
    return (
      <ScrollView bounces={false} overScrollMode="never">
        <AutoCompleteContainer>
          <FlatList
            bounces={false}
            data={tagData}
            renderItem={({item, index}) => (
              <AutoCompleteItemContainer></AutoCompleteItemContainer>
            )}
          />
        </AutoCompleteContainer>
      </ScrollView>
    );
  }

  function Location() {
    return (
      <ScrollView bounces={false} overScrollMode="never">
        <AutoCompleteContainer>
          <FlatList
            bounces={false}
            data={locationData}
            renderItem={({item, index}) => (
              <AutoCompleteItemContainer></AutoCompleteItemContainer>
            )}
          />
        </AutoCompleteContainer>
      </ScrollView>
    );
  }

  function User() {
    return (
      <ScrollView bounces={false} overScrollMode="never">
        <AutoCompleteContainer>
          <FlatList
            bounces={false}
            data={userData}
            renderItem={({item, index}) => (
              <AutoCompleteItemContainer></AutoCompleteItemContainer>
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
          labelStyle: {fontSize: 13, fontFamily: 'Arita4.0_M'},
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
