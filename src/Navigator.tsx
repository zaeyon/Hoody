import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {Image, StyleSheet, Alert, Text} from 'react-native';

import Home from '~/Tab/Home';
import Feed from '~/Tab/Feed';
import Upload from '~/Tab/Upload';
import Alarm from '~/Tab/Alarm';
import Profile from '~/Tab/Profile';
import Search from '~/Screens/Search';
import FeedDetail from '~/Screens/FeedDetail';
import PinterMap from '~/Screens/PinterMap';
import UncertifiedProfile from '~/Screens/UncertifiedProfile';
import CertifiedProfile from '~/Screens/CertifiedProfile';
import Login from '~/Screens/Login';
import LocationSearch from '~/Screens/LocationSearch';
import Animation from '~/Screens/Animation';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const FeedStack = createStackNavigator();
const UploadStack = createStackNavigator();
const AlarmStack = createStackNavigator();
const ProfileStack = createStackNavigator();

function UploadTitle() {
  return (
    <Text style={{fontSize: 17, fontFamily: 'Arita4.0_M'}}>나의 후깅</Text>
  );
}

function FeedTitle() {
  return (
    <Text style={{fontSize: 17, fontFamily: 'Arita4.0_M'}}>오늘의 후깅</Text>
  );
}

function AlarmTitle() {
  return <Text style={{fontSize: 17, fontFamily: 'Arita4.0_M'}}>알림</Text>;
}

function ProfileTitle() {
  return <Text style={{fontSize: 17, fontFamily: 'Arita4.0_M'}}>프로필</Text>;
}

function LoginTitle() {
  return <Text style={{fontSize: 17, fontFamily: 'Arita4.0_M'}}>로그인</Text>;
}

function SearchLocationTitle() {
  return (
    <Text style={{fontSize: 17, fontFamily: 'Arita4.0_M'}}>위치 검색</Text>
  );
}

function HomeStackScreen() {
  return (
    <HomeStack.Navigator headerMode="none">
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Animation" component={Animation} />
      <HomeStack.Screen name="Search" component={Search} />
    </HomeStack.Navigator>
  );
}

function FeedStackScreen() {
  return (
    <FeedStack.Navigator
      screenOptions={{
        headerStyle: {
          height: 47,
          elevation: 1.5,
        },
        headerTitleAlign: 'left',
      }}>
      <FeedStack.Screen
        name="Feed"
        component={Feed}
        options={{
          headerTitle: (props) => <FeedTitle {...props} />,
        }}
      />
      <FeedStack.Screen name="FeedDetail" component={FeedDetail} />
    </FeedStack.Navigator>
  );
}

function UploadStackScreen() {
  return (
    <UploadStack.Navigator
      headerMode="none"
      screenOptions={{
        headerStyle: {
          height: 47,
          elevation: 1.5,
        },
        headerTitleAlign: 'center',
      }}>
      <UploadStack.Screen name="Upload" component={Upload} options={{}} />
      <UploadStack.Screen
        name="LocationSearch"
        component={LocationSearch}
        options={{
          headerTitle: (props) => <SearchLocationTitle {...props} />,
        }}
      />
    </UploadStack.Navigator>
  );
}

function AlarmStackScreen() {
  return (
    <AlarmStack.Navigator
      screenOptions={{
        headerStyle: {
          height: 47,
          elevation: 1.5,
        },
        headerTitleAlign: 'left',
      }}>
      <AlarmStack.Screen
        name="Alarm"
        component={Alarm}
        options={{
          headerTitle: (props) => <AlarmTitle {...props} />,
        }}
      />
    </AlarmStack.Navigator>
  );
}

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          height: 47,
          elevation: 1.5,
        },
        headerTitleAlign: 'center',
      }}>
      <ProfileStack.Screen
        name="Profile"
        component={Profile}
        options={({navigation, route}) => ({
          headerTitle: (props) => <ProfileTitle {...props} />,
        })}
      />
      <ProfileStack.Screen name="PinterMap" component={PinterMap} />
      <ProfileStack.Screen
        name="UncertifiedProfile"
        component={UncertifiedProfile}
      />
      <ProfileStack.Screen
        name="CertifiedProfile"
        component={CertifiedProfile}
      />
      <ProfileStack.Screen
        name="Login"
        component={Login}
        options={({navigation, route}) => ({
          headerTitle: (props) => <LoginTitle {...props} />,
        })}
      />
    </ProfileStack.Navigator>
  );
}

function Navigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          showLabel: false,
          style: styles.tabBar,
        }}>
        <Tab.Screen
          name="Home"
          component={HomeStackScreen}
          options={{
            tabBarIcon: ({focused}: {focused: boolean}) => (
              <Image
                source={
                  focused
                    ? require('~/Assets/Images/Tabs/ic_home.png')
                    : require('~/Assets/Images/Tabs/ic_home_outline.png')
                }
              />
            ),
          }}
        />
        <Tab.Screen
          name="Feed"
          component={FeedStackScreen}
          options={{
            tabBarIcon: ({focused}: {focused: boolean}) => (
              <Image
                source={
                  focused
                    ? require('~/Assets/Images/Tabs/ic_feed.png')
                    : require('~/Assets/Images/Tabs/ic_feed_outline.png')
                }
              />
            ),
          }}
        />
        <Tab.Screen
          name="Upload"
          component={UploadStackScreen}
          options={{
            tabBarIcon: ({focused}: {focused: boolean}) => (
              <Image
                source={
                  focused
                    ? require('~/Assets/Images/Tabs/ic_add.png')
                    : require('~/Assets/Images/Tabs/ic_add_outline.png')
                }
              />
            ),
          }}
        />
        <Tab.Screen
          name="Alarm"
          component={AlarmStackScreen}
          options={{
            tabBarIcon: ({focused}: {focused: boolean}) => (
              <Image
                source={
                  focused
                    ? require('~/Assets/Images/Tabs/ic_alarm.png')
                    : require('~/Assets/Images/Tabs/ic_alarm_outline.png')
                }
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileStackScreen}
          options={{
            tabBarIcon: ({focused}: {focused: boolean}) => (
              <Image
                source={
                  focused
                    ? require('~/Assets/Images/Tabs/ic_profile.png')
                    : require('~/Assets/Images/Tabs/ic_profile_outline.png')
                }
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 45,
    position: 'absolute',
  },
});

export default Navigator;
