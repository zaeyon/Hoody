import React, {useState, useEffect} from 'react';
import {NavigationContainer, StackActions, StackRouter} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {Image, StyleSheet, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getCurrentUser} from '~/AsyncStorage/User';

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
import LocationSearch from '~/Screens/LocationSearch';
import ImagesPullScreen from '~/Screens/ImagesPullScreen';
import Gallery from '~/Screens/Gallery';
import Gallery_ProfileImage from '~/Screens/Gallery_ProfileImage';
import Unauthorized from '~/Screens/Unauthorized';
import BasicInput from '~/Screens/SignUp/BasicInput';
import ProfileInput from '~/Screens/SignUp/ProfileInput';
import LoginScreen from '~/Screens/LoginScreen';
import ParagraphDivider from '~/Components/Test/ParagraphDivider';
import ParagraphInput from '~/Components/Test/ParagraphInput';
import UploadScreen from '~/Components/Container/UploadScreen';
import UploadAdditionInfo from '~/Screens/UploadAdditionInfo'; 
import TagAutoComplete from '~/Screens/TagAutoComplete';
import GalleryTest from '~/Components/Test/GalleryTest';
import FeedDetailScreen from '~/Components/Container/FeedDetailScreen';
import CommentListScreen from '~/Components/Container/CommentListScreen';
import LikeListScreen from '~/Components/Container/LikeListScreen';
import FeedListScreen from '~/Components/Container/FeedListScreen';
import NearFeedMapScreen from '~/Components/Container/NearFeedMapScreen';
import NewUploadScreen from '~/Components/Container/NewUploadScreen';
import TagSearchScreen from '~/Components/Container/TagSearchScreen';
import TestTextWidth from '~/Components/Container/TestTextWidth';
import UploadDescripInputScreen from '~/Screens/UploadDescripInputScreen';
import ProductUrlSearchScreen from '~/Components/Container/ProductUrlSearchScreen';

// Profile Screen
import ProfileScreen from '~/Components/Container/ProfileScreen';
import CollectionDetailScreen from '~/Components/Container/CollectionDetailScreen';
import ProfileScreenTest from '~/Components/Container/ProfileScreenTest'
import ProfileTestScreen from '~/Components/Container/ProfileTestScreen';
import FollowListScreen from '~/Components/Container/FollowListScreen';
import AnotherUserProfileScreen from '~/Components/Container/AnotherUserProfileScreen';
import ProfileEditScreen from '~/Components/Container/ProfileEditScreen';

// Collection Screen
import CollectionUploadScreen from '~/Components/Container/CollectionUploadScreen';
import AddCollectionFeedScreen from '~/Components/Container/AddCollectionFeedScreen';
import CollectionModifyScreen from '~/Components/Container/CollectionModifyScreen';
import CollectionFeedEditScreen from '~/Components/Container/CollectionFeedEditScreen';

// Scrap Screen
import AddScrapAlbumScreen from '~/Components/Container/AddScrapAlbumScreen';
import CollapsibleTabBarTest from '~/Components/Container/CollapsibleTabBarTest';

// Location Feed Map Screen
import LocationFeedMapScreen from '~/Components/Container/LocationFeedMapScreen';

// Alarm Screen
import AlarmScreen from '~/Components/Container/AlarmScreen';

// Explore Screen
import ExploreScreen from '~/Components/Container/ExploreScreen';
import SearchScreen from '~/Components/Container/SearchScreen';
import SearchResultScreen from '~/Components/Container/SearchResultScreen';

// Setting Screen
import SettingScreen from '~/Components/Container/SettingScreen';
import AccountSettingScreen from '~/Components/Container/SettingScreen/AccountSettingScreen';
import AlarmSettingScreen from '~/Components/Container/SettingScreen/AlarmSettingScreen';
import BirthdateSettingScreen from '~/Components/Container/SettingScreen/BirthdateSettingScreen';
import GenderSettingScreen from '~/Components/Container/SettingScreen/GenderSettingScreen';
import ConfirmPasswordScreen from '~/Components/Container/SettingScreen/ConfirmPasswordScreen';
import NewPasswordSettingScreen from '~/Components/Container/SettingScreen/NewPasswordSettingScreen';

// Scrap Screen
import ScrapListScreen from '~/Components/Container/ScrapListScreen';

// Select Interest Screen
import SelectInterestScreen from '~/Components/Container/SelectInterestScreen';

// Feed Edit Stack
import FeedEditScreen from '~/Components/Container/FeedEditScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const ExploreStack = createStackNavigator();
const FeedStack = createStackNavigator();
const UploadStack = createStackNavigator();
const FeedEditStack = createStackNavigator();
const AlarmStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const UnauthStack = createStackNavigator();
const NoBottomBarStack = createStackNavigator();


function FeedTitle() {
  return (
    <Text style={{fontSize: 17, }}>오늘의 후깅</Text>
  );
}

function FeedDetailTitle() {
  return <Text style={{fontSize: 17, }}></Text>;
}

function AlarmTitle() {
  return <Text style={{fontSize: 17, }}>알림</Text>;
}

function ProfileTitle() {
  return <Text style={{fontSize: 17, }}>프로필</Text>;
}

function LoginTitle() {
  return <Text style={{fontSize: 17, }}>로그인</Text>;
}

function SignupTitle() {
  return (
    <Text style={{fontSize: 17, }}>회원 가입</Text>
  );
}

function SearchLocationTitle() {
  return (
    <Text style={{fontSize: 17, }}>위치 검색</Text>
  );
}

function BasicInputTitle() {
  return (
    <Text style={{fontSize: 17, }}>회원 가입</Text>
  );
}

const config = {
  animation: 'timing',
  config: {
    duration: 0,
  },
};

function HomeStackScreen() {
  return (
    <HomeStack.Navigator 
    headerMode="none">
      <HomeStack.Screen
        name="FeedListScreen"
        component={FeedListScreen}
        options={{
          transitionSpec: {
            open: config,
            close: config,
          },
          
        }}
      />
      <HomeStack.Screen
      name="FeedStack"
      component={FeedStackScreen}
      />
      <HomeStack.Screen
        name="AnotherUserProfileStack"
        component={AnotherUserProfileStackScreen}
      />
    </HomeStack.Navigator>
  );
}

function ExploreStackScreen() {
  return (
    <ExploreStack.Navigator headerMode="none">
      <ExploreStack.Screen 
      name="ExploreScreen"
      component={ExploreScreen}/>
      <ExploreStack.Screen
      name="SearchScreen"
      component={SearchScreen}/>
      <ExploreStack.Screen
      name="SearchResultScreen"
      component={SearchResultScreen}/>
      <ExploreStack.Screen
      name="FeedStack"
      component={FeedStackScreen}/>
      <ExploreStack.Screen
      name="AnotherUserProfileStack"
      component={AnotherUserProfileStackScreen}/>
      <ExploreStack.Screen
      name="NearFeedMapScreen"
      component={NearFeedMapScreen}
      options={{
        transitionSpec: {
          open: config,
          close: config,
        }
      }}
      />
    </ExploreStack.Navigator>
  )
}

function FeedStackScreen() {
  return (
    <FeedStack.Navigator
      headerMode={"none"}
      >
      <FeedStack.Screen
        name="FeedDetailScreen"
        component={FeedDetailScreen}
      />
      <FeedStack.Screen
       name="LikeListScreen"
       component={LikeListScreen}
       />
       <FeedStack.Screen
       name="CommentListScreen"
       component={CommentListScreen}/>
       <FeedStack.Screen
       name="FeedEditScreen"
       component={FeedEditScreen}/>
      <FeedStack.Screen 
      name="TagSearchScreen"
      component={TagSearchScreen}
      options={{
        transitionSpec: {
          open: config,
          close: config,
        }
      }}
      />
      <FeedStack.Screen
        name="LocationSearch"
        component={LocationSearch}
        options={{
          headerTitle: (props) => <SearchLocationTitle {...props} />,
        }}
      />
      <FeedStack.Screen
      name="ProductUrlSearchScreen"
      component={ProductUrlSearchScreen}
      />
      <FeedStack.Screen
        name="ImagesPullScreen"
        component={ImagesPullScreen}
      />
      <FeedStack.Screen
        name="Gallery"
        component={Gallery}
        options={{
          transitionSpec: {
            open: config,
            close: config,
          },
        }}
      />
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
      <UploadStack.Screen 
      name="UploadScreen" 
      component={NewUploadScreen}
      options={{
        transitionSpec: {
          open: config,
          close: config,
        }
      }}
      />
      <UploadStack.Screen 
      name="TagSearchScreen"
      component={TagSearchScreen}
      options={{
        transitionSpec: {
          open: config,
          close: config,
        }
      }}
      />
      <UploadStack.Screen
        name="LocationSearch"
        component={LocationSearch}
        options={{
          headerTitle: (props) => <SearchLocationTitle {...props} />,
        }}
      />
      <UploadStack.Screen
      name="ProductUrlSearchScreen"
      component={ProductUrlSearchScreen}
      />
      <UploadStack.Screen
        name="ImagesPullScreen"
        component={ImagesPullScreen}
      />
      <UploadStack.Screen
        name="Gallery"
        component={Gallery}
        options={{
          transitionSpec: {
            open: config,
            close: config,
          },
        }}
      />
      <UploadStack.Screen
        name="UploadAdditionInfo"
        component={UploadAdditionInfo}
        options={{
          transitionSpec: {
            open: config,
            close: config,
          }
        }}/>
      <UploadStack.Screen
      name="TagAutoComplete"
      component={TagAutoComplete}
      options={{
        transitionSpec: {
          open: config,
          close: config,
        }
      }}/>
      <UploadStack.Screen
      name="GalleryTest"
      component={GalleryTest}/>
    </UploadStack.Navigator>
  );
}

function FeedEditStackScreen () {
  <FeedEditStack.Navigator
  headerMode="none">
    <FeedEditStack.Screen
    name="FeedEditScreen"
    component={FeedEditScreen}/>
  </FeedEditStack.Navigator>
}


function AlarmStackScreen() {
  return (
    <AlarmStack.Navigator
      headerMode="none">
      <AlarmStack.Screen
        name="AlarmScreen"
        component={AlarmScreen}
      />
      <AlarmStack.Screen
      name="AlarmSettingScreen"
      component={AlarmSettingScreen}/>
    </AlarmStack.Navigator>
  );
}

function ProfileStackScreen() {
  const currentUser = useSelector((state: any) => state.currentUser)
  return (
    <ProfileStack.Navigator
      headerMode="none"
      screenOptions={{
        headerStyle: {
          height: 47,
          elevation: 1.5,
        },
        headerTitleAlign: 'center',
      }}>
      <ProfileStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
      />
      <ProfileStack.Screen 
      name="PinterMap"
       component={PinterMap} />
      <ProfileStack.Screen
        name="UncertifiedProfile"
        component={UncertifiedProfile}
      />
      <ProfileStack.Screen
        name="CertifiedProfile"
        component={CertifiedProfile}
      />
      <ProfileStack.Screen
        name="Gallery_ProfileImage"
        component={Gallery_ProfileImage}
        options={{
          transitionSpec: {
            open: config,
            close: config,
          },
          headerShown: false,
        }}
      />
      <ProfileStack.Screen
      name="FollowListScreen"
      component={FollowListScreen}/>
      <ProfileStack.Screen
      name="AnotherUserProfileScreen"
      component={AnotherUserProfileScreen}/>
      <ProfileStack.Screen
      name="ScrapListScreen"
      component={ScrapListScreen}/>
      <ProfileStack.Screen
      name="ProfileEditScreen"
      component={ProfileEditScreen}/>
      <ProfileStack.Screen
      name="FeedStack"
      component={FeedStackScreen}/>
      <ProfileStack.Screen
      name="SettingScreen"
      component={SettingScreen}
      />
      <ProfileStack.Screen
      name="AccountSettingScreen"
      component={AccountSettingScreen}/>
      <ProfileStack.Screen
      name="AlarmSettingScreen"
      component={AlarmSettingScreen}/>
      <ProfileStack.Screen
      name="BirthdateSettingScreen"
      component={BirthdateSettingScreen}/>
      <ProfileStack.Screen
      name="GenderSettingScreen"
      component={GenderSettingScreen}/>
    </ProfileStack.Navigator>
  );
}


function AnotherUserProfileStackScreen() {
  const currentUser = useSelector((state) => state.currentUser)
  return (
    <ProfileStack.Navigator
      headerMode="none"
      screenOptions={{
        headerStyle: {
          height: 47,
          elevation: 1.5,
        },
        headerTitleAlign: 'center',
      }}>
      <ProfileStack.Screen
        name="AnotherUserProfileScreen"
        component={AnotherUserProfileScreen}
      />
      <ProfileStack.Screen 
      name="PinterMap"
       component={PinterMap} />
      <ProfileStack.Screen
      name="FollowListScreen"
      component={FollowListScreen}/>
    </ProfileStack.Navigator>
  );
}


function UnauthStackScreen() {
  return (
    <UnauthStack.Navigator headerMode="none">
      <UnauthStack.Screen
        name="Unauthorized"
        component={Unauthorized}
        options={{
          transitionSpec: {
            open: config,
            close: config,
          },
        }}
      />
      <UnauthStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        
      />
      <UnauthStack.Screen
        name="BasicInput"
        component={BasicInput}   
      />
      <UnauthStack.Screen
        name="ProfileInput"
        component={ProfileInput}
      />
      <UnauthStack.Screen
      name="SelectInterestScreen"
      component={SelectInterestScreen}/>
      <UnauthStack.Screen
        name="Gallery_ProfileImage"
        component={Gallery_ProfileImage}
        options={({navigation, route}) => ({
          transitionSpec: {
            open: config,
            close: config,
          },
        })}
      />
    </UnauthStack.Navigator>
  );
}

function Navigator() {
  const currentUser = useSelector((state) => state.currentUser);
  return (
    <NavigationContainer>
      {currentUser.loggedIn ? (
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
                  style={{width: 22, height: 22}}
                  source={
                    /*
                  focused
                    ? require('~/Assets/Images/Tabs/ic_home.png')
                    : require('~/Assets/Images/Tabs/ic_home_outline.png')
                
                    require('~/Assets/Images/Tabs/ic_homeTap.png')
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
                  style={{width: 22, height: 22}}
                  source={
                    /*
                focused
                  ? require('~/Assets/Images/Tabs/ic_home.png')
                  : require('~/Assets/Images/Tabs/ic_home_outline.png')
              */
                    require('~/Assets/Images/Tabs/ic_feedTap.png')
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
                  style={{width: 22, height: 22}}
                  source={
                    /*
                focused
                  ? require('~/Assets/Images/Tabs/ic_home.png')
                  : require('~/Assets/Images/Tabs/ic_home_outline.png')
              */
                    require('~/Assets/Images/Tabs/ic_uploadTap.png')
                  }
                />
              ),
              unmountOnBlur: true,
              tabBarVisible: false,
            }}
          />
          <Tab.Screen
            name="Alarm"
            component={AlarmStackScreen}
            options={{
              tabBarIcon: ({focused}: {focused: boolean}) => (
                <Image
                  style={{width: 22, height: 22}}
                  source={
                    /*
                focused
                  ? require('~/Assets/Images/Tabs/ic_home.png')
                  : require('~/Assets/Images/Tabs/ic_home_outline.png')
              */
                    require('~/Assets/Images/Tabs/ic_alarmTap.png')
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
                  style={{width: 22, height: 22}}
                  source={
                    /*
                focused
                  ? require('~/Assets/Images/Tabs/ic_home.png')
                  : require('~/Assets/Images/Tabs/ic_home_outline.png')
              */
                    require('~/Assets/Images/Tabs/ic_profileTap.png')
                  }
                />
              ),
            }}
          />
        </Tab.Navigator>
      ) : (
        <UnauthStackScreen />
      )}
    </NavigationContainer>
  );
}

function BottomTab() {
  const currentUser = useSelector((state: any) => state.currentUser)

  const getTabBarVisibility = (route: any) => {
    const routeName = route.state
    ? route.state.routes[route.state.index].name
    : '';

    if(routeName === 'FeedStack') {
      return false;
    }

    return true;
  }
  
  const getExploreTabBarVisibility = (route: any) => {
    const routeName = route.state
    ? route.state.routes[route.state.index].name
    : '';

    if(routeName === 'SearchScreen' || routeName === "FeedStack") {
      return false;
    }
    return true;
  }

  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: styles.tabBar
      }}>
      <Tab.Screen 
      name="Home" 
      component={HomeStackScreen}
      options={({route}) => ({
        tabBarIcon: ({focused}: {focused: boolean}) => (
          <Image
            style={{width: 30, height: 30}}
            source={
              /*
          focused
            ? require('~/Assets/Images/Tabs/ic_home.png')
            : require('~/Assets/Images/Tabs/ic_home_outline.png')
        */
              require('~/Assets/Images/NewTabs/ic_home_outline.png')
            }
          />
        ),
        tabBarVisible: getTabBarVisibility(route)
      })}
      />
      <Tab.Screen
      name="Explore"
      component={ExploreStackScreen}
      options={({route}) => ({
        tabBarIcon: ({focused}: {focused: boolean}) => (
          <Image
            style={{width: 30, height: 30}}
            source={
              /*
          focused
            ? require('~/Assets/Images/Tabs/ic_home.png')
            : require('~/Assets/Images/Tabs/ic_home_outline.png')
        */
              require('~/Assets/Images/NewTabs/ic_search_outline.png')
            }
          />
        ),
        unmountOnBlur: true,
        tabBarVisible: getExploreTabBarVisibility(route)
      })}
      />
      <Tab.Screen 
      name="Upload"
      component={UploadStackScreen}
      options={{
        tabBarIcon: ({focused}: {focused: boolean}) => (
          <Image
            style={{width: 30, height: 30}}
            source={
              /*
          focused
            ? require('~/Assets/Images/Tabs/ic_home.png')
            : require('~/Assets/Images/Tabs/ic_home_outline.png')
        */
              require('~/Assets/Images/NewTabs/ic_upload_outline.png')
            }
          />
        ),
        unmountOnBlur: true,
        tabBarVisible: false,
      }}
      />
      <Tab.Screen 
      name="Alarm" 
      component={AlarmStackScreen}
      options={{
        tabBarIcon: ({focused}: {focused: boolean}) => (
          <Image
            style={{width: 30, height: 30}}
            source={
              require('~/Assets/Images/NewTabs/ic_alarm_outline.png')
            }
          />
        ),
      }}
      />
      <Tab.Screen 
      name="Profile" 
      component={ProfileStackScreen}
      options={({route}) => ({
        tabBarIcon: ({focused}: {focused: boolean}) => (
          <Image
            style={{width: 30, height: 30}}
            source={
              require('~/Assets/Images/Tabs/ic_profile_outline.png')
            }
          />
        ),
        unmountOnBlur: true,
        tabBarVisible: getTabBarVisibility(route)
      })}
      listeners={({navigation, route}) => ({
        tabPress: e => {
          // Prevent default action
          e.preventDefault();

          // Do someting with the 'navigation' object
          navigation.navigate('Profile', {
            screen:'ProfileScreen',
          })
        }
      })}
      />
    </Tab.Navigator>
  )
}

function AppNavigator() {
  const [currentUser, setCurrentUser] = useState({
    email:"",
    state:"logout",
  });
  const [changeUserState, setChangeUserState] = useState<boolean>(false);
  const currentUserState = useSelector((state) => state.currentUser)
  
  useEffect(() => {
  getCurrentUser().then(function(response) {
    console.log("responsegggg", response);
    console.log("자동로그인 response.nickname", response.nickname);
    console.log("자동로그인 response.state", response.state);
    setCurrentUser(response);
    setChangeUserState(!changeUserState);
  })
  .catch(function(error) {
    console.log("error");
  })
  }, [])

  return (
    <NavigationContainer>
    {(currentUserState.loggedIn) ? (  
    <NoBottomBarStack.Navigator
    headerMode="none"
    >
      <NoBottomBarStack.Screen name="BottomTab" component={BottomTab}/>
      <NoBottomBarStack.Screen name="CollectionDetailScreen" component={CollectionDetailScreen}/>
      <NoBottomBarStack.Screen name="CollectionUploadScreen" component={CollectionUploadScreen}/>
      <NoBottomBarStack.Screen name="CollectionModifyScreen" component={CollectionModifyScreen}/>
      <NoBottomBarStack.Screen name="CollectionFeedEditScreen" component={CollectionFeedEditScreen}/>
      <NoBottomBarStack.Screen name="AddCollectionFeedScreen" component={AddCollectionFeedScreen}/>
      <NoBottomBarStack.Screen name="AddScrapAlbumScreen" component={AddScrapAlbumScreen}/>
      <NoBottomBarStack.Screen name="LocationFeedMapScreen" component={LocationFeedMapScreen}/>
      <NoBottomBarStack.Screen name="ConfirmPasswordScreen" component={ConfirmPasswordScreen}/>
      <NoBottomBarStack.Screen name="NewPasswordSettingScreen" component={NewPasswordSettingScreen}/>
    </NoBottomBarStack.Navigator>
    ) : (
      <UnauthStackScreen/>
    )}
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    paddingTop: 10,
    height: hp('8.5%'),
    position: 'absolute',
  },
});

export default AppNavigator;
