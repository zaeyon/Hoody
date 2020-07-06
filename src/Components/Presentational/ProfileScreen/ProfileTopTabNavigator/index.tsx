import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Text, FlatList, StyleSheet, TouchableWithoutFeedback} from 'react-native';

import ProfileFeedList from '~/Components/Presentational/ProfileScreen/ProfileFeedList';
import ProfileCollectionList from '../ProfileCollectionList';


const Container = Styled.View`
 flex: 1;
 background-color: #c3c3c3;
`;

const UserScrapListContainer = Styled.View`
width: ${wp('100%')};
background-color: #ffffff;
flex:1;
`;

const SortTypeContainer = Styled.View`
flex-direction: row;
position: absolute;
right: 8;
top: 8;
`;

const ListTypeIcon = Styled.Image`
width: ${wp('8%')};
height: ${wp('8%')};
`;

const TileTypeIcon = Styled.Image`
width: ${(wp('8%'))};
height: ${wp('8%')};
`;




  interface Props {
      navigation: any,
      route: any
      collectionList: Array<object>,
      feedList: Array<object>,
  }

const ProfileTopTabNavigator = ({navigation, route, collectionList, feedList}: Props) => {
    const [currentSortType, setCurrentSortType] = useState<string>("list");
    const PostTopTab = createMaterialTopTabNavigator();

    function UserFeedList() {
        return (
          <ProfileFeedList
          navigation={navigation}
          feedList={feedList}
          currentSortType={currentSortType}
          />
        )
    }

    function UserCollectionList() { 
        return (
            <ProfileCollectionList
            navigation={navigation}
            collectionList={collectionList}
            />
        )
    }

    function ScrapList() {
        return (
            <UserScrapListContainer>
                <Text>Scrap List</Text>
            </UserScrapListContainer>
        )
    }


    return (
        <Container>
            <PostTopTab.Navigator
            initialRouteName="게시글"
            swipeEnabled={true}
            tabBarOptions={{
                activeTintColor:'#000000',
                inactiveTintColor:'#cccccc',
                indicatorStyle:{backgroundColor:'#000000'},
                labelStyle:{fontSize:17, fontWeight:'600'},
                tabStyle:{width: wp('19%'), height: 43, justifyContent:'center'},
                indicatorStyle:{width: wp('12.5%'), marginLeft: wp('3.25%'), backgroundColor:'#000000'},
            }}>
                <PostTopTab.Screen
                name="게시글"
                component={UserFeedList}
                />
                <PostTopTab.Screen
                name="컬렉션"
                component={UserCollectionList}
                />
                <PostTopTab.Screen
                name="스크랩"
                component={ScrapList}
                />
            </PostTopTab.Navigator>
            <SortTypeContainer>
            <TouchableWithoutFeedback onPress={() => setCurrentSortType("list")}>
            <ListTypeIcon
            style={(currentSortType !== "list") && styles.unselectingListType}
            source={require('~/Assets/Images/ic_listType.png')}/>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => setCurrentSortType("tile")}>
            <TileTypeIcon
            style={(currentSortType !== 'tile') && styles.unselectingListType}
            source={require('~/Assets/Images/ic_tileType.png')}/>
            </TouchableWithoutFeedback>
            </SortTypeContainer>
        </Container>
    )
}

const styles = StyleSheet.create({
    unselectingListType: {
        opacity: 0.25
    }
})

export default ProfileTopTabNavigator;
