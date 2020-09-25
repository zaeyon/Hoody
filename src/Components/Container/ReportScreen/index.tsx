import React, {useEffect, useState} from 'react';
import Styled from 'styled-components/native';
import {TouchableWithoutFeedback, Picker, StyleSheet, View, ActivityIndicator} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
import allActions from '~/action';
import {useSelector, useDispatch} from 'react-redux';

// Local Component
import AverageInfo from '~/Components/Presentational/ReportScreen/AverageInfo';
import ReportChart from '~/Components/Presentational/ReportScreen/ReportChart';
import Top5TagList from '~/Components/Presentational/ReportScreen/Top5TagList';
import TopLocationList from '~/Components/Presentational/ReportScreen/TopLocationList';

// Route
import GETWeeklyArrangement from '~/Route/Arrangement/GETWeeklyArrangement';
import GETTopTagList from '~/Route/Arrangement/GETTopTagList';
import GETTopAddress from '~/Route/Arrangement/GETTopAddressList';
import GETTopAddressList from '~/Route/Arrangement/GETTopAddressList';

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
 padding-bottom: 70px;
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

const LoadingContainer = Styled.View`
 width: ${wp('100%')};
 height: ${hp('100%')};
 position: absolute;
 background-color:#FFFFFF;
 align-items: center;
 justify-content: center;
`;

const ChangeDateLoadingContainer = Styled.View`
 width: ${wp('100%')};
 height: ${hp('100%')};
 position: absolute;
 background-color: #00000020;
 align-items: center;
 justify-content: center;
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
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingChangeDate, setLoadingChangeDate] = useState<boolean>(false);
    const [weeklyArrangementData, setWeeklyArrangementData] = useState<Object> ({
      "arrangementPerMonth": [],
      "arrangementPerWeeks": {
        "1째 주": [[Object]],
        "2째 주": [[Object]],
        "3째 주": [[Object]],
        "5째 주": [[Object]],
        "이번 주": [[Object]]
    }
    });

    const [weekListData, setWeekListData] = useState<Array<object>>([]);
    const [maximumExpense, setMaximumExpense] = useState<Number>(0);
    const [maximumExpenseChange, setMaximumExpenseChange] = useState<boolean>(false);

    const [topPopularTagListData, setTopPopularTagListData] = useState<Array<object>>([]);
    const [topInterestTagListData, setTopInterestTagListData] = useState<Array<object>>([]);

    const [topPopularAddressListData, setTopPopularAddressListData] = useState<Array<object>>([]);
    const [topInterestAddressListData, setTopInterestAddressListData] = useState<Array<object>>([]);

    const currentUser = useSelector((state: any) => state.currentUser);

    useEffect(() => {
      setLoadingChangeDate(true);
      getWeeklyArrangementData()
      getTopPopularTagList()
      getTopInterestTagList()
      getTopPopularAddressList()
      getTopInterestAddressList()
    }, [selectedYear, selectedMonth])

    const getWeeklyArrangementData = () => {
      GETWeeklyArrangement(selectedYear + "-" + selectedMonth)
      .then(function(response) {
        console.log("GETWeeklyArrangement response", response. arrangementPerWeeks);
        setWeeklyArrangementData(response);

        var arrangementPerWeeksArray = new Array();
        var tmpMaximumExpense = 0;
        
        for(const [key, value] of Object.entries(response.arrangementPerWeeks)) {
            console.log("사용자 주별 소비데이터 분석");
            var weekObj = {
                week: key,
                data: value[0],
                maximum: false,
            }

            if(tmpMaximumExpense < Number(value[0].TotalExpense)) {
                console.log("value[0].TotalExpense", value[0].TotalExpense)
                weekObj.maximum = true
                tmpMaximumExpense = value[0].TotalExpense
            }

            arrangementPerWeeksArray.push(weekObj);
        }

        setTimeout(() => {
            setMaximumExpense(Number(tmpMaximumExpense))
            setWeekListData(arrangementPerWeeksArray);
            setLoading(false);
            setLoadingChangeDate(false);
        }, 10)
      })
      .catch(function(error) {
        console.log("GETWeeklyArrangement error", error);
      })
    }

    const getTopPopularTagList = () => {
      GETTopTagList("popular", selectedYear + "-" + selectedMonth)
      .then(function(response) {
        console.log("GETTopPopularTagList response", response);

        var sortedTagList = response.sort(function(a, b) {
          return b.popular - a.popular;
        })

        setTimeout(() => {
          console.log("정렬된 데이터", sortedTagList);
          setTopPopularTagListData(sortedTagList);
        }, 10)


       
      })
      .catch(function(error) {
        console.log("GETTopPopularTagList error", error);
      })
    }

    const getTopInterestTagList = () => {
      GETTopTagList("interest", selectedYear + "-" + selectedMonth)
      .then(function(response) {
        console.log("GETTopInterestTagList response", response);
        setTopInterestTagListData(response);
      })
      .catch(function(error) {
        console.log("GETTopInterestTagList error", error);
      })
    }

    const getTopPopularAddressList = () => {
      GETTopAddressList("popular", selectedYear + "-" + selectedMonth)
      .then(function(response) {
        console.log("GETTopPopularAddressList response", response);
        setTopPopularAddressListData(response);
      })
      .catch(function(error) {
        console.log("GETTopPopularAddressList error", error);
      })
    }

    const getTopInterestAddressList = () => {
      GETTopAddressList("interest", selectedYear + '-' + selectedMonth)
      .then(function(response) {
        console.log("GETTopInterestAddressList response", response);
        setTopInterestAddressListData(response);
      })
      .catch(function(error) {
        console.log("GETTopInterestAddressList error", error);
      })
    }

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
    setVisibleMonthPicker(false);
    setSelectedMonth(changingMonth);

    if(changingMonth != selectedMonth) {
      setSelectedMonth(changingMonth);
    }
  }

  const cancelMonthPicker = () => {
    setVisibleMonthPicker(false);
    setChangingMonth(selectedMonth);

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
                    <TitleText>{currentUser.user.nickname + "님의 소비만족도"}</TitleText>
                </TitleContainer>
                <ReportChartContainer>
                <AverageInfo
                avgRating={weeklyArrangementData.arrangementPerMonth[0] ? weeklyArrangementData.arrangementPerMonth[0].AvgStarRate : ""}
                avgExpense={weeklyArrangementData.arrangementPerMonth[0] ? Math.floor(weeklyArrangementData.arrangementPerMonth[0].AvgExpense) : ""} 
                postCount={weeklyArrangementData.arrangementPerMonth[0] ? weeklyArrangementData.arrangementPerMonth[0].postCount : ""}
                />
                <ReportChart
                weekListData={weekListData}
                maximumExpense={maximumExpense}/>
                </ReportChartContainer>
                <IntervalContainer>
                </IntervalContainer>
                <Top5TagListContainer>
                <Top5TagList
                type={top5TagType}
                topPopularTagListData={topPopularTagListData}
                topInterestTagListData={topInterestTagListData}
                changeTop5TagType={changeTop5TagType}
                navigation={navigation}/>
                </Top5TagListContainer>
                <IntervalContainer/>
                <TopLocationListContainer>
                <TopLocationList
                type={topLocationType}
                changeTopLocationType={changeTopLocationType}
                navigation={navigation}
                topPopularAddressListData={topPopularAddressListData}
                topInterestAddressListData={topInterestAddressListData}/>
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
          {loading && (
            <LoadingContainer>
              <ActivityIndicator/>
            </LoadingContainer>
          )}
          {loadingChangeDate && (
            <ChangeDateLoadingContainer>
              <ActivityIndicator/>
            </ChangeDateLoadingContainer>

          )}
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

