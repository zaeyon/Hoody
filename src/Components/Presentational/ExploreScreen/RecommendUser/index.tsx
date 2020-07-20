import React from 'react';
import {TouchableWithoutFeedback, FlatList, StyleSheet} from 'react-native';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

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
}

const RecommendUser = ({navigation}: Props) => {

    const renderRecommendUserItem = ({item, index}: any) => {
        return (
            <TouchableWithoutFeedback onPress={() => navigation.navigate("Profile")}>
            <RecommendUserItemContainer style={index === 0 && styles.firstUserItem || index === TEST_Recommend_USER.length-1 && styles.lastUserItem}>
                <UserProfileImage
                source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQosaN09yAK9bRLHqPmgL2OlTVWJIH1z8oddA&usqp=CAU'}}/>
                <UserNicknameText>하하핳</UserNicknameText>
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
                data={TEST_Recommend_USER}
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
