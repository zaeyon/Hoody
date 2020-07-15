import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Text, FlatList, TouchableWithoutFeedback} from 'react-native';

import ProfileCollectionItem from '~/Components/Presentational/ProfileScreen/ProfileCollectionItem';

const UserCollectionListContainer = Styled.View`
width: ${wp('100%')};
background-color: #ffffff;
padding-bottom: 350px;

`;

const NoCollectionContainer = Styled.View`
 padding-top: 76px;
 background-color: #ffffff;
 align-items: center;
 justify-content: center;
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

interface Props {
    collectionListData: Array<object>;
    navigation: any,
}

const ProfileCollectionList = ({collectionListData, navigation}: Props) => {
    const [addNewCollection, setAddNewCollection] = useState<boolean>(true);
    
    useEffect(() => {
        console.log("collectionList", collectionListData)  
    }, [])

    const renderProfileCollectionItem = ({item, index}) => {
           return (
            <ProfileCollectionItem
            coverImage={item.coverImage}
            name={item.name}
            navigation={navigation}
            />
           )
    }

    if(!collectionListData[0]) {
    return (
        <NoCollectionContainer>
        <TouchableWithoutFeedback onPress={() => navigation.navigate("CollectionUploadScreen")}>
        <AddCollectionButton>
            <AddCollectionIcon
            source={require('~/Assets/Images/ic_bluePlus.png')}
            />
        </AddCollectionButton>
        </TouchableWithoutFeedback>
        <AddCollectionMainText>첫 컬렉션을 만들어 보세요 :)</AddCollectionMainText>
        <AddCollectionSubText>나만의 키워드로 게시글들을 분류할 수 있어요.</AddCollectionSubText>
    </NoCollectionContainer>
    )
    } else {
        return (
            <UserCollectionListContainer>
                <FlatList
                columnWrapperStyle={{justifyContent:'space-between', paddingLeft:15, paddingRight:15, paddingTop:17, paddingBottom:0}}
                numColumns={2}
                data={collectionListData}
                renderItem={renderProfileCollectionItem}
                />
            </UserCollectionListContainer>
        )
    }
}

export default ProfileCollectionList;