import React from 'react';
import Styled from 'styled-components/native';
import {FlatList, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Local Component;
import TopLocationItem from './TopLocationItem'

const Container = Styled.View`
 background-color: #ffffff;
 padding-left: 16px;
 padding-right: 16px;
`;

const TitleContainer = Styled.View`
 padding-top: 20px;
 padding-bottom: 12px;
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
`;

const TitleText = Styled.Text`
font-weight: 600;
font-size: 18px;
color: #1D1E1F;
`;

const SortTypeContainer = Styled.View`
flex-direction: row;
align-items: center;
`;

const ActiveSortTypeText = Styled.Text`
font-weight: 500;
font-size: 14px;
color: #1D1E1F;
`;

const InactiveSortTypeText = Styled.Text`
color: #C6C7CC;
font-weight: 500;
font-size: 14px;
`;

const Top5TagListContainer = Styled.View`
`;

interface Props {
    navigation: any,
    type: string,
    changeTopLocationType: (type:string) => void,
}

const TopLocationList = ({navigation, type, changeTopLocationType}: Props) => {

    const renderPopularTopLocationItem = ({item, index}: any) => {
        return (
            <TopLocationItem/>
        )
    }

    const renderInterestTopLocationItem = ({item, index}: any) => {
        return (
            <TopLocationItem/>
        )
    }

    return (
        <Container>
            <TitleContainer>
                <TitleText>위치</TitleText>
                <SortTypeContainer>
                    <SortTypeContainer>
                        <TouchableWithoutFeedback onPress={() => changeTopLocationType("popular")}>
                        <ActiveSortTypeText style={type !== "popular" && styles.inactive}>인기순</ActiveSortTypeText>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => changeTopLocationType("interest")}>
                        <ActiveSortTypeText
                        style={[{marginLeft:8}, type !== "interest" && styles.inactive]}>흥미순</ActiveSortTypeText>
                        </TouchableWithoutFeedback>
                    </SortTypeContainer>
                </SortTypeContainer>
            </TitleContainer>
            <Top5TagListContainer>
                {type === "popular" && (
                <FlatList
                data={[1,2,3,4,5]}
                renderItem={renderPopularTopLocationItem}/>
                )}
                {type === "interest" && (
                <FlatList
                data={[1,2,3,4,5]}
                renderItem={renderInterestTopLocationItem}/>
                )}
            </Top5TagListContainer>
        </Container>
    )
}

const styles = StyleSheet.create({
    inactive : {
        color: '#C6C7CC'
    }
})

export default TopLocationList;

