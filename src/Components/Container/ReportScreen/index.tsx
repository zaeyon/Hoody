import React, {useEffect, useState} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Local Component
import ReportChart from '~/Components/Presentational/ReportScreen/ReportChart';
import Top5TagList from '~/Components/Presentational/ReportScreen/Top5TagList';

const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #ffffff;
`;

const HeaderBar = Styled.View`
 width: ${wp('100%')};
 height: ${wp('13.8%')};
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 background-color:#ffffff;
`;

const HeaderLeftContainer = Styled.View`
padding-top: 14px;
padding-left: 16px;
padding-bottom: 12px;
padding-right: 16px;
align-items: center;
justify-content: center;
flex-direction: row;
`;

const HeaderReportIcon = Styled.Image`
width: ${wp('6.4%')};
height: ${wp('6.4%')};
`;

const HeaderTitleText = Styled.Text`
 margin-left: 3px;
 font-weight: 600;
 font-size: 24px;
 color: #1D1E1F;
 `;

const HeaderRightContainer = Styled.View`
padding-top: 14px;
padding-left: 16px;
padding-bottom: 12px;
padding-right: 16px;
 align-items: center;
 justify-content: center;
`;

const HeaderCancelIcon = Styled.Image`
width: ${wp('6.4%')};
height: ${wp('6.4%')};
`;

const BodyContainer = Styled.ScrollView`
flex: 1;
background-color: #ffffff;
`;

const MonthSelectContainer = Styled.View`
 padding-top: 25px;
 padding-left: 16px;
 padding-right: 16px;
 padding-bottom: 3px;
 background-color:#ffffff;
`;

const SelectedMonthText = Styled.Text`
 font-weight: bold;
 font-size: 25px;
 color: #000000;
`;

const TitleContainer = Styled.View`
 padding-top: 3px;
 padding-left: 16px;
 padding-right: 16px;
 padding-bottom: 10px;
 background-color:#FFFFFF;
`;

const TitleText = Styled.Text`
 font-weight: bold;
 font-size: 21px;
 color: #000000;
`;

const ReportChartContainer = Styled.View`
`;

const Top5TagListContainer = Styled.View`
`;

const IntervalContainer = Styled.View`
width: ${wp('100%')};
height: 9px;
background-color: #F4F4F6;
`;

interface Props {
    navigation: any,
    route: any,
}

const ReportScreen = ({navigation, route}: Props) => {
    const [top5TagType, setTop5TagType] = useState<string>("popular")

    const changeTop5TagType = (type:string) => {
        setTop5TagType(type)
    }

    return (
        <Container>
            <HeaderBar>
                <HeaderLeftContainer>
                    <HeaderReportIcon
                    source={require('~/Assets/Images/HeaderBar/ic_report.png')}/>
                    <HeaderTitleText>리포트</HeaderTitleText>
                </HeaderLeftContainer>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                <HeaderRightContainer>
                    <HeaderCancelIcon
                    source={require('~/Assets/Images/HeaderBar/ic_X.png')}/>
                </HeaderRightContainer>
                </TouchableWithoutFeedback>
            </HeaderBar>
            <BodyContainer
            showsVerticalScrollIndicator={false}>
                <MonthSelectContainer>
                    <SelectedMonthText>7월</SelectedMonthText>
                </MonthSelectContainer>
                <TitleContainer>
                    <TitleText>민정님의 소비만족도</TitleText>
                </TitleContainer>
                <ReportChartContainer>
                <ReportChart/>
                </ReportChartContainer>
                <IntervalContainer>
                </IntervalContainer>
                <Top5TagListContainer>
                <Top5TagList
                type={top5TagType}
                changeTop5TagType={changeTop5TagType}/>
                </Top5TagListContainer>
            </BodyContainer>
        </Container>
    )
}

export default ReportScreen;

