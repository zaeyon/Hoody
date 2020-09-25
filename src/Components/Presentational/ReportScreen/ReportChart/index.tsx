import React, { useEffect, useState } from 'react';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Dash from 'react-native-dash';
import { FlatList } from 'react-native-gesture-handler';

const Container = Styled.View`
margin-top: 10px
padding-top: 30px;
 padding-left: 16px;
 padding-right: 16px;
 padding-bottom: 0px;
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

const BarChartContainer = Styled.View`
width: ${wp('91.46%')};
background-color: #ffffff;
padding-bottom: 30px;
background-color: #ffffff;
align-items: center;
`;

const BarChartBackground = Styled.View`
width: ${wp('91.46%')};
height: ${wp('40.46%')};
background-color: #fafafa;
`;

const BarChartDividerContainer = Styled.View`
flex: 1;
justify-content: space-between;
`;

const BarChartDivider = Styled.View`
 background-color: #ECECEE;
 width: ${wp('91.46%')};
 height: 2px;
`;

const MaximumExpenseContainer = Styled.View`
 padding-left: 6.24px;
 padding-right: 6.24px;
 height: ${wp('6%')};
 background: #FFDB4D;
 position: absolute;
 top: -${wp('5.5%')};
 left: 0;
 align-items: center;
 justify-content: center;
`;

const WeekBarChartContainer = Styled.View`
position: absolute;
bottom: 0;
left: 0;
width: ${wp('91.46%')};
height: ${wp('40.46%')};
`;

const MaximumExpenseText = Styled.Text`
font-weight: 500;
font-size: 13px;
color: #1D1E1F;
`;

const WeekBarContainer = Styled.View`
width: ${wp('18.292%')};
align-items: center;
`;

const WeekBar = Styled.View`
width: ${wp('2.7%')};
background: #65A2FF;
height: 100px;
`;

const WeekBarXaxis = Styled.Text`
font-weight: 500;
font-size: 14px;
color: #8E9199;
`;

const WeekBarTotalExpenseText = Styled.Text`
margin-top: 2px;
font-weight: 500;
font-size: 14px;
color: #8E9199;
`;

const WeekBarXaxisContainer = Styled.View`
margin-top: 8px;
width: ${wp('91.46%')};
`;

const WeekBarXaxisItemContainer = Styled.View`
width: ${wp('18.292%')};
align-items: center;
`;

interface Props {
    weekListData: Array<object>,
    maximumExpense: number,
}

const ReportChart = ({weekListData, maximumExpense}: Props) => {
    console.log("ReportChart weekListData", weekListData);
    
    const renderWeekItem = ({item, index}: any) => {
        console.log("renderWeekItem item", item);
        return (
         <WeekBarContainer style={{justifyContent:'flex-end'}}>
            <WeekBar style={item.data.TotalExpense == maximumExpense ? {height: wp('40.46%'), backgroundColor: "#267DFF"} : {height: wp('40.46%') * ((item.data.TotalExpense ? item.data.TotalExpense : 0)/ (maximumExpense ? maximumExpense : 1))}}/>
        </WeekBarContainer>
        )
    }

        
    const renderWeekXaxisItem = ({item, index}: any) => {
      return (
        <WeekBarXaxisItemContainer>
          <WeekBarXaxis style={item.week === "ThisWeek" && {color: '#1D1E1F'}}>{item.week === "ThisWeek" ? "이번 주" : item.data.weeks + "째 주"}</WeekBarXaxis>
          <WeekBarTotalExpenseText style={item.week === "ThisWeek" && {color: '#1D1E1F'}}>{item.data.TotalExpense ? Number(item.data.TotalExpense).toLocaleString() + "원" : "0원"}</WeekBarTotalExpenseText>
        </WeekBarXaxisItemContainer>
      )
    }
    
    return (
        <Container>
                <BarChartContainer>
                    <BarChartBackground>
                        <BarChartDividerContainer>
                            <Dash 
                            style={{width:wp('91.1%')}}
                            dashLength={7}
                            dashThickness={2}
                            dashColor={"#FFDB4D"}/>
                            <BarChartDivider/>
                            <BarChartDivider/>
                            <BarChartDivider/>
                            <BarChartDivider/>
                            <BarChartDivider/>
                        </BarChartDividerContainer>
                <WeekBarChartContainer>
                <FlatList
                scrollEnabled={false}
                style={{width: wp('91.46%'), height: wp('40.46%')}}
                data={weekListData}
                horizontal={true}
                renderItem={renderWeekItem}/>
                </WeekBarChartContainer>
                    </BarChartBackground>
                <WeekBarXaxisContainer>
                <FlatList
                scrollEnabled={false}
                data={weekListData}
                horizontal={true}
                renderItem={renderWeekXaxisItem}/>
                </WeekBarXaxisContainer>
                <MaximumExpenseContainer>
                    <MaximumExpenseText>{Number(maximumExpense)?.toLocaleString() + "원"}</MaximumExpenseText>
                </MaximumExpenseContainer>
                </BarChartContainer>
        </Container>
    )
}

export default ReportChart





