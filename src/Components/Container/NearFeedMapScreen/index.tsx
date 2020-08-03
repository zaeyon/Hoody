import React, {useEffect, useState} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {getStatusBarHeight} from 'react-native-status-bar-height';


const TEST_NEAR_FEED_DATA = {
  "postsNum": 18,
  "postsByAddress": {
    "서울특별시 중구 을지로3가": {
      "metaData": {
        "num": 14,
        "SumStarRate": 54.5,
        "AvgStarRate": 3.892857142857143,
        "lat": 37.5658,
        "long": 126.991,
        "coverImg": "https://d37gdtxv8z76fx.cloudfront.net/original/1594720526950IMG_0652.JPG"
      },
      "posts": [
        {
          "spendDate": "2020-07-14",
          "likes": 20,
          "expense": 7500,
          "starRate": 4,
          "createdAt": "2020-07-15T13:12:46.000Z",
          "commentsCount": 13,
          "replysCount": 4,
          "id": 31,
          "mainTags": {
            "name": "test"
          },
          "subTagOnes": {
            "name": "hello"
          },
          "subTagTwos": {
            "name": "world"
          },
          "address": {
            "address": "서울특별시 중구 을지로3가",
            "geographLong": 37.5658,
            "geographLat": 126.991,
            "region": "서울특별시 중구"
          },
          "mediaFiles": [
            {
              "filename": "original/1594818766512IMG_0652.JPG",
              "size": 143232,
              "mimetype": "image/jpeg",
              "index": 2,
              "url": "https://d37gdtxv8z76fx.cloudfront.net/original/1594818766512IMG_0652.JPG"
            }
          ]
        },
        {
          "spendDate": "2020-07-14",
          "likes": 6,
          "expense": 7500,
          "starRate": 4,
          "createdAt": "2020-07-15T11:16:27.000Z",
          "commentsCount": 0,
          "replysCount": 0,
          "id": 27,
          "mainTags": {
            "name": "test"
          },
          "subTagOnes": {
            "name": "hello"
          },
          "subTagTwos": {
            "name": "world"
          },
          "address": {
            "address": "서울특별시 중구 을지로3가",
            "geographLong": 37.5658,
            "geographLat": 126.991,
            "region": "서울특별시 중구"
          },
          "mediaFiles": [
            {
              "filename": "original/1594811787435IMG_0652.JPG",
              "size": 143232,
              "mimetype": "image/jpeg",
              "index": 2,
              "url": "https://d37gdtxv8z76fx.cloudfront.net/original/1594811787435IMG_0652.JPG"
            }
          ]
        },
        {
          "spendDate": "2020-07-14",
          "likes": 5,
          "expense": 7500,
          "starRate": 4,
          "createdAt": "2020-07-15T09:36:00.000Z",
          "commentsCount": 0,
          "replysCount": 0,
          "id": 26,
          "mainTags": {
            "name": "test"
          },
          "subTagOnes": {
            "name": "hello"
          },
          "subTagTwos": {
            "name": "world"
          },
          "address": {
            "address": "서울특별시 중구 을지로3가",
            "geographLong": 37.5658,
            "geographLat": 126.991,
            "region": "서울특별시 중구"
          },
          "mediaFiles": [
            {
              "filename": "original/1594805759542IMG_0652.JPG",
              "size": 143232,
              "mimetype": "image/jpeg",
              "index": 2,
              "url": "https://d37gdtxv8z76fx.cloudfront.net/original/1594805759542IMG_0652.JPG"
            }
          ]
        },
        {
          "spendDate": "2020-07-14",
          "likes": 3,
          "expense": 7500,
          "starRate": 4,
          "createdAt": "2020-07-15T07:26:12.000Z",
          "commentsCount": 0,
          "replysCount": 0,
          "id": 17,
          "mainTags": {
            "name": "test"
          },
          "subTagOnes": {
            "name": "hello"
          },
          "subTagTwos": {
            "name": "world"
          },
          "address": {
            "address": "서울특별시 중구 을지로3가",
            "geographLong": 37.5658,
            "geographLat": 126.991,
            "region": "서울특별시 중구"
          },
          "mediaFiles": [
            {
              "filename": "original/1594797972365IMG_0652.JPG",
              "size": 143232,
              "mimetype": "image/jpeg",
              "index": 2,
              "url": "https://d37gdtxv8z76fx.cloudfront.net/original/1594797972365IMG_0652.JPG"
            }
          ]
        },
        {
          "spendDate": "2020-07-14",
          "likes": 3,
          "expense": 7500,
          "starRate": 4,
          "createdAt": "2020-07-15T07:26:33.000Z",
          "commentsCount": 0,
          "replysCount": 0,
          "id": 18,
          "mainTags": {
            "name": "test"
          },
          "subTagOnes": {
            "name": "hello"
          },
          "subTagTwos": {
            "name": "world"
          },
          "address": {
            "address": "서울특별시 중구 을지로3가",
            "geographLong": 37.5658,
            "geographLat": 126.991,
            "region": "서울특별시 중구"
          },
          "mediaFiles": [
            {
              "filename": "original/1594797992819IMG_0652.JPG",
              "size": 143232,
              "mimetype": "image/jpeg",
              "index": 2,
              "url": "https://d37gdtxv8z76fx.cloudfront.net/original/1594797992819IMG_0652.JPG"
            }
          ]
        },
        {
          "spendDate": "2020-07-06",
          "likes": 0,
          "expense": null,
          "starRate": 3.5,
          "createdAt": "2020-07-06T11:30:08.000Z",
          "commentsCount": 0,
          "replysCount": 0,
          "id": 6,
          "mainTags": {
            "name": "test"
          },
          "subTagOnes": {
            "name": "hello"
          },
          "subTagTwos": {
            "name": "world"
          },
          "address": {
            "address": "서울특별시 중구 을지로3가",
            "geographLong": 37.5658,
            "geographLat": 126.991,
            "region": "서울특별시 중구"
          },
          "mediaFiles": [
            {
              "filename": "original/15940350080071591866431268IMG_1014.jpg",
              "size": 1183759,
              "mimetype": "image/jpeg",
              "index": 2,
              "url": "https://d37gdtxv8z76fx.cloudfront.net/original/15940350080071591866431268IMG_1014.jpg"
            }
          ]
        },
        {
          "spendDate": "2020-07-14",
          "likes": 0,
          "expense": 7500,
          "starRate": 4,
          "createdAt": "2020-07-14T09:58:33.000Z",
          "commentsCount": 0,
          "replysCount": 0,
          "id": 12,
          "mainTags": {
            "name": "test"
          },
          "subTagOnes": {
            "name": "hello"
          },
          "subTagTwos": {
            "name": "world"
          },
          "address": {
            "address": "서울특별시 중구 을지로3가",
            "geographLong": 37.5658,
            "geographLat": 126.991,
            "region": "서울특별시 중구"
          },
          "mediaFiles": [
            {
              "filename": "original/1594720713163IMG_0652.JPG",
              "size": 143232,
              "mimetype": "image/jpeg",
              "index": 2,
              "url": "https://d37gdtxv8z76fx.cloudfront.net/original/1594720713163IMG_0652.JPG"
            }
          ]
        },
        {
          "spendDate": "2020-07-14",
          "likes": 0,
          "expense": 7500,
          "starRate": 4,
          "createdAt": "2020-07-14T09:53:49.000Z",
          "commentsCount": 0,
          "replysCount": 0,
          "id": 9,
          "mainTags": {
            "name": "test"
          },
          "subTagOnes": {
            "name": "hello"
          },
          "subTagTwos": {
            "name": "world"
          },
          "address": {
            "address": "서울특별시 중구 을지로3가",
            "geographLong": 37.5658,
            "geographLat": 126.991,
            "region": "서울특별시 중구"
          },
          "mediaFiles": [
            {
              "filename": "original/1594720428725IMG_0652.JPG",
              "size": 143232,
              "mimetype": "image/jpeg",
              "index": 2,
              "url": "https://d37gdtxv8z76fx.cloudfront.net/original/1594720428725IMG_0652.JPG"
            }
          ]
        },
        {
          "spendDate": "2020-07-06",
          "likes": 0,
          "expense": 10000,
          "starRate": 3.5,
          "createdAt": "2020-07-06T09:28:10.000Z",
          "commentsCount": 0,
          "replysCount": 0,
          "id": 4,
          "mainTags": {
            "name": "test"
          },
          "subTagOnes": {
            "name": "hello"
          },
          "subTagTwos": {
            "name": "world"
          },
          "address": {
            "address": "서울특별시 중구 을지로3가",
            "geographLong": 37.5658,
            "geographLat": 126.991,
            "region": "서울특별시 중구"
          },
          "mediaFiles": [
            {
              "filename": "original/15940276899231591866431268IMG_1014.jpg",
              "size": 1183759,
              "mimetype": "image/jpeg",
              "index": 2,
              "url": "https://d37gdtxv8z76fx.cloudfront.net/original/15940276899231591866431268IMG_1014.jpg"
            }
          ]
        },
        {
          "spendDate": "2020-07-14",
          "likes": 0,
          "expense": 7500,
          "starRate": 4,
          "createdAt": "2020-07-15T06:06:15.000Z",
          "commentsCount": 0,
          "replysCount": 0,
          "id": 16,
          "mainTags": {
            "name": "test"
          },
          "subTagOnes": {
            "name": "hello"
          },
          "subTagTwos": {
            "name": "world"
          },
          "address": {
            "address": "서울특별시 중구 을지로3가",
            "geographLong": 37.5658,
            "geographLat": 126.991,
            "region": "서울특별시 중구"
          },
          "mediaFiles": [
            {
              "filename": "original/1594793170980IMG_0652.JPG",
              "size": 143232,
              "mimetype": "image/jpeg",
              "index": 2,
              "url": "https://d37gdtxv8z76fx.cloudfront.net/original/1594793170980IMG_0652.JPG"
            }
          ]
        },
        {
          "spendDate": "2020-07-14",
          "likes": 0,
          "expense": 7500,
          "starRate": 4,
          "createdAt": "2020-07-14T09:56:11.000Z",
          "commentsCount": 0,
          "replysCount": 0,
          "id": 11,
          "mainTags": {
            "name": "test"
          },
          "subTagOnes": {
            "name": "hello"
          },
          "subTagTwos": {
            "name": "world"
          },
          "address": {
            "address": "서울특별시 중구 을지로3가",
            "geographLong": 37.5658,
            "geographLat": 126.991,
            "region": "서울특별시 중구"
          },
          "mediaFiles": [
            {
              "filename": "original/1594720570856IMG_0652.JPG",
              "size": 143232,
              "mimetype": "image/jpeg",
              "index": 2,
              "url": "https://d37gdtxv8z76fx.cloudfront.net/original/1594720570856IMG_0652.JPG"
            }
          ]
        },
        {
          "spendDate": "2020-07-06",
          "likes": 0,
          "expense": 7500,
          "starRate": 3.5,
          "createdAt": "2020-07-06T11:30:43.000Z",
          "commentsCount": 1,
          "replysCount": 0,
          "id": 7,
          "mainTags": {
            "name": "test"
          },
          "subTagOnes": {
            "name": "hello"
          },
          "subTagTwos": {
            "name": "world"
          },
          "address": {
            "address": "서울특별시 중구 을지로3가",
            "geographLong": 37.5658,
            "geographLat": 126.991,
            "region": "서울특별시 중구"
          },
          "mediaFiles": [
            {
              "filename": "original/15940350429121591866431268IMG_1014.jpg",
              "size": 1183759,
              "mimetype": "image/jpeg",
              "index": 2,
              "url": "https://d37gdtxv8z76fx.cloudfront.net/original/15940350429121591866431268IMG_1014.jpg"
            }
          ]
        },
        {
          "spendDate": "2020-07-14",
          "likes": 0,
          "expense": 7500,
          "starRate": 4,
          "createdAt": "2020-07-14T09:59:01.000Z",
          "commentsCount": 0,
          "replysCount": 0,
          "id": 13,
          "mainTags": {
            "name": "test"
          },
          "subTagOnes": {
            "name": "hello"
          },
          "subTagTwos": {
            "name": "world"
          },
          "address": {
            "address": "서울특별시 중구 을지로3가",
            "geographLong": 37.5658,
            "geographLat": 126.991,
            "region": "서울특별시 중구"
          },
          "mediaFiles": [
            {
              "filename": "original/1594720740930IMG_0652.JPG",
              "size": 143232,
              "mimetype": "image/jpeg",
              "index": 2,
              "url": "https://d37gdtxv8z76fx.cloudfront.net/original/1594720740930IMG_0652.JPG"
            }
          ]
        },
        {
          "spendDate": "2020-07-14",
          "likes": 0,
          "expense": 7500,
          "starRate": 4,
          "createdAt": "2020-07-14T09:55:27.000Z",
          "commentsCount": 0,
          "replysCount": 0,
          "id": 10,
          "mainTags": {
            "name": "test"
          },
          "subTagOnes": {
            "name": "hello"
          },
          "subTagTwos": {
            "name": "world"
          },
          "address": {
            "address": "서울특별시 중구 을지로3가",
            "geographLong": 37.5658,
            "geographLat": 126.991,
            "region": "서울특별시 중구"
          },
          "mediaFiles": [
            {
              "filename": "original/1594720526950IMG_0652.JPG",
              "size": 143232,
              "mimetype": "image/jpeg",
              "index": 2,
              "url": "https://d37gdtxv8z76fx.cloudfront.net/original/1594720526950IMG_0652.JPG"
            }
          ]
        }
      ]
    },
    "서울특별시 중구 을지로4가": {
      "metaData": {
        "num": 1,
        "SumStarRate": 3.8,
        "AvgStarRate": 3.8,
        "lat": 37.5652,
        "long": 126.99,
        "coverImg": ""
      },
      "posts": [
        {
          "spendDate": "2020-07-14",
          "likes": 0,
          "expense": 7500,
          "starRate": 3.8,
          "createdAt": "2020-07-28T06:36:49.000Z",
          "commentsCount": 5,
          "replysCount": 1,
          "id": 33,
          "mainTags": {
            "name": "testing"
          },
          "subTagOnes": {
            "name": "hellooo"
          },
          "subTagTwos": {
            "name": "worlddd"
          },
          "address": {
            "address": "서울특별시 중구 을지로4가",
            "geographLong": 37.5652,
            "geographLat": 126.99,
            "region": "서울특별시 중구"
          },
          "mediaFiles": []
        }
      ]
    },
    "성북초등학교": {
      "metaData": {
        "num": 1,
        "SumStarRate": 3.5,
        "AvgStarRate": 3.5,
        "lat": 37.5936,
        "long": 126.998,
        "coverImg": "https://d37gdtxv8z76fx.cloudfront.net/original/15941037553741591866431268IMG_1014.jpg"
      },
      "posts": [
        {
          "spendDate": "2020-07-06",
          "likes": 0,
          "expense": 7500,
          "starRate": 3.5,
          "createdAt": "2020-07-07T06:35:56.000Z",
          "commentsCount": 0,
          "replysCount": 0,
          "id": 8,
          "mainTags": {
            "name": "test"
          },
          "subTagOnes": {
            "name": "hello"
          },
          "subTagTwos": {
            "name": "world"
          },
          "address": {
            "address": "성북초등학교",
            "geographLong": 37.5936,
            "geographLat": 126.998,
            "region": "서울특별시 성북구"
          },
          "mediaFiles": [
            {
              "filename": "original/15941037553741591866431268IMG_1014.jpg",
              "size": 1183759,
              "mimetype": "image/jpeg",
              "index": 2,
              "url": "https://d37gdtxv8z76fx.cloudfront.net/original/15941037553741591866431268IMG_1014.jpg"
            }
          ]
        }
      ]
    },
    "서울특별시 중구 을지로3가 홍원빌": {
      "metaData": {
        "num": 1,
        "SumStarRate": 3.5,
        "AvgStarRate": 3.5,
        "lat": 37.5657,
        "long": 126.991,
        "coverImg": "https://d37gdtxv8z76fx.cloudfront.net/original/15940322460351591866431268IMG_1014.jpg"
      },
      "posts": [
        {
          "spendDate": "2020-07-06",
          "likes": 0,
          "expense": 0,
          "starRate": 3.5,
          "createdAt": "2020-07-06T10:44:06.000Z",
          "commentsCount": 0,
          "replysCount": 0,
          "id": 5,
          "mainTags": {
            "name": "test2"
          },
          "subTagOnes": {
            "name": "hello2"
          },
          "subTagTwos": {
            "name": "world2"
          },
          "address": {
            "address": "서울특별시 중구 을지로3가 홍원빌",
            "geographLong": 37.5657,
            "geographLat": 126.991,
            "region": "서울특별시 중구"
          },
          "mediaFiles": [
            {
              "filename": "original/15940322460351591866431268IMG_1014.jpg",
              "size": 1183759,
              "mimetype": "image/jpeg",
              "index": 2,
              "url": "https://d37gdtxv8z76fx.cloudfront.net/original/15940322460351591866431268IMG_1014.jpg"
            }
          ]
        }
      ]
    },
    "114-6 Eulji-ro Jung-gu Seoul": {
      "metaData": {
        "num": 1,
        "SumStarRate": 3.8,
        "AvgStarRate": 3.8,
        "lat": 37.5658111,
        "long": 126.991111,
        "coverImg": ""
      },
      "posts": [
        {
          "spendDate": "2020-07-06",
          "likes": 0,
          "expense": null,
          "starRate": 3.8,
          "createdAt": "2020-07-06T09:26:30.000Z",
          "commentsCount": 0,
          "replysCount": 0,
          "id": 3,
          "mainTags": {
            "name": "testUpdate"
          },
          "subTagOnes": {
            "name": "hello"
          },
          "subTagTwos": {
            "name": "world"
          },
          "address": {
            "address": "114-6 Eulji-ro Jung-gu Seoul",
            "geographLong": 37.5658,
            "geographLat": 126.991,
            "region": "서울특별시 중구"
          },
          "mediaFiles": []
        }
      ]
    }
  }
}




const Container = Styled.View`
 flex: 1;
 background-color:#ffffff;
`

const HeaderBar = Styled.View`
 width: ${wp('100%')};
 height: ${wp('13.86%')};
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 background-color:#ffffff;
 padding-bottom: 7px;
`;

const HeaderLeftContainer = Styled.View`
padding-left: 16px;
padding-bottom: 13px;
padding-top: 15px;
padding-right: 16px;
background-color: #ffffff;
justify-content: center;
align-items: center;
`;


const HeaderRightContainer = Styled.View`
padding-left: 16px;
padding-bottom: 13px;
padding-top: 15px;
padding-right: 16px;
justify-content: center;
align-items: center;
background-color: #ffffff;
`;

const HeaderTitleText = Styled.Text`
 font-size: 20px;
 margin-left: 6px;
`;

const BackButton = Styled.Image`
width: ${wp('6.4%')};
height: ${wp('6.4%')};
`;

const ButtonText = Styled.Text`
 font-size: 20px;
 color: #338EFC;
`;

const HeaderBorder = Styled.View`
 width: ${wp('100%')};
 height: 1px;
 background-color: #F1F1F1;
`;


const MarkerThumbnailImage = Styled.Image`
 width: 50px;
 height: 50px;
 border-radius: 50px;
`;

const MarkerThumbnailContainer = Styled.View`
 flex:1;
 justify-content: center;
 align-items: center;
 padding-top: 4.2px;
 padding-left: 7px;
`;



const SmallMarkerThumbnailImage = Styled.Image`
 width: 34px;
 height: 34px;
 border-radius: 50px;
`;

const SmallMarkerThumbnailContainer = Styled.View`
 flex:1;
 justify-content: center;
 align-items: center;
 padding-top: 4.2px;
 padding-left: 7px;
`;




interface Props {
    navigation: any,
    route: any,
}

const NearFeedMapScreen = ({navigation, route}: Props) => {
    const [nearFeedListData, setNearFeedListData] = useState<Array<object>>([]);

    const LatLng = {
      latitude: 37.567859,
      longitude: 126.998215,
    }

    useEffect(() => {
        if(route.params?.currentLatitude) {
            console.log("route.params.currentLatitude,", route.params.currentLatitude)
            console.log("route.params.currentLongitude,", route.params.currentLongitude)
        }
    }, [])

    useEffect(() => {
      var tmpNearFeedListData = new Array();
      for(const[key, value] of Object.entries(TEST_NEAR_FEED_DATA.postsByAddress)) {
        tmpNearFeedListData.push({
          location: key,
          post: value,
        })
      }

      setTimeout(() => {
        console.log("tmpNearFeedListData", tmpNearFeedListData);
        setNearFeedListData(tmpNearFeedListData);
      })
    }, [])


  return (
    <Container>

<HeaderBar style={{marginTop:getStatusBarHeight()}}>
        <HeaderLeftContainer>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <BackButton source={require('~/Assets/Images/HeaderBar/ic_X.png')} />
          </TouchableWithoutFeedback>
        </HeaderLeftContainer>
        <HeaderRightContainer>
        </HeaderRightContainer>
      </HeaderBar>
    <MapView
      style={{flex:1}}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: 37.567859,
        longitude: 126.998215,
        latitudeDelta: 0.0022,
        longitudeDelta: 0.0421,
      }}>

        {nearFeedListData?.map(location => {
          if(location.post.metaData.num >= 10) {
            return (
          <Marker
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          coordinate={{
            latitude: location.post.metaData.lat,
            longitude: location.post.metaData.long,
          }}
          image={require('~/Assets/Images/Map/ic_marker_big.png')}>
            <MarkerThumbnailContainer>
              <MarkerThumbnailImage
              source={{uri:location.post.metaData.coverImg}}/>
            </MarkerThumbnailContainer>
          </Marker>
        )} else if(location.post.metaData.num < 10) {
          return (
            <Marker
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          coordinate={{
            latitude: location.post.metaData.lat,
            longitude: location.post.metaData.long,
          }}
          image={require('~/Assets/Images/Map/ic_marker_small.png')}>
            <SmallMarkerThumbnailContainer>
              <SmallMarkerThumbnailImage
              source={{uri:location.post.metaData.coverImg}}/>
            </SmallMarkerThumbnailContainer>
          </Marker>
          )}
        })}
      </MapView>
    </Container>
  );
}

export default NearFeedMapScreen;