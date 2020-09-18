import React, {useState, useEffect, useCallback} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {Image, StyleSheet, Text, Alert, SafeAreaView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import allActions from '~/action';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getAutoLoginUser} from '~/AsyncStorage/User';
import messaging from '@react-native-firebase/messaging'
import SplashScreen from 'react-native-splash-screen'
import {isIphoneX, getBottomSpace} from 'react-native-iphone-x-helper';

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
import ImagesFullScreen from '~/Screens/ImagesFullScreen';
import Gallery from '~/Screens/Gallery';
import Gallery_JustOne from '~/Screens/Gallery_JustOne';
import Unauthorized from '~/Screens/Unauthorized';
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

import KakaoLoginScreen from '~/Components/Container/KakaoLoginScreen';

// Signup Screen
import BasicInput from '~/Screens/SignUp/BasicInput';
import ProfileInput from '~/Screens/SignUp/ProfileInput';
import SelectInterestScreen from '~/Components/Container/SelectInterestScreen';

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
import CollectionFeedMapScreen from '~/Components/Container/CollectionFeedMapScreen';

// Scrap Screen
import ScrapListScreen from '~/Components/Container/ScrapListScreen';
import AddScrapAlbumScreen from '~/Components/Container/AddScrapAlbumScreen';
import ScrapFolderFeedListScreen from '~/Components/Container/ScrapFolderFeedListScreen';
import ScrapFolderEditScreen from '~/Components/Container/ScrapFolderEditScreen';

// Location Feed Map Screen
import FeedMapScreen from '~/Components/Container/FeedMapScreen';

// Alarm Screen
import AlarmScreen from '~/Components/Container/AlarmScreen';

// Explore Screen
import ExploreScreen from '~/Components/Container/ExploreScreen';
import SearchScreen from '~/Components/Container/SearchScreen';
import SearchResultScreen from '~/Components/Container/SearchResultScreen';

// Upload Screen
import TemporarySaveBoxScreen from '~/Components/Container/TemporarySaveBoxScreen';

// Setting Screen
import SettingScreen from '~/Components/Container/SettingScreen';
import AccountSettingScreen from '~/Components/Container/SettingScreen/AccountSettingScreen';
import AlarmSettingScreen from '~/Components/Container/SettingScreen/AlarmSettingScreen';
import BirthdateSettingScreen from '~/Components/Container/SettingScreen/BirthdateSettingScreen';
import GenderSettingScreen from '~/Components/Container/SettingScreen/GenderSettingScreen';
import ConfirmPasswordScreen from '~/Components/Container/SettingScreen/ConfirmPasswordScreen';
import ChangePasswordSettingScreen from '~/Components/Container/SettingScreen/ChangePasswordSettingScreen';
import VerifyEmailScreen from '~/Components/Container/SettingScreen/VerifyEmailScreen';
import CustomerServiceSettingScreen from '~/Components/Container/SettingScreen/CustomerServiceScreen';
import ReportProblemScreen from '~/Components/Container/SettingScreen/ReportProblemScreen';
import FreAskQuestionsScreen from '~/Components/Container/SettingScreen/FreAskQuestionsScreen';
import InformationScreen from '~/Components/Container/SettingScreen/InformationScreen';
import DataPolicyScreen from '~/Components/Container/SettingScreen/InformationScreen/DataPolicyScreen';
import TermsOfUseScreen from '~/Components/Container/SettingScreen/InformationScreen/TermsOfUseScreen';
import CookiePolicyScreen from '~/Components/Container/SettingScreen/InformationScreen/CookiePolicyScreen';
import OpenSourceLibraryScreen from '~/Components/Container/SettingScreen/InformationScreen/OpenSourceLibraryScreen';
import PrivacyPolicyScreen from '~/Components/Container/SettingScreen/InformationScreen/PrivacyPolicyScreen';
import SendFeedbackScreen from '~/Components/Container/SettingScreen/SendFeedBackScreen';

// Feed Edit Stack
import FeedEditScreen from '~/Components/Container/FeedEditScreen';

// Report Screen
import ReportScreen from '~/Components/Container/ReportScreen';
import TopPopularTagDetailScreen from '~/Components/Container/ReportScreen/TopPopularTagDetailScreen';
import TopInterestTagDetailScreen from '~/Components/Container/ReportScreen/TopInterestTagDetailScreen';

// Declare Screen
import FeedDeclareScreen from '~/Components/Container/FeedDeclareScreen';
import CommentDeclareScreen from '~/Components/Container/CommentDeclareScreen';

// Feed Detail Screen
import FeedImagePullScreen from '~/Components/Container/FeedImagePullScreen';
import ProductWebView from '~/Components/Container/ProductWebView';

// Route
import POSTAutoLogin from '~/Route/Auth/POSTAutoLogin';
import GETFeed from '~/Route/Home/GETFeed';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const ExploreStack = createStackNavigator();
const FeedStack = createStackNavigator();
const CollectionStack = createStackNavigator();
const UploadStack = createStackNavigator();
const AlarmStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const UnauthStack = createStackNavigator();
const NoBottomBarStack = createStackNavigator();
const SettingStack = createStackNavigator();
const MapStack = createStackNavigator();

var bottomTabHeight;

if(isIphoneX()) {
  bottomTabHeight = wp("21%");
} else {
  bottomTabHeight = wp("15%");
}

const config = {
  animation: 'timing',
  config: {
    duration: 0,
  },
};

function HomeStackScreen({navigation}: any) {
  const [feedListData, setFeedListData] = useState<Array<object>>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', (e:any) => {
      // Home Feed List Reload
      GETFeed(0, 10)
    .then(function(response) {
    console.log("파드 목록 가져오기 성공@@@", response);
    //setFeedListData(response.result);
    dispatch(allActions.feedListAction.setHomeFeedList(response.result));
    dispatch(allActions.feedListAction.setHomeTabPress(true));
  })
  .catch(function(error) {
    console.log("피드 목록 가져오기 실패", error);
  })
    });

    return unsubscribe;
  }, [navigation]);

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
      component={FeedStackScreen}
      />
      <ExploreStack.Screen
      name="CollectionStack"
      component={CollectionStackScreen}/>
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
      />
      <UploadStack.Screen
      name="ProductUrlSearchScreen"
      component={ProductUrlSearchScreen}
      />
      <UploadStack.Screen
        name="ImagesFullScreen"
        component={ImagesFullScreen}
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
      <UploadStack.Screen
      name="TemporarySaveBoxScreen"
      component={TemporarySaveBoxScreen}/>
    </UploadStack.Navigator>
  );
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
      <AlarmStack.Screen
      name="FeedStack"
      component={FeedStackScreen}
      />
      <AlarmStack.Screen
        name="AnotherUserProfileStack"
        component={AnotherUserProfileStackScreen}
      />
    </AlarmStack.Navigator>
  );
}

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator
      headerMode="none">
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
        name="Gallery_JustOne"
        component={Gallery_JustOne}
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
        name="AnotherUserProfileStack"
        component={AnotherUserProfileStackScreen}/>
      <ProfileStack.Screen
      name="ScrapListScreen"
      component={ScrapListScreen}/>
      <ProfileStack.Screen
      name="ScrapFolderFeedListScreen"
      component={ScrapFolderFeedListScreen}/>
      <ProfileStack.Screen
      name="ScrapFolderEditScreen"
      component={ScrapFolderEditScreen}/>
      <ProfileStack.Screen
      name="ProfileEditScreen"
      component={ProfileEditScreen}/>
      <ProfileStack.Screen
      name="FeedStack"
      component={FeedStackScreen}/>
      <ProfileStack.Screen
      name="SettingStack"
      component={SettingStackScreen}/>
      <ProfileStack.Screen
      name="CollectionStack"
      component={CollectionStackScreen}/>
      <ProfileStack.Screen
      name="FeedMapScreen"
      component={FeedMapScreen}/>
      <ProfileStack.Screen
      name="ReportScreen"
      component={ReportScreen}/>
      <ProfileStack.Screen
      name="TopPopularTagDetailScreen"
      component={TopPopularTagDetailScreen}/>
      <ProfileStack.Screen
      name="TopInterestTagDetailScreen"
      component={TopInterestTagDetailScreen}/>
    </ProfileStack.Navigator>
  );
}


function AnotherUserProfileStackScreen() {
  return (
    <ProfileStack.Navigator
      headerMode="none">
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
      <ProfileStack.Screen
      name="CollectionStack"
      component={CollectionStackScreen}/>
      <ProfileStack.Screen
      name="FeedStack"
      component={FeedStackScreen}/>
      <ProfileStack.Screen
      name="FeedMapScreen"
      component={FeedMapScreen}/>
    </ProfileStack.Navigator>
  );
}

function SettingStackScreen() {
  return (
    <SettingStack.Navigator
    headerMode="none">
      <SettingStack.Screen
      name="SettingScreen"
      component={SettingScreen}
      />
      <SettingStack.Screen
      name="AccountSettingScreen"
      component={AccountSettingScreen}/>
      <SettingStack.Screen
      name="AlarmSettingScreen"
      component={AlarmSettingScreen}/>
      <SettingStack.Screen
      name="BirthdateSettingScreen"
      component={BirthdateSettingScreen}/>
      <SettingStack.Screen
      name="GenderSettingScreen"
      component={GenderSettingScreen}/>
      <SettingStack.Screen
      name="VerifyEmailScreen"
      component={VerifyEmailScreen}/>
      <SettingStack.Screen
      name="ConfirmPasswordScreen"
      component={ConfirmPasswordScreen}/>
      <SettingStack.Screen
      name="ChangePasswordSettingScreen"
      component={ChangePasswordSettingScreen}/>
      <SettingStack.Screen
      name="CustomerServiceSettingScreen"
      component={CustomerServiceSettingScreen}/>
      <SettingStack.Screen
      name="ReportProblemScreen"
      component={ReportProblemScreen}/>
      <SettingStack.Screen
      name="FreAskQuestionsScreen"
      component={FreAskQuestionsScreen}/>
      <SettingStack.Screen
      name="InformationScreen"
      component={InformationScreen}/>
      <SettingStack.Screen
      name="DataPolicyScreen"
      component={DataPolicyScreen}/>
      <SettingStack.Screen
      name="CookiePolicyScreen"
      component={CookiePolicyScreen}/>
      <SettingStack.Screen
      name="OpenSourceLibraryScreen"
      component={OpenSourceLibraryScreen}/>
      <SettingStack.Screen
      name="PrivacyPolicyScreen"
      component={PrivacyPolicyScreen}/>
      <SettingStack.Screen
      name="TermsOfUseScreen"
      component={TermsOfUseScreen}/>
      <SettingStack.Screen
      name="SendFeedbackScreen"
      component={SendFeedbackScreen}/>
    </SettingStack.Navigator>
  )

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
      name={"SettingStack"}
      component={SettingStackScreen}/>
      <UnauthStack.Screen
      name={"KakaoLoginScreen"}
      component={KakaoLoginScreen}/>
    </UnauthStack.Navigator>
  );
}

function FeedStackScreen() {
  return (
    <FeedStack.Navigator
      headerMode={"none"}>
      <FeedStack.Screen
        name="FeedDetailScreen"
        component={FeedDetailScreen}
        options={{
          transitionSpec: {
            open: config,
            close: config,
          }
        }}
      />
      <FeedStack.Screen
       name="LikeListScreen"
       component={LikeListScreen}
       options={{
        transitionSpec: {
          open: config,
          close: config,
        }
      }}
       />
       <FeedStack.Screen
       name="CommentListScreen"
       component={CommentListScreen}
       options={{
        transitionSpec: {
          open: config,
          close: config,
        }
      }}
      />
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
      />
      <FeedStack.Screen
      name="ProductUrlSearchScreen"
      component={ProductUrlSearchScreen}
      />
      <FeedStack.Screen
        name="ImagesFullScreen"
        component={ImagesFullScreen}
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
      <FeedStack.Screen
      name="FeedDeclareScreen"
      component={FeedDeclareScreen}/>
      <FeedStack.Screen
      name="CommentDeclareScreen"
      component={CommentDeclareScreen}/>
      <FeedStack.Screen
      name="ProductWebView"
      component={ProductWebView}/>
    </FeedStack.Navigator>
  );
}

function CollectionStackScreen() {
  return (
    <CollectionStack.Navigator
    headerMode={"none"}>
      <CollectionStack.Screen
      name="CollectionDetailScreen"
      component={CollectionDetailScreen}/>
    <CollectionStack.Screen 
      name="CollectionUploadScreen" 
      component={CollectionUploadScreen}/>
    <CollectionStack.Screen 
      name="CollectionModifyScreen" 
      component={CollectionModifyScreen}/>
    <CollectionStack.Screen 
      name="CollectionFeedEditScreen" 
      component={CollectionFeedEditScreen}/>
    <CollectionStack.Screen
      name="CollectionFeedMapScreen"
      component={CollectionFeedMapScreen}/>
    <CollectionStack.Screen
      name="FeedStack"
      component={FeedStackScreen}/>
    <CollectionStack.Screen 
      name="AddCollectionFeedScreen" 
      component={AddCollectionFeedScreen}/>
    </CollectionStack.Navigator>
  )
}

function BottomTab() {
  const currentUser = useSelector((state: any) => state.currentUser)

  const getHomeTabBarVisibility = (route: any) => {
    const routeName = route.state
    ? route.state.routes[route.state.index]
    : '';

    const stackRouteName = routeName.state
    ? routeName.state.routes[routeName.state.index].name
    : '';

    if(routeName.name === 'FeedStack' || routeName.name === 'CollectionStack') {
      return false;
    }

    if(stackRouteName === "FeedStack" || stackRouteName === 'CollectionStack') {
      return false;
    }

    return true;
  }
  
  const getExploreTabBarVisibility = (route: any) => {
    const routeName = route.state
    ? route.state.routes[route.state.index]
    : '';

    const stackRouteName = routeName.state
    ? routeName.state.routes[routeName.state.index].name
    : '';

    if(routeName.name === 'SearchScreen' || routeName.name === "FeedStack" || routeName.name === "CollectionStack" || routeName.name === "NearFeedMapScreen") {
      return false;
    }

    if(stackRouteName === "FeedStack" || stackRouteName === "CollectionStack") {
      return false;
    }

    return true;
  }

  const getProfileTabBarVisibility = (route: any) => {
    const routeName = route.state
    ? route.state.routes[route.state.index]
    : '';

    const stackRouteName = routeName.state
    ? routeName.state.routes[routeName.state.index].name
    : '';

    if(routeName.name === 'FeedStack' || routeName.name === 'CollectionStack' || routeName.name === "FeedMapScreen") {
      return false;
    }

    if(stackRouteName === "ConfirmPasswordScreen" || stackRouteName === "ChangePasswordSettingScreen" || stackRouteName === "VerifyEmailScreen" || stackRouteName === "FeedStack" || stackRouteName === "CollectionStack") {
      return false;
    }

    return true;
  }


  const getAlarmTabBarVisibility = (route: any) => {
    const routeName = route.state
    ? route.state.routes[route.state.index]
    : '';

    const stackRouteName = routeName.state
    ? routeName.state.routes[routeName.state.index].name
    : '';

    if(routeName.name === 'FeedStack' || routeName.name === 'CollectionStack' || routeName.name === "FeedMapScreen") {
      return false;
    }

    if(stackRouteName === "ConfirmPasswordScreen" || stackRouteName === "ChangePasswordSettingScreen" || stackRouteName === "VerifyEmailScreen" || stackRouteName === "FeedStack" || stackRouteName === "CollectionStack") {
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
            source={
            focused
             ? require('~/Assets/Images/BottomTab/ic_home_focused.png')
             : require('~/Assets/Images/BottomTab/ic_home_outline.png')
            }
          />
        ),
        unmountOnBlur: false,
        tabBarVisible: getHomeTabBarVisibility(route),
      })}
      />
      <Tab.Screen
      name="Explore"
      component={ExploreStackScreen}
      options={({route}) => ({
        tabBarIcon: ({focused}: {focused: boolean}) => (
          <Image
            source={
            focused
             ? require('~/Assets/Images/BottomTab/ic_search_focused.png')
             : require('~/Assets/Images/BottomTab/ic_search_outline.png')
            }
          />
        ),
        unmountOnBlur: false,
        tabBarVisible: getExploreTabBarVisibility(route)
      })}
      />
      <Tab.Screen 
      name="Upload"
      component={UploadStackScreen}
      options={{
        tabBarIcon: ({focused}: {focused: boolean}) => (
          <Image
            source={
               require('~/Assets/Images/BottomTab/ic_upload.png')
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
      options={({route}) => ({
        tabBarIcon: ({focused}: {focused: boolean}) => (
          <Image
            source={
              focused
               ? require('~/Assets/Images/BottomTab/ic_alarm_focused.png')
               : require('~/Assets/Images/BottomTab/ic_alarm_outline.png')
            }
          />
        ),
        tabBarVisible: getAlarmTabBarVisibility(route)
      })}
      />
      <Tab.Screen 
      name="Profile" 
      component={ProfileStackScreen}
      options={({route}) => ({
        tabBarIcon: ({focused}: {focused: boolean}) => (
          <Image
            source={
              focused
               ? require('~/Assets/Images/BottomTab/ic_profile_focused.png')
               : require('~/Assets/Images/BottomTab/ic_profile_outline.png')
            }
          />
        ),
        unmountOnBlur: false,
        tabBarVisible: getProfileTabBarVisibility(route)
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

function AppNavigator({navigation, route}: any) {
  const [changeUserState, setChangeUserState] = useState<boolean>(false);
  const currentUser = useSelector((state: any) => state.currentUser)
  const [pushToken, setPushToken] = useState<string>();
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const dispatch = useDispatch();


  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      //Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
  
    return unsubscribe;
  }, []);


  useEffect(() => {
    handlePushToken()
    SplashScreen.hide();
  }, [])

  const handlePushToken = useCallback(async () => {

    const authStatus = await messaging().requestPermission();
    //await messaging().registerDeviceForRemoteMessages();

    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      const fcmToken = await messaging().getToken()
      //const fcmToken = "11"
      if (fcmToken) {
        console.log("fcmToken 존재", fcmToken);
        dispatch(allActions.userActions.setFcmToken(fcmToken));


    console.log("currentUser.fcmToken", fcmToken);
    // SplashScreen.hide();
     getAutoLoginUser()
     .then(function(asyStorResponse) {
       console.log("responsegggg", asyStorResponse);
       console.log("자동로그인 세션", asyStorResponse.sessionId)
       console.log("자동로그인 response.nickname", asyStorResponse.nickname);
       console.log("자동로그인 response.state", asyStorResponse.state);
       if(asyStorResponse == "NoLogined") {
         SplashScreen.hide();
       } else if(asyStorResponse.userId) {
         //SplashScreen.hide();
         POSTAutoLogin(asyStorResponse.userId, asyStorResponse.sessionId, fcmToken)
         .then(function(response) {
           console.log("자동로그인 성공", response);
           console.log("이메일", asyStorResponse.email);
           dispatch(allActions.userActions.setUser({
             email: asyStorResponse.email,
             profileImage: response.user.thumbnailImg,
             nickname: response.user.nickname,
             description: response.user.description,
             userId: response.user.id,
           }))
           dispatch(
             allActions.keywordAction.setInputedKeywordList([])
           )          
           setTimeout(() => {
             SplashScreen.hide();
           },10)
         })
         .catch(function(error) {
           console.log("자동로그인 실패", error);
           SplashScreen.hide();
         })
       }
     })
     .catch(function(error) {
       console.log("error", error);
     })
      }
    } else {
      const authorized = await messaging().requestPermission()
      if (authorized) setIsAuthorized(true)
    }
  }, [])


  /*
  useEffect(() => {

    console.log("currentUser.fcmToken", currentUser.fcmToken);
   // SplashScreen.hide();
    getAutoLoginUser()
    .then(function(asyStorResponse) {
      console.log("responsegggg", asyStorResponse);
      console.log("자동로그인 세션", asyStorResponse.sessionId)
      console.log("자동로그인 response.nickname", asyStorResponse.nickname);
      console.log("자동로그인 response.state", asyStorResponse.state);
      if(asyStorResponse == "NoLogined") {
        SplashScreen.hide();
      } else if(asyStorResponse.userId) {
        //SplashScreen.hide();
        POSTAutoLogin(asyStorResponse.userId, asyStorResponse.sessionId, currentUser.fcmToken)
        .then(function(response) {
          console.log("자동로그인 성공", response);
          console.log("이메일", asyStorResponse.email);
          dispatch(allActions.userActions.setUser({
            email: asyStorResponse.email,
            profileImage: response.user.thumbnailImg,
            nickname: response.user.nickname,
            description: response.user.description,
            userId: response.user.id,
          }))
          dispatch(
            allActions.keywordAction.setInputedKeywordList([])
          )          
          setTimeout(() => {
            SplashScreen.hide();
          },10)
        })
        .catch(function(error) {
          console.log("자동로그인 실패", error);
          SplashScreen.hide();
        })
      }
    })
    .catch(function(error) {
      console.log("error", error);
    })
    
  }, [])
 
  */

  return (
    <NavigationContainer>
    {(currentUser.loggedIn) ? (  
    <NoBottomBarStack.Navigator
    headerMode="none">
      <NoBottomBarStack.Screen name="BottomTab" component={BottomTab}/>
      <NoBottomBarStack.Screen name="AddScrapAlbumScreen" component={AddScrapAlbumScreen}/>
      <NoBottomBarStack.Screen name="Gallery_JustOne" component={Gallery_JustOne}/>
    </NoBottomBarStack.Navigator>
    ) : (
      <UnauthStackScreen/>
    )}
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    paddingTop: isIphoneX() ? 10 : 0,
    height: bottomTabHeight,
    position: 'absolute',
  },
});

export default AppNavigator;

/*
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

*/