import React from 'react';
import {TouchableWithoutFeedback, FlatList, StyleSheet} from 'react-native';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';

const Container = Styled.View`
 background-color: #ffffff;
`;

const HeaderContainer = Styled.View`
padding-top: 15px;
padding-left: 16px;
padding-right: 16px;
`;

const RecommendUserText = Styled.Text`
 font-weight: 600;
 font-size: 18px;
 color: #333333;
`;

const RecommendUserListContainer = Styled.View`
padding-bottom: 10px;
`;

const RecommendUserItemContainer = Styled.View`
padding-left: 12px;
padding-top: 12px;
padding-right: 12px;
padding-bottom: 12px;
justify-content: center;
align-items: center;
`;

const UserProfileImage = Styled.Image`
 width: ${wp('12%')};
 height: ${wp('12%')};
 border-radius: 40px;
`;

const UserNicknameText = Styled.Text`
margin-top: 8px;
font-size: 13px;
color: #333333;
`;

const TEST_Recommend_USER = [
    {
        index: 1,
    },
    {
        index: 2,
    },
    {
        index: 3,
    },
    {
        index: 4,
    },
    {
        index: 5,
    },
    {
        index: 6,
    },
    {
        index: 7,
    }
]

interface Props {
    navigation: any,
    recommendUserListData: Array<object>,
}

const RecommendUser = ({navigation, recommendUserListData}: Props) => {

    const currentUser = useSelector((state) => state.currentUser);

   const moveToUserProfile = (nickname: string) => {
    if(currentUser.user?.nickname === nickname) {
        navigation.navigate("Profile")
    } else {
        navigation.navigate("AnotherUserProfileStack", {
          screen: "AnotherUserProfileScreen",
          params: {requestedUserNickname: nickname}
        });
    }
  }

    const renderRecommendUserItem = ({item, index}: any) => {
        return (
            <TouchableWithoutFeedback onPress={() => moveToUserProfile(item.nickname)}>
            <RecommendUserItemContainer style={index === 0 && styles.firstUserItem || index === recommendUserListData.length-1 && styles.lastUserItem}>
                <UserProfileImage
                source={{uri: item.profileImg ? item.profileImg : ""}}/>
                <UserNicknameText>{item.nickname}</UserNicknameText>
            </RecommendUserItemContainer>
            </TouchableWithoutFeedback>
            
        )
    }


    return (
        <Container>
            <HeaderContainer>
            <RecommendUserText>추천 친구</RecommendUserText>
            </HeaderContainer>
            <RecommendUserListContainer>
                <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={recommendUserListData}
                renderItem={renderRecommendUserItem}/>
            </RecommendUserListContainer>
        </Container>
    )
}

const styles = StyleSheet.create({
    firstUserItem : {
        marginLeft: 8
    },
    lastUserItem: {
        marginRight: 8
    }
})

export default RecommendUser;
