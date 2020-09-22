import React, {useEffect, useState} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, Picker, StyleSheet, View} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';

// Local Component
import ReportChart from '~/Components/Presentational/ReportScreen/ReportChart';
import Top5TagList from '~/Components/Presentational/ReportScreen/Top5TagList';
import TopLocationList from '~/Components/Presentational/ReportScreen/TopLocationList';

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

const SelectDateContainer = Styled.View`
padding-top: 18px;
padding-left: 13px;
padding-right: 16px;
padding-bottom: 3px;
flex-direction: row;
align-items:center;
`;
const MonthSelectContainer = Styled.View`
 margin-left: 7px;
 background-color:#ffffff;
`;

const SelectedMonthText = Styled.Text`
 font-weight: bold;
 font-size: 25px;
 color: #000000;
`;


const YearSelectContainer = Styled.View`
margin-left: 5px;
 background-color:#ffffff;
`;

const SelectedYearText = Styled.Text`
 font-weight: bold;
 font-size: 25px;
 color: #000000;
`;

const DropdownIcon = Styled.Image`
 width: ${wp('3.2%')};
 height: ${wp('3.2%')};
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

const TopLocationListContainer = Styled.View`
 padding-bottom: 50px;
`;

const IntervalContainer = Styled.View`
width: ${wp('100%')};
height: 9px;
background-color: #F4F4F6;
`;
const YearPickerContainer = Styled.View`
border-top-left-radius: 10px;
border-top-right-radius: 10px;
 width:${wp('100%')};
 height: ${wp('60%')};
 background-color: #ffffff;
`;

const MonthPickerContainer = Styled.View`
border-top-left-radius: 10px;
border-top-right-radius: 10px;
 width:${wp('100%')};
 height: ${wp('60%')};
 background-color: #ffffff;
`;


const PickerHeaderContainer = Styled.View`
 border-width: 0.6px;
 border-color: #ECECEE;
 width: ${wp('100%')};
 height: ${wp('11.2%')};
 background-color: #FAFAFA;
 flex-direction: row;
 justify-content: flex-end;
 align-items: center;
 padding-left: 16px;
 position: absolute;
 top: 0;
`;

const PickerFinishContainer = Styled.View`
padding-top: 12px;
padding-bottom: 12px;
padding-right: 16px
`;

const PickerFinishText = Styled.Text`
 font-size: 16px;
 color: #267DFF;
`;

const YEAR_LIST = [
    2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000, 1999, 1998, 1997, 1996, 1995, 1994, 1993, 1992, 1991, 1990, 1989, 1988, 1987, 1986, 1985, 1984, 1983, 1982, 1981, 1980,
  ]
  
  const MONTH_LIST = [
    12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1
  ]
  

interface Props {
    navigation: any,
    route: any,
}

const ReportScreen = ({navigation, route}: Props) => {

    const getCurrentYear = (date: Date) => {
        return date.getFullYear();
      }
    
      const getCurrentMonth = (date: Date) => {
        return date.getMonth() + 1;
      }
    
    const [top5TagType, setTop5TagType] = useState<string>("popular")
    const [topLocationType, setTopLocationType] = useState<string>("popular");
    const [visibleYearPicker, setVisibleYearPicker] = useState<boolean>(false);
    const [visibleMonthPicker, setVisibleMonthPicker] = useState<boolean>(false);
    const [selectedYear, setSelectedYear] = useState<number>(getCurrentYear(new Date()));
    const [changingYear, setChangingYear] = useState<number>(getCurrentYear(new Date()));
    const [selectedMonth, setSelectedMonth] = useState<number>(getCurrentMonth(new Date()));
    const [changingMonth, setChangingMonth] = useState<number>(getCurrentMonth(new Date()));

    const changeTop5TagType = (type:string) => {
        setTop5TagType(type);
    }

    const changeTopLocationType = (type:string) => {
        setTopLocationType(type);
    }


  const openYearPicker = () => {
    setVisibleYearPicker(true);
  }

  const selectYearPicker = () => {
    setVisibleYearPicker(false);

    if(changingYear != selectedYear) {
      setSelectedYear(changingYear)
    }
  }

  const cancelYearPicker = () => {
    setChangingYear(selectedYear);
    setVisibleYearPicker(false);
  }

  const openMonthPicker = () => {
    setVisibleMonthPicker(true);
  }

  const selectMonthPicker = () => {
    setSelectedMonth(changingMonth);
    setVisibleMonthPicker(false);

    if(changingMonth != selectedMonth) {
      setSelectedMonth(changingMonth);
    }
  }

  const cancelMonthPicker = () => {
    setChangingMonth(selectedMonth);
    setVisibleMonthPicker(false);
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
                <SelectDateContainer>
                <TouchableWithoutFeedback onPress={() => openYearPicker()}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                <YearSelectContainer>
                    <SelectedYearText>{selectedYear + "년"}</SelectedYearText>
                </YearSelectContainer>
                </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => openMonthPicker()}>
                <View style={{flexDirection:'row', alignItems: 'center'}}>
                <MonthSelectContainer>
                    <SelectedMonthText>{selectedMonth + "월"}</SelectedMonthText>
                </MonthSelectContainer>
                <DropdownIcon
                style={{marginLeft:5}}
                source={require('~/Assets/Images/Report/ic_dropdown.png')}/>
                </View>
                </TouchableWithoutFeedback>
                </SelectDateContainer>
                <TitleContainer>
                    <TitleText>재연님의 소비만족도</TitleText>
                </TitleContainer>
                <ReportChartContainer>
                <ReportChart/>
                </ReportChartContainer>
                <IntervalContainer>
                </IntervalContainer>
                <Top5TagListContainer>
                <Top5TagList
                type={top5TagType}
                changeTop5TagType={changeTop5TagType}
                navigation={navigation}/>
                </Top5TagListContainer>
                <IntervalContainer/>
                <TopLocationListContainer>
                <TopLocationList
                type={topLocationType}
                changeTopLocationType={changeTopLocationType}
                navigation={navigation}/>
                </TopLocationListContainer>
            </BodyContainer>
            <Modal
          isVisible={visibleYearPicker}
          onBackdropPress={() => cancelYearPicker()}
          backdropOpacity={0.25}
          style={styles.modalView}>
          <YearPickerContainer>
            <Picker
            selectedValue={changingYear}
            onValueChange={(itemValue, itemIndex) => setChangingYear(itemValue)}>
            {YEAR_LIST.map((year) => {
              return (
                <Picker.Item label={year+"년"} value={year}/>
              )
            })}
            </Picker>
            <PickerHeaderContainer>
              <TouchableWithoutFeedback onPress={() => selectYearPicker()}>
              <PickerFinishContainer>
                <PickerFinishText>완료</PickerFinishText>
              </PickerFinishContainer>
              </TouchableWithoutFeedback>
            </PickerHeaderContainer>
          </YearPickerContainer>
          </Modal>
          <Modal
          isVisible={visibleMonthPicker}
          onBackdropPress={() => cancelMonthPicker()}
          backdropOpacity={0.25}
          style={styles.modalView}>
          <MonthPickerContainer>
            <Picker
            selectedValue={changingMonth}
            onValueChange={(itemValue, itemIndex) => setChangingMonth(itemValue)}>
            {MONTH_LIST.map((month) => {
              return (
                <Picker.Item label={month+"월"} value={month}/>
              )
            })}
            </Picker>
            <PickerHeaderContainer>
              <TouchableWithoutFeedback onPress={() => selectMonthPicker()}>
              <PickerFinishContainer>
                <PickerFinishText>완료</PickerFinishText>
              </PickerFinishContainer>
              </TouchableWithoutFeedback>
            </PickerHeaderContainer>
          </MonthPickerContainer>
          </Modal>
        </Container>
    )
}

const styles = StyleSheet.create({
    modalView: {
      justifyContent: 'flex-end',
      margin: 0,
    },
  });

export default ReportScreen;

