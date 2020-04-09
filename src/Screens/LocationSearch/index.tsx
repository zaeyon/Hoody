import React from 'react';
import Styled from 'styled-components/native';
import {FlatList, StyleSheet, Text, View, SafeAreaView} from 'react-native';
import axios from 'axios';

const SEARCH_RESULT_DATA = [
  {
    id: '1',
    location: 'First location',
  },
  {
    id: '2',
    location: 'Second location',
  },
  {
    id: '3',
    location: 'Third location',
  },
];

const Container = Styled.View`
 flex: 1;
 background-color: #FFFFFF;
`;

const SearchContainer = Styled.View`
 flex: 0.5;
 border-width: 0px;
 flex-direction: row;
 justify-content: space-between;
 margin: 0px 10px;
`;

const SearchButton = Styled.TouchableOpacity`
 justify-content: center;
 align-items: center;
`;

const SearchText = Styled.Text`
  font-size: 17px;

`;

const SearchInput = Styled.TextInput`
`;

const LocationListContainer = Styled.View`
 flex: 6;
 border-width: 1px;
 flex-direction: column;
`;

const LocationItem = ({location}) => {
  return (
    <View style={styles.item}>
      <Text style={styles.location}>{location}</Text>
    </View>
  );
};

const CallKakaoLocalAPI = (location) => {
  axios.get('/');
};

const LocationSearch = ({navigation}) => {
  return (
    <Container>
      <SearchContainer>
        <SearchInput placeholder="위치를 입력하세요."></SearchInput>
        <SearchButton>
          <SearchText>검색</SearchText>
        </SearchButton>
      </SearchContainer>
      <LocationListContainer>
        <FlatList
          data={SEARCH_RESULT_DATA}
          renderItem={({item}) => <LocationItem location={item.location} />}
          keyExtractor={(item) => item.id}
        />
      </LocationListContainer>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    marginVertical: 8,
    marginHorizontal: 10,
  },
  location: {
    fontSize: 15,
  },
});

export default LocationSearch;
