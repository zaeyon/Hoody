import React from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Container = Styled.View`
 padding-top: 20px;
 padding-left: 16px;
 padding-right: 16px;
 background-color: #FFFFFF;
`;

const ConsumpInfoContainer = Styled.View`
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
`;

const ConsumpInfoItemContainer = Styled.View`
`;

const ConsumpInfoRatingContainer = Styled.View`
 flex-direction: row;
 align-items: center;
`;

const ConsumpInfoLabelText = Styled.Text`
font-weight: 500;
font-size: 14px;
color: #1D1E1F;
`;

const ConsumpInfoRatingStarIcon = Styled.Image`
margin-top: 5px;
 width: ${wp('4.53%')};
 height: ${wp('4.53%')};
`;

const ConsumpInfoContentText = Styled.Text`
margin-top: 5px;
font-weight: 500;
font-size: 20px;
color: #1D1E1F;
`;

const ConsumpChart = Styled.View`
width: ${wp('91.46%')};
height: ${wp('46.66%')};
background-color: #c3c3c3;
`;


const ConsumpChartContainer = Styled.View`
padding-top: 40px;
padding-bottom: 24px;
background-color: #ffffff;
align-items: center;
`;

interface Props {
    avgRating: number,
    avgExpense: any,
    postCount: number,
}



const AverageInfo = ({avgRating, avgExpense, postCount}: Props) => {
    return (
        <Container>
            <ConsumpInfoContainer>
                <ConsumpInfoItemContainer>
                    <ConsumpInfoLabelText>평균 만족도</ConsumpInfoLabelText>
                    <ConsumpInfoRatingContainer>
                    <ConsumpInfoRatingStarIcon
                    source={require('~/Assets/Images/ic_newStar.png')}/>
                    <ConsumpInfoContentText
                    style={{marginLeft:3.5}}>{Number(avgRating).toFixed(1) + "점"}</ConsumpInfoContentText>
                    </ConsumpInfoRatingContainer>
                </ConsumpInfoItemContainer>
                <ConsumpInfoItemContainer>
                    <ConsumpInfoLabelText>평균 소비금액</ConsumpInfoLabelText>
                    <ConsumpInfoContentText>{avgExpense ? (avgExpense.toLocaleString() + "원") : "0원"}</ConsumpInfoContentText>
                </ConsumpInfoItemContainer>
                <ConsumpInfoItemContainer>
                    <ConsumpInfoLabelText>총 게시글</ConsumpInfoLabelText>
                    <ConsumpInfoContentText>{postCount ? postCount + "개" : "0개"}</ConsumpInfoContentText>
                </ConsumpInfoItemContainer>
            </ConsumpInfoContainer>
        </Container>
    )
}

export default AverageInfo





