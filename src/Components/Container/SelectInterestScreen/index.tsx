import React from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, FlatList} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';


const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #ffffff;
 align-items: center;
`;


const HeaderBar = Styled.View`
 width: ${wp('100%')};
 height: ${wp('11.7%')};
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 background-color:#ffffff;
`;

const HeaderLeftContainer = Styled.View`
`;

const BackButtonContainer = Styled.View`
 padding: 7px 15px 13px 16px;
 align-items: center;
 justify-content: center;
`;

const BackButton = Styled.Image`
 width: ${wp('6.4%')};
 height: ${wp('6.4%')};
`;

const HeaderTitleText = Styled.Text`
font-weight: 600;
font-size: 18px;
color: #1D1E1F;
`;

const HeaderRightContainer = Styled.View`
padding: 7px 16px 13px 15px;
 align-items: center;
 justify-content: center;
 flex-direction: row;
`;

const HeaderEmptyContainer = Styled.View`
 width: ${wp('6.4%')};
 height: ${wp('6.4%')};
`;

const BodyContainer = Styled.View`
 width: ${wp('100%')};
 flex-direction: row;
`;

const InterestItemBackground = Styled.View`
 margin-left: 5px;
 padding-top: 10px;
 padding-bottom: 10px;
 padding-left: 14px;
 padding-right: 14px;
 background-color: #f7f7f7;
 border-radius: 20px;
`;

const InterestItemText = Styled.Text`
 font-size: 18px;
 color: #56575C;
`;



const SelectInterestScreen = () => {
    return (
        <Container>
            <HeaderBar>
                <HeaderLeftContainer>
                    <BackButtonContainer>
                        <BackButton
                        source={require('~/Assets/Images/HeaderBar/ic_back.png')}/>
                    </BackButtonContainer>
                </HeaderLeftContainer>
                <HeaderTitleText>관심사 선택</HeaderTitleText>
                <HeaderRightContainer>
                    <HeaderEmptyContainer/>
                </HeaderRightContainer>
            </HeaderBar>
            <BodyContainer>
                <InterestItemBackground>
                    <InterestItemText>음식</InterestItemText>
                </InterestItemBackground>

                <InterestItemBackground>
                    <InterestItemText>테크</InterestItemText>
                </InterestItemBackground>

                <InterestItemBackground>
                    <InterestItemText>영화·방송</InterestItemText>
                </InterestItemBackground>
                <InterestItemBackground>
                    <InterestItemText>여행</InterestItemText>
                </InterestItemBackground>
                <InterestItemBackground>
                    <InterestItemText>화장품</InterestItemText>
                </InterestItemBackground>
                <InterestItemBackground>
                    <InterestItemText>반려동물</InterestItemText>
                </InterestItemBackground>

            </BodyContainer>
        </Container>
    )
}

export default SelectInterestScreen;




