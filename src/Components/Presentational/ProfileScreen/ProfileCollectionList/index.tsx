import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Text, FlatList, TouchableWithoutFeedback} from 'react-native';
import {useSelector} from 'react-redux';

import ProfileCollectionItem from '~/Components/Presentational/ProfileScreen/ProfileCollectionItem';

const UserCollectionListContainer = Styled.View`
width: ${wp('100%')};
background-color: #ffffff;
padding-bottom: 150px;
`;

const NoCollectionContainer = Styled.View`
 
 padding-top: ${hp('19%')}px;
 background-color: #ffffff;
 align-items: center;
 justify-content: center;
`;

const CurrentUserCollectionListContainer = Styled.View`

`;

const AddCollectionButton = Styled.View`
 background-color:#EFEFEF;
 width: ${wp('43.7%')};
 height: ${wp('43.7%')};
 justify-content: center;
 align-items: center;
 border-radius: 10px;
`;

const AddCollectionIcon = Styled.Image`
 width: ${wp('10.6%')};
 height: ${wp('10.6%')};
`;

const AddCollectionMainText = Styled.Text`
 margin-top: 25px;
 font-size: 19px;
 color: #3384FF;
 font-weight: 600;
`;

const AddCollectionSubText = Styled.Text`
margin-top: 10px;
font-size: 16px;
color: #4b4b4b;
`;

const CollectionItemContainer = Styled.View`
`;


const NoCollectionMainText = Styled.Text`
 font-size: 19px;
 font-weight: 600;
 color: #1D1E1F;
 `;

 const NoCollectionSubText = Styled.Text`
 font-size: 16px;
 color: #56575C;
 `;

interface Props {
    collectionListData: Array<object>;
    navigation: any,
    profileNickname: string,
    profileImage: string,
    requestNickname: string,
}

const ProfileCollectionList = ({collectionListData, navigation, profileNickname, profileImage, requestNickname}: Props) => {
    const [addNewCollection, setAddNewCollection] = useState<boolean>(true);
    const currentUser = useSelector((state) => state.currentUser);

    console.log("ProfileCollectionList requestNickname", requestNickname);
    console.log("ProfileCollectionList currentUser.user.nickname", currentUser.user.nickname);
    
    useEffect(() => {
        console.log("collectionList", collectionListData)  
    }, [])

    
  const moveToCollectionUpload = () => {
    navigation.navigate("CollectionStack", {
      screen:"CollectionUploadScreen"
    })
  }

    const renderProfileCollectionItem = ({item, index}) => {
           return (
            <CollectionItemContainer
            style={index == collectionListData.length-1}>
            <ProfileCollectionItem
            collectionId={item.id}
            coverImage={item.thumbnailImg ? item.thumbnailImg : ""}
            name={item.name}
            navigation={navigation}
            profileNickname={profileNickname}
            profileImage={profileImage}
            />
            </CollectionItemContainer>
           )
    }

    if(!collectionListData[0]) {
    if(currentUser.user?.nickname === requestNickname) {
        return (
            <NoCollectionContainer>
                <NoCollectionMainText>첫 컬렉션을 만들어 보세요 ;)</NoCollectionMainText>
                <NoCollectionSubText>나만의 키워드로 게시글을 분류할 수 있어요.</NoCollectionSubText>
            </NoCollectionContainer>
        )
    } else if(currentUser.user?.nickname !== requestNickname) {
        return (
            <NoCollectionContainer>
                <NoCollectionMainText>등록된 컬렉션이 없네요.</NoCollectionMainText>
            </NoCollectionContainer>
        )
    }
    } else {
        return (
            <UserCollectionListContainer>
                <FlatList
                scrollEnabled={false}
                contentContainerStyle={{paddingBottom:0}}
                columnWrapperStyle={{justifyContent:'space-between', paddingLeft:15, paddingRight:15, paddingTop:17, paddingBottom:10, backgroundColor:'#ffffff'}}
                numColumns={2}
                data={collectionListData}
                renderItem={renderProfileCollectionItem}
                />
            </UserCollectionListContainer>
        )
    }
}

export default ProfileCollectionList;